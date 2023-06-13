import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAPI } from "./services/api";

const Review = () => {
  const [data, setData] = useState([]);

  const fetchAPI = async () => {
    const api = await getAPI();
    // console.log(api);
    setData(api);
  };

  //   const getData = async () => {
  //     const data = await axios.get("https://jsonplaceholder.typicode.com/todos");
  //     console.log(data);
  //   };
  useEffect(() => {
    // getData();
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
