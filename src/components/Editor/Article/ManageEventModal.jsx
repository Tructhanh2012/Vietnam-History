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
    const { userId, username, email, role } = values;
    setIsSubmit(true);
    const res = await axios.put("/editor/edit-article", {
      userId,
      username,
      email,
      role,
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
        description: response.data.message,
      });
    }

    // if (res && res.responeMessage.responeMessage === "UPDATE USER OKE !") {
    //   message.success("Cập nhật user thành công");
    //   setOpenModalUpdate(false);
    //   //await props.fetchUser;
    // } else {
    //   notification.error({
    //     message: "Đã có lỗi xảy ra",
    //     description: res.message,
    //   });
    // }
    // setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  //modal content===================================
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState([]);
  const [linkImage, setLinkImage] = useState("");

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded images
    fileList = fileList.slice(-5);

    // Update fileList state
    setFileList(fileList);

    // Display uploading status
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };
  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    const { articleId, hashtagId, title, image, content } = values;
    setIsSubmit(true);
    const res = await axios;
    console.log("check updateUser: ", res.responeMessage.responeMessage);

    if (res && res.responeMessage.responeMessage === "UPDATE USER OKE !") {
      message.success("Cập nhật user thành công");
      setOpenModalUpdate(false);
      fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);

    // const user = JSON.parse(sessionStorage.getItem("user"));
    // const token = sessionStorage.getItem("jwtToken");
    // setIsSubmit(true);

    // let article = {
    //   articleId: dataUpdate.key,
    //   hashtagId: selectHashtag,
    //   title: title,
    //   image: linkImage,
    //   content: content,
    // };

    // try {
    //   // Call the API to update the article
    //   const response = await fetch(
    //     "http://localhost:8084/editor/edit-article",
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify(article),
    //     }
    //   );

    //   // Handle the response
    //   if (response.ok) {
    //     message.success("Cập nhật bài viết thành công");
    //     setOpenModalUpdate(false);
    //     window.location.reload();
    //   } else {
    //     // Handle the error condition
    //     notification.error({
    //       message: "Đã có lỗi xảy ra",
    //       description: response.data.message,
    //     });
    //   }
    // } catch (error) {
    //   // Handle any network or API errors
    //   console.error("Error updating article:", error);
    //   notification.error({
    //     message: "Đã có lỗi xảy ra",
    //     description: "Đã xảy ra lỗi khi cập nhật bài viết.",
    //   });
    // } finally {
    //   setIsSubmit(false);
    // }
  };

  const [hashtag, setHashtag] = useState([]);
  const [selectHashtag, setSelectHashtag] = useState(null);
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

          <Form.Item name="HashTag">
            <Select
              size="middle"
              placeholder="Thời đại"
              initialValues={hashtag[0]}
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
