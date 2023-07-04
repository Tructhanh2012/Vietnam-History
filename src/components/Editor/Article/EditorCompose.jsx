import TextArea from "antd/es/input/TextArea";
import "./editorCompose.scss";

import React, { useEffect, useState } from "react";
import { Upload, message, Input, Button, Col, Form, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { callGetHashtag } from "../../../services/api";
import { error, event, post } from "jquery";

const EditorPage = () => {
  const [linkImage, setLinkImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded images
    fileList = fileList.slice(-5);

    // Update fileList state
    setFileList(fileList);

    // Display uploading status

    // Handle upload success or failure

    // Clear uploading status
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

  const handleSubmitClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");
    let article = {
      editorId: user.id,
      hashtagId: selectHashtag,
      title: title,
      content: content,
      image: linkImage,
    };
    console.log(article);
    const response = await fetch(
      "http://localhost:8084/editor/create-article",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(article),
      }
    );
    if (!response.ok) {
      throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
    }
    const data = await response.json();
    console.log(data);
  };

  const [hashtag, setHashtag] = useState([]);
  const getHashtags = async () => {
    const res = await callGetHashtag();
    console.log(res.data);
    const hashtagOptions = res.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    // setHashtag(res.data.map(item =>({ label: item.name, key: item.id })));
    setHashtag(hashtagOptions);
  };

  useEffect(() => {
    getHashtags();
  }, []);

  return (
    <div className="editor">
      <div className="editor-wrapper">
        <Form
          name="login"
          autoComplete="off"
        >
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
                style={{ width: "100%" }}
                options={hashtag}
              />
            </Form.Item>

            <Form.Item name="upload-img">
              <input
                placeholder="link ảnh"
                onChange={(event) => {
                  setLinkImage(event.target.value);
                }}
                type="text"
                value={linkImage}
              />
            </Form.Item>
            <Form.Item>
              <Col align="middle">
                <Button
                  type="primary"
                  onClick={handleSubmitClick}
                  disabled={!title || !content}
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
