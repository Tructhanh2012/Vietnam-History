import React from "react";
import { Link } from "react-router-dom";
import historyData from "./database";
import "./eventList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const TimelineComponent = () => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0); // Scroll to top of the page
  };
  return (
    <div className="timeline-list-event">
      <h4 className="timeline-list-title"> CÁC THỜI KỲ LỊCH SỬ</h4>
      <ul>
        {historyData.map((event) => (
          <li key={event.idHistory}>
            <Link
              onClick={handleLinkClick}
              className="link-timeline-event"
              to={`/timeline/${event.idHistory}`}
            >
              <FontAwesomeIcon
                style={{ marginRight: "4px" }}
                icon={faAngleRight}
              />
              <strong className="textLink-timeline-event">{event.title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineComponent;
