import TextArea from "antd/es/input/TextArea";
import Ckeditor from "../../../components/Ckeditor/content-editor/ckeditor";
import "./editorCompose.scss";

import React, { useEffect, useState } from "react";
import {
  Upload,
  message,
  Input,
  Button,
  Col,
  Form,
  Select,
  notification,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { callGetHashtag } from "../../../services/api";
import { error, event, post } from "jquery";
import { useNavigate } from "react-router-dom";

const EditorPage = () => {
  const navigate = useNavigate();
  const [linkImage, setLinkImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const form = Form.useForm();
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
  // const handleContentChange = (value) => {
  //   setContent(value);
  // };
  const [selectHashtag, setSelectHashtag] = useState(null);
  const handleSelectionChange = (value) => {
    setSelectHashtag(value);

    // Set giá trị đã chọn vào content
  };

  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleSubmitClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");

    let article = {
      editorId: user.id,
      hashtagId: selectHashtag,
      title: title,
      content: content,
      image: linkImage,
      date: Number(day),
      month: Number(month),
    };
    // console.log(article);

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
    // console.log("res creat article: ", response.json());
    console.log("response: ", response);
    if (!response.ok) {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: "Vui lòng thử lại sau!",
      });
      // throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
    } else {
      const data = await response.json();
      console.log("data ne:", data);
      message.success("Viết bài thành công");
      form;
    }
    // navigate("/editor/manageEvent");
  };

  const [hashtag, setHashtag] = useState([]);
  const getHashtags = async () => {
    const res = await callGetHashtag();
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
              {/* <Ckeditor
                className="text-area"
                value={content}
                onChange={handleContentChange}
              /> */}
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
                initialvalues={hashtag[0]}
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
                  loading={isSubmit}
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
