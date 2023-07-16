import { Col, Popconfirm, Row, Table, Pagination, Tag, message } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import ManageEventModal from "./ManageEventModal";
import EventViewDetail from "./EventViewDetail";
import { RxEyeClosed } from "react-icons/rx";

const ManageEvent = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [listArticles, setListArticles] = useState([]);
  const [articleId, setArticleId] = useState();

  const [dataViewDetail, setDataViewDetail] = useState();
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [editorInfor, setEditorInfor] = useState([]);

  const loadArticles = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");
    const id = { id: user.id };
    const response = await fetch(
      "http://localhost:8084/editor/articles-editor",
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
    console.log("log content", data);
    const infor = data.map((item) => item.editor);
    const firstInfor = infor[0];
    setEditorInfor(firstInfor);
    console.log("edt infor: ", firstInfor);
    setListArticles(data);
    console.log(data);
  };
  useEffect(() => {
    loadArticles();

    // fetchUser();
  }, []);

  const handleDeleteArticle = async (id) => {
    // const article = JSON.parse(sessionStorage.getItem("article"));
    const token = sessionStorage.getItem("jwtToken");
    // const id = { id: article.id };
    // console.log(id);
    const response = await fetch(
      "http://localhost:8084/editor/delete-article",
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
      message.success("Xóa bài viết thành công");
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

  const columns = [
    {
      title: "ID",
      dataIndex: "articleId",
      key: "articleId",
      // render: (text, record, index) => {
      //   return (
      //     <a
      //       href="#"
      //       onClick={() => {
      //         setDataViewDetail(record);
      //         setOpenViewDetail(true);
      //       }}
      //     >
      //       {record.articleId}
      //     </a>
      //   );
      // },
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
      filters: [
        {
          text: "Hồng Bàng & Văn Lang",
          value: "Hồng Bàng & Văn Lang",
        },
        {
          text: "Âu Lạc & Nam Việt",
          value: "Âu Lạc & Nam Việt",
        },
        {
          text: "Bắc thuộc",
          value: "Bắc thuộc",
        },
        {
          text: "Nhà Lý & nhà Triệu",
          value: "Nhà Lý & nhà Triệu",
        },
        {
          text: "Nhà Ngô",
          value: "Nhà Ngô",
        },
        {
          text: "Nhà Đinh",
          value: "Nhà Đinh",
        },
        {
          text: "Nhà Tiền Lê",
          value: "Nhà Tiền Lê",
        },
        {
          text: "Nhà Lý",
          value: "Nhà Lý",
        },
        {
          text: "Nhà Trần",
          value: "Nhà Trần",
        },
        {
          text: "Nhà Hồ",
          value: "Nhà Hồ",
        },
        {
          text: "Nhà Hậu Trần",
          value: "Nhà Hậu Trần",
        },
        {
          text: "Nhà Hậu Lê",
          value: "Nhà Hậu Lê",
        },
        {
          text: "Nam Bắc Triều",
          value: "Nam Bắc Triều",
        },
        {
          text: "Trịnh Nguyễn Phân Tranh",
          value: "Trịnh Nguyễn Phân Tranh",
        },
        {
          text: "Nhà Tây Sơn",
          value: "Nhà Tây Sơn",
        },
        {
          text: "Nhà Nguyễn",
          value: "Nhà Nguyễn",
        },
        {
          text: "Pháp Thuộc",
          value: "Pháp Thuộc",
        },
        {
          text: "Trưng Nữ Vương",
          value: "Trưng Nữ Vương",
        },
        {
          text: "Việt Nam Dân Chủ Cộng Hoà",
          value: "Việt Nam Dân Chủ Cộng Hoà",
        },
        {
          text: "Cộng hoà xã hội chủ nghĩa Việt Nam",
          value: "Cộng hoà xã hội chủ nghĩa Việt Nam",
        },
      ],
      onFilter: (value, record) => record.HashTag.indexOf(value) === 0,
      sorter: (a, b) => a.HashTag.length - b.HashTag.length,
      sortDirections: ["descend"],
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
              }}
            >
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </span>
          </Popconfirm>
        );
      },
    },
    {
      title: "tháng",
      dataIndex: "month",
      key: "month",
      responsive: ["none"],
    },
    {
      title: "editor infor",
      dataIndex: "editorInfor",
      key: "editor",
      render: (editorInfor) => editorInfor.email,
      responsive: ["none"],
    },
    {
      title: "Preview",
      render: (text, record, index) => {
        return (
          <RxEyeClosed
            style={{ cursor: "pointer", color: "#1159ab" }}
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          />
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
    articleId: article.id,
    title: article.title,
    content: article.content,
    HashTag: article.hashtagEntity.name,
    image: article.image,
    month: article.month,
    editorInfor: article.editor,
  }));

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
        loadArticles={loadArticles}
      />

      <EventViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
    </>
  );
};

export default ManageEvent;
