import { CommandProcessor, FileSystem } from "./types";

function createCommandProcessor(fileSystem: FileSystem): CommandProcessor {
  function help(): string {
    return `Available commands:\n${Object.keys(commands).join("\n")}`;
  }

  function ls(): string {
    return fileSystem.listContents().join(" ");
  }

  function cd(args: string[]): string {
    if (args.length !== 1) {
      return "Usage: cd <directory>";
    }
    try {
      fileSystem.changeDirectory(args[0]);
      return "";
    } catch (error) {
      return (error as Error).message;
    }
  }

  function mkdir(args: string[]): string {
    if (args.length !== 1) {
      return "Usage: mkdir <directory>";
    }
    try {
      fileSystem.createDirectory(args[0]);
      return "";
    } catch (error) {
      return (error as Error).message;
    }
  }

  function touch(args: string[]): string {
    if (args.length !== 1) {
      return "Usage: touch <file>";
    }
    try {
      fileSystem.createFile(args[0]);
      return "";
    } catch (error) {
      return (error as Error).message;
    }
  }

  function pwd(): string {
    return fileSystem.getCurrentPath();
  }

  function echo(args: string[]): string {
    if (args.length === 0) return "";

    let content = args.join(" ");
    let outputFile: string | null = null;
    let append = false;

    if (content.includes(" > ") || content.includes(" >> ")) {
      const parts = content.split(/ (>>?) /);
      content = parts[0];
      outputFile = parts[2];
      append = parts[1] === ">>";
    }

    if (outputFile) {
      try {
        fileSystem.writeFile(outputFile, content + "\n", append);
        return "";
      } catch (error) {
        return (error as Error).message;
      }
    } else {
      return content;
    }
  }

  function cat(args: string[]): string {
    if (args.length !== 1) return "Usage: cat <file>";
    try {
      return fileSystem.readFile(args[0]);
    } catch (error) {
      return (error as Error).message;
    }
  }

  function rm(args: string[]): string {
    if (args.length !== 1) return "Usage: rm <file> or rm <directory>";
    try {
      fileSystem.rm(args[0]);
      return "";
    } catch (error) {
      return (error as Error).message;
    }
  }

  function rmrf(args: string[]): string {
    if (args.length !== 1) return "Usage: rmrf<file> or rmrf <directory>";
    try {
      fileSystem.rmrf(args[0]);
      return "";
    } catch (error) {
      return (error as Error).message;
    }
  }

  const commands: Record<string, (args: string[]) => any> = {
    help,
    ls,
    cd,
    mkdir,
    touch,
    pwd,
    echo,
    cat,
    rm,
    rmrf,
  };

  function execute(commandString: string): string {
    const [command, ...args] = commandString.trim().split(" ");
    if (command in commands) {
      return commands[command](args);
    } else {
      return `Command not found: ${command}`;
    }
  }

  return {
    execute,
  };
}

export { createCommandProcessor };
