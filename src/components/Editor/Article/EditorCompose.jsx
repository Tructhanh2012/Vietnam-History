import TextArea from "antd/es/input/TextArea";
import Ckeditor from "../../../components/Ckeditor/content-editor/ckeditor";
import "./editorCompose.scss";

import React, { useEffect, useState } from "react";
import { message, Input, Button, Col, Form, Select, notification } from "antd";
import axios from "axios";
import {
  callGetGeneration,
  callGetProvice,
  callGetEvent,
} from "../../../services/api";
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
  // const handleChange = (info) => {
  //   let fileList = [...info.fileList];

  //   // Limit the number of uploaded images
  //   fileList = fileList.slice(-5);

  //   // Update fileList state
  //   setFileList(fileList);
  // };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };
  const handleContentChange = (value) => {
    setContent(value);
  };

  const [data, setData] = useState("");

  const handleTest = (e, editor) => {
    setData(editor.getData());
  };

  const [selectGeneration, setSelectGeneration] = useState(null);
  const handleSelectionGenerationChange = (value) => {
    setSelectGeneration(value);

    // Set giá trị đã chọn vào content
  };

  const [selectProvince, setSelectProvince] = useState(null);
  const handleSelectionProvinceChange = (value) => {
    setSelectProvince(value);

    // Set giá trị đã chọn vào content
  };
  const [selectEvent, setSelectEvent] = useState(null);
  const handleSelectionEventChange = (value) => {
    setSelectEvent(value);

    // Set giá trị đã chọn vào content
  };

  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleSubmitClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");

    let article = {
      editorId: user.id,
      generationId: selectGeneration,
      provinceId: selectProvince,
      eventId: selectEvent,
      title: title,
      content: content,
      image: linkImage,
      date: Number(day),
      month: Number(month),
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
    console.log("response: ", response);
    if (!response.ok) {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: "Vui lòng thử lại sau!",
      });
    } else {
      const data = await response.json();
      console.log("data ne:", data);
      message.success("Viết bài thành công");
      form;
    }
    // navigate("/editor/manageEvent");
  };

  const [generation, setGeneration] = useState([]);
  const getGenerations = async () => {
    const res = await callGetGeneration();
    const generationOptions = res.data.map((item) => ({
      label: item.generationName,
      value: item.id,
    }));
    // setHashtag(res.data.map(item =>({ label: item.name, key: item.id })));
    setGeneration(generationOptions);
  };

  useEffect(() => {
    getGenerations();
  }, []);

  const [province, setProvince] = useState([]);
  const getProvinces = async () => {
    const res = await callGetProvice();
    const provinceOptions = res.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    // setHashtag(res.data.map(item =>({ label: item.name, key: item.id })));
    setProvince(provinceOptions);
  };

  useEffect(() => {
    getProvinces();
  }, []);
  const [event, setEvent] = useState([]);
  const getEvents = async () => {
    const res = await callGetEvent();
    const eventOptions = res.data.map((item) => ({
      label: item.eventName,
      value: item.id,
    }));
    // setHashtag(res.data.map(item =>({ label: item.name, key: item.id })));
    setEvent(eventOptions);
  };

  useEffect(() => {
    getEvents();
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
              <Ckeditor
                placeholder="Nội dung"
                className="text-area"
                value={content}
                onChange={handleContentChange}
              />
              {/* <TextArea
                className="text-area"
                placeholder="Nội dung bài viết"
                value={content}
                rows={7}
                onChange={handleContentChange}
              /> */}
            </Form.Item>
            <div>{data}</div>

            <Form.Item name="generation">
              <Select
                size="middle"
                placeholder="Triều đại"
                initialvalues={generation[0]}
                onChange={handleSelectionGenerationChange}
                style={{ width: "100%" }}
                options={generation}
              />
            </Form.Item>
            <Form.Item name="province">
              <Select
                size="middle"
                placeholder="Tỉnh thành"
                initialvalues={province[0]}
                onChange={handleSelectionProvinceChange}
                style={{ width: "100%" }}
                options={province}
              />
            </Form.Item>

            <Form.Item name="event">
              <Select
                size="middle"
                placeholder="Sự kiện"
                initialvalues={event[0]}
                onChange={handleSelectionEventChange}
                style={{ width: "100%" }}
                options={event}
              />
            </Form.Item>

            <Form.Item name="upload-img">
              <input
                placeholder="Thumbnail"
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
