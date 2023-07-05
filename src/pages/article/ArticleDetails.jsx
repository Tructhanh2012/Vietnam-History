import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Rate,
  Row,
  Space,
} from "antd";
import "./article.scss";
import { callGetSingleEvent } from "../../services/api";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticleDetails = () => {
  const BreadcrumbArticle = () => {
    return (
      <Breadcrumb
        style={{
          marginLeft: 30,
          padding: 20,
          paddingBottom: 40,
          paddingTop: 44,
        }}
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
  // const [events, setEvents] = useState(null);
  // let location = useLocation();

  // let params = new URLSearchParams(location.search);
  // const eventId = params.get("eventId");
  // // const eventId = 1;

  // // const eventId = location.state.eventId;
  // const fetchContent = async (eventId) => {
  //   console.log("log eventID: ", eventId);
  //   const res = await callGetSingleEvent(eventId);
  //   console.log("check res single page:", res);
  //   if (res && res?.eventForm) {
  //     let raw = res.eventForm;
  //     console.log("rew", raw);
  //     setEvents(raw);
  //   }
  // };
  // useEffect(() => {
  //   console.log("log eventId: ", eventId);

  //   fetchContent(eventId);
  // }, [eventId]);

  return (
    <>
      <Divider orientation="left">
        <BreadcrumbArticle />
      </Divider>
      <div className="article-container">
        <Row gutter={[20, 20]}>
          <Col md={17} xs={24} offset={1}>
            <div className="title" style={{ textAlign: "center" }}>
              <h2>Lịch sử Chữ viết tiếng Việt Tư Liệu Lịch Sử</h2>
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
                  src="https://nguoikesu.com/images/wiki/chu-viet-tieng-viet/7a11260bfe022f168fe3999dba77cadc.jpg"
                />
              </div>
              <h5>
                Các dạng chữ viết tiếng Việt từng được sử dụng trong lịch sử
              </h5>
              <p>
                {" "}
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
                cùng năm 1919. Chữ Nôm Dù chữ Hán có sức sống mạnh mẽ đến đâu
                chăng nữa, một văn tự "ngoại lai" không thể nào đáp ứng, và thậm
                chí được cho là "bất lực" trước đòi hỏi, yêu cầu của việc trực
                tiếp ghi chép hoặc diễn đạt lời ăn tiếng nói cùng tâm tư, suy
                nghĩ và tình cảm của người Việt, khiến chữ Nôm ra đời để bù đắp
                vào chỗ mà chữ Hán chưa đáp ứng được. Chữ Nôm là một loại văn tự
                xây dựng trên cơ sở đường nét, thành tố và phương thức cấu tạo
                của chữ Hán để ghi chép từ Việt và tiếng Việt. Quá trình hình
                thành chữ Nôm có thể chia thành hai giai đoạn: Giai đoạn đầu,
                tạm gọi là giai đoạn "đồng hóa chữ Hán", tức là dùng chữ Hán để
                phiên âm các từ Việt thường là tên người, tên vật, tên đất, cây
                cỏ chim muông, đồ vật... xuất hiện lẻ tẻ trong văn bản Hán.
                Những từ chữ Nôm này xuất hiện vào thế kỷ đầu sau Công nguyên
                (đặc biệt rõ nét nhất vào thế kỷ thứ 6). Giai đoạn sau: Ở giai
                đoạn này, bên cạnh việc tiếp tục dùng chữ Hán để phiên âm từ
                tiếng Việt, đã xuất hiện những chữ Nôm tự tạo theo một số nguyên
                tắc nhất định. Loại chữ Nôm tự tạo này, sau phát triển theo
                hướng ghi âm, nhằm ghi chép ngày một sát hơn, đúng hơn với tiếng
                Việt. Từ thời Lý thế kỷ thứ XI đến đời Trần thế kỷ XIV thì hệ
                thống chữ Nôm mới thực sự hoàn chỉnh. Theo sử sách đến nay còn
                ghi lại được một số tác phẩm đã được viết bằng chữ Nôm như đời
                Trần có cuốn Thiền Tông Bản Hạnh. Đến thế kỷ 18 - 19 chữ Nôm đã
                phát triển tới mức cao, át cả địa vị chữ Hán. Các tác phẩm như
                hịch Tây Sơn, Khoa thi hương dưới thời Quang Trung (1789) đã có
                bài thi làm bằng chữ Nôm. Truyện Kiều của Nguyễn Du cũng được
                viết bằng chữ Nôm là những ví dụ. Chữ Hán và chữ Nôm có những
                khác nhau cơ bản về lịch sử ra đời, mục đích sử dụng và mỗi chữ
                có bản sắc riêng về văn hóa…
              </p>
              <div className="article_comment ">
                {/* <Divider /> */}
                <div className="d-flex justify-content-between">
                  <Rate />
                  <Button>Quizz thôi!!</Button>
                </div>
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
                <Divider orientation="left" style={{ margin: "10px 0" }}>
                  <h6>Tham khảo</h6>
                </Divider>
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
