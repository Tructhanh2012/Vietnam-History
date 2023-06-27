import { useDispatch, useSelector } from "react-redux";
import { callUpdateAvatar, callUpdateUserInfor } from "../../../services/api";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  message,
  notification,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";

const UserInfo = () => {
  // const form = Form.useForm();
  //  const user = useSelector((state) => state.account.user);
  // const [isSubmit, setIsSubmit] = useState(false);
  //const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "");

  const dispatch = useDispatch();

  // const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
  //   tempAvatar || user?.avatar
  // }`;

  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    const res = await callUpdateAvatar(file);
    if (res && res.data) {
      const newAva = res.data.fileUploaded;
      dispatch(doUploadAvatarAction({ avatar: newAva }));
      setUserAvatar(newAva);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file!");
    }
  };

  const propsUpload = {
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    customRequest: handleUploadAvatar,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`Upload file thành công`);
      } else if (info.file.status === "error") {
        message.error(`Upload file thất bại`);
      }
    },
  };

  const onFinish = async (values) => {
    const { userID, username, email } = values;
    setIsSubmit(true);
    const res = await callUpdateUserInfor(userID, username, avatar, email);

    if (res && res.data) {
      //update redux
      // dispatch(doUpdateUserInfoAction({ avatar: avatar }));
      message.success("Cập nhật thông tin user thành công");
      localStorage.removeItem("token");
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  return (
    <>
      <div style={{ minHeight: 400 }}>
        <Row>
          <Col sm={24} md={10} offset={1}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Avatar
                  size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160 }}
                  icon={<UserOutlined />}
                  // src={urlAvatar}
                  shape="circle"
                />
              </Col>
              <Col span={24}>
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
              </Col>
            </Row>
          </Col>

          <Col sm={24} md={11}>
            <Form onFinish={onFinish} autoComplete="off">
              <Form.Item
                labelCol={{ span: 24 }}
                name="username"
                label="Tên đăng nhập:"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập Tên đăng nhập!",
                    whitespace: false,
                  },
                  {
                    max: 3,
                    message: "Tên đăng nhập không được quá 5 kí tự",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                name="email"
                label="Email:"
                rules={[
                  {
                    type: "email",
                    message: "Hãy nhập đúng định dạng Email!",
                  },
                  {
                    required: true,
                    message: "Hãy nhập email của bạn",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                name="password"
                label="Mật khẩu:"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống mục này!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                name="confirm"
                label="Nhập lại mật khẩu:"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Hãy xác nhận lại mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Xác nhận mật khẩu chưa đúng!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Row className="btn-login">
                <Col span={24} align="middle">
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserInfo;
