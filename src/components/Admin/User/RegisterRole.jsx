import {
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  message,
  notification,
} from "antd";
import { Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callRegisterRole } from "../../../services/api";
import "./register-role.scss";
import { useForm } from "antd/es/form/Form";

const RegisterRole = (props) => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (formdata) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");

    const data = {
      name: formdata.name,
      email: formdata.email,
      password: formdata.password,
    };
    const res = await fetch("http://localhost:8084/admin/create-editor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log("dataa: ", res);
    if (!res.ok) {
      throw new Error("response not okay");
    } else {
      message.success("Tạo tài khoản thành công");
      form.resetFields();
    }
  };

  // const onFinish = async (values) => {
  //   const { username, email, password, role } = values;
  //   setIsSubmit(true);
  //   const res = await callRegisterRole(username, password, email, role);
  //   if (res && res.data) {
  //     message.success("Tạo mới thành công");
  //     form.resetFields();
  //     await props.fetchUser();
  //   } else {
  //     notification.error({
  //       message: "Có lỗi xảy",
  //       discription: res.message,
  //     });
  //   }
  return (
    <div className="register-role-page">
      <div className="register-role-box">
        <div className="register-role-form">
          <Row gutter={[0, 50]} style={{ marginTop: 100 }}>
            <Col span={15} offset={5}>
              <Form
                // {...formItemLayout}
                name="registerRole"
                onFinish={onFinish}
                style={{
                  maxWidth: "100%",
                }}
                autoComplete="off"
              >
                <div className="content">
                  <Form.Item
                    labelCol={{ span: 5 }}
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
                    <Input />
                  </Form.Item>
                  <Form.Item
                    labelCol={{ span: 5 }}
                    name="email"
                    label="Email:"
                    // className={styles["label-style"]}
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
                    labelCol={{ span: 5 }}
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
                    labelCol={{ span: 5 }}
                    name="confirm"
                    label="Nhập lại mật khẩu:"
                    // className={styles["label-style"]}
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

                  <Form.Item>
                    <Row className="create">
                      <Col span={8}></Col>
                      <Col span={8} align="middle">
                        <Button
                          // className={styles["btn-create"]}
                          type="primary"
                          htmlType="submit"
                          loading={isSubmit}
                        >
                          Tạo
                        </Button>
                      </Col>
                      <Col span={8}></Col>
                    </Row>
                  </Form.Item>
                </div>
                <Col span={6}></Col>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RegisterRole;
