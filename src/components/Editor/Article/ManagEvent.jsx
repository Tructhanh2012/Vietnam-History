import { Col, Popconfirm, Row, Table, Pagination, Tag } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import ManageEventModal from "./ManageEventModal";

const ManageEvent = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [listArticles, setListArticles] = useState([]);
  const [articleId, setArticleId] = useState();

  useEffect(() => {
    const loadArticles = async () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const token = sessionStorage.getItem("jwtToken");
      const id = { id: user.id };
      const response = await fetch(
        "https://vietnamhistory-production.up.railway.app/editor/articles-editor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(id),
        }
      );
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
      }
      const data = await response.json();
      setListArticles(data);
      console.log(data);
    };
    loadArticles();

    // fetchUser();
  }, []);

  const handleDeleteArticle = async (id) => {
    // const article = JSON.parse(sessionStorage.getItem("article"));
    const token = sessionStorage.getItem("jwtToken");
    // const id = { id: article.id };
    // console.log(id);
    const response = await fetch(
      "https://vietnamhistory-production.up.railway.app/editor/delete-article",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(id),
        body: JSON.stringify({ id: id }),
      }
    );
    if (response.ok) {
      setListArticles((prevList) =>
        prevList.filter((article) => article.id !== id)
      );
      // Xử lý kết quả thành công
      console.log("Xóa dữ liệu thành công");
    } else {
      // Xử lý lỗi
      console.error("Lỗi khi xóa dữ liệu");
    }
  };
  const handleEditArticle = (record) => {
    setOpenModalUpdate(true);
    setDataUpdate(record);
  };
  const handleUpdateArticle = async (articleData) => {
    const token = sessionStorage.getItem("jwtToken");
    const response = await fetch(
      "https://vietnamhistory-production.up.railway.app/editor/edit-article",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      }
    );
    if (response.ok) {
      // Update the article in the listArticles state with the updated data
      setListArticles((prevList) =>
        prevList.map((article) =>
          article.id === articleData.id ? articleData : article
        )
      );
      console.log("Cập nhật bài viết thành công");
    } else {
      console.error("Lỗi khi cập nhật bài viết");
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
      title: "HashTag",
      dataIndex: "HashTag",
      key: "HashTag",
    },
    {
      title: "Xóa",
      render: (text, record, index) => {
        return (
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa bài viết"}
            description={"Bạn có chắc chắn muốn xóa bài viết này?"}
            onConfirm={() => handleDeleteArticle(record.key)}
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
            onClick={() => handleEditArticle(record)}
          />
        );
      },
    },
  ];
  const data = listArticles.map((article) => ({
    key: article.id,
    eventID: article.id,
    title: article.title,
    HashTag: article.hashtagEntity.name,
  }));
  // const data = [
  //   {
  //     key: "1",
  //     eventID: "1",
  //     date: "2020/07/02",
  //     title: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     eventID: "1",
  //     date: "2020/07/02",
  //     title: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     eventID: "1",
  //     date: "2020/07/02",
  //     title: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "13",
  //     eventID: "1",
  //     date: "2020/07/02",
  //     title: "New York No. 1 Lake Park",
  //   },
  // ];

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
      <Row
        gutter={[20, 20]}
        style={{ marginTop: 40 }}
      >
        <Col span={24}>{/* <InputSearch /> */}</Col>
        <Col
          span={22}
          offset={1}
        >
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
        handleUpdateArticle={handleUpdateArticle}
      />
    </>
  );
};

export default ManageEvent;
