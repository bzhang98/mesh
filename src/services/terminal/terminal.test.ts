import { createTerminal } from "./terminal";
import { Terminal } from "./types";

describe("Terminal Service", () => {
  let terminal: Terminal;

  beforeEach(() => {
    terminal = createTerminal();
  });

  test("properly saves command history", () => {
    terminal.executeCommand("ls");
    terminal.executeCommand("cd /");
    terminal.executeCommand("pwd");

    expect(terminal.getHistory()).toEqual(["ls", "cd /", "pwd"]);
  });

  test("mkdir creates a new directory", () => {
    terminal.executeCommand("mkdir dir1");
    expect(terminal.executeCommand("ls")).toBe("dir1/");
  });

  test("mkdir fails when more than one argument is provided", () => {
    expect(terminal.executeCommand("mkdir dir1 dir2 dir3")).toBe(
      "Usage: mkdir <directory>"
    );
  });

  test("mkdir fails when directory already exists", () => {
    terminal.executeCommand("mkdir dir1");
    expect(terminal.executeCommand("mkdir dir1")).toBe(
      "Directory already exists: dir1"
    );
  });

  test("touch creates a new file", () => {
    terminal.executeCommand("touch file1");
    terminal.executeCommand("touch file2");
    terminal.executeCommand("touch file3");
    expect(terminal.executeCommand("ls")).toBe("file1 file2 file3");
  });

  test("touch fails when more than one argument is provided", () => {
    expect(terminal.executeCommand("touch file1 file2 file3")).toBe(
      "Usage: touch <file>"
    );
  });

  test("touch fails when file already exists", () => {
    terminal.executeCommand("touch file1");
    expect(terminal.executeCommand("touch file1")).toBe(
      "File already exists: file1"
    );
  });

  test("ls lists contents of current directory", () => {
    expect(terminal.executeCommand("ls")).toBe("");
    terminal.executeCommand("touch file1");
    terminal.executeCommand("mkdir dir1");
    expect(terminal.executeCommand("ls")).toBe("file1 dir1/");
  });

  test("cd changes current directory", () => {
    terminal.executeCommand("mkdir dir1");
    terminal.executeCommand("cd dir1");
    expect(terminal.executeCommand("pwd")).toBe("/dir1");

    terminal.executeCommand("mkdir dir2");
    terminal.executeCommand("cd dir2");
    expect(terminal.executeCommand("pwd")).toBe("/dir1/dir2");

    terminal.executeCommand("cd ..");
    expect(terminal.executeCommand("pwd")).toBe("/dir1");

    terminal.executeCommand("cd ..");
    expect(terminal.executeCommand("pwd")).toBe("/");

    terminal.executeCommand("cd /");
    expect(terminal.executeCommand("pwd")).toBe("/");

    terminal.executeCommand("cd /dir1");
    expect(terminal.executeCommand("pwd")).toBe("/dir1");

    terminal.executeCommand("cd /dir1/dir2");
    expect(terminal.executeCommand("pwd")).toBe("/dir1/dir2");
  });

  test("cd fails with invalid directory", () => {
    expect(terminal.executeCommand("cd dir1")).toBe(
      "Directory not found: dir1"
    );
    expect(terminal.getPath()).toBe("/");
    
    expect(terminal.executeCommand("cd /dir1")).toBe(
      "Directory not found: dir1"
    );
    expect(terminal.getPath()).toBe("/");

    terminal.executeCommand("mkdir dir1");
    terminal.executeCommand("cd dir1");
    expect(terminal.executeCommand("cd dir2")).toBe(
      "Directory not found: dir2"
    );
    expect(terminal.getPath()).toBe("/dir1");
  });

  test("echo with no arguments returns the input string", () => {
    expect(terminal.executeCommand("echo hello world")).toBe("hello world");
  });

  test("echo with > writes to a file and cat prints the contents", () => {
    terminal.executeCommand("echo hello > file1");
    expect(terminal.executeCommand("ls")).toBe("file1");
    expect(terminal.executeCommand("cat file1")).toBe("hello\n");
  });

  test("echo with >> appends to a file", () => {
    terminal.executeCommand("echo hello > file1");
    terminal.executeCommand("echo world >> file1");
    expect(terminal.executeCommand("cat file1")).toBe("hello\nworld\n");
  });
});
