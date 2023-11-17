import { useState } from "react";
import "./App.css";
import { RichTextEditor } from "../../src/RichTextEditor";

function App() {
  const [content, setContent] = useState("");
  const [readOnly, setReadOnly] = useState(false);

  return (
    <div className="main">
      <h1>RichTextEditor</h1>
      <RichTextEditor
        content={content}
        setContent={setContent}
        readOnly={readOnly}
      />
      <br />
      <p>{content}</p>
      <button onClick={() => setReadOnly(!readOnly)}>Toggle ReadOnly</button>
    </div>
  );
}

export default App;
