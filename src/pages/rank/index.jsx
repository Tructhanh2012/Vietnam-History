import { Breadcrumb, Button, Col, Input, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

// import { getRankingData, getMap } from "../../services/api";
import cup from "../../assets/cup.png";
import "./rank.scss";
// import { getRanking } from "../../services/api";

const BreadcrumbRank = () => {
  return (
    <Breadcrumb
      style={{ marginLeft: 30, padding: 20 }}
      separator=">"
      items={[
        {
          title: "Home",
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

  // const getRankingData = async () => {
  //   const rakingData = await getRanking();
  //   console.log(rakingData);
  // };
  // useEffect(() => {
  //   getRankingData();
  // }, []);

  const columns = [
    {
      key: "stt",
      title: "STT",
      dataIndex: "stt",
    },
    {
      key: "username",
      title: "Biệt danh",
      dataIndex: "username",
    },
    {
      key: "totquizz",
      title: "Tổng Quizz",
      dataIndex: "totalquizz",
    },
    {
      key: "totscore",
      title: "Tổng Điểm",
      dataIndex: "totalscore",
    },
  ];
  //   return (
  //     <Table
  //       columns={[
  //         {
  //           title: "Name",
  //           dataIndex: "name",
  //         },
  //         {
  //           title: "Url",
  //           dataIndex: "url",
  //         },
  //       ]}
  //       dataSource={array}
  //     />
  //   );

  return (
    <Table
      style={{ alignContent: "center" }}
      columns={columns}
      dataSource={data}
      pagination="center"
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
        <Col span={15} offset={1}>
          <div className="ranking_table">
            <h2>Bảng xếp hạng các hào kiệt</h2>
            <Input placeholder="Nhập tên bạn muốn tìm...." />
            <RankingTable />
          </div>
          <Row></Row>
        </Col>

        <Col span={6} offset={1}>
          <div className="form">
            <div className="form_container">
              <img src={cup} style={{ width: "120px", marginBottom: 10 }} />
              <div className="text">
                <h6>BẢNG XẾP HẠNG THI ĐẤU</h6>
                <p>
                  Bảng xếp hạng thi đấu dựa trên tổng số điểm danh hiệu mỗi đấu
                  thủ đạt được trong tuần, trong tháng thông qua thi đấu.
                </p>
              </div>
              <div className="button" style={{ marginBottom: 8 }}>
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

// useEffect(() => {
//     fetchMapData();
//     // getArray();
//   }, []);
//   const [mapData, setMapData] = useState([]);
//   const fetchMapData = async () => {
//     const object = await getMap();
//     setMapData(
//       Object.entries(object).map(([key, value]) => ({
//         title: value.title,
//         content: value.content,
//       }))
//     );
//     // console.log(map);
//   };
//   return (
//     <Table
//       columns={[
//         {
//           title: "title",
//           dataIndex: "title",
//         },
//         {
//           title: "content",
//           dataIndex: "content",
//         },
//       ]}
//       dataSource={mapData}
//     />
//   );

//   const [array, setArray] = useState([]);
//   async function getArray() {
//     const data = await getRankingData();

//     setArray(data.results);
//   }
