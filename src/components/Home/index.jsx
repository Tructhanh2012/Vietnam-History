import { Card, Col, Divider, Pagination, Row } from "antd";
import "./home.scss";
import Meta from "antd/es/card/Meta";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import LearnByMap from "../Map";
import BlogCard from "./BlogCard";
import { getOutstandingEvent } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

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

  //========================================
  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const navigate = useNavigate();
  const handleRedirectEvent = (event) => {
    const slug = convertSlug(event.eventName);
    const eventId = event.eventId;
    navigate(`/singleEvent/${slug}?eventId=${eventId}`);
    // navigate(`/singleEvent/${slug}?${events.eventId}`);
  };
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
                  <div
                    className="wrapper"
                    key={item.eventId}
                    onClick={() => handleRedirectEvent(item)}
                  >
                    <Link to={`/singleEvent/${convertSlug(item.eventName)}`}>
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
                    </Link>
                  </div>
                );
              })}
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
            <h6>Top các hào kiệt</h6>
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
              <Col offset={2}>
                <BlogCard />
              </Col>
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
