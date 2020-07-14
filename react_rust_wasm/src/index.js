// Import react packages
import React from "react";
import ReactDOM from "react-dom";

// Import our WebAssembly binary
const wasm = import("../build/react_rust_wasm");

// Call the WebAssembly method
wasm.then(wasm => {
  // Construct a React component called "App"
  const App = () => {
    return (
      // Return some html which calls the rust method "rustAlert" on a button click
      <div>
        <h1>Hi there</h1>
        <button onClick={wasm.rust_alert}>Alert</button>
      </div>
    );
  };
  // Render the newly created App component to the root div in the index.html file created earlier
  ReactDOM.render(<App />, document.getElementById("root"));
});