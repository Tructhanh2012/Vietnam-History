import { Col, Divider, Form, Input, Radio, Row, message } from "antd";
import { Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callRegisterRole } from "../../../services/api";
import styles from "./register_role.module.css";
import { useForm } from "antd/es/form/Form";

const RegisterRole = (props) => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { username, password, email, role } = values;
    setIsSubmit(true);
    const res = await callRegisterRole(username, password, email, role);
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success("Đăng ký role thành công");
      navigate("/admin");
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
    <div className={styles["register-role-page"]}>
      <div className={styles["register-role-box"]}>
        <div className={styles["register-role-form"]}>
          <Row gutter={[20, 20]}>
            <Col span={4}></Col>
            <Col span={13} align="middle">
              <Form
                // {...formItemLayout}
                name="registerRole"
                onFinish={onFinish}
                style={{
                  maxWidth: "100%",
                }}
                autoComplete="off"
              >
                <div className={styles["content"]}>
                  <div className="heading">
                    <Row>
                      {/* <Col span={6}></Col>
                      <Col span={12}>
                        <h4 align="middle">ĐĂNG KÝ</h4>
                      </Col>
                      <Col span={6}></Col> */}
                    </Row>
                  </div>
                  <Form.Item
                    labelCol={{ span: 7 }}
                    name="username"
                    label="Tên đăng nhập:"
                    className={styles["label-style"]}
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
                    labelCol={{ span: 7 }}
                    name="email"
                    label="Email:"
                    className={styles["label-style"]}
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
                    labelCol={{ span: 7 }}
                    name="password"
                    label="Mật khẩu:"
                    // className={styles["label-style"]}
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
                    labelCol={{ span: 7 }}
                    name="confirm"
                    label="Nhập lại mật khẩu:"
                    className={styles["label-style"]}
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

                  <Form.Item
                    name="role"
                    label="Role"
                    labelCol={{ span: 7 }}
                    rules={[{ required: true, message: "Hãy chọn role!" }]}
                  >
                    <Radio.Group>
                      <Radio value="admin"> Admin </Radio>
                      <Radio value="editor"> Editor </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item>
                    <Row className="create">
                      <Col span={8}></Col>
                      <Col span={8} align="middle">
                        <Button
                          className={styles["btn-create"]}
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
