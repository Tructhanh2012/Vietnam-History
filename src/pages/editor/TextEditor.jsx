import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const editorConfiguration = {
  toolbar: ["bold", "italic"],
};

function TextEditor() {
  const [editor, setEditor] = useState(null);
  const [data, setData] = useState("<p>Hello from CKEditor 5!</p>");

  useEffect(() => {
    if (editor) {
      console.log("Editor is ready to use!", editor);
    }
  }, [editor]);

  const handleEditorChange = (event, editor) => {
    const newData = editor.getData();
    console.log({ event, editor, data: newData });
    setData(newData);
  };

  const handleEditorBlur = (event, editor) => {
    console.log("Blur.", editor);
  };

  const handleEditorFocus = (event, editor) => {
    console.log("Focus.", editor);
  };

  return (
    <div className="App">
      <h2>Using CKEditor 5 from online builder in React</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onBlur={handleEditorBlur}
      />
    </div>
  );
}

export default TextEditor;
