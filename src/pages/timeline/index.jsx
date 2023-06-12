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
  );
};

export default TimelinePage;
