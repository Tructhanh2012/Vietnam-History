import React from "react";
import { Link } from "react-router-dom";
import historyData from "./database";
import "./eventList.scss";

const TimelineComponent = () => {
  return (
    <div className="timeline-list-event">
      <h4 className="timeline-list-title"> CÁC THỜI KỲ LỊCH SỬ</h4>
      <ul>
        {historyData.map((event) => (
          <li key={event.idHistory}>
            <Link
              className="link-timeline-event"
              to={`/timeline/${event.idHistory}`}
            >
              <strong className="textLink-timeline-event">
                - {event.title}
              </strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineComponent;
