import {
  Popover,
  Breadcrumb,
  Button,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import CommentArticle from "../../components/Comment";
import { Colors } from "chart.js";

const renderComments = (comments) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("user ne", user);

  // Function to delete a comment
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
      console.log(commentId);
      if (!response.ok) {
        // Handle error if the comment couldn't be deleted
        notification.error({
          message: "Error",
          description: "Unable to delete the comment.",
        });
      } else {
        // Comment deleted successfully, update the comment list
        setComments((prevComments) =>
          prevComments.filter((c) => c.commentId !== commentId)
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

  const buttonDelete = (commentId) => (
    <button
      style={{
        borderRadius: 5,
        height: "30px",
        padding: 5,
        backgroundColor: "#BA161C",
        color: "white",
        border: "none",
      }}
      onClick={() => handleDeleteComment(commentId)}
    >
      Delete
    </button>
  );

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
          {user && user.role === "MEMBER" && comment.userId === user.id && (
            // Show Popover only for members if comment.userId matches the user.id
            <Popover
              placement="bottom"
              content={() => buttonDelete(comment.commentId)}
              trigger="click"
            >
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faEllipsis}
              />
            </Popover>
          )}
          {(!user || (user && user.role !== "MEMBER")) && (
            // Show the comment content without the ellipsis icon for guests or non-members
            <span style={{ cursor: "not-allowed" }}>
              {/* Optionally, you can display a message like "Login to perform actions" */}
            </span>
          )}
        </div>
      ))}
    </>
  );
};

const savePreviousPage = () => {
  const previousPage = window.location.pathname + window.location.search;
  console.log("pathname ne:", window.location.pathname);
  console.log("search ne:", window.location.search);
  sessionStorage.setItem("previousPage", previousPage);
};

const ArticleDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      setModalVisible(true);
    } else {
      navigate(`/quizdt?hashtagId=${hashtagId}`);
    }
  };

  const handleModalOk = () => {
    const previousPage = sessionStorage.getItem("previousPage");
    // navigate("/login");
    if (previousPage) {
      navigate(previousPage); // Navigate người dùng trở lại trang trước
    } else {
      navigate("/"); // Hoặc có thể navigate về trang chủ nếu không có trang trước đó
    }
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
            href: "/document",
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
      // if (user.role === "MEMBER") {
      //   //   savePreviousPage();
      //   navigate(`/quizdt?hashtagId=${hashtagId}`);
      // }
      // } else if (user.role === "ADMIN") {
      //   navigate("/login");
      // } else
      if (user == null) {
        // navigate(`/login?modalVisible=true`);
        savePreviousPage();
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

    if (!user) {
      // If user is null, show the modal
      showModal();
      return;
    }

    let commentData = {
      userId: user.id,
      articleId: eventId,
      content: inputComment,
    };

    try {
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

      if (!response.ok) {
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: "Vui lòng thử lại sau!",
        });
      } else {
        const data = await response.json();
        console.log("data ne:", data);
        message.success("Viết bình luận thành công");
        window.location.reload(); // Reload the page after successful comment creation
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: "Vui lòng thử lại sau!",
      });
    }
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
                <h3 style={{ marginRight: "20px" }}>
                  Kiểm tra kiến thức bằng cách làm quiz
                </h3>

                <Button
                  // onClick={handleOnClick}
                  onClick={showModal}
                >
                  Quiz
                </Button>
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
                width: "1250px",
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
                marginTop: "45px",
                height: "35px",
                width: "50px",
                padding: 5,
                backgroundColor: "#BA161C",
                color: "white",
                border: "none",
              }}
              onClick={handleSubmitClick}
            >
              Gửi
            </button>
          </div>
        </div>

        {renderComments(comments)}
      </div>
      <Modal
        title="Thông báo"
        visible={modalVisible}
        // onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleModalCancel}
          >
            Cancel
          </Button>,
          <Button
            // key="logn"
            type="primary"
            // onClick={handleModalOk}
            onClick={handleOnClick}
          >
            Đăng nhập
          </Button>,
        ]}
      >
        <p>Bạn phải đăng nhập trước khi sử dụng chức năng này</p>
      </Modal>
    </>
  );
};

export default ArticleDetails;
