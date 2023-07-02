import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Rate,
  Row,
  Space,
} from "antd";
import "./article.scss";
import { callGetSingleEvent } from "../../services/api";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticleDetails = () => {
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
  const [events, setEvents] = useState(null);
  let location = useLocation();

  let params = new URLSearchParams(location.search);
  const eventId = params.get("eventId");
  // const eventId = 1;

  // const eventId = location.state.eventId;
  const fetchContent = async (eventId) => {
    console.log("log eventID: ", eventId);
    const res = await callGetSingleEvent(eventId);
    console.log("check res single page:", res);
    if (res && res?.eventForm) {
      let raw = res.eventForm;
      console.log("rew", raw);
      setEvents(raw);
    }
  };
  useEffect(() => {
    console.log("log eventId: ", eventId);

    fetchContent(eventId);
  }, [eventId]);

  return (
    <>
      <Divider orientation="left">
        <BreadcrumbArticle />
      </Divider>
      <div className="article-container">
        <Row gutter={[20, 20]}>
          <Col md={17} xs={24} offset={1}>
            <div className="title" style={{ textAlign: "center" }}>
              <h2>{events.eventName}</h2>
            </div>

            <div className="text">
              <p>{events.content}</p>
              <div className="image" style={{ width: "70%" }}>
                <img
                  className="image_content"
                  style={{
                    width: "100%",
                  }}
                  src={events.image}
                />
              </div>
              <p>{events.content} </p>
              <div className="article_comment ">
                {/* <Divider /> */}
                <div className="d-flex justify-content-between">
                  <Rate />
                  <Button>Quizz thôi!!</Button>
                </div>
                <Divider style={{ margin: 10 }} />
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
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col md={4} xs={0} offset={1}>
            <Space direction={"vertical"} size={500}>
              <Row gutter={[0, 30]}></Row>
              <Row>
                <h6>Tư liệu</h6>
                <Divider style={{ margin: "5px 0" }} />
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
      </div>
    </>
  );
};

export default ArticleDetails;
