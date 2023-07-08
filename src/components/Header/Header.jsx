import React, { useState } from "react";
import imageLogo from "../../assets/logo.png";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Input, Space, notification } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { doLogoutAction } from "../../redux/account/accountSlice";
const HeaderPage = (props) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    setActiveItem(item);
  };
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { token } = props;
  console.log(user);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    message.success("Đăng xuất thành công");

    // const { username, password } = values;
    // setIsSubmit(true);
    // const res = await callLogout(username, password);
    // setIsSubmit(false);
    // if (res && res.status === 404) {
    //   console.log("check res logout", res.status);
    //   dispatch(doLogoutAction());
    //   navigate("/login");
    // } else {
    //   notification.error({
    //     message: "Có lỗi xảy",
    //     description: res.message,
    //     duration: 5,
    //   });
    // }
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
        <Link to="/login">
          <label
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Đăng xuất
          </label>
        </Link>
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
      <header className="header">
        <nav className="navbar">
          <ul className="menu">
            <li
              className={activeItem === "home" ? "active" : ""}
              onClick={() => handleClick("home")}
            >
              <NavLink
                to="/"
                exact
                activeclassname="active"
              >
                TRANG CHỦ
              </NavLink>
            </li>
            <li
              className={`has-dropdown ${
                activeItem === "timeline" ? "active" : ""
              }`}
              onClick={() => handleClick("timeline")}
            >
              <NavLink
                to="/timeline"
                activeclassname="active"
              >
                DÒNG THỜI GIAN
                <FontAwesomeIcon className="icon-arrow-dropdown" />
              </NavLink>
              {/* <ul className="dropdown">
                <li>
                  <NavLink to="/timeline/1">
                    {" "}
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Hồng Bàng & Văn Lang
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/2">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Âu Lạc & Nam Việt
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/3">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Bắc thuộc lần I
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/4">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Trưng Nữ Vương
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/5">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Bắc thuộc lần II
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/6">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Lý và Nhà Triệu
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/7">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Bắc thuộc lần III
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/8">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Thời ký xây dựng nền tự chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/9">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Ngô
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/10">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Đinh
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/11">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Tiền Lê
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/12">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Lý
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/13">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Trần
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/14">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Hồ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/15">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Hậu Trần
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/16">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Bắc thuộc lần IV
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/17">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Hậu Lê
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/18">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nam Bắc Triều
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/19">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Trịnh Nguyễn Phân Tranh
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/20">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Tây Sơn
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/timeline/21">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Nhà Nguyễn
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/22">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Pháp Thuộc
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/23">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Việt Nam Dân Chủ Cộng Hòa
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timeline/24">
                    <FontAwesomeIcon
                      className="icon-arrow-dropdown"
                      icon={faAngleRight}
                    />
                    Cộng hòa xã hội chủ nghĩa Việt Nam
                  </NavLink> */}
              {/* </li>
              </ul> */}
            </li>
            <li
              className={activeItem === "article" ? "active" : ""}
              onClick={() => handleClick("article")}
            >
              <NavLink
                to="/article"
                activeClassName="active"
              >
                TƯ LIỆU
              </NavLink>
            </li>
            <li
              className={activeItem === "characters" ? "active" : ""}
              onClick={() => handleClick("characters")}
            >
              <NavLink
                to="/character"
                activeclassname="active"
              >
                NHÂN VẬT
              </NavLink>
            </li>
            <li
              style={{ position: "absolute", right: "2%" }}
              className={activeItem === "leaderboard" ? "active" : ""}
              onClick={() => handleClick("leaderboard")}
            >
              <NavLink
                to="/rank"
                activeclassname="active"
              >
                BẢNG XẾP HẠNG
              </NavLink>
            </li>
            {/* <li
              className={activeItem === "quizz" ? "active" : ""}
              onClick={() => handleClick("quizz")}
            >
              <NavLink to="/quizz" activeclassname="active">
                QUIZ
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default HeaderPage;
