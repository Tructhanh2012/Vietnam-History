import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Anchor, Breadcrumb, Col, Divider, Row, Table, Tag } from "antd";
import { dataHistoryCharacters } from "./data";
import { useRef, useState } from "react";
import { Pagination } from "antd";
import TimelineComponent from "../../components/DongSuKien";
import { useLocation } from "react-router-dom";
import "./character.scss";
import { callGetCharacterList } from "../../services/api";
import ReactHTMLParser from "html-react-parser";

const BreadcrumbRank = () => {
  return (
    <Breadcrumb
      style={{ marginLeft: 30, padding: 20, paddingBottom: 0 }}
      separator=">"
      items={[
        {
          key: "home",
          title: "Trang chủ",
          href: "/",
        },
        {
          key: "characters",
          title: "Nhân Vật Lịch Sử",
          href: "/characters",
        },
      ]}
    />
  );
};

const CharactersPage = () => {
  const location = useLocation();
  const page = location.state?.page || 1;
  const fetchData = (page) => {
    // Add your logic here to fetch character data based on the specified page
    // For example:
    // axios.get(`/api/characters?page=${page}`).then((response) => {
    //   // Handle the fetched data
    // });
  };
  useEffect(() => {
    // Handle the logic for fetching data and rendering the characters based on the `page` parameter
    fetchData(page);
  }, [page]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo(0, 0);
  };

  const items = [
    {
      key: "4",
      href: "#4",
      title: "Hùng Vương",
    },
    {
      key: "2",
      href: "#2",
      title: "Hai Bà Trưng",
    },
    {
      key: "7",
      href: "#7",
      title: "Lý Nam Đế",
    },
    {
      key: "1",
      href: "#1",
      title: "Đinh Tiên Hoàng",
    },
    {
      key: "5",
      href: "#5",
      title: "Lê Đại Hành",
    },
    {
      key: "6",
      href: "#6",
      title: "Lê Thái Tổ",
    },
    {
      key: "8",
      href: "#8",
      title: "Lý Thái Tổ",
    },
    {
      key: "9",
      href: "#9",
      title: "Lý Thường Kiệt",
    },
    {
      key: "13",
      href: "#13",
      title: "Trần Hưng Đạo",
    },
    {
      key: "14",
      href: "#14",
      title: "Trần Nhân Tông",
    },
    {
      key: "11",
      href: "#11",
      title: "Nguyễn Huệ",
    },
    {
      key: "12",
      href: "#12",
      title: "Nguyễn Trãi",
    },
    {
      key: "3",
      href: "#3",
      title: "Hồ Chí Minh",
    },
  ];

  const [characters, setCharacters] = useState([]);
  const totalItems = 8;
  const pageSize = 6;

  const getFigure = async () => {
    const res = await callGetCharacterList();
    setCharacters(res.data);
  };

  useEffect(() => {
    getFigure();
  }, []);
  console.log("characters", characters);

  return (
    <>
      <BreadcrumbRank />
      <div className="timeline-content-textbelow row">
        <Row>
          <Col span={14}>
            <div className="col-md-12">
              <h1>Anh Hùng Dân Tộc Tiêu Biểu</h1>
            </div>
            <div className="col-md-12 ">
              {/* {dataHistoryCharacters
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item) => (
                  <div
                    className="col-md-12 row pt-1  border rounded p-3"
                    key={item.id}
                    id={item.id}
                  >
                    <div className="col-md-12 mb-2">
                      <h3 className="link-title">{item.title}</h3>
                    </div>
                    <div className="col-md-12 container justify-content-center">
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <p className="timeline-content-textbelow-detail">
                        {item.content.split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                ))} */}
              {characters &&
                characters.map((figure) => (
                  <div
                    className="col-md-12 row pt-1  border rounded p-3"
                    key={figure.id}
                    // id={item.id}
                  >
                    <div className="col-md-12 mb-2">
                      <h3 className="link-title">{figure.name}</h3>
                      <h6>
                        {figure.birthYear}-{figure.passedYear}
                      </h6>
                      <Tag color="cyan">{figure.generation.generationName}</Tag>
                    </div>
                    <div className="col-md-12 container justify-content-center">
                      <img
                        src={figure.imageLink}
                        alt=""
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <p className="timeline-content-textbelow-detail">
                        {/* {item.content.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))} */}{" "}
                        {/* {figure.description} */}
                        {figure.description.split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line} <br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            <Pagination
              style={{ marginBottom: "34px" }}
              className="pagination-characters"
              total={totalItems}
              current={currentPage}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </Col>
          <Col span={2}></Col>

          {/* <Col span={6}>
            <Anchor
              items={items}
              style={{ padding: "10px", marginLeft: "26px" }}
            />
          </Col> */}
        </Row>
      </div>
    </>
  );
};
export default CharactersPage;
