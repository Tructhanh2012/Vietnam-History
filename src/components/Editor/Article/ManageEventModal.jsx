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
import { callGetHashtag } from "../../../services/api";
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

  const onFinish = async (values) => {
    const { articleId, selectHashtag, title, content, image } = values;
    setIsSubmit(true);
    const res = await axios.put("/editor/edit-article", {
      articleId,
      selectHashtag,
      title,
      content,
      image,
    });
    console.log("check updateUser: ", res);
    if (res.ok) {
      message.success("Cập nhật bài viết thành công");
      setOpenModalUpdate(false);
      loadArticles();
    } else {
      // Handle the error condition
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: "Vui lòng thử lại sau",
      });
    }
    setIsSubmit(false);
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

  const [hashtag, setHashtag] = useState([]);
  const [selectHashtag, setSelectHashtag] = useState(null);
  const getHashtags = async () => {
    const res = await callGetHashtag();
    // console.log(res.data);
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
  const handleSelectionChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectHashtag(value);

    // Set giá trị đã chọn vào content
  };

  return (
    <>
      <Modal
        title="Cập nhật bài viết"
        open={openModalUpdate}
        // onOk={handleSubmit}
        onOk={form.submit}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
        }}
        onText={"Cập nhật"}
        cancelTe={"Hủy"}
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
            <Input disabled />
          </Form.Item>

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
            <Input />
          </Form.Item>

          <Form.Item name="content">
            <Ckeditor
              className="text-area"
              // value={content}
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

          <Form.Item name="HashTag">
            <Select
              size="middle"
              placeholder="Thời đại"
              // initialValues={hashtag[0]}
              onChange={handleSelectionChange}
              style={{ width: "100%" }}
              options={hashtag}
            />
          </Form.Item>

          <Form.Item name="image">
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
