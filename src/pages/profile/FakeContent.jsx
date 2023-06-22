import { Col, Row } from "antd";
import { BsFillBookmarkFill } from "react-icons/bs";
import "./fakecontent.scss";
const FakeContent = () => {
  return (
    <>
      <Row gutter={30}>
        <Col md={18} offset={2}></Col>
        <div className="container">
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
                  Trận Bản Đông là một trận đánh then chốt của Quân đội Nhân dân
                  Việt Nam trong Chiến dịch Đường 9 - Nam Lào, diễn ra từ ngày 8
                  tháng 2 đến ngày 20 tháng 3 năm 1971. Ngày 8 tháng 2 năm 1971,
                  mở màn Chiến dịch Lam Sơn 719, mũi chủ yếu của Quân lực Việt
                  Nam Cộng hòa do chiến đoàn đặc nhiệm gồm Lữ đoàn dù số 1, hai
                  Thiết đoàn 11, 17 tiến công theo trục Đường 9 bằng cơ giới và
                  thiết giáp, trong khi Tiểu đoàn 9 .....
                </p>
              </div>
              <div className="save-icon">
                <BsFillBookmarkFill
                // onClick={() => handleOnClickIsSave()}
                // style={{ color: isSaved ? "#963B3E" : "black" }}
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
                  Trận Bản Đông là một trận đánh then chốt của Quân đội Nhân dân
                  Việt Nam trong Chiến dịch Đường 9 - Nam Lào, diễn ra từ ngày 8
                  tháng 2 đến ngày 20 tháng 3 năm 1971. Ngày 8 tháng 2 năm 1971,
                  mở màn Chiến dịch Lam Sơn 719, mũi chủ yếu của Quân lực Việt
                  Nam Cộng hòa do chiến đoàn đặc nhiệm gồm Lữ đoàn dù số 1, hai
                  Thiết đoàn 11, 17 tiến công theo trục Đường 9 bằng cơ giới và
                  thiết giáp, trong khi Tiểu đoàn 9 .....
                </p>
              </div>
              <div className="save-icon">
                <BsFillBookmarkFill
                // onClick={() => handleOnClickIsSave()}
                // style={{ color: isSaved ? "#963B3E" : "black" }}
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
                  Trận Bản Đông là một trận đánh then chốt của Quân đội Nhân dân
                  Việt Nam trong Chiến dịch Đường 9 - Nam Lào, diễn ra từ ngày 8
                  tháng 2 đến ngày 20 tháng 3 năm 1971. Ngày 8 tháng 2 năm 1971,
                  mở màn Chiến dịch Lam Sơn 719, mũi chủ yếu của Quân lực Việt
                  Nam Cộng hòa do chiến đoàn đặc nhiệm gồm Lữ đoàn dù số 1, hai
                  Thiết đoàn 11, 17 tiến công theo trục Đường 9 bằng cơ giới và
                  thiết giáp, trong khi Tiểu đoàn 9 .....
                </p>
              </div>
              <div className="save-icon">
                <BsFillBookmarkFill
                // onClick={() => handleOnClickIsSave()}
                // style={{ color: isSaved ? "#963B3E" : "black" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default FakeContent;
