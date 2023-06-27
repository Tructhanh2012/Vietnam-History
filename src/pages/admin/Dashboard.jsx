import { Card, Col, Row, Space, Statistic } from "antd";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAutoGraph } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import Chart from "./Chart";
import "./dashboard.scss";
import { callGetStatistic } from "../../services/api";
import CountUp from "react-countup";

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

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    noOfAcc: 0,
    noOfEnroll: 0,
    noOfEvent: 0,
  });
  const formatter = (value) => (
    <CountUp end={value} separator="," duration={1000} />
  );
  // const [statistics, setStatistics] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await callGetStatistic();
      setStatistics(res);
      console.log(res);
    };

    fetchData();
  }, []);

  if (statistics === null) {
    // Hiển thị một thông báo hoặc PlaceholderCard trong khi đang tải dữ liệu
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="dashboard">
        <div className="dashboard_card">
          <Row gutter={40} style={{ background: "#001529", height: "9rem" }}>
            <Col span={6} offset={2}>
              <DashboardCard
                formatter={formatter}
                title={"Thành viên mới"}
                value={statistics?.noOfAcc || 0}
                icon={
                  <FaRegUserCircle
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
            <Col span={6}>
              <DashboardCard
                formatter={formatter}
                style={{ width: "188px" }}
                title={"Số lượt xem              "}
                value={statistics.noOfEnroll}
                icon={
                  <MdAutoGraph
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
          </Row>
        </div>

        <div className="dashboard_chart" style={{ padding: "45px 90px" }}>
          <Chart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
