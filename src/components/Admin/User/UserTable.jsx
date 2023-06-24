import { Col, Popconfirm, Row, Table, Pagination } from "antd";
import InputSearch from "./InputSearch";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useState } from "react";
import UserUpdate from "./UserUpdate";
import { callGetListUser } from "../../../services/api";
import { useEffect } from "react";

const UserTable = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const fetchUser = async (keyword) => {
    setIsLoading(true);
    const res = await callGetListUser(keyword);
    const userList = res.map((user) => {
      const roleNames = user.roles.map((role) => role.name); // Lấy danh sách tên các vai trò của người dùng
      return {
        ...user,
        roleNames: roleNames.join(", "), // Gộp các tên vai trò thành một chuỗi, phân tách bằng dấu phẩy
      };
    });
    setListUser(userList);
    setIsLoading(false);
    // console.log("check role:", res);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDeleUser = async (userId) => {
    // const res = await callDeleteUser(userId);
    if (res && res.data) {
      message.success("Xoá user thành công");
      fetchUser();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userID",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Ngày đăng kí",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Role",
      dataIndex: "roleNames",
      key: "role",
    },
    {
      title: "Xóa",
      render: (text, record, index) => {
        return (
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa user"}
            description={"Bạn có chắc chắn muốn xóa user này?"}
            onConfirm={() => handleDeleUser(record._id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <span style={{ cursor: "pointer", margin: "0 20px" }}>
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </span>
          </Popconfirm>
        );
      },
    },
    {
      title: "Cập nhật",
      render: (text, record, index) => {
        return (
          <EditTwoTone
            twoToneColor="#f57800"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenModalUpdate(true);
              setDataUpdate(record);
            }}
          />
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("check2 : ", pagination);
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
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: 5,
              total: total,
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
      />
    </>
  );
};

export default UserTable;
