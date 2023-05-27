import React, { useState } from "react";
import "./register.scss";
import { Button, Col, Divider, Form, Input, Row, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const { username, password, email } = values;
    setIsSubmit(true);
    const res = await callRegister(username, password, email);
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success("Đăng ký tài khoản thành công");
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy",
        description:
          res.message && res.message.length > 0 ? res.message[0] : res.message,
        duration: 5,
      });
    }
  };
  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-form">
          <Form
            {...formItemLayout}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: "50%" }}
            autoComplete="off"
          >
            <div className="content">
              <div className="heading">
                <Row>
                  <Col span={6}></Col>
                  <Col span={12}>
                    <h2 align="middle">ĐĂNG KÝ</h2>
                  </Col>
                  <Col span={6}></Col>
                </Row>
              </div>

              <Form.Item
                labelCol={{ span: 24 }}
                name="username"
                label="Tên đăng nhập"
                // tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập Tên đăng nhập!",
                    whitespace: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                name="email"
                label="Email"
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

              <Form.Item
                labelCol={{ span: 24 }}
                name="confirm"
                label="Nhập lại mật khẩu"
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
                <Row className="btn-login">
                  <Col span={8}></Col>
                  <Col span={8} align="middle">
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                      Đăng ký
                    </Button>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Divider>Hoặc</Divider>
                <p className="text" align="middle">
                  Đã có tài khoản?
                  <span>
                    <Link to="/login"> Đăng nhập</Link>
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

export default RegisterPage;
