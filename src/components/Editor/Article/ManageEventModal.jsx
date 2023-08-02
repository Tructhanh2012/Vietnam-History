import {
  Input,
  Divider,
  Form,
  Modal,
  message,
  notification,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  callGetGeneration,
  callGetProvice,
  callGetEvent,
} from "../../../services/api";
import axios from "../../../utils/axios-customize";
import Ckeditor from "../../Ckeditor/content-editor/ckeditor";

const ManageEventModal = (props) => {
  const {
    dataUpdate,
    setDataUpdate,
    openModalUpdate,
    setOpenModalUpdate,
    loadArticles,
  } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const onFinish = async (formData) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");
    setIsSubmit(true);

    let article = {
      articleId: formData.articleId,
      generationId: selectGeneration,
      provinceId: selectProvince,
      eventId: selectEvent,
      title: formData.title,
      image: formData.image,
      content: formData.content,
      date: Number(day),
      month: Number(month),
    };

    try {
      // Call the API to update the article
      const response = await fetch(
        "http://localhost:8084/editor/edit-article",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(article),
        }
      );

      console.log("response", response);
      // Handle the response
      if (response.ok) {
        message.success("Cập nhật bài viết thành công");
        setOpenModalUpdate(false);
        // window.location.reload();
      } else {
        // Handle the error condition
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: "Vui lòng thử lại sau!",
        });
        console.log(article);
      }
    } catch (error) {
      // Handle any network or API errors
      console.error("Error updating article:", error);
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: "Đã xảy ra lỗi khi cập nhật bài viết.",
      });
    } finally {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  //modal content===================================
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState([]);
  const [linkImage, setLinkImage] = useState("");

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };
  const handleContentChange = (value) => {
    setContent(value);
  };
  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const [generation, setGeneration] = useState([]);
  const [selectGeneration, setSelectGeneration] = useState(null);
  const getGenerations = async () => {
    const res = await callGetGeneration();
    console.log(res.data);
    const generationOptions = res.data.map((item) => ({
      label: item.generationName,
      value: item.id,
    }));
    // setGeneration(res.data.map(item =>({ label: item.name, key: item.id })));
    setGeneration(generationOptions);
  };
  useEffect(() => {
    getGenerations();
  }, []);
  const handleSelectionChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectGeneration(value);

    // Set giá trị đã chọn vào content
  };
  const [province, setProvince] = useState([]);
  const [selectProvince, setSelectProvince] = useState(null);
  const getProvinces = async () => {
    const res = await callGetProvice();
    console.log(res.data);
    const provinceOptions = res.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    // setGeneration(res.data.map(item =>({ label: item.name, key: item.id })));
    setProvince(provinceOptions);
  };
  useEffect(() => {
    getProvinces();
  }, []);
  const handleSelectionProvinceChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectProvince(value);

    // Set giá trị đã chọn vào content
  };
  const [event, setEvent] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const getEvents = async () => {
    const res = await callGetEvent();
    console.log(res.data);
    const EventOptions = res.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    // setGeneration(res.data.map(item =>({ label: item.name, key: item.id })));
    setEvent(EventOptions);
  };
  useEffect(() => {
    getEvents();
  }, []);
  const handleSelectionEventChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectEvent(value);

    // Set giá trị đã chọn vào content
  };

  return (
    <>
      <Modal
        width={"60vw"}
        title="Cập nhật bài viết"
        open={openModalUpdate}
        // onOk={handleSubmit}
        onOk={form.submit}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
        }}
        okText={"Cập nhật"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider />
        <Form
          name="update-article"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="articleId"
            hidden
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tiêu đề"
            name="title"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="content"
          >
            <Ckeditor
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

          <Form.Item
            label="Triều đại"
            name="HashTag"
          >
            <Select
              size="middle"
              placeholder="Thời đại"
              initialvalues={generation[0]}
              onChange={handleSelectionChange}
              style={{ width: "100%" }}
              options={generation}
            />
          </Form.Item>
          <Form.Item
            label="Tỉnh thành"
            name="Province"
          >
            <Select
              size="middle"
              placeholder="Tỉnh thành"
              initialvalues={province[0]}
              onChange={handleSelectionProvinceChange}
              style={{ width: "100%" }}
              options={province}
            />
          </Form.Item>
          <Form.Item
            label="Sự kiện"
            name="Event"
          >
            <Select
              size="middle"
              placeholder="Sự kiện"
              initialvalues={event[0]}
              onChange={handleSelectionEventChange}
              style={{ width: "100%" }}
              options={event}
            />
          </Form.Item>

          <Form.Item
            label="Thumnail"
            name="image"
          >
            <input
              placeholder="link ảnh"
              onChange={(event) => {
                setLinkImage(event.target.value);
              }}
              type="text"
              value={linkImage}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageEventModal;
