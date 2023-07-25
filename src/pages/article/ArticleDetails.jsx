import {
  Anchor,
  Breadcrumb,
  Button,
  Col,
  Modal,
  Form,
  notification,
  message,
} from "antd";
// import "./article.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./style.module.scss";
import { useState } from "react";
import ReactHTMLParser from "html-react-parser";
import CommentArticle from "../../components/Comment";
import { Colors } from "chart.js";

const ArticleDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    navigate("/login");
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const navigate = useNavigate();
  const BreadcrumbArticle = () => {
    return (
      <Breadcrumb
        style={{
          margin: "32px 0",
        }}
        separator=">"
        items={[
          {
            key: "home",
            title: "Trang chủ",
            href: "/",
          },
          {
            key: "timeline",
            title: "Tư liệu",
            href: "/timeline",
          },
        ]}
      />
    );
  };

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const eventId = params.get("eventId");
  // console.log("id baiviet:", eventId);
  let data = JSON.stringify({
    id: eventId,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:8084/general/article",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const handleOnClick = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");
    try {
      if (user.role === "MEMBER") {
        navigate(`/quizdt?hashtagId=${hashtagId}`);
      } else if (user.role === "ADMIN") {
        navigate("/login");
      }
    } catch (error) {
      showModal();
    }
  };

  const [hashtagId, setHastagId] = useState();
  const [content, setContent] = useState("");

  const [comments, setComments] = useState([]);
  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const { title, content, hashtag, commentList } = response.data;
      const hashtagID = hashtag.id;
      setHastagId(hashtagID);
      setContent(content);
      // const listCommentName = commentList.map((e) => e.userName);
      // const listCommentContent = commentList.map((e) => e.content);

      // setCommentName(listCommentName);
      // setCommentContent(listCommentContent);
      const commentData = commentList.map((e) => ({
        commentId: e.id,
        userId: e.userId,
        name: e.userName,
        content: e.content,
      }));

      setComments(commentData);
      // console.log(commentData);

      // Gán dữ liệu cho các phần tử trong giao diện
      document.getElementById("titleElement").textContent = title;
      // document.getElementById("imageElement").src = image;
      // document.getElementById("commentNameElement").textContent = commentName;
      // document.getElementById("commentContentElement").textContent =
      //   commentContent;
    })
    .catch((error) => {
      console.log(error);
    });

  const renderArticleDetails = () => {
    return (
      <div className={styles.article_detail}>
        <span className={styles.title}>
          <h2 id="titleElement"></h2>
        </span>
        {/* <img
          className={styles.image}
          id="imageElement"
        /> */}
        <span className={styles.text}>{ReactHTMLParser(content)}</span>

        {/* <span className={styles.text} id="contentElement"></span> */}
      </div>
    );
  };
  // create comment
  const [inputComment, setInputComment] = useState("");
  const form = Form.useForm();
  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };
  const handleSubmitClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");

    let commentData = {
      userId: user.id,
      articleId: eventId,
      content: inputComment,
    };
    console.log(commentData);

    const response = await fetch(
      "http://localhost:8084/member/create-comment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
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
      message.success("Viết bình luận thành công");
      form;
    }
  };

  //xóa comment và render comments
  const renderComments = () => {
    // console.log(user.id);
    const user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(comments);
    const handleDeleteComment = async (commentId) => {
      const token = sessionStorage.getItem("jwtToken");

      try {
        // Call the API to delete the comment with the given commentId
        const response = await fetch(
          "http://localhost:8084/member/delete-comment",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: user.id,
              commentId: commentId,
            }),
          }
        );

        if (!response.ok) {
          // Handle error if the comment couldn't be deleted
          notification.error({
            message: "Error",
            description: "Unable to delete the comment.",
          });
        } else {
          // Comment deleted successfully, update the comment list
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.commentId !== commentId)
          );

          notification.success({
            message: "Success",
            description: "Comment deleted successfully.",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        {comments.map((comment, index) => (
          <div
            key={index}
            className={styles.commentIndex}
            style={{
              borderRadius: 5,
              padding: 10,
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <span className={styles.text}>
              <div
                style={{
                  color: "#BA161C",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {comment.name}:
              </div>
              <div>{comment.content}</div>
            </span>
            {comment.userId === user.id && (
              <button
                style={{
                  borderRadius: 5,
                  height: "30px",
                  padding: 5,
                  backgroundColor: "#BA161C",
                  color: "white",
                  border: "none",
                }}
                onClick={() => handleDeleteComment(comment.commentId)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <div className={styles.single_article}>
        <div className="container-custom">
          <div className={styles.wrapper}>
            <div className={styles.article_content}>
              <BreadcrumbArticle />
              {renderArticleDetails()}
              <div className={styles.btn}>
                <Button onClick={handleOnClick}>Quizz thôi!!</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.comment}>
        <h3>Bình luận</h3>
        <div
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginRight: "6px",
            }}
          >
            <textarea
              style={{
                borderRadius: 5,
                width: "1200px",
                height: "80px",
                padding: 3,
              }}
              type="text"
              placeholder="Viết bình luận"
              value={inputComment}
              onChange={handleCommentChange}
            />
          </div>
          <div>
            <button
              style={{
                borderRadius: 5,
                height: "40px",
                width: "150px",
                padding: 5,
                backgroundColor: "#BA161C",
                color: "white",
                border: "none",
              }}
              onClick={handleSubmitClick}
            >
              Gửi bình luận
            </button>
          </div>
        </div>

        {renderComments()}
        {/* <span
          className={styles.text}
          id="commentNameElement"
        ></span>
        <span
          className={styles.text}
          id="commentContentElement"
        ></span> */}
      </div>
      <Modal
        title="Thông báo"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleModalCancel}
          >
            Cancel
          </Button>,
          <Button
            key="login"
            type="primary"
            onClick={handleModalOk}
          >
            Đăng nhập
          </Button>,
        ]}
      >
        <p>Bạn phải đăng nhập trước khi làm quiz</p>
      </Modal>

      {/* <Divider style={{ margin: 10 }} />
                <div
                  className="comment"
                  style={{
                    display: "flex",
                    alignItems: "space",
                    justifyContent: "space-around",
                  }}
                >
                  <Avatar size={60} icon={<UserOutlined />} />
                  <input
                    //   placeholder="Hãy viết bình luận của bạn..."
                    style={{ width: "80%", height: "80px" }}
                  /> */}
      {/* </div> */}
      {/* </div>
            </div>
          </Col>

          <Col
            md={4}
            xs={0}
            offset={1}
          >
            <Space
              direction={"vertical"}
              size={500}
            >
              <Row gutter={[0, 30]}></Row>
              <Row>
                <Divider
                  orientation="left"
                  style={{ margin: "10px 0" }}
                >
                  <h6>Tham khảo</h6>
                </Divider>
                <div className="homepage-ending-doc-content">
                  <div className="doc">
                    <p> &gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                </div>
              </Row>
            </Space>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default ArticleDetails;
