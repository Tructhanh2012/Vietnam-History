import React from "react";
import { Link } from "react-router-dom";
import historyDataCharacters from "./database";
import "./charactersList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const CharactersComponent = () => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0); // Scroll to top of the page
  };
  return (
    <div className="characters-list-event">
      <h4 className="characters-list-title"> ANH HÙNG DÂN TỘC TIÊU BIỂU</h4>
      <ul>
        {historyDataCharacters.map((event) => (
          <li key={event.idHistory}>
            <Link
              onClick={handleLinkClick}
              className="link-characters-event"
              to={`/characters/${event.idHistory}`}
            >
              <FontAwesomeIcon
                style={{ marginRight: "4px" }}
                icon={faAngleRight}
              />
              <strong className="textLink-characters-event">
                {event.title}
              </strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersComponent;
