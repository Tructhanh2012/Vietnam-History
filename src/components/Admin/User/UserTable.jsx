import {
  Col,
  Popconfirm,
  Row,
  Table,
  Pagination,
  Tag,
  notification,
  message,
} from "antd";
import InputSearch from "./InputSearch";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useState } from "react";
import UserUpdate from "./UserUpdate";

import { useEffect } from "react";
import axios from "../../../utils/axios-customize";

const UserTable = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [userCount, setUserCount] = useState(0);

  const fetchUser = async () => {
    // const token = sessionStorage.getItem("jwtToken");
    setIsLoading(true);
    // const res = await axios.get("admin/editors");
    const response = await axios.get("/admin/members");
    // const userList = [...res, ...response];
    setListUser(response);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, [dataUpdate]);

  const handleDeleUser = async (id) => {
    const token = sessionStorage.getItem("jwtToken");
    const response = await fetch("http://localhost:8084/admin/delete-user", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
    } else {
      message.success("Xóa người dùng thành công.");
      const data = await response.json();
      console.log("data", data);
      setListUser(data);
      fetchUser();
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "mail",
    },
    // {
    //   title: "Role",
    //   dataIndex: "date",
    //   key: "date",
    // },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color =
          role === "ADMIN" ? "gold" : role === "MEMBER" ? "geekblue" : "green";
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
      // filters: [
      //   {
      //     text: "Admin",
      //     value: "ADMIN",
      //   },
      //   {
      //     text: "Member",
      //     value: "MEMBER",
      //   },
      //   {
      //     text: "Editor",
      //     value: "EDITOR",
      //   },
      // ],
      // onFilter: (value, record) => record.role.indexOf(value) === 0,
      // sorter: (a, b) => a.role.length - b.role.length,
      // sortDirections: ["descend"],
    },
    {
      title: "Xóa",
      render: (text, record, index) => {
        return (
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa user"}
            description={"Bạn có chắc chắn muốn xóa user này?"}
            onConfirm={() => handleDeleUser(record.id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <span
              style={{
                cursor: "pointer",
                // , margin: "0 20px"
              }}
            >
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </span>
          </Popconfirm>
        );
      },
    },
    // {
    //   title: "Cập nhật",
    //   render: (text, record, index) => {
    //     return (
    //       <EditTwoTone
    //         twoToneColor="#f57800"
    //         style={{ cursor: "pointer" }}
    //         onClick={() => {
    //           setOpenModalUpdate(true);
    //           setDataUpdate(record);
    //         }}
    //       />
    //     );
    //   },
    // },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("check2 : ", pagination);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>{/* <InputSearch /> */}</Col>
        <Col span={22} offset={1}>
          <Table
            className="def"
            loading={isLoading}
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: 7,
              // total: total,
              position: ["bottomCenter"],
            }}
          ></Table>
        </Col>
      </Row>

      <UserUpdate
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        fetchUser={fetchUser}
      />
    </>
  );
};

export default UserTable;
