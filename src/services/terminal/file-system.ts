import { Directory, FileSystem } from "./types";

function createFileSystem(): FileSystem {
  const root: Directory = {
    type: "directory",
    name: "/",
    contents: {},
  };
  let currentDirectory: Directory = root;
  let currentPath: string[] = [];

  function createFile(name: string, content: string = ""): void {
    if (currentDirectory?.contents[name]?.type === "file") {
      throw new Error(`File already exists: ${name}`);
    }

    currentDirectory.contents[name] = {
      type: "file",
      name,
      content,
    };
  }

  function createDirectory(name: string): void {
    if (currentDirectory?.contents[name]?.type === "directory") {
      throw new Error(`Directory already exists: ${name}`);
    }

    currentDirectory.contents[name] = {
      type: "directory",
      name,
      contents: {},
    };
  }

  function changeDirectory(path: string): void {
    path.endsWith("/") && (path = path.slice(0, -1));
    if (path === "..") {
      if (currentPath.length > 0) {
        currentPath.pop();
        currentDirectory = navigateToPath(root, currentPath);
      }
    } else if (path.startsWith("/")) {
      const newPath = path.split("/").filter(Boolean);
      try {
        const newDirectory = navigateToPath(root, newPath);
        currentDirectory = newDirectory;
        currentPath = newPath;
      } catch (error) {
        throw new Error((error as Error).message);
        // Current path remains unchanged
      }
    } else {
      const newPath = [...currentPath, path];
      try {
        const newDirectory = navigateToPath(root, newPath);
        currentDirectory = newDirectory;
        currentPath = newPath;
      } catch (error) {
        throw new Error((error as Error).message);
        // Current path remains unchanged
      }
    }
  }

  function navigateToPath(startDir: Directory, path: string[]): Directory {
    return path.reduce((dir, segment) => {
      const nextDir = dir.contents[segment];
      if (nextDir && nextDir.type === "directory") {
        return nextDir;
      }
      throw new Error(`Directory not found: ${segment}`);
    }, startDir);
  }

  function listContents(): string[] {
    return Object.entries(currentDirectory.contents).map(([name, node]) => {
      if (node.type === "directory") {
        return `${name}/`;
      }
      return name;
    })
  }

  function getCurrentPath(): string {
    return "/" + currentPath.join("/");
  }

  function writeFile(name: string, content: string, append: boolean) {
    const file = currentDirectory.contents[name];
    if (file && file.type === "file") {
      file.content = append ? file.content + content : content;
    } else {
      createFile(name, content);
    }
  }

  function readFile(name: string): string {
    const file = currentDirectory.contents[name];
    if (file && file.type === "file") {
      return file.content;
    }
    throw new Error(`File not found: ${name}`);
  }

  function rm(name: string): void {
    const item = currentDirectory.contents[name];
    if (!item) {
      throw new Error(`File or directory not found: ${name}`);
    }
    if (item.type === "directory" && Object.keys(item.contents).length > 0) {
      throw new Error(`Cannot remove non-empty directory: ${name}`);
    }
    delete currentDirectory.contents[name];
  }

  function rmrf(name: string): void {
    const item = currentDirectory.contents[name];
    if (!item) {
      throw new Error(`File or directory not found: ${name}`);
    }
    delete currentDirectory.contents[name];
  }

  return {
    createFile,
    createDirectory,
    changeDirectory,
    listContents,
    getCurrentPath,
    writeFile,
    readFile,
    rm,
    rmrf,
  };
}

export { createFileSystem };