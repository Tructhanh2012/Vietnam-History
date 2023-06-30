import { Col, Popconfirm, Row, Table, Pagination, Tag } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import ManageEventModal from "./ManageEventModal";

const ManageEvent = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  // const fetchUser = async (keyword) => {
  //   setIsLoading(true);
  //   const res = await callGetListUser(keyword);
  //   const userList = res;
  //   setListUser(userList);
  //   setIsLoading(false);
  // };

  useEffect(() => {
    // fetchUser();
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
      dataIndex: "eventID",
      key: "eventID",
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày viết",
      dataIndex: "date",
      key: "date",
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

  const data = [
    {
      key: "1",
      eventID: "1",
      date: "2020/07/02",
      title: "New York No. 1 Lake Park",
    },
    {
      key: "4",
      eventID: "1",
      date: "2020/07/02",
      title: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      eventID: "1",
      date: "2020/07/02",
      title: "New York No. 1 Lake Park",
    },
    {
      key: "13",
      eventID: "1",
      date: "2020/07/02",
      title: "New York No. 1 Lake Park",
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
      <Row gutter={[20, 20]} style={{ marginTop: 40 }}>
        <Col span={24}>{/* <InputSearch /> */}</Col>
        <Col span={22} offset={1}>
          <Table
            className="def"
            loading={isLoading}
            columns={columns}
            dataSource={data}
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

      <ManageEventModal
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
      />
    </>
  );
};

export default ManageEvent;
