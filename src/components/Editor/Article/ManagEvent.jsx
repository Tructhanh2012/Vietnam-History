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
      title: "Triều đại",
      dataIndex: "Generation",
      key: "Generation",
      filters: [
        {
          text: "HỒNG BÀNG VÀ VĂN LANG",
          value: "HỒNG BÀNG VÀ VĂN LANG",
        },
        {
          text: "ÂU LẠC & NAM VIỆT",
          value: "ÂU LẠC & NAM VIỆT",
        },
        {
          text: "BẮC THUỘC",
          value: "BẮC THUỘC",
        },
        {
          text: "TRƯNG NỮ VƯƠNG",
          value: "TRƯNG NỮ VƯƠNG",
        },
        {
          text: "NHÀ LÝ & NHÀ TRIỆU",
          value: "NHÀ LÝ & NHÀ TRIỆU",
        },
        {
          text: "NHÀ NGÔ",
          value: "NHÀ NGÔ",
        },
        {
          text: "NHÀ ĐINH",
          value: "NHÀ ĐINH",
        },
        {
          text: "NHÀ TIỀN LÊ",
          value: "NHÀ TIỀN LÊ",
        },
        {
          text: "NHÀ LÝ",
          value: "NHÀ LÝ",
        },
        {
          text: "NHÀ TRẦN",
          value: "NHÀ TRẦN",
        },
        {
          text: "NHÀ HỒ",
          value: "NHÀ HỒ",
        },
        {
          text: "NHÀ HẬU TRẦN",
          value: "NHÀ HẬU TRẦN",
        },
        {
          text: "NHÀ HẬU LÊ",
          value: "NHÀ HẬU LÊ",
        },
        {
          text: "NAM BẮC TRIỀU",
          value: "NAM BẮC TRIỀU",
        },
        {
          text: "TRỊNH NGUYỄN PHÂN TRANH",
          value: "TRỊNH NGUYỄN PHÂN TRANH",
        },
        {
          text: "NHÀ TÂY SƠN",
          value: "NHÀ TÂY SƠN",
        },
        {
          text: "NHÀ NGUYỄN",
          value: "NHÀ NGUYỄN",
        },
        {
          text: "PHÁP THUỘC",
          value: "PHÁP THUỘC",
        },

        {
          text: "VIỆT NAM DÂN CHỦ CỘNG HOÀ",
          value: "VIỆT NAM DÂN CHỦ CỘNG HOÀ",
        },
        {
          text: "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
          value: "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        },
      ],
      onFilter: (value, record) => record.Generation.indexOf(value) === 0,
      sorter: (a, b) => a.Generation.length - b.Generation.length,
      sortDirections: ["descend"],
    },
    {
      title: "Tỉnh",
      dataIndex: "Province",
      key: "Province",
      filters: [
        {
          text: "An Giang",
          value: "An Giang",
        },
        {
          text: "Bà Rịa - Vũng Tàu",
          value: "Bà Rịa - Vũng Tàu",
        },
        {
          text: "Bắc Giang",
          value: "Bắc Giang",
        },
        {
          text: "Bắc Kạn",
          value: "Bắc Kạn",
        },
        {
          text: "Bạc Liêu",
          value: "Bạc Liêu",
        },
        {
          text: "Bắc Ninh",
          value: "Bắc Ninh",
        },
        {
          text: "Bến Tre",
          value: "Bến Tre",
        },
        {
          text: "Bình Dương",
          value: "Bình Dương",
        },
        {
          text: "Bình Định",
          value: "Bình Định",
        },
        {
          text: "Bình Phước",
          value: "Bình Phước",
        },
        {
          text: "Bình Thuận",
          value: "Bình Thuận",
        },
        {
          text: "Cà Mau",
          value: "Cà Mau",
        },
        {
          text: "Cần Thơ",
          value: "Cần Thơ",
        },
        {
          text: "Cao Bằng",
          value: "Cao Bằng",
        },
        {
          text: "Đà Nẵng",
          value: "Đà Nẵng",
        },
        {
          text: "Đắk Lắk",
          value: "Đắk Lắk",
        },
        {
          text: "Đắk Nông",
          value: "Đắk Nông",
        },
        {
          text: "Điện Biên",
          value: "Điện Biên",
        },
        {
          text: "Đồng Nai",
          value: "Đồng Nai",
        },
        {
          text: "Đồng Tháp",
          value: "Đồng Tháp",
        },
        {
          text: "Gia Lai",
          value: "Gia Lai",
        },
        {
          text: "Hà Giang",
          value: "Hà Giang",
        },
        {
          text: "Hà Nam",
          value: "Hà Nam",
        },
        {
          text: "Hà Nội",
          value: "Hà Nội",
        },
        {
          text: "Hà Tĩnh",
          value: "Hà Tĩnh",
        },
        {
          text: "Hải Dương",
          value: "Hải Dương",
        },
        {
          text: "Hải Phòng",
          value: "Hải Phòng",
        },
        {
          text: "Hậu Giang",
          value: "Hậu Giang",
        },
        {
          text: "Hòa Bình",
          value: "Hòa Bình",
        },
        {
          text: "Hưng Yên",
          value: "Hưng Yên",
        },
        {
          text: "Khánh Hòa",
          value: "Khánh Hòa",
        },
        {
          text: "Kiên Giang",
          value: "Kiên Giang",
        },
        {
          text: "Kon Tum",
          value: "Kon Tum",
        },
        {
          text: "Lai Châu",
          value: "Lai Châu",
        },
        {
          text: "Lâm Đồng",
          value: "Lâm Đồng",
        },
        {
          text: "Lạng Sơn",
          value: "Lạng Sơn",
        },
        {
          text: "Lào Cai",
          value: "Lào Cai",
        },
        {
          text: "Long An",
          value: "Long An",
        },

        {
          text: "Nam Định",
          value: "Nam Định",
        },
        {
          text: "Nghệ An",
          value: "Nghệ An",
        },
        {
          text: "Ninh Bình",
          value: "Ninh Bình",
        },
        {
          text: "Ninh Thuận",
          value: "Ninh Thuận",
        },
        {
          text: "Phú Thọ",
          value: "Phú Thọ",
        },
        {
          text: "Phú Yên",
          value: "Phú Yên",
        },
        {
          text: "Quảng Bình",
          value: "Quảng Bình",
        },
        {
          text: "Quảng Nam",
          value: "Quảng Nam",
        },
        {
          text: "Quảng Ngãi",
          value: "Quảng Ngãi",
        },
        {
          text: "Quảng Ninh",
          value: "Quảng Ninh",
        },
        {
          text: "Quảng Trị",
          value: "Quảng Trị",
        },
        {
          text: "Sóc Trăng",
          value: "Sóc Trăng",
        },
        {
          text: "Sơn La",
          value: "Sơn La",
        },
        {
          text: "Tây Ninh",
          value: "Tây Ninh",
        },
        {
          text: "Thái Bình",
          value: "Thái Bình",
        },
        {
          text: "Thái Nguyên",
          value: "Thái Nguyên",
        },
        {
          text: "Thanh Hóa",
          value: "Thanh Hóa",
        },
        {
          text: "Thừa Thiên Huế",
          value: "Thừa Thiên Huế",
        },
        {
          text: "Tiền Giang",
          value: "Tiền Giang",
        },
        {
          text: "TP.Hồ Chí Minh",
          value: "TP.Hồ Chí Minh",
        },
        {
          text: "Trà Vinh",
          value: "Trà Vinh",
        },
        {
          text: "Tuyên Quang",
          value: "Tuyên Quang",
        },
        {
          text: "Vĩnh Long",
          value: "Vĩnh Long",
        },
        {
          text: "Vĩnh Phúc",
          value: "Vĩnh Phúc",
        },
        {
          text: "Yên Bái",
          value: "Yên Bái",
        },
      ],
      onFilter: (value, record) => record.Province.indexOf(value) === 0,
      sorter: (a, b) => a.Province.length - b.Province.length,
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
    Generation: article.generation.generationName,
    Province: article.province.name,
    image: article.image,
    month: article.month,
    editorInfor: article.editor,
  }));
  console.log("log test:", listArticles);

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
