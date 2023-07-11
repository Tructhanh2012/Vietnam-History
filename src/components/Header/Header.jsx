import React, { useState } from "react";
import imageLogo from "../../assets/logo.png";
import headerBackground from "../../assets/header.png";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Input, Space, notification } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { BsTrophy } from "react-icons/bs";
import styles from "./style.module.scss";

const HeaderPage = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const jwtToken = sessionStorage.getItem("jwtToken");
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log(user);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
    message.success("Đăng xuất thành công");
  };
  let items = [
    {
      label: (
        <Link to="/login">
          <label style={{ cursor: "pointer" }} onClick={handleLogout}>
            Đăng xuất
          </label>
        </Link>
      ),
      key: "logout",
    },
  ];

  if (user?.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }

  const renderHeaderTop = () => {
    return (
      <div
        className={styles.header_bar_top}
        style={{ background: `url(${headerBackground})` }}
      >
        <div className={`${styles.container} container-custom`}>
          <img className={styles.image} src={imageLogo} />
          <>
            {!user ? (
              <Button className="btn-login" onClick={() => navigate("/login")}>
                Đăng nhập
              </Button>
            ) : (
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div className={styles.authorize}>
                  <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-ySpkhKCTWBYov62UHbrAtaeeQIZVDmL3g&usqp=CAU" />
                  Xin chào {user?.name}
                </div>
              </Dropdown>
            )}
          </>
        </div>
      </div>
    );
  };

  const menuList = [
    {
      label: "Trang chủ",
      link: "/",
      handleClick: "home",
    },
    {
      label: "Dòng thời gian",
      link: "/timeline",
      handleClick: "timeline",
    },
    {
      label: "Tư liệu",
      link: "/documents",
      handleClick: "documents",
    },
    {
      label: "Nhân vật",
      link: "/character",
      handleClick: "characters",
    },
  ];

  const renderHeaderBot = () => {
    return (
      <div className={styles.header_bar_bot}>
        <div className={`${styles.container} container-custom`}>
          <ul className={styles.main_menu}>
            {menuList.map((item) => {
              return (
                <li
                  key={`main-menu-item-${item.label}`}
                  className={styles.menu_item}
                  data-active={activeItem === item.handleClick}
                >
                  <NavLink to={item.link} exact>
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <NavLink to="/rank" className={styles.ranking}>
            <BsTrophy />
            BẢNG XẾP HẠNG
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.header_bar}>
      {renderHeaderTop()}
      {renderHeaderBot()}
    </div>
  );
};

export default HeaderPage;
