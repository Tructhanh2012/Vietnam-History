import { Card, Col, Row, Space, Statistic } from "antd";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAutoGraph } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import Chart from "./Chart";
import "./dashboard.scss";
import { callGetStatistic } from "../../services/api";
import CountUp from "react-countup";
import Chartt from "./Chartt";
import axios from "../../utils/axios-customize";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card align="middle">
      <Space direction="horizontal">
        <Statistic
          title={title}
          value={value}
        />
        {icon}
      </Space>
    </Card>
  );
};

const Dashboard = () => {
  const [statistics, setStatistics] = useState({ quantity: 0 });
  const [memberStatistics, setMemberStistics] = useState({ quantity: 0 });
  const [articleStatistics, setArticleStistics] = useState({ quantity: 0 });
  // const [statistics, setStatistics] = useState([]);
  // const formatter = (value) => (
  //   <CountUp end={value} separator="," duration={1000} />
  // );
  // const [statistics, setStatistics] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/editor-quantity");
        console.log("statistic:", response);
        setStatistics(response.map((item) => item.quantity));
        const responseNoOfMem = await axios.get("/admin/member-quantity");
        setMemberStistics(responseNoOfMem.map((item) => item.quantity));
        const responseNoOfArticle = await axios.get("/admin/article-quantity");
        setArticleStistics(responseNoOfArticle.map((item) => item.quantity));
      } catch (error) {
        console.log(error);
      }
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
          <Row
            gutter={40}
            style={{ background: "#001529", height: "9rem" }}
          >
            <Col
              span={6}
              offset={2}
            >
              <DashboardCard
                // formatter={formatter}
                title={"Số thành viên"}
                value={memberStatistics}
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
                // formatter={formatter}
                style={{ width: "188px" }}
                title={"Số editor:"}
                value={statistics}
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
                // formatter={formatter}
                title={"Số lượng bài viết"}
                value={articleStatistics}
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

        <div
          className="dashboard_chart"
          style={{ padding: "45px 90px" }}
        >
          {/* <Chartt /> */}
          <Chart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
