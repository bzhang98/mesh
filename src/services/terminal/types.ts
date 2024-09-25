export type FileType = "file" | "directory";

export interface File {
  type: "file";
  name: string;
  content: string;
}

export interface Directory {
  type: "directory";
  name: string;
  contents: Record<string, File | Directory>;
}

export type FileSystemNode = File | Directory;

export interface FileSystem {
  createFile: (name: string, content?: string) => void;
  createDirectory: (name: string) => void;
  changeDirectory: (path: string) => void;
  listContents: () => string[];
  getCurrentPath: () => string;
  writeFile: (name: string, content: string, append: boolean) => void;
  readFile: (name: string) => string;
}

export interface CommandProcessor {
  execute: (commandString: string) => string;
}

export interface Terminal {
  executeCommand: (commandString: string) => string;
  executeCommandNoHistory: (commandString: string) => string;
  getHistory: () => string[];
  getPath: () => string;
}

export type Command = (args: string[]) => string;

export interface Commands {
  [key: string]: Command;
}
