import React from "react";
import { useParams } from "react-router-dom";
import historyData from "./database";
import { Col, Divider, Form, Input, Row, message, Breadcrumb } from "antd";
import "./eventDetail.scss";
import TimelineComponent from ".";

const BreadcrumbRank = () => {
  return (
    <Breadcrumb
      style={{ marginLeft: 30, padding: 20, paddingBottom: 0 }}
      separator=">"
      items={[
        {
          // key: "home",
          title: "Trang chủ",
          path: "/",
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

const EventDetail = () => {
  const { idHistory } = useParams();
  const event = historyData.find(
    (event) => event.idHistory === parseInt(idHistory)
  );

  if (!event) {
    return <div>Sự kiện không tồn tại</div>;
  }

  return (
    <>
      <BreadcrumbRank />
      <div className="timeline-event-description">
        <Row>
          <Col span={14}>
            <h1 className="timeline-event-title">{event.title}</h1>
            {/* <p>{event.description}</p> */}
            <p className="timeline-event-p">
              {event.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <h2 className="timeline-event-subtitle">{event.subTitle1}</h2>
            <p className="timeline-event-p">
              {event.description1.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>

            <h2 className="timeline-event-subtitle">{event.subTitle2}</h2>
            <p className="timeline-event-p">
              {event.description2.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <h2 className="timeline-event-subtitle">{event.subTitle3}</h2>
            <p className="timeline-event-p">
              {event.description3.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <h2 className="timeline-event-subtitle">{event.subTitle4}</h2>
            <p className="timeline-event-p">
              {event.description4.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <h2 className="timeline-event-subtitle">{event.subTitle5}</h2>
            <p className="timeline-event-p">
              {event.description5.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
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

export default EventDetail;
