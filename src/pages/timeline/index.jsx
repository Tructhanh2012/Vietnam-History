import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataHistoryTimeline } from "../timeline/data";
import TimelineComponent from "../../components/DongSuKien";
import { dataTextHistoryTimeline } from "./dataText";
import "./timeline.scss";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { Pagination } from "antd";

import { Breadcrumb, Col, Divider, Modal, Row, Timeline } from "antd";
import { BsFillBookmarkFill } from "react-icons/bs";
import { callTimelineEvent } from "../../services/api";
import { Link } from "react-router-dom";

function SampleNextArrow({ onClick }) {
  return (
    <div className="arrow arrow-right " onClick={onClick}>
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
          key: "home",
          title: "Trang chủ",
          href: "/",
        },
        {
          key: "timeline",
          title: "Dòng thời gian",
          href: "/timeline",
        },
      ]}
    />
  );
};

const TimelinePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [timelineId, setTimelineId] = useState();
  const [data, setData] = useState([]);
  const [eventName, setEventName] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalItems = 80;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleTitleClick = (timeline) => {
    // setSelectedTimeline(timeline);
    const id = timeline.id;
    setTimelineId(id); //

    setModalVisible(true);
  };

  useEffect(() => {
    // console.log("timelineid", timelineId);
    if (timelineId) {
      const getTimelineEvent = async () => {
        const res = await callTimelineEvent(timelineId);
        console.log("data ne", res.data);
        const name = res.data;
        // const title = res.map((item) => item.title);
        setEventName(name);
        console.log("eventName", eventName);
        setData(res);
      };

      getTimelineEvent();
    }
  }, [timelineId]);

  const closeModal = () => {
    setModalVisible(false);
  };
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

  return (
    <>
      <BreadcrumbRank />

      <div className="Timeline">
        <div className="Timeline-card">
          <Slider {...settings}>
            {dataHistoryTimeline.map((item) => (
              <div className="card">
                <div className="card-top">
                  <h6 key={item.id} onClick={() => handleTitleClick(item)}>
                    {item.title}
                  </h6>
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
          <Modal
            // title={selectedTimeline?.title}
            title="Các sự kiện nổi bật trong thời kỳ:"
            open={modalVisible}
            onCancel={closeModal}
            footer={null}
          >
            <Timeline style={{ marginTop: 25 }} key={timelineId}>
              {eventName &&
                eventName.map((item) => (
                  <Timeline.Item key={item.id}>
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item.title}
                    </Link>
                  </Timeline.Item>
                ))}
            </Timeline>
          </Modal>
        </div>
      </div>

      <div className="timeline-content-textbelow">
        <Row>
          <Col span={14}>
            <h1>Dòng Lịch Sử</h1>
            <div>
              {dataTextHistoryTimeline
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item) => (
                  <div key={item.id}>
                    <div>
                      <h2>{item.title}</h2>
                    </div>
                    <div>
                      <p className="timeline-content-textbelow-detail">
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
              className="pagination-timeline"
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
