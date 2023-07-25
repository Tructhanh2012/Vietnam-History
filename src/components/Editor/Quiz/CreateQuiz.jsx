import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Typography,
  Radio,
  Row,
  Col,
  Select,
  message,
  notification,
} from "antd";
import { callGetHashtag } from "../../../services/api";
import "./createquiz.scss";

const { Title } = Typography;

const CreateQuizPage = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const token = sessionStorage.getItem("jwtToken");

    console.log("log token:", token);

    const {
      question,
      firstChoice,
      secondChoice,
      thirdChoice,
      answer,
      hashtagId,
    } = values;
    const selectedHashtag = hashtags.find(
      (item) => item.id === Number(hashtagId)
    );
    const data = [
      {
        question,
        firstChoice,
        secondChoice,
        thirdChoice,
        answer,
        hashtagId: selectedHashtag ? selectedHashtag.id : null,
      },
    ];

    try {
      const res = await fetch("http://localhost:8084/editor/create-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log("API call successful");
        message.success("Tạo câu hỏi thành công");
        form.resetFields();
      } else {
        console.error("API call failed");
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: "Vui lòng tạo câu hỏi lại!",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  //=============================================
  const [hashtags, setHashtags] = useState([]);
  const [hashtagId, setHashtagId] = useState();

  const getHashtags = async () => {
    const res = await callGetHashtag();
    setHashtags(res.data);
    // console.log("hashtags", hashtags);
  };
  useEffect(() => {
    getHashtags();
  }, []);

  const onChange = (value) => {
    console.log("value: ", value);
    setHashtagId(value);
  };
  const options = hashtags.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));

  return (
    <div className="quiz-form">
      <div className="createquiz-wrapper">
        <Col align="middle">
          <h2>Tạo Câu Hỏi</h2>
          <Form
            name="createquiz"
            form={form}
            onFinish={onFinish}
            layout="vertical"
            width="100%"
          >
            <div>
              <Space
                direction="vertical"
                className="question-wrapper"
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  width="100%"
                  label="Câu hỏi"
                  name="question"
                  rules={[{ required: true, message: "Vui lòng nhập câu hỏi" }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Lựa chọn 1"
                  name="firstChoice"
                  rules={[
                    { required: true, message: "Vui lòng nhập lựa chọn 1" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Lựa chọn 2"
                  name="secondChoice"
                  rules={[
                    { required: true, message: "Vui lòng nhập lựa chọn 2" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Lựa chọn 3"
                  name="thirdChoice"
                  rules={[
                    { required: true, message: "Vui lòng nhập lựa chọn 3" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Đáp án"
                  name="answer"
                  rules={[{ required: true, message: "Vui lòng chọn đáp án" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="hashtagId">
                  <Select
                    showSearch
                    placeholder="Triều đại"
                    // optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={options}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmit}
                  >
                    Hoàn thành
                  </Button>
                </Form.Item>
              </Space>
            </div>
          </Form>
        </Col>
      </div>
    </div>
  );
};

export default CreateQuizPage;
