import { Breadcrumb, Button, Col, Input, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

// import { getRankingData, getMap } from "../../services/api";
import cup from "../../assets/cup.png";
import "./rank.scss";
import { callGetRanking } from "../../services/api";
// import { getRanking } from "../../services/api";

const BreadcrumbRank = () => {
  return (
    <Breadcrumb
      style={{ marginLeft: 30, padding: 20 }}
      separator=">"
      items={[
        {
          title: "Trang chủ",
          href: "/",
        },
        {
          title: "Bảng xếp hạng",
          href: "/rank",
        },
      ]}
    />
  );
};

const RankingTable = () => {
  const [listRank, setListRank] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    {
      key: "1",
      stt: 1,
      username: "tranha03",
      totalquizz: 3000,
      totalscore: 2930,
    },
    { key: "2", stt: 2, username: "ttt22", totalquizz: 1888, totalscore: 3906 },
    { key: "3", stt: 3, username: "bcht39", totalquizz: 344, totalscore: 290 },
  ];

  const getRankingData = async () => {
    setIsLoading(true);
    const res = await callGetRanking();
    console.log("res ranking:", res);
    setListRank(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getRankingData();
  }, []);

  const columns = [
    {
      key: "stt",
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      key: "username",
      title: "Biệt danh",
      dataIndex: "name",
    },
    {
      key: "totscore",
      title: "Tổng Điểm",
      dataIndex: "totalPoint",
    },
    {
      key: "totquizz",
      title: "Tổng Quizz",
      dataIndex: "numberOfQuiz",
    },
  ];

  return (
    <Table
      loading={isLoading}
      style={{ alignContent: "center" }}
      columns={columns}
      dataSource={listRank}
      //pagination="center"
      pagination={{
        pageSize: 4,
        position: ["bottomCenter"],
      }}
    />
  );
};

const RankingPage = () => {
  return (
    <>
      <div className="breadcrumb">
        <BreadcrumbRank />
      </div>

      <Row gutter={40}>
        <Col
          span={15}
          offset={1}
        >
          <div className="ranking_table">
            <div
              className="table-title"
              style={{ marginBottom: "20px" }}
            >
              <h2>Bảng xếp hạng các thành viên</h2>
            </div>
            {/* <Input placeholder="Nhập tên bạn muốn tìm...." /> */}
            <RankingTable />
          </div>
          <Row></Row>
        </Col>

        <Col
          span={6}
          offset={1}
        >
          <div className="form">
            <div className="form_container">
              <img
                src={cup}
                style={{ width: "120px", marginBottom: 10 }}
              />
              <div className="text">
                <h6>BẢNG XẾP HẠNG THI ĐẤU</h6>
                <p>
                  Bảng xếp hạng thi đấu dựa trên tổng số điểm danh hiệu mỗi đấu
                  thủ đạt được trong tuần, trong tháng thông qua thi đấu.
                </p>
              </div>
              <div
                className="button"
                style={{ marginBottom: 8 }}
              >
                <Button>Thi đấu ngay</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default RankingPage;
