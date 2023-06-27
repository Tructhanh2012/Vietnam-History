import { Col, Popconfirm, Row, Table, Pagination, Tag } from "antd";
import InputSearch from "./InputSearch";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useState } from "react";
import UserUpdate from "./UserUpdate";
import { callDeleteUser, callGetListUser } from "../../../services/api";
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
    const userList = res;
    setListUser(userList);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDeleUser = async (userId) => {
    const res = await callDeleteUser(userId);
    if (res && res.responeMessage) {
      message.success("Xoá user thành công");
      fetchUser();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.responeMessage,
      });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
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
    },
    {
      title: "Xóa",
      render: (text, record, index) => {
        return (
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa user"}
            description={"Bạn có chắc chắn muốn xóa user này?"}
            onConfirm={() => handleDeleUser(record.userId)}
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
