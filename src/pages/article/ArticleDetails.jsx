import {
  Anchor,
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Image,
  Rate,
  Row,
} from "antd";
// import "./article.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./style.module.scss";
import { useState } from "react";

const ArticleDetails = () => {
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

  const [hashtagId, setHastagId] = useState();

  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const { title, image, content, hashtagEntity } = response.data;
      const hashtagID = hashtagEntity.id;
      setHastagId(hashtagID);
      // Gán dữ liệu cho các phần tử trong giao diện
      document.getElementById("titleElement").textContent = title;
      document.getElementById("imageElement").src = image;
      document.getElementById("contentElement").textContent = content;
    })
    .catch((error) => {
      console.log(error);
    });

  const items = [
    {
      key: "titleElement",
      href: "#titleElement",
      title: "Tiêu đề",
    },
    {
      key: "imageElement",
      href: "#imageElement",
      title: "Ảnh",
    },
    {
      key: "contentElement",
      href: "#contentElement",
      title: "Nội dung",
    },
  ];

  const handleOnClick = () => {
    navigate(`/quizdt?hashtagId=${hashtagId}`);
  };

  const renderArticleDetails = () => {
    return (
      <div className={styles.article_detail}>
        <span className={styles.title}>
          <h2 id="titleElement"></h2>
        </span>
        <img className={styles.image} id="imageElement" alt="Article Image" />
        <span className={styles.text} id="contentElement"></span>
      </div>
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
            <div className={styles.anchor}>
              <Col>
                <Anchor items={items} />
              </Col>
            </div>
          </div>
        </div>
      </div>

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
