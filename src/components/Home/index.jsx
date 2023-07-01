import { Card, Col, Divider, Pagination, Row } from "antd";
import "./home.scss";
import Meta from "antd/es/card/Meta";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import LearnByMap from "../Map";
import BlogCard from "./BlogCard";
import { getOutstandingEvent } from "../../services/api";

const Home = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [outstandList, setOutstandList] = useState([]);
  const handleOnClickIsSave = () => {
    setIsSaved(true);
  };

  const callGetOutstandingEvent = async () => {
    const res = await getOutstandingEvent();
    if (res && res?.listOutstanding) {
      const listOutstanding = res.listOutstanding;
      setOutstandList(listOutstanding);
    }
  };

  useEffect(() => {
    callGetOutstandingEvent();
  }, []);
  return (
    <>
      <div className="homepage">
        {/* <div className="homepage-container"> */}

        <div className="homepage-banner">
          <div className="map">
            <LearnByMap />
          </div>
        </div>

        <div className="hompage-article">
          <Divider orientation="left">
            <h6>Bài viết nổi bật</h6>
          </Divider>

          <Row className="homepage-article-content">
            <div className="article">
              {outstandList?.map((item, index) => {
                return (
                  <div className="wrapper" key={item.eventId}>
                    <div className="image">
                      <img src={item.thumbnail} alt="thumbnail" />
                    </div>
                    <div className="text">
                      <h5>{item.eventName}</h5>
                      <p>{item.content}</p>
                    </div>
                    <div className="save-icon">
                      <BsFillBookmarkFill
                        onClick={() => handleOnClickIsSave()}
                        style={{ color: isSaved ? "#963B3E" : "black" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            ;
            <div className="article">
              <div className="wrapper">
                <div className="image">
                  <img
                    className="img"
                    src="https://nguoikesu.com/images/wiki/nha-nguyen/f3ddf4ba5ac21a0f1ab37de7ccf99789.jpg"
                  />
                </div>
                <div className="text">
                  <h5>Bản đồ đối chiếu triều đại Việt Nam và Trung Quốc</h5>
                  <p>
                    Dưới đây chúng tôi giới thiệu Bảng đối chiếu các triều đại
                    Việt Nam với năm dương lịch và các triều đại Trung Quốc là
                    nước láng giềng
                  </p>
                </div>
                <div className="save-icon">
                  <BsFillBookmarkFill
                    onClick={() => handleOnClickIsSave()}
                    style={{ color: isSaved ? "#963B3E" : "black" }}
                  />
                </div>
              </div>
            </div>
            <div className="article">
              <div className="wrapper">
                <div className="image">
                  <img
                    className="img"
                    src="https://nguoikesu.com/images/wiki/nha-nguyen/f3ddf4ba5ac21a0f1ab37de7ccf99789.jpg"
                  />
                </div>
                <div className="text">
                  <h5>Bản đồ đối chiếu triều đại Việt Nam và Trung Quốc</h5>
                  <p>
                    Dưới đây chúng tôi giới thiệu Bảng đối chiếu các triều đại
                    Việt Nam với năm dương lịch và các triều đại Trung Quốc là
                    nước láng giềng
                  </p>
                </div>
                <div className="save-icon">
                  <BsFillBookmarkFill
                    onClick={() => handleOnClickIsSave()}
                    style={{ color: isSaved ? "#963B3E" : "black" }}
                  />
                </div>
              </div>
            </div>
            <div className="article">
              <div className="wrapper">
                <div className="image">
                  <img
                    className="img"
                    src="https://nguoikesu.com/images/wiki/nha-nguyen/f3ddf4ba5ac21a0f1ab37de7ccf99789.jpg"
                  />
                </div>
                <div className="text">
                  <h5>Bản đồ đối chiếu triều đại Việt Nam và Trung Quốc</h5>
                  <p>
                    Dưới đây chúng tôi giới thiệu Bảng đối chiếu các triều đại
                    Việt Nam với năm dương lịch và các triều đại Trung Quốc là
                    nước láng giềng
                  </p>
                </div>
                <div className="save-icon">
                  <BsFillBookmarkFill
                    onClick={() => handleOnClickIsSave()}
                    style={{ color: isSaved ? "#963B3E" : "black" }}
                  />
                </div>
              </div>
            </div>
          </Row>
        </div>

        <div className="homepage-month-article">
          <Divider orientation="left">
            <h6>Blog cá nhân</h6>
          </Divider>
          <div className="homepage-month-article-content">
            <Row
              // style={(padding = 10)}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              className="cuztomize-row"
            >
              {/* <Col
                className="gutter-row"
                span={5}
                offset={2}
              >
                <Card
                  // style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
                    />
                  }
                >
                  <Meta
                    title="Tuyên ngôn độc lập Dân chủ Cộng hòa"
                    //description="This is the description"
                  />
                </Card>
              </Col>
              <Col
                className="gutter-row"
                span={5}
              >
                <Card
                  //style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
                    />
                  }
                >
                  <Meta
                    title="Tuyên ngôn độc lập Dân chủ Cộng hòa"
                    //description="This is the description"
                  />
                </Card>
              </Col>
              <Col
                className="gutter-row"
                span={5}
              >
                <Card
                  // style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
                    />
                  }
                >
                  <Meta
                    title="Tuyên ngôn độc lập Dân chủ Cộng hòa"
                    //description="This is the description"
                  />
                </Card>
              </Col>
              <Col
                className="gutter-row"
                span={5}
              >
                <Card
                  // style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
                    />
                  }
                >
                  <Meta
                    title="Tuyên ngôn độc lập Dân chủ Cộng hòa"
                    //description="This is the description"
                  />
                </Card>
              </Col> */}
              <BlogCard />
            </Row>
          </div>
        </div>

        <div className="homepage-ending">
          <Row>
            <Col md={18} xs={24} className="homepage-ending-rating">
              <Divider orientation="left">
                <h6>Bài viết trong tháng</h6>
              </Divider>

              <Row className="hompage-ending-rating-content">
                <div className="article">
                  <div className="wrapper">
                    <div className="image">
                      <img
                        className="img"
                        src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQeIxdyi812Cq3neI9VzsMm2E0AJQ91LVUw_t6EGJ3T0gs8mDpy"
                      />
                    </div>
                    <div className="text">
                      <h5>Trận Bản Đông năm 1971</h5>
                      <p>
                        Trận Bản Đông là một trận đánh then chốt của Quân đội
                        Nhân dân Việt Nam trong Chiến dịch Đường 9 - Nam Lào,
                        diễn ra từ ngày 8 tháng 2 đến ngày 20 tháng 3 năm 1971.
                        Ngày 8 tháng 2 năm 1971, mở màn Chiến dịch Lam Sơn 719,
                        mũi chủ yếu của Quân lực Việt Nam Cộng hòa do chiến đoàn
                        đặc nhiệm gồm Lữ đoàn dù số 1, hai Thiết đoàn 11, 17
                        tiến công theo trục Đường 9 bằng cơ giới và thiết giáp,
                        trong khi Tiểu đoàn 9 .....
                      </p>
                    </div>
                    <div className="save-icon">
                      <BsFillBookmarkFill
                        onClick={() => handleOnClickIsSave()}
                        style={{ color: isSaved ? "#963B3E" : "black" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="article">
                  <div className="wrapper">
                    <div className="image">
                      <img
                        className="img"
                        src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQeIxdyi812Cq3neI9VzsMm2E0AJQ91LVUw_t6EGJ3T0gs8mDpy"
                      />
                    </div>
                    <div className="text">
                      <h5>Trận Bản Đông năm 1971</h5>
                      <p>
                        Trận Bản Đông là một trận đánh then chốt của Quân đội
                        Nhân dân Việt Nam trong Chiến dịch Đường 9 - Nam Lào,
                        diễn ra từ ngày 8 tháng 2 đến ngày 20 tháng 3 năm 1971.
                        Ngày 8 tháng 2 năm 1971, mở màn Chiến dịch Lam Sơn 719,
                        mũi chủ yếu của Quân lực Việt Nam Cộng hòa do chiến đoàn
                        đặc nhiệm gồm Lữ đoàn dù số 1, hai Thiết đoàn 11, 17
                        tiến công theo trục Đường 9 bằng cơ giới và thiết giáp,
                        trong khi Tiểu đoàn 9 .....
                      </p>
                    </div>
                    <div className="save-icon">
                      <BsFillBookmarkFill
                        onClick={() => handleOnClickIsSave()}
                        style={{ color: isSaved ? "#963B3E" : "black" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="article">
                  <div className="wrapper">
                    <div className="image">
                      <img
                        className="img"
                        src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQeIxdyi812Cq3neI9VzsMm2E0AJQ91LVUw_t6EGJ3T0gs8mDpy"
                      />
                    </div>
                    <div className="text">
                      <h5>Trận Bản Đông năm 1971</h5>
                      <p>
                        Trận Bản Đông là một trận đánh then chốt của Quân đội
                        Nhân dân Việt Nam trong Chiến dịch Đường 9 - Nam Lào,
                        diễn ra từ ngày 8 tháng 2 đến ngày 20 tháng 3 năm 1971.
                        Ngày 8 tháng 2 năm 1971, mở màn Chiến dịch Lam Sơn 719,
                        mũi chủ yếu của Quân lực Việt Nam Cộng hòa do chiến đoàn
                        đặc nhiệm gồm Lữ đoàn dù số 1, hai Thiết đoàn 11, 17
                        tiến công theo trục Đường 9 bằng cơ giới và thiết giáp,
                        trong khi Tiểu đoàn 9 .....
                      </p>
                    </div>
                    <div className="save-icon">
                      <BsFillBookmarkFill
                        onClick={() => handleOnClickIsSave()}
                        style={{ color: isSaved ? "#963B3E" : "black" }}
                      />
                    </div>
                  </div>
                </div>
              </Row>

              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  defaultCurrent={6}
                  total={500}
                  responsive
                  style={{ margin: "25px" }}
                />
              </Row>
            </Col>

            <Col
              sm={0}
              xs={0}
              md={4}
              offset={1}
              className="homepage-ending-doc"
            >
              <Divider orientation="left">
                <h6>Tư liệu</h6>
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
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
