import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAPI } from "./services/api";

const Review = () => {
  const [data, setData] = useState([]);

  const fetchAPI = async () => {
    const api = await getAPI();
    setData(api);
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <Table
      columns={[
        {
          title: "id",
          dataIndex: "id",
        },
        {
          title: "title",
          dataIndex: "title",
        },
      ]}
      dataSource={data}
    />
  );
};

export default Review;
