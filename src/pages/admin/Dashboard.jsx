import { Card, Col, Row, Space, Statistic } from "antd";
import { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAutoGraph } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import Chart from "./Chart";
import "./dashboard.scss";

// const fetchDashCard = () => {
//   return fetch(
//     "https://dashboardcard-733ac-default-rtdb.asia-southeast1.firebasedatabase.app/dash_card"
//   ).then((res) => res.json);
// };

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
  return (
    <>
      <div className="dashboard">
        <div className="dashboard_card">
          <Row gutter={40} style={{ background: "#001529", height: "9rem" }}>
            <Col span={6} offset={2}>
              <DashboardCard
                title={"Thành viên mới"}
                value={2120}
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
                style={{ width: "188px" }}
                title={"Số lượt xem              "}
                value={3299}
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
                title={"Số lượng bài viết"}
                value={212}
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
