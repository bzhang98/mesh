import { createCommandProcessor } from "./command-processor";
import { createFileSystem } from "./file-system";
import { Terminal } from "./types";

function createTerminal(): Terminal {
  const fileSystem = createFileSystem();
  const commandProcessor = createCommandProcessor(fileSystem);
  const history: string[] = [];

  function executeCommand(commandString: string): string {
    history.push(commandString);
    return commandProcessor.execute(commandString);
  }

  function getHistory(): string[] {
    return [...history];
  }

  return {
    executeCommand,
    getHistory,
  };
}

export { createTerminal };
