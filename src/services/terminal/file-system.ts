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
    currentDirectory.contents[name] = {
      type: "file",
      name,
      content,
    };
  }

  function createDirectory(name: string): void {
    currentDirectory.contents[name] = {
      type: "directory",
      name,
      contents: {},
    };
  }

  function changeDirectory(path: string): void {
    if (path === "..") {
      if (currentPath.length > 0) {
        currentPath.pop();
        currentDirectory = navigateToPath(root, currentPath);
      }
    } else if (path.startsWith("/")) {
      const newPath = path.split("/").filter(Boolean);
      currentDirectory = navigateToPath(root, newPath);
      currentPath = newPath;
    } else {
      currentPath.push(path);
      currentDirectory = navigateToPath(root, currentPath);
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
    return Object.keys(currentDirectory.contents);
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

  return {
    createFile,
    createDirectory,
    changeDirectory,
    listContents,
    getCurrentPath,
    writeFile,
    readFile,
  };
}

export { createFileSystem };