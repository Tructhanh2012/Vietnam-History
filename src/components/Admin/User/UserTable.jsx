import { Col, Row, Table } from "antd";
import InputSearch from "./InputSearch";

const UserTable = () => {
  const data = [
    {
      key: "1",
      No: "1",
      email: "admin@gmail.com",
      userName: "admin",
      role: "ad",
    },
    {
      key: "2",
      No: "2",
      email: "user@gmail.com",
      userName: "user",
      role: "us",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "userID",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <InputSearch />
      </Col>
      <Col span={24}>
        <Table
          className="def"
          columns={columns}
          dataSource={data}
          onChange={onChange}
        ></Table>
      </Col>
    </Row>
  );
};

export default UserTable;
