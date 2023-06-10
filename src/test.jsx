import React, { useRef, useState } from "react";

function ImageTextArea() {
  const textAreaRef = useRef(null);
  const [content, setContent] = useState(
    "Start typing or paste images here..."
  );

  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    let newContent = content;

    for (const item of items) {
      if (item.kind === "file" && item.type.includes("image")) {
        const imageFile = item.getAsFile();
        const reader = new FileReader();

        reader.onload = (e) => {
          const base64Image = e.target.result;
          newContent += `<img src="${base64Image}" alt="Pasted Image" />`;
          setContent(newContent);
        };

        reader.readAsDataURL(imageFile);
      } else if (item.kind === "string") {
        item.getAsString((str) => {
          newContent += str;
          setContent(newContent);
        });
      }
    }
  };

  return (
    <div
      contentEditable
      ref={textAreaRef}
      onPaste={handlePaste}
      style={{ border: "1px solid #ccc", minHeight: "200px", padding: "10px" }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default ImageTextArea;
