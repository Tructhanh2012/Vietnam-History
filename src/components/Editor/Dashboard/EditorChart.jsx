import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import "./linechart.scss";
import { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "../../../utils/axios-customize";
import { statistic } from "antd/es/theme/internal";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const EditorChart = () => {
  const [reveneuData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  const [responseData, setResponseData] = useState([]);

  const callPostDashboard = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");
    const value = {
      id: user.id,
    };

    try {
      const response = await fetch(
        "http://localhost:8084/editor/articles-in-week",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(value),
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching data from API");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const transformedData = data.map((item) => ({
          name: item.hashtag,
          noOfArticles: item.numberOfArticle,
        }));
        setResponseData(transformedData);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (error) {
      console.error(error);
      // Handle error state or display error message
    }
  };

  useEffect(() => {
    // callPostDashboard().then((response) => {
    //   const data = response;
    //   console.log("item: ", data);

    //   const transformedData = data.map((item) => ({
    //     name: `Tháng-${item.month}`,
    //     noOfUsers: item.noOfUsers,
    //   }));
    //   setRevenueData(transformedData);
    // });

    // callPostDashboard().then((response) => {
    //   const data = response;
    //   console.log("item: ", data);

    //   const transformedData = responseData.map((item) => ({
    //     name: `Tháng-${item.hashtag}`,
    //     noOfUsers: item.noOfUsers,
    //   }));
    //   setRevenueData(transformedData);
    // });

    callPostDashboard();
  }, []);
  return (
    <>
      <Card
        style={{
          width: 800,
          height: 400,
          justifyContent: "center",
          boxShadow: "2px 0.8rem 20px 5px rgba(0, 0, 0, .08)",
        }}
      >
        <div className="chart">
          <div
            className="title d-flex justify-content-center "
            style={{ fontFamily: "Petrona" }}
          >
            <h5>THỐNG KÊ CÁC BÀI VIẾT</h5>
          </div>
          <AreaChart
            width={750}
            height={300}
            data={responseData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradientRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="noOfArticles"
              stroke="#ff4d4d"
              fillOpacity={1}
              fill="url(#gradientRed)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              // fill={`url(#color${color})`}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
      </Card>
    </>
  );
};

export default EditorChart;
