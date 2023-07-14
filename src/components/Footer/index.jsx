import React from "react";
import { NavLink } from "react-router-dom";
import Facebook from "../Facebook/fanpage";
import styles from "./style.module.scss";
import logo from "../../assets/logo.png";
import { useEffect } from "react";

function Footer() {
  const menuList = [
    {
      label: "Anh hùng dân tộc tiêu biểu",
      link: "/character",
      scrollY: 0,
    },
    {
      label: "Ngô Quyền",
      link: "/character",
      scrollY: 3470,
    },
    {
      label: "Đinh Tiên Hoàng",
      link: "/character",
      scrollY: 4800,
    },

    {
      label: "Hai Bà Trưng",
      link: "/character",
      scrollY: 1125,
    },
    {
      label: "Nhà Lý",
      link: "/timeline/12",
      scrollY: 0,
    },
    {
      label: "Nhà Hậu Trần",
      link: "/timeline/15",
      scrollY: 0,
    },
    {
      label: "Nhà Tây Sơn",
      link: "/timeline/20",
      scrollY: 0,
    },
    {
      label: "Nhà Nguyễn",
      link: "/timeline/21",
      scrollY: 0,
    },
    // {
    //   label: "Đền Ngọc Sơn",
    //   link: "#",
    //   scrollY: 1000,
    // },
    // {
    //   label: "Thành nhà Hồ",
    //   link: "#",
    //   scrollY: 1000,
    // },
  ];

  const renderFooterTop = () => {
    return (
      <div className={styles.footer_top}>
        <h6>Về chúng tôi:</h6>
        <span>
          "Lịch sử Việt Nam" được thành lập để cung cấp các thông tin chi tiết
          và chính xác về lịch sử, văn hóa, địa lý và nhiều chủ đề khác liên
          quan đến Việt Nam. Chúng tôi muốn tạo ra một không gian để mọi người
          có thể trải nghiệm và cảm nhận về quá khứ của đất nước và con người
          Việt Nam một cách đầy hứng thú.
        </span>
        <span>
          Chúng tôi hi vọng rằng trang web của chúng tôi sẽ giúp người đọc hiểu
          rõ hơn về lịch sử và văn hóa của Việt Nam, từ những chi tiết nhỏ nhất
          đến những sự kiện lịch sử quan trọng. Chúng tôi cũng muốn khơi dậy sự
          tò mò và hứng thú về lịch sử của người đọc thông qua các bài viết và
          thông tin trên trang web.
        </span>
      </div>
    );
  };

  const renderFooterLeft = () => {
    return (
      <div className={styles.footer_left}>
        <div>
          <b>Địa chỉ:</b>
          <span>Lô E2a-7, D1, P.Long Thạnh Mỹ, Tp. Thủ Đức.</span>
        </div>
        <div>
          <b>Số điện thoại:</b>
          <a href="tel:(028)73005588">(028) 7300 5588</a>
        </div>
        <div>
          <b>Thư điện tử:</b>
          <a href="mailto:daihoc.hcm@fpt.edu.vn">lichsuvietnam@gmail.com</a>
        </div>
      </div>
    );
  };

  const renderFooterCenter = () => {
    return (
      <div className={styles.footer_center}>
        {/* <ul className={styles.sub_menu}>
          {menuList.map((item) => {
            return (
              <li key={`sub-menu-${item.label}`} className={styles.menu_item}>
                <NavLink
                  to={item.link}
                  exact
                  onClick={() => {
                    window.scrollTo(0, item.scrollY);
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul> */}

        <img src={logo} />
        <b>LichsuVietNam&copy; 2023</b>
      </div>
    );
  };

  const renderFooterRight = () => {
    return (
      <div className={styles.footer_right}>
        {/* <img src={logo} />
        <b>LichsuVietNam&copy; 2023</b> */}
        <Facebook link="https://www.facebook.com/nguoikesu" />
      </div>
    );
  };

  return (
    <div className={styles.footer}>
      <div className="container-custom">
        {renderFooterTop()}
        {renderFooterLeft()}
        {renderFooterCenter()}
        {renderFooterRight()}
      </div>
    </div>
  );
}

export default Footer;
