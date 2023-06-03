import "./login.scss";
import React, { useState } from "react";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callRegister(username, password);
    setIsSubmit(false);

    if (res?.data) {
      //save access_token
      dispatch(doLoginAction(res.data.user));

      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy",
        description:
          res.message && res.message && Array.isArray(res.message) > 0
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };
  return (
    <div className="login-page">
      <Col span={4} style={{ display: "flex", alignItems: "center" }}></Col>
      <div className="login-box">
        <div className="login-form">
          <Form
            //{...formItemLayout}
            name="login"
            onFinish={onFinish}
            style={{ maxWidth: "50%", maxHeight: "auto" }}
            autoComplete="off"
          >
            <div className="content">
              <div className="heading">
                <Row>
                  <Col span={6}></Col>
                  <Col span={12}>
                    <h2 align="middle">ĐĂNG NHẬP</h2>
                  </Col>
                  <Col span={6}></Col>
                </Row>
              </div>
              <Form.Item
                labelCol={{ span: 24 }}
                name="username"
                label="Tên đăng nhập"
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
              <Form.Item>
                <Row>
                  <Col span={8}></Col>

                  <Col span={8} align="middle">
                    <div className="button" display>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmit}
                      >
                        ĐĂNG NHẬP
                      </Button>
                    </div>
                  </Col>

                  <Col span={8}></Col>
                </Row>
                <Divider>Hoặc</Divider>
                <p className="text" align="middle">
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
