import "./login.scss";
import React, { useState } from "react";
import { Button, Col, Divider, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { callLogin } from "../../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    // const res = await callLogin2(username, password);
    setIsSubmit(false);
    console.log("check res: ", res);
    // console.log("check res data: ", res.data);

    if (res.token) {
      // localStorage.setItem("access_token", res.data.access_token); //save access_token into localStorage
      // dispatch(doLoginAction(res.data.user));
      //console.log("check res data: ", res.data);
      console.log("login success");
      message.success("Đăng nhập tài khoản thành công");
      navigate("/");
    } else {
      // message.error("Có lỗi xảy ra");
      notification.error({
        message: "Có lỗi xảy",
        description: res.message,
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
                  <Col span={24}>
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
                className="custom-form-item"
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
