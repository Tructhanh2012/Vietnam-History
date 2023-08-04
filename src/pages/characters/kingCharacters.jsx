import React from "react";
import { useState, useEffect } from "react";
import { Anchor, Breadcrumb, Col, Divider, Row, Tag, Pagination } from "antd";
import { callGetKingCharacterList } from "../../services/api";
import "./character.scss";

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
          href: "/kingCharacter",
        },
      ]}
    />
  );
};

const KingCharacters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [items, setItems] = useState([]);

  const getFigure = async () => {
    const res = await callGetKingCharacterList();
    setCharacters(res.data);
    const itemsArray = res.data.map((figure) => ({
      key: figure.id.toString(), // Convert the key to a string since it's expected to be a string in Ant Design Anchor
      href: `#${figure.id}`,
      title: figure.name,
    }));

    setItems(itemsArray);
  };

  useEffect(() => {
    getFigure();
  }, []);
  console.log("characters", characters);
  const totalItems = characters.length;
  const [pageSize, setPageSize] = useState(6);
  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo(0, 0);
  };

  const slicedCharacters = characters.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <BreadcrumbRank />
      <div className="timeline-content-textbelow row">
        <Row>
          <Col span={14}>
            <div className="col-md-12 ">
              {characters &&
                slicedCharacters.map((figure) => (
                  <div
                    className="col-md-12 row pt-1  border rounded p-3"
                    key={figure.id}
                    id={figure.id}
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

          <Col span={6}>
            <Anchor
              items={items}
              style={{ padding: "10px", marginLeft: "26px" }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default KingCharacters;
