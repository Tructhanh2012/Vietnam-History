import {
  Upload,
  Input,
  Button,
  Col,
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
import axios from "axios";

const ManageEventModal = (props) => {
  const { dataUpdate, setDataUpdate, openModalUpdate, setOpenModalUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { userId, username, email, role } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(userId, username, email, role);
    console.log("check updateUser: ", res.responeMessage.responeMessage);

    if (res && res.responeMessage.responeMessage === "UPDATE USER OKE !") {
      message.success("Cập nhật user thành công");
      setOpenModalUpdate(false);
      //await props.fetchUser;
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
    // setFieldValue;
  }, [dataUpdate]);

  //modal content===================================
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

  const handleSubmit = async () => {
    // setIsSubmit(true);
    // const articleData = form.getFieldsValue();
    // articleData.id = dataUpdate.key;
    // await props.handleUpdateArticle(articleData);
    // setIsSubmit(false);
    // setOpenModalUpdate(false);

    //Create a new FormData object
    const formData = new FormData();

    // Append title and content to the formData
    formData.append("title", title);
    formData.append("content", content);
    formData.append("hashtag", selectHashtag);

    //Append each file to the formData
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    try {
      // Call the API to update the article
      const response = await axios.put(
        "https://vietnamhistory-production.up.railway.app/editor/edit-article",
        formData,
        {
          // Set any additional headers if required
          headers: {
            "Content-Type": "multipart/form-data",
            // Add any authentication headers if required
            Authorization: "Bearer YOUR_AUTH_TOKEN",
          },
        }
      );

      // Handle the response
      if (response.status === 200) {
        message.success("Cập nhật bài viết thành công");
        setOpenModalUpdate(false);
      } else {
        // Handle the error condition
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: response.data.message,
        });
      }
    } catch (error) {
      // Handle any network or API errors
      console.error("Error updating article:", error);
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: "Đã xảy ra lỗi khi cập nhật bài viết.",
      });
    }
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
  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Modal
        title="Cập nhật bài viết"
        open={openModalUpdate}
        onOk={
          handleSubmit
          //   () => {
          //   form.submit();
          // }
        }
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
        }}
        // onText={"Cập nhật"}
        // cancelTe={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider />
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
            <Form.Item name="content">
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
                initialValues={hashtag[0]}
                onChange={handleSelectionChange}
                style={{ width: "100%" }}
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
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ManageEventModal;
