import "./App.css";

import { useEffect, useState } from "react";
import { createTerminal } from "./services/terminal/terminal";

import TerminalInput from "./components/terminal-input";
import { Terminal } from "./services/terminal/types";


type Output = { path: string; command: string; result: string };

function App() {
  const [terminal] = useState<Terminal>(createTerminal());
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [history, setHistory] = useState<string[]>(terminal.getHistory());

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [outputs]);

  function handleSubmit(command: string) {
    const path = terminal.getPath();
    const result = terminal.executeCommand(command);
    setOutputs((prevOutputs) => [...prevOutputs, { path, command, result }]);
    setHistory(terminal.getHistory());
  }

  return (
    <div className="text-white text-xl p-4">
      <div className="content">
        <p>
          MESH (Minimal Emulated SHell) -{" "}
          <span className="text-pink-500">Version 1.0</span>
        </p>
        <p>
          Enter <span className="text-green-500">'help'</span> for a list of
          available commands.
        </p>
        {outputs.map((output, index) => (
          <div key={index}>
            <div className="flex">
              <div className="prompt flex">
                {output.path} <span>&nbsp;$&nbsp;</span>
              </div>
              <p>{output.command}</p>
            </div>
            <p
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {output.result}
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="prompt flex">
          {terminal.getPath()} <span>&nbsp;$&nbsp;</span>
        </div>
        <TerminalInput onSubmit={handleSubmit} history={history} />
      </div>
    </div>
  );
}

export default App;
