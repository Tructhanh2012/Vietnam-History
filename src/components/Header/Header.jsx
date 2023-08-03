import React, { useState } from "react";
import imageLogo from "../../assets/logo (1).png";
import headerBackground from "../../assets/header.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown } from "antd";
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
  // const handleLogout = async () => {
  //   try {
  //     const token = sessionStorage.getItem("jwtToken");

  //     // Call the API logout endpoint
  //     await axios.get(
  //       "/logout",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Clear session storage
  //     sessionStorage.removeItem("jwtToken");
  //     sessionStorage.removeItem("user");

  //     console.log("Đăng xuất thành công");
  //   } catch (error) {
  //     // Handle any errors during the logout process
  //     console.log("Logout error:", error);
  //     message.error("Đã có lỗi xảy ra khi đăng xuất");
  //   }
  // };
  let items = [
    {
      label: (
        <Link to="/login">
          <label
            style={{ cursor: "pointer" }}
            // onClick={handleLogout}
            onClick={() => navigate("/login")}
          >
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
      // link: "/character",
      handleClick: "characters",
      subMenu: [
        {
          label: "Vua",
          link: "/kingCharacter",
          handleClick: "characters-list",
        },
        {
          label: "Nhân vật lịch sử",
          link: "/character",
          handleClick: "characters-add",
        },
      ],
    },
  ];

  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

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
                  <NavLink
                    t
                    to={item.link}
                    exact
                    onClick={item.subMenu ? toggleSubMenu : null}
                  >
                    {item.label}
                  </NavLink>
                  {item.subMenu && showSubMenu && (
                    <ul className={styles.sub_menu}>
                      {item.subMenu.map((subItem) => {
                        return (
                          <li
                            key={`sub-menu-item-${subItem.label}`}
                            className={styles.sub_menu_item}
                            data-active={activeItem === subItem.handleClick}
                          >
                            <NavLink to={subItem.link} exact>
                              {subItem.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
