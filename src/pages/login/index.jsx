import "./login.scss";
import React, { useState } from "react";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";

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

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const { username, password, email } = values;
    setIsSubmit(true);
    const res = await callRegister(username, password, email);
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success("Đăng nhập thành công");
      navigate("/home");
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
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: "0 auto" }}
        autoComplete="off"
      >
        <div className="heading">
          <Row>
            <Col span={6}></Col>
            <Col span={12}>
              <h2>ĐĂNG NHẬP</h2>
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
        //{...tailFormItemLayout}
        >
          <Row>
            <Col span={8}></Col>

            <Col span={8} align="middle">
              <div className="button" display>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  ĐĂNG NHẬP
                </Button>
              </div>
            </Col>

            <Col span={8}></Col>
          </Row>
          <Divider>Hoặc</Divider>
          <p className="text">
            Chưa có tài khoản?
            <span>
              <Link to="/register"> Đăng ký</Link>
            </span>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
