import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import "./navbar.scss";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TiTimesOutline } from "react-icons/ti";
import imageLogo from "../../assets/logo.png";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  function animation() {
    var tabsNewAnim = $("#navbarSupportedContent");
    var activeItemNewAnim = tabsNewAnim.find(".active");
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
      $("#navbarSupportedContent ul li").removeClass("active");
      $(this).addClass("active");
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();

      $(".hori-selector").css({
        top: itemPosNewAnimTop.top + "px",
        left: itemPosNewAnimLeft.left + "px",
        height: activeWidthNewAnimHeight + "px",
        width: activeWidthNewAnimWidth + "px",
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on("resize", function () {
      setTimeout(function () {
        animation();
      }, 1000);
    });
  }, []);

  return (
    <>
      <div className="d-flex navbar-custom">
        <NavLink
          className="logo"
          // to="/"
        >
          <img alt="" src={imageLogo} />
        </NavLink>

        <span className="input_search">
          <label className="search" htmlFor="inpt_search">
            <input id="inpt_search" type="text" />
          </label>
        </span>
        <span className="btn">
          <Button className="btn-login" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </span>
      </div>

      <nav className="navbar navbar-expand-lg navbar-mainbg">
        {isNavOpen && (
          <nav className="nav_mobile">
            <div
              className="close-btn"
              onClick={handleNavToggle}
              // onClick={animation}
            >
              <TiTimesOutline size="2em" fill="#fff" />
            </div>

            <ul className="nav_mobilelist">
              <div className="hori-selector">
                <div className="left"></div>
                <div className="right"></div>
              </div>
              <li className="nav-item mobile">
                <NavLink className="nav-link " to="/" exact="true">
                  TRANG CHỦ
                </NavLink>
              </li>

              <li className="nav-item mobile">
                <NavLink className="nav-link " to="/timeline" exact="true">
                  DÒNG THỜI GIAN
                </NavLink>
              </li>

              <li className="nav-item mobile">
                <NavLink className="nav-link  " to="/rank" exact="true">
                  BẢNG XẾP HẠNG
                </NavLink>
              </li>
            </ul>
          </nav>
        )}

        {/* <label className="nav_overlay"></label> */}

        <label
          htmlFor="nav-mobile-input"
          className="nav-bars-btn"
          onClick={handleNavToggle}
        >
          <FaBars fill="#fff" />
        </label>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>

            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact="true">
                TRANG CHỦ
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/timeline" exact="true">
                DÒNG THỜI GIAN
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/rank" exact="true">
                BẢNG XẾP HẠNG
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
