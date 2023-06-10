import { FaRegUserCircle } from "react-icons/fa";
import { MdAutoGraph } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { Card, Space, Statistic, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
// import axios from "axios";
// import faker from "faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// function Dashboard() {
//   return <Bar options={options} data={data} />;
// }

const DashboardChart = () => {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
      setReveneuData(dataSource);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 300 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
};

export const fetchOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const fetchRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card>
      <Space direction="horizontal">
        <Statistic title={title} value={value} />
        {icon}
      </Space>
    </Card>
  );
};

const RecentOrders = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchOrders().then((res) => {
      res.products.splice(0, 3);
      setLoading(false);
    });
  }, []);
  return (
    <Table
      rowKey="id"
      columns={[
        {
          title: "title",
          dataIndex: "title",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
        },
        {
          title: "Price",
          dataIndex: "discountedPrice",
        },
      ]}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    ></Table>
  );
};

const StatisticDashboard = () => {
  return (
    <>
      <Space direction="vertical" size={20}>
        <Space
          direction="horizontal"
          style={{ background: "#001529", backgroundSize: "100% 20%" }}
        >
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
        </Space>

        <Space>
          {/* <RecentOrders /> */}
          <DashboardChart />
        </Space>
      </Space>
    </>
  );
};

export default StatisticDashboard;
