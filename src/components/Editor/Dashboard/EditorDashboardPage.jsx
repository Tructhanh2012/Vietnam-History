import { Card, Col, Row, Space, Statistic } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineArticle, MdOutlineRemoveRedEye } from "react-icons/md";
import { callGetStatistic } from "../../../services/api";
import CountUp from "react-countup";
import { FaRegNewspaper } from "react-icons/fa";
import LineChart from "./EditorChart";
import EditorChart from "./EditorChart";
import { Header } from "antd/es/layout/layout";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card align="middle">
      <Space direction="horizontal">
        <Statistic title={title} value={value} />
        {icon}
      </Space>
    </Card>
  );
};

const EditorDashboardPage = () => {
  const [statistics, setStatistics] = useState({
    noOfAcc: 0,
    noOfEnroll: 0,
    noOfEvent: 0,
  });
  const formatter = (value) => (
    <CountUp end={value} separator="," duration={1000} />
  );
  useEffect(() => {
    const fetchData = async () => {
      const res = await callGetStatistic();
      setStatistics(res);
      console.log(res);
    };

    fetchData();
  }, []);

  if (statistics === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="dashboard">
        <div className="dashboard_card">
          {/* <Row
            gutter={40}
            style={{
              background: "#001529",
              height: "11rem",
              paddingTop: 35,
              paddingBottom: 15,
            }}
          >
            <Col span={6} offset={2}>
              <DashboardCard
                formatter={formatter}
                title={"Bài viết mới"}
                value={statistics?.noOfAcc || 0}
                icon={
                  <FaRegNewspaper
                    size="1.4em"
                    style={{
                      backgroundColor: "rgb(176, 11, 28, 0.76)",
                      borderRadius: 30,
                      fontSize: 20,
                      padding: 3,
                    }}
                  />
                }
              />
            </Col>
            <Col span={6}>
              <DashboardCard
                formatter={formatter}
                style={{ width: "188px" }}
                title={"Số lượt xem "}
                value={statistics.noOfEnroll}
                icon={
                  <MdOutlineRemoveRedEye
                    size="1.5em"
                    style={{
                      backgroundColor: "rgb(176, 11, 28, 0.76)",
                      borderRadius: 30,
                      fontSize: 20,
                      padding: 4,
                    }}
                  />
                }
              />
            </Col>
            <Col span={6}>
              <DashboardCard
                formatter={formatter}
                title={"Số lượng bài viết"}
                value={statistics.noOfEvent}
                icon={
                  <MdOutlineArticle
                    size="1.5em"
                    style={{
                      backgroundColor: "rgb(176, 11, 28, 0.76)",
                      borderRadius: 30,
                      fontSize: 20,
                      padding: 3,
                    }}
                  />
                }
              />
            </Col>
          </Row> */}

          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="layoutAdmin__header__welcome"></div>
          </Header>
        </div>

        <div
          className="dashboard_chart"
          style={{
            paddingTop: "90px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <EditorChart />
        </div>
      </div>
    </>
  );
};

export default EditorDashboardPage;
