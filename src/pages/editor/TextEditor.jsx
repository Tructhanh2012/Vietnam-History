import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const editorConfiguration = {
  toolbar: ["bold", "italic"],
};

function TextEditor() {
  const [editor, setEditor] = useState(null);
  //  const [data, setData] = useState("<p>Hello from CKEditor 5!</p>");
  const [editorData, setEditorData] = useState("");
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
  useEffect(() => {
    if (editor) {
      console.log("Editor is ready to use!", editor);
    }
  }, [editor]);

  const handleEditorPost = () => {
    let article = {
      userId: userId,
      content: editorData,
      dateBlogCreated: new Date().toLocaleDateString(),
    };
    // Call api
  };

  return (
    <div className="App">
      <h2>Tạo bài viết mới</h2>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
      />
      <button onClick={handleEditorPost}>Send data</button>
    </div>
  );
}

export default TextEditor;
