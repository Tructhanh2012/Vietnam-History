import "./login.scss";
import React, { useState } from "react";
import { Button, Col, Divider, Form, Input, Row, message } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { callLogin, callPostLogin } from "../../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email, password } = values;
    setIsSubmit(true);

    try {
      const res = await callPostLogin(email, password);
      console.log("res", res);

      const user = res.data.user;
      const jwtToken = res.data.jwtToken;
      const refreshToken = res.data.refreshToken;

      setIsSubmit(false);
      sessionStorage.setItem("jwtToken", jwtToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      const userRole = user.role;

      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "EDITOR") {
        navigate("/editor");
      } else if (userRole === "MEMBER") {
        const previousPage = sessionStorage.getItem("previousPage");
        // navigate("/login");
        if (previousPage) {
          navigate(previousPage); // Navigate người dùng trở lại trang trước
        } else {
          navigate("/"); // Hoặc có thể navigate về trang chủ nếu không có trang trước đó
        }
        console.log(previousPage);
        // navigate("/");
      }

      message.success("Đăng nhập tài khoản thành công");
    } catch (error) {
      console.log("error", error);
      setIsSubmit(false);

      notification.error({
        message: "Bạn đã nhập sai email hoặc password",
        description: error.response.data.message, // Assuming the error message is returned in the response object
      });
      form.resetFields(["email", "password"]);
    }
  };
  return (
    <div className="login-page">
      <Col
        span={4}
        style={{ display: "flex", alignItems: "center" }}
      ></Col>
      <div className="login-box">
        <div className="login-form">
          <Form
            form={form}
            //{...formItemLayout}
            name="login"
            className="login-content"
            onFinish={onFinish}
            style={{ maxHeight: "auto" }}
            // style={{ maxWidth: "50%", maxHeight: "auto" }}
            autoComplete="off"
          >
            <div className="content">
              <div className="heading">
                <Row>
                  <Col span={6}></Col>
                  <Col span={24}>
                    <h2 align="middle">ĐĂNG NHẬP</h2>
                  </Col>
                  {/* <Col span={6}></Col> */}
                </Row>
              </div>

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
                label="Mật khẩu"
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
              <Form.Item>
                <Row>
                  <Col span={4}></Col>

                  <Col
                    span={16}
                    align="middle"
                  >
                    <div
                      className="button"
                      // display
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmit}
                      >
                        ĐĂNG NHẬP
                      </Button>
                    </div>
                  </Col>

                  <Col span={4}></Col>
                </Row>
                <Divider>Hoặc</Divider>
                <p
                  className="text"
                  align="middle"
                >
                  Chưa có tài khoản?
                  <span>
                    <Link to="/register"> Đăng ký</Link>
                  </span>
                </p>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
