import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../../assets/logo.png";
import "./footer.scss";
import { Divider } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer row">
          <div>
            <Divider />
          </div>
          <div className="d-flex ">
            <div className="col-md-3 d-flex justify-content-center align-items-center">
              <div className="footer-logo">
                <img className="logo" alt="" src={imageLogo} />
                <p>LichSuVietNam&copy; 2023</p>
              </div>
            </div>
            <div className="footer-contact col-md-3 d-flex justify-content-center align-items-center">
              <div>
                <h6>Liên hệ:</h6>
                <div className="footer-item d-flex">
                  <span>
                    <FiPhone />
                  </span>
                  <p>: 081 789 4658</p>
                </div>
                <div className="footer-item d-flex">
                  <span>
                    <MailOutlined />
                  </span>
                  <p> : lichsuVN@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="footer-about col-md-6 d-flex justify-content-center align-items-center">
              <div>
                <h6>Về chúng tôi:</h6>
                <p>
                  "Lịch sử Việt Nam" được thành lập để cung cấp các thông tin
                  chi tiết và chính xác về lịch sử, văn hóa, địa lý và nhiều chủ
                  đề khác liên quan đến Việt Nam. Chúng tôi muốn tạo ra một
                  không gian để mọi người có thể trải nghiệm và cảm nhận về quá
                  khứ của đất nước và con người Việt Nam một cách đầy hứng thú.
                </p>
                <p>
                  Chúng tôi hi vọng rằng trang web của chúng tôi sẽ giúp người
                  đọc hiểu rõ hơn về lịch sử và văn hóa của Việt Nam, từ những
                  chi tiết nhỏ nhất đến những sự kiện lịch sử quan trọng. Chúng
                  tôi cũng muốn khơi dậy sự tò mò và hứng thú về lịch sử của
                  người đọc thông qua các bài viết và thông tin trên trang web.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
