import { UserOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Col, Divider, Rate, Row, Space } from "antd";
import "./article.scss";

const ArticleDetails = () => {
  const BreadcrumbArticle = () => {
    return (
      <Breadcrumb
        style={{ marginLeft: 30, padding: 20, paddingBottom: 0 }}
        separator=">"
        items={[
          {
            // key: "home",
            title: "Trang chủ",
            href: "/",
          },
          {
            // key: "timeline",
            title: "Tư liệu",
            // href: "/",
          },
        ]}
      />
    );
  };

  return (
    <>
      <BreadcrumbArticle />
      <div className="article-container">
        <Row gutter={[20, 20]}>
          <Col md={17} xs={24} offset={1}>
            <div className="title" style={{ textAlign: "center" }}>
              <h2>Lịch sử chữ tiếng Việt</h2>
            </div>

            <div className="text">
              <p>
                Tiếng Việt là ngôn ngữ của người Việt và là ngôn ngữ chính thức
                của Việt Nam. Trong lịch sử Việt Nam đã có ba loại văn tự được
                dùng để ghi chép tiếng Việt là chữ Hán, chữ Nôm và chữ quốc ngữ.
                Chữ Hán và chữ Nôm là văn tự ngữ tố, mỗi chữ Hán và chữ Nôm biểu
                thị một hoặc một số âm tiết. Chữ quốc ngữ đã bắt đầu được sử
                dụng chính thức tại Việt Nam vào đầu thế kỷ XX.
              </p>
              <div className="image" style={{ width: "70%" }}>
                <img
                  className="image_content"
                  style={{
                    width: "100%",
                  }}
                  src="https://nguoikesu.com/images/wiki/tinh-quang-tri/57f4d51ba53a286dab4f743cd619a8f0.jpg"
                />
              </div>
              <p>
                Vai trò của chữ Hán để ghi chép tiếng Việt chủ yếu là ghi lại
                các yếu tố Hán-Việt có trong văn bản Nôm, ngoài ra, chữ Hán cũng
                là thành tố quan trọng để tạo ra chữ Nôm. Từ đầu công nguyên đến
                thế kỷ X, Việt Nam chịu sự đô hộ của phong kiến Trung Hoa, chữ
                Hán và tiếng Hán được giới quan lại cai trị áp đặt sử dụng. Theo
                Đào Duy Anh thì nước Việt bắt đầu có Hán học khi viên Thái thú
                Sĩ Nhiếp (137 - 226) đã dạy dân Việt thi thư. Trong khoảng thời
                gian hơn một ngàn năm, hầu hết các bài văn khắc trên tấm bia đều
                bằng chữ Hán. Có ý kiến cho rằng chữ Hán đã hiện diện ở Việt Nam
                từ trước Công nguyên, dựa trên suy diễn về dấu khắc được coi là
                chữ trên một con dao găm . Tuy nhiên đó là lúc chữ Hán chưa hình
                thành, và trên các trống đồng Đông Sơn có thời kỳ 700 TCN - 100
                SCN thì hiện diện "các chữ của người Việt cổ" chưa được minh
                giải, và chưa có tư liệu xác định vào thời kỳ trước Công nguyên
                cư dân Việt cổ đã sử dụng chữ. Từ sau thế kỷ thứ X, tuy Việt Nam
                giành được độc lập tự chủ, nhưng chữ Hán và tiếng Hán vẫn tiếp
                tục là một phương tiện chính trong việc ghi chép và trước tác.
                Đến cuối thế kỷ 19 - đầu thế kỷ 20 thì bị thay thế bởi chữ Quốc
                ngữ. Nền khoa bảng Việt Nam dùng chữ Hán chấm dứt ở kỳ thi cuối
                cùng năm 1919.
              </p>
              <div className="article_comment">
                <Rate />
                <Divider style={{ margin: 10 }} />
                <div
                  className="comment"
                  style={{
                    display: "flex",
                    alignItems: "space",
                    justifyContent: "space-around",
                  }}
                >
                  <Avatar size={60} icon={<UserOutlined />} />
                  <input
                    //   placeholder="Hãy viết bình luận của bạn..."
                    style={{ width: "80%", height: "80px" }}
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col md={4} xs={0} offset={1}>
            <Space direction={"vertical"} size={500}>
              <Row gutter={[0, 30]}></Row>
              <Row>
                <h6>Tư liệu</h6>
                <Divider style={{ margin: "5px 0" }} />
                <div className="homepage-ending-doc-content">
                  <div className="doc">
                    <p> &gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                  <div className="doc">
                    <p>&gt; Chiến dịch mùa xuân 1975</p>
                  </div>
                </div>
              </Row>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ArticleDetails;
