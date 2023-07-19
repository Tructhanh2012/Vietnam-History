import React, { useEffect, useState } from "react";
import LearnByMap from "../Map";
import BlogCard from "./BlogCard";
import getPostList from "./getPostList";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { Col, Divider, Pagination, Row } from "antd";
import { callGetArticle } from "../../services/api";
import ReactHTMLParser from "html-react-parser";

function HomePage() {
  const { postList, document } = getPostList();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(document.length);
  }, [document]);

  useEffect(() => {
    setTotal(postList.length);
  }, [postList]);
  //========================================
  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const navigate = useNavigate();
  const handleRedirectEvent = (event) => {
    console.log("event", event);
    const slug = convertSlug(event.title);
    const eventId = event.id;
    navigate(`/singleEvent/${slug}?eventId=${eventId}`);
  };

  const renderPostItem = (post) => {
    return (
      <div
        key={`post-item-${post.title}`}
        className={styles.post_item}
        onClick={() => handleRedirectEvent(post)}
      >
        <img
          className={styles.image}
          src={post.image}
        />
        <div className={styles.info}>
          <span className={styles.title}>{post.title}</span>
          <span className={styles.content}>
            {/* {post.content} */}
            {ReactHTMLParser(post.content)}
          </span>
        </div>
      </div>
    );
  };

  const handleOnchangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const paginatedPostList = document.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  return (
    <div className={styles.home_page}>
      <LearnByMap />
      <Divider orientation="left">Tư liệu mới:</Divider>
      <div className="container-custom">
        <div className={styles.history_period}>
          {postList.map(renderPostItem)}
        </div>
      </div>

      <div className="">
        <span>
          <Divider orientation="left">Top các kiện tướng:</Divider>
        </span>
        <Row>
          <Col
            md={{ span: 20, offset: 2 }}
            xs={24}
            lg={{ span: 16, offset: 4 }}
          >
            <BlogCard />
          </Col>
        </Row>
      </div>

      <Divider orientation="left">Tư liệu:</Divider>
      <div className={`${styles.place_container} container-custom`}>
        <div className={styles.left_block}>
          <div className={styles.history_place}>
            {paginatedPostList.map(renderPostItem)}
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={current}
                total={totalItems}
                pageSize={pageSize}
                responsive
                onChange={handleOnchangePage}
              />
            </Row>
          </div>
        </div>
        <div className={styles.right_block}></div>
      </div>
    </div>
  );
}

export default HomePage;
