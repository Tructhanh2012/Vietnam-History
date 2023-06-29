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
import TimelineComponent from "../../components/DongSuKien";
import ReactPaginate from "react-paginate";
import { Pagination } from "antd";
import { Breadcrumb, Col, Divider, Row, Table } from "antd";
import { BsFillBookmarkFill } from "react-icons/bs";
import { dataTextHistoryTimeline } from "./dataText";

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
          title: "Trang chủ",
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
    appendDots: (dots) => (
      <div className="timeline-append-dots">
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  // const handlePageClick = () => {};
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalItems = 100;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
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
      <div className="timeline-content-textbelow">
        <Row>
          <Col span={14}>
            <h1>Dòng Lịch Sử</h1>
            <div>
              {dataHistoryTimeline
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item) => (
                  <div key={item.id}>
                    <div>
                      <h2>{item.title}</h2>
                    </div>
                    <div>
                      <p>
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
            </div>
            <Pagination
              total={totalItems}
              current={currentPage}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </Col>
          <Col span={2}></Col>

          <Col span={5}>
            <TimelineComponent />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TimelinePage;
