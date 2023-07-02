import TextArea from "antd/es/input/TextArea";
import "./editorCompose.scss";

import React, { useEffect, useState } from "react";
import { Upload, message, Input, Button, Col, Form, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { callGetHashtag } from "../../../services/api";

const EditorPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Bạn chỉ có thể upload file ảnh!");
    }
    return isImage;
  };

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded images
    fileList = fileList.slice(-5);

    // Update fileList state
    setFileList(fileList);

    // Display uploading status
    if (info.file.status === "uploading") {
      setUploading(true);
      return;
    }

    // Handle upload success or failure
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded thành công.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload thất bại.`);
    }

    // Clear uploading status
    setUploading(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const [selectHashtag, setSelectHashtag] = useState(null);
  const handleSelectionChange = (value) => {
      console.log(`Selected: ${value}`);
      setSelectHashtag(value);
  
    // Set giá trị đã chọn vào content
  };

  const handleSubmit = () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append title and content to the formData
    formData.append("title", title);
    formData.append("content", content);
    formData.append("hashtag", selectHashtag)
    // Append each file to the formData
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [hashtag, setHashtag] = useState([]);
  const getHashtags = async () => {
    const res = await callGetHashtag();
    console.log(res.data);
    const hashtagOptions = res.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    // setHashtag(res.data.map(item =>({ label: item.name, key: item.id })));
    setHashtag(hashtagOptions)
  }
 

  useEffect(() => {
    getHashtags()
  }, [])

  return (
    <div className="editor">
      <div className="editor-wrapper">
        <Form name="login" autoComplete="off">
          <div className="title">
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tiêu đề bài viết!",
                  whitespace: false,
                },
              ]}
            >
              <Input
                placeholder="Tiêu đề bài viết"
                value={title}
                onChange={handleTitleChange}
              />
            </Form.Item>
          </div>

          <div className="editor-content">
            <Form.Item name="textArea">
              <TextArea
                className="text-area"
                placeholder="Nội dung bài viết"
                value={content}
                rows={7}
                onChange={handleContentChange}
              />
            </Form.Item>
            <Form.Item name="hashtag">
              <Select
                size="middle"
                placeholder="Hashtag"
                defaultValue={hashtag[0]}
                onChange={handleSelectionChange}
                style={{ width: '100%' }}
                options={hashtag}
              />
            </Form.Item>

            <Form.Item name="upload-img">
              <Upload
                className="upload-img"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Col align="middle">
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={!title || !content || uploading}
                >
                  Submit
                </Button>
              </Col>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditorPage;
