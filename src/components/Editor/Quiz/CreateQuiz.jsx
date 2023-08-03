import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Typography,
  Col,
  Select,
  message,
  notification,
} from "antd";
import { callGetGeneration } from "../../../services/api";
import "./createquiz.scss";
import axios from "../../../utils/axios-customize";

const { Title } = Typography;

const CreateQuizPage = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [generations, setGenerations] = useState([]);
  const [generationId, setGenerationId] = useState();

  const onFinish = async (values) => {
    const token = sessionStorage.getItem("jwtToken");
    const {
      question,
      firstChoice,
      secondChoice,
      thirdChoice,
      answer,
      generationId,
    } = values;
    const selectedGeneration = generations.find(
      (item) => item.id === Number(generationId)
    );

    const res = await axios.post(
      "http://localhost:8084/editor/create-question",
      { question, firstChoice, secondChoice, thirdChoice, answer, generationId }
    );
    console.log("log res", res);
    if (!res.ok) {
      message.success("Tạo câu hỏi thành công.");
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: "Vui lòng tạo câu hỏi lại!",
      });
    }
  };

  //=============================================

  const getGenerations = async () => {
    const res = await callGetGeneration();
    setGenerations(res.data);
    // console.log("generations", generations);
  };
  useEffect(() => {
    getGenerations();
  }, []);

  const onChange = (value) => {
    setGenerationId(value);
    console.log("value: ", generationId);
  };
  const options = generations.map((item) => ({
    value: String(item.id),
    label: item.generationName,
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
              <Space direction="vertical" className="question-wrapper">
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

                <Form.Item name="generationId">
                  <Select
                    showSearch
                    placeholder="Triều đại"
                    // optionFilterProp="children"
                    onChange={onChange}
                    // filterOption={(input, option) =>
                    //   (option?.label ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    options={options}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isSubmit}>
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
