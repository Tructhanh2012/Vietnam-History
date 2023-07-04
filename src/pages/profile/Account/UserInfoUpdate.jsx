import { useDispatch, useSelector } from "react-redux";
import { callUpdateProfile } from "../../../services/api";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  message,
  notification,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const UserInfo = (props) => {
  const [form] = Form.useForm();
  //const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "");
  const { isModelOpen, setIsModelOpen } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const onFinish = async (formData) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const data = {
      id: user.id,
      name: formData.name,
      password: formData.password,
    };

    setIsSubmit(true);
    const res = await fetch("http://localhost:8084/general/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataa = await res.json();
    console.log("dataa: ", dataa);

    setIsSubmit(true);
    console.log("update user", res);
    if (res?.ok) {
      message.success("Cập nhật thông tin user thành công");
      // sessionStorage.removeItem("token");
      setIsModelOpen(false);
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
          <Modal
            title="Quản lý tài khoản"
            open={isModelOpen}
            // footer={null}
            onOk={() => {
              form.submit();
            }}
            onCancel={() => {
              setIsModelOpen(false);
            }}
            maskClosable={true}
            width={"40vw"}
            onText={"Cập nhật"}
            cancelTe={"Hủy"}
            confirmLoading={isSubmit}
          >
            {/* <Tabs items={items}></Tabs> */}
            <Divider />
            <Col sm={24} md={18} offset={3}>
              <Form
                form={form}
                name="updateProfile"
                onFinish={onFinish}
                autoComplete="off"
              >
                {/* <Form.Item labelCol={{ span: 24 }} name="id" hidden label="id">
                  <Input />
                </Form.Item> */}
                <Form.Item
                  labelCol={{ span: 24 }}
                  name="name"
                  label="Tên đăng nhập:"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập Tên đăng nhập!",
                      whitespace: false,
                    },
                    {
                      max: 10,
                      message: "Tên đăng nhập không được quá 10 kí tự",
                    },
                  ]}
                >
                  <Input placeholder={user.name} />
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
                <Divider />
                {/* <Row className="btn-login">
                  <Col span={24} align="middle">
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                      Cập nhật
                    </Button>
                  </Col>
                </Row> */}
              </Form>
            </Col>
          </Modal>
        </Row>
      </div>
    </>
  );
};

export default UserInfo;
