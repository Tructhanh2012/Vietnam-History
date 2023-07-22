import React from "react";
import { useState } from "react";
import { message, Input, Button, Col, Form, Select, notification } from "antd";

const CommentArticle = () => {
  const [content, setContent] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const handleContentChange = (value) => {
    setContent(value);
  };
  const [data, setData] = useState("");

  const form = Form.useForm();

  const handleSubmitClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");

    let article = {
      memberId: user.id,
      hashtagId: selectHashtag,
      provinceId: selectProvince,
      title: title,
      content: content,
      image: linkImage,
      date: Number(day),
      month: Number(month),
    };
    // console.log(article);

    const response = await fetch(
      "http://localhost:8084/member/create-comment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(article),
      }
    );
    console.log("response: ", response);
    if (!response.ok) {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: "Vui lòng thử lại sau!",
      });
    } else {
      const data = await response.json();
      console.log("data ne:", data);
      message.success("Viết bài thành công");
      form;
    }
    // navigate("/editor/manageEvent");
  };
  return <div>Thêm comment vào</div>;
};
export default CommentArticle;
