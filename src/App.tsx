import "./App.css";

import { useEffect, useState } from "react";
import { createTerminal } from "./services/terminal/terminal";

import TerminalInput from "./components/terminal-input";
import { Terminal } from "./services/terminal/types";

function App() {
  const [terminal] = useState<Terminal>(createTerminal());
  const [outputs, setOutputs] = useState<{ command: string; result: string }[]>(
    []
  );

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [outputs]);

  function handleSubmit(command: string) {
    const result = terminal.executeCommand(command);
    setOutputs((prevOutputs) => [...prevOutputs, { command, result }]);
  }

  return (
    <div className="text-white text-xl p-4">
      <div className="content">
        <h1>Welcome to MESH (Minimal Emulated SHell)</h1>
        <p className="text-pink-500">Version 1.0</p>
        {outputs.map((output, index) => (
          <div key={index}>
            <p className="input-wrapper flex gap-2">{output.command}</p>
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

      <TerminalInput onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
