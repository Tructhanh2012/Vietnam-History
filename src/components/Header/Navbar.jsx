import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import "./navbar.scss";
import "./header.scss";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TiTimesOutline } from "react-icons/ti";
import imageLogo from "../../assets/logo.png";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, Space, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { doLogoutAction } from "../../redux/account/accountSlice";
// import { callLogout } from "../../services/api";

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
  //=======
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleLogout = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogout(username, password);
    setIsSubmit(false);
    if (res && res.status === 404) {
      console.log("check res logout", res.status);
      dispatch(doLogoutAction());
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy",
        description: res.message,
        duration: 5,
      });
    }
  };
  let items = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/profile")}
        >
          Quản lý tài khoản
        </label>
      ),
      key: "account",
    },
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  // console.log(user);

  if (user?.role === "ADMIN") {
    items.unshift({
      //unshift đẩy lên đầutiên
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }

  // const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
  //   user?.avatar
  // }`;

  const urlAvatar = `${user?.avatar}`;
  // console.log("urlava: ", urlAvatar);
  return (
    <>
      <div className="d-flex navbar-custom">
        <NavLink
          className="logo"
          // to="/"
        >
          <img
            alt=""
            src={imageLogo}
          />
        </NavLink>

        {/* <span className="input_search">
          <label className="search" htmlFor="inpt_search">
            <input id="inpt_search" type="text" />
          </label>
        </span> */}
        <span className="btn">
          {!user ? (
            <Button
              className="btn-login"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
          ) : (
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="account_navbar">
                    <Avatar
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-ySpkhKCTWBYov62UHbrAtaeeQIZVDmL3g&usqp=CAU"
                      style={{ marginRight: 2 }}
                    />
                    Welcome {user?.name}
                    <DownOutlined style={{ marginLeft: 2 }} />
                  </div>
                </Space>
              </a>
            </Dropdown>
          )}
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
              <TiTimesOutline
                size="2em"
                fill="#fff"
              />
            </div>

            <ul className="nav_mobilelist">
              <div className="hori-selector">
                <div className="left"></div>
                <div className="right"></div>
              </div>
              <li className="nav-item mobile">
                <NavLink
                  className="nav-link "
                  to="/"
                  exact="true"
                >
                  TRANG CHỦ
                </NavLink>
              </li>

              <li className="nav-item mobile">
                <NavLink
                  className="nav-link "
                  to="/timeline"
                  exact="true"
                >
                  DÒNG THỜI GIAN
                </NavLink>
              </li>

              <li className="nav-item mobile">
                <NavLink
                  className="nav-link  "
                  to="/rank"
                  exact="true"
                >
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

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>

            <li className="nav-item active">
              <NavLink
                className="nav-link"
                to="/"
                exact="true"
              >
                TRANG CHỦ
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/timeline"
                exact="true"
              >
                DÒNG THỜI GIAN
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/rank"
                exact="true"
              >
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
