import React from "react";
import getPostList from "../Home/getPostList";
import { useState, useEffect } from "react";
import { Row, Col, Table, Checkbox, Button } from "antd";

const MapArticles = () => {
  const { postList, document } = getPostList();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [listArticles, setListArticles] = useState([]);

  const [selectedMap, setSelectedMap] = useState([]);
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [selectedProvinceIds, setSelectedProvinceIds] = useState("");

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem(
      "selectedArticleIds",
      JSON.stringify(selectedArticleIds)
    );
    sessionStorage.setItem("selectedProvinceIds", selectedProvinceIds);
  });

  const data = listArticles.map((article) => ({
    provinceId: article.province.id,
    key: article.id,
    articleId: article.id,
    title: article.title,
    content: article.content,
    Generation: article.generation.generationName,
    Province: article.province.name,
  }));

  const loadArticles = async () => {
    const savedSelectedArticleIds = JSON.parse(
      sessionStorage.getItem("selectedArticleIds")
    );
    // const savedSelectedProvinceIds = sessionStorage.getItem(
    //   "selectedProvinceIds"
    // );

    // setSelectedArticleIds(savedSelectedArticleIds || []);
    // setSelectedProvinceIds(savedSelectedProvinceIds || "");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("jwtToken");
    const id = { id: user.id };
    const response = await fetch(
      "http://localhost:8084/general/list-articles",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
    }
    const data = await response.json();

    setListArticles(data);
    console.log(data);
  };
  useEffect(() => {
    loadArticles();

    // fetchUser();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "articleId",
      key: "articleId",
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Generation",
      dataIndex: "Generation",
      key: "Generation",
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
      title: "Map",
      dataIndex: "province",
      key: "province",
      render: (text, record) => (
        <Checkbox
          checked={selectedArticleIds.includes(record.key)}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
    },
  ];
  console.log("data", data);

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
  const handleCheckboxChange = (e) => {
    console.log(e);
    if (selectedProvinceIds === "" || e.provinceId === selectedProvinceIds) {
      setSelectedProvinceIds(e.provinceId);
      if (!selectedArticleIds.includes(e.articleId)) {
        setSelectedArticleIds([...selectedArticleIds, e.articleId]);
      } else {
        setSelectedArticleIds(
          selectedArticleIds.filter((id) => id !== e.articleId)
        );
      }
    } else {
      alert("Khác tỉnh");
    }
  };

  const handleSave = async () => {
    console.log("selected article:" + selectedArticleIds);
    console.log("selected province:" + selectedProvinceIds);
    try {
      const token = sessionStorage.getItem("jwtToken");
      const data = {
        provinceId: selectedProvinceIds,
        articleId: selectedArticleIds,
      };
      console.log(data);
      const response = await fetch(
        "http://localhost:8084/admin/update-geographic-articles",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
      }
      // Xử lý thành công
      console.log("Các bài viết đã được lưu thành công!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <div className="{styles.history_period}">{data}</div> */}
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
            footer={() => (
              <Button
                type="primary"
                onClick={handleSave}
                // disabled={selectedArticleIds.length === 0}
              >
                Save
              </Button>
            )}
          ></Table>
        </Col>
      </Row>
    </>
  );
};
export default MapArticles;
