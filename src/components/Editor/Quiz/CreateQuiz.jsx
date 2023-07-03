import React, { useState } from "react";
import { Form, Input, Button, Space, Typography, Radio, Row, Col } from "antd";
import { callPostQuiz } from "../../../services/api";
import "./createquiz.scss";

const { Title } = Typography;

const CreateQuizPage = () => {
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const totalQuestions = 10;

    const handleNextQuestion = () => {
        if (currentQuestion < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };
    const handlePreQuestion = () => {
        if (currentQuestion < totalQuestions) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const onFinish = async (values) => {
        const { question, firstChoice, secondChoice, thirdChoice, answer, hashtagId } = values;
        const res = await callPostQuiz(question, firstChoice, secondChoice, thirdChoice, answer, hashtagId);
        setIsSubmit(true);

    };

    return (
        <div className="quiz-form">
            <div className="createquiz-wrapper">
            <Col  align="middle" >
                
            <h2>Tạo Quiz</h2>
            <Form form={form} 
            onFinish={onFinish} 
            layout="vertical"
            width="100%">
                {[...Array(totalQuestions)].map((_, index) => (
                    <div
                        key={index}
                        style={{ display: index + 1 === currentQuestion ? "block" : "none" }}
                    >
                        <Space direction="vertical" className="question-wrapper">
                            <Form.Item
                            labelCol={{ span: 24 }}
                             width="100%"
                                label={`Câu hỏi ${index + 1}`}
                                name={`question${index + 1}`}
                                rules={[{ required: true, message: "Vui lòng nhập câu hỏi" }]}
                            >
                                <Input.TextArea  rows={4} />
                            </Form.Item>
                            <Form.Item
                            labelCol={{ span: 24 }}
                                label="Lựa chọn 1"
                                name={`firstChoice${index + 1}`}
                                rules={[{ required: true, message: "Vui lòng nhập lựa chọn 1" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Lựa chọn 2"
                                name={`secondChoice${index + 1}`}
                                rules={[{ required: true, message: "Vui lòng nhập lựa chọn 2" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Lựa chọn 3"
                                name={`thirdChoice${index + 1}`}
                                rules={[{ required: true, message: "Vui lòng nhập lựa chọn 3" }]}
                            >
                                <Input />

                            </Form.Item>

                            <Form.Item
                                label="Đáp án"
                                name={`answer${index + 1}`}
                                rules={[{ required: true, message: "Vui lòng chọn đáp án" }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Space>
                                {index > 0 && (
                                    <Form.Item>
                                        <Button onClick={handlePreQuestion}>Lùi lại</Button>
                                    </Form.Item>
                                )}
                                {index + 1 === totalQuestions ? (
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Hoàn thành
                                        </Button>
                                    </Form.Item>
                                ) : (
                                    <Form.Item>
                                        <Button type="primary" onClick={handleNextQuestion}>
                                            Tiếp theo
                                        </Button>
                                    </Form.Item>
                                )}
                            </Space>
                        </Space>
                    </div>
                ))}
            </Form>
        </Col>
        </div>
        </div>
        )
};

export default CreateQuizPage;
