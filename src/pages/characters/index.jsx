import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Col, Divider, Row, Table } from "antd";
import { dataHistoryCharacters } from "./data";
import { useRef, useState } from "react";
import { Pagination } from "antd";
import TimelineComponent from "../../components/DongSuKien";
import CharactersComponent from "../../components/Characters";
import "./character.scss";

const BreadcrumbRank = () => {
  return (
    <Breadcrumb
      style={{ marginLeft: 30, padding: 20, paddingBottom: 0 }}
      separator=">"
      items={[
        {
          // key: "home",
          title: "Trang chủ",
          href: "/",
        },
        {
          // key: "timeline",
          title: "Nhân Vật Lịch Sử",
          href: "/characters",
        },
      ]}
    />
  );
};
const CharactersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalItems = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
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
              {dataHistoryCharacters
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item) => (
                  <div
                    className="col-md-12 row pt-1  border rounded p-3"
                    key={item.id}
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
                ))}
            </div>
            <Pagination
              className="pagination-characters"
              total={totalItems}
              current={currentPage}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </Col>
          <Col span={2}></Col>

          <Col span={6}>
            <TimelineComponent />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CharactersPage;
