import React from "react";
import getPostList from "../../Home/getPostList";
import { useState, useEffect } from "react";
import { Row, Col, Table, Checkbox } from "antd";

const MapArticles = () => {
  const { postList, document } = getPostList();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [listArticles, setListArticles] = useState([]);

  const renderPostItem = (post) => {
    return (
      <div>
        <span className="title-admin">{post.id}</span>
        <span className="title-admin">{post.title}</span>
      </div>
    );
  };
  const loadArticles = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");
    const id = { id: user.id };
    const response = await fetch(
      "http://localhost:8084/general/list-articles",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
    }
    const data = await response.json();

    setListArticles(data);
    console.log(data);
  };
  useEffect(() => {
    loadArticles();

    // fetchUser();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "articleId",
      key: "articleId",
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "HashTag",
      dataIndex: "HashTag",
      key: "HashTag",
      filters: [
        {
          text: "Hồng Bàng & Văn Lang",
          value: "Hồng Bàng & Văn Lang",
        },
        {
          text: "Âu Lạc & Nam Việt",
          value: "Âu Lạc & Nam Việt",
        },
        {
          text: "Bắc thuộc",
          value: "Bắc thuộc",
        },
        {
          text: "Nhà Lý & nhà Triệu",
          value: "Nhà Lý & nhà Triệu",
        },
        {
          text: "Nhà Ngô",
          value: "Nhà Ngô",
        },
        {
          text: "Nhà Đinh",
          value: "Nhà Đinh",
        },
        {
          text: "Nhà Tiền Lê",
          value: "Nhà Tiền Lê",
        },
        {
          text: "Nhà Lý",
          value: "Nhà Lý",
        },
        {
          text: "Nhà Trần",
          value: "Nhà Trần",
        },
        {
          text: "Nhà Hồ",
          value: "Nhà Hồ",
        },
        {
          text: "Nhà Hậu Trần",
          value: "Nhà Hậu Trần",
        },
        {
          text: "Nhà Hậu Lê",
          value: "Nhà Hậu Lê",
        },
        {
          text: "Nam Bắc Triều",
          value: "Nam Bắc Triều",
        },
        {
          text: "Trịnh Nguyễn Phân Tranh",
          value: "Trịnh Nguyễn Phân Tranh",
        },
        {
          text: "Nhà Tây Sơn",
          value: "Nhà Tây Sơn",
        },
        {
          text: "Nhà Nguyễn",
          value: "Nhà Nguyễn",
        },
        {
          text: "Pháp Thuộc",
          value: "Pháp Thuộc",
        },
        {
          text: "Trưng Nữ Vương",
          value: "Trưng Nữ Vương",
        },
        {
          text: "Việt Nam Dân Chủ Cộng Hoà",
          value: "Việt Nam Dân Chủ Cộng Hoà",
        },
        {
          text: "Cộng hoà xã hội chủ nghĩa Việt Nam",
          value: "Cộng hoà xã hội chủ nghĩa Việt Nam",
        },
      ],
      onFilter: (value, record) => record.HashTag.indexOf(value) === 0,
      sorter: (a, b) => a.HashTag.length - b.HashTag.length,
      sortDirections: ["descend"],
    },
    {
      title: "Tỉnh",
      dataIndex: "province",
      key: "province",
      filters: [
        {
          text: "Cao Bằng",
          value: "Cao Bằng",
        },
        {
          text: "Âu Lạc & Nam Việt",
          value: "Âu Lạc & Nam Việt",
        },
        {
          text: "Bắc thuộc",
          value: "Bắc thuộc",
        },
        {
          text: "Nhà Lý & nhà Triệu",
          value: "Nhà Lý & nhà Triệu",
        },
        {
          text: "Nhà Ngô",
          value: "Nhà Ngô",
        },
        {
          text: "Nhà Đinh",
          value: "Nhà Đinh",
        },
        {
          text: "Nhà Tiền Lê",
          value: "Nhà Tiền Lê",
        },
        {
          text: "Nhà Lý",
          value: "Nhà Lý",
        },
        {
          text: "Nhà Trần",
          value: "Nhà Trần",
        },
        {
          text: "Nhà Hồ",
          value: "Nhà Hồ",
        },
        {
          text: "Nhà Hậu Trần",
          value: "Nhà Hậu Trần",
        },
        {
          text: "Nhà Hậu Lê",
          value: "Nhà Hậu Lê",
        },
        {
          text: "Nam Bắc Triều",
          value: "Nam Bắc Triều",
        },
        {
          text: "Trịnh Nguyễn Phân Tranh",
          value: "Trịnh Nguyễn Phân Tranh",
        },
        {
          text: "Nhà Tây Sơn",
          value: "Nhà Tây Sơn",
        },
        {
          text: "Nhà Nguyễn",
          value: "Nhà Nguyễn",
        },
        {
          text: "Pháp Thuộc",
          value: "Pháp Thuộc",
        },
        {
          text: "Trưng Nữ Vương",
          value: "Trưng Nữ Vương",
        },
        {
          text: "Việt Nam Dân Chủ Cộng Hoà",
          value: "Việt Nam Dân Chủ Cộng Hoà",
        },
        {
          text: "Cộng hoà xã hội chủ nghĩa Việt Nam",
          value: "Cộng hoà xã hội chủ nghĩa Việt Nam",
        },
      ],
      onFilter: (value, record) => record.HashTag.indexOf(value) === 0,
      sorter: (a, b) => a.HashTag.length - b.HashTag.length,
      sortDirections: ["descend"],
    },
    {
      title: "Map",
      dataIndex: "province",
      key: "province",
      render: (text, record) => <Checkbox checked={record.map} />,
    },
  ];
  const data = listArticles.map((article) => ({
    key: article.id,
    articleId: article.id,
    title: article.title,
    content: article.content,
    HashTag: article.hashtagEntity.name,
  }));
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("check2 : ", pagination);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  return (
    <>
      <h2>tạo bài viết cho tỉnh</h2>

      {/* <div className="{styles.history_period}">{data}</div> */}
      <Row
        gutter={[20, 20]}
        style={{ marginTop: 40 }}
      >
        <Col span={24}>{/* <InputSearch /> */}</Col>
        <Col
          span={22}
          offset={1}
        >
          <Table
            className="def"
            loading={isLoading}
            columns={columns}
            dataSource={data}
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: 7,
              total: total,
              position: ["bottomCenter"],
            }}
          ></Table>
        </Col>
      </Row>
    </>
  );
};
export default MapArticles;
