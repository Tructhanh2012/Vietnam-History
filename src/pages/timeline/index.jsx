import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataHistoryTimeline } from "../timeline/data";
import "./timeline.scss";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import { Breadcrumb, Col, Divider, Row } from "antd";
import { BsFillBookmarkFill } from "react-icons/bs";

function SampleNextArrow({ onClick }) {
  return (
    <div
      className="arrow arrow-right "
      onClick={onClick}
    >
      <MdOutlineArrowForwardIos />
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div
      //
      className="arrow arrow-left"
      onClick={onClick}
    >
      <MdOutlineArrowBackIos />
    </div>
  );
}

const BreadcrumbRank = () => {
  return (
    <Breadcrumb
      style={{ marginLeft: 30, padding: 20, paddingBottom: 0 }}
      separator=">"
      items={[
        {
          // key: "home",
          title: "Home",
          href: "/",
        },
        {
          // key: "timeline",
          title: "Dòng thời gian",
          href: "/timeline",
        },
      ]}
    />
  );
};
const TimelinePage = () => {
  // const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  // const dotsPerPage = 4; // Số lượng dots hiển thị trên mỗi trang

  // const totalDots = 24; // Tổng số dots

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // customPaging: (index) => (
    //   <div className={`custom-dots ${shouldShowDot(index) ? "visible" : ""}`}>
    //     <span onClick={() => handleDotClick(index)}>{index + 1}</span>
    //   </div>
    // ),
    // appendDots: (dots) => (
    //   <div
    //     className="custom-dots"
    //     // style={{
    //     //   backgroundColor: "#ddd",
    //     //   borderRadius: "10px",
    //     //   padding: "10px",
    //     // }}
    //   >
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <div
    //   // style={{
    //   //   width: "30px",
    //   //   color: "blue",
    //   //   border: "1px blue solid",
    //   // }}
    //   >
    //     {i + 1}
    //   </div>
    // ),
  };
  // const shouldShowDot = (index) => {
  //   const startDotIndex = currentPage * dotsPerPage;
  //   const endDotIndex = startDotIndex + dotsPerPage - 1;
  //   return index >= startDotIndex && index <= endDotIndex && index < totalDots;
  // };

  // const handleDotClick = (index) => {
  //   const clickedPageIndex = Math.floor(index / dotsPerPage);
  //   setCurrentPage(clickedPageIndex);
  // };

  return (
    <>
      <BreadcrumbRank />

      <div className="Timeline">
        <div className="Timeline-card">
          <Slider {...settings}>
            {dataHistoryTimeline.map((item) => (
              <div className="card">
                <div className="card-top">
                  <h6>{item.title}</h6>
                </div>
                <div className="card-bottom">
                  <p>
                    {/* {item.content} */}
                    {item.content.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <></>
      <div className="article">
        <Divider
          orientation="left"
          style={{ margin: 30 }}
        >
          <h6>Bài viết nổi bật</h6>
        </Divider>
        <Row
          className="text"
          gutter={{ xs: 8, sm: 16, md: 20, lg: 32 }}
        >
          <Col
            md={20}
            offset={1}
            xs={22}
            sm={22}
          >
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
                    Trận Bản Đông là một trận đánh then chốt của Quân đội Nhân
                    dân Việt Nam trong Chiến dịch Đường 9 - Nam Lào, diễn ra từ
                    ngày 8 tháng 2 đến ngày 20 tháng 3 năm 1971. Ngày 8 tháng 2
                    năm 1971, mở màn Chiến dịch Lam Sơn 719, mũi chủ yếu của
                    Quân lực Việt Nam Cộng hòa do chiến đoàn đặc nhiệm gồm Lữ
                    đoàn dù số 1, hai Thiết đoàn 11, 17 tiến công theo trục
                    Đường 9 bằng cơ giới và thiết giáp, trong khi Tiểu đoàn 9
                    .....
                  </p>
                </div>
                <div className="save-icon">
                  <BsFillBookmarkFill />
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
                    Trận Bản Đông là một trận đánh then chốt của Quân đội Nhân
                    dân Việt Nam trong Chiến dịch Đường 9 - Nam Lào, diễn ra từ
                    ngày 8 tháng 2 đến ngày 20 tháng 3 năm 1971. Ngày 8 tháng 2
                    năm 1971, mở màn Chiến dịch Lam Sơn 719, mũi chủ yếu của
                    Quân lực Việt Nam Cộng hòa do chiến đoàn đặc nhiệm gồm Lữ
                    đoàn dù số 1, hai Thiết đoàn 11, 17 tiến công theo trục
                    Đường 9 bằng cơ giới và thiết giáp, trong khi Tiểu đoàn 9
                    .....
                  </p>
                </div>
                <div className="save-icon">
                  <BsFillBookmarkFill />
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
                    Trận Bản Đông là một trận đánh then chốt của Quân đội Nhân
                    dân Việt Nam trong Chiến dịch Đường 9 - Nam Lào, diễn ra từ
                    ngày 8 tháng 2 đến ngày 20 tháng 3 năm 1971. Ngày 8 tháng 2
                    năm 1971, mở màn Chiến dịch Lam Sơn 719, mũi chủ yếu của
                    Quân lực Việt Nam Cộng hòa do chiến đoàn đặc nhiệm gồm Lữ
                    đoàn dù số 1, hai Thiết đoàn 11, 17 tiến công theo trục
                    Đường 9 bằng cơ giới và thiết giáp, trong khi Tiểu đoàn 9
                    .....
                  </p>
                </div>
                <div className="save-icon">
                  <BsFillBookmarkFill />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* 
        <Row style={{ display: "flex", justifyContent: "center" }}>
           <Pagination
            defaultCurrent={6}
            total={500}
            responsive
            style={{ margin: "25px" }}
          />
       </Row>  */}
      </div>
    </>
  );
};

export default TimelinePage;
