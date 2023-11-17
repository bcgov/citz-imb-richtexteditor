import { useState } from "react";
import "./App.css";
import { RichTextEditor } from "../../src/RichTextEditor";

function App() {
  const [content, setContent] = useState("");
  const readOnly = false;

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
    </div>
  );
}

export default App;
