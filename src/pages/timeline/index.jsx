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
import { Link, useNavigate } from "react-router-dom";

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
  const [articleId, setArticleId] = useState();
  const pageSize = 6;
  const totalItems = 105;

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

        const id = eventName.id;
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
    console.log("event", event);
    const slug = convertSlug(event.title);
    const eventId = event.id;
    navigate(`/singleEvent/${slug}?eventId=${eventId}`);
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
                  <h6
                    key={item.id}
                    onClick={() => handleTitleClick(item)}
                  >
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
            <Timeline
              style={{ marginTop: 25 }}
              key={timelineId}
            >
              {eventName &&
                eventName.map((item) => (
                  <Timeline.Item
                    key={item.id}
                    onClick={() => handleRedirectEvent(item)}
                  >
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
