import { Avatar, Breadcrumb, Button, Col, Divider, Rate, Row } from "antd";
import "./article.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ArticleDetails = () => {
  const navigate = useNavigate();
  const BreadcrumbArticle = () => {
    return (
      <Breadcrumb
        style={{
          marginLeft: 30,
          padding: 20,
          paddingBottom: 40,
          paddingTop: 44,
        }}
        separator=">"
        items={[
          {
            // key: "home",
            title: "Trang chủ",
            href: "/",
          },
          {
            // key: "timeline",
            title: "Tư liệu",
            // href: "/",
          },
        ]}
      />
    );
  };

  let data = JSON.stringify({
    id: 3,
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

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      const { title, image, content } = response.data;

      // Gán dữ liệu cho các phần tử trong giao diện
      document.getElementById("titleElement").textContent = title;
      document.getElementById("imageElement").src = image;
      document.getElementById("contentElement").textContent = content;
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <Divider orientation="left">
        <BreadcrumbArticle style={{ padding: "44px 20px 40px 0" }} />
      </Divider>
      <div className="single_article">
        <span className="title">
          <h2 id="titleElement"></h2>
        </span>
        <img id="imageElement" src="" alt="Article Image" />
        <span id="contentElement"></span>
      </div>

      <Button onClick={() => navigate("/quizdt")}>Quizz thôi!!</Button>

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
