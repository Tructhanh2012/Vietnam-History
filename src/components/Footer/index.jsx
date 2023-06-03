import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../../assets/logo.png";
import phone from "../../assets/phone.png";
import gmail from "../../assets/gmail.png";
import "./footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footer row">
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div>
            <img className="logo-icon1" alt="" src={imageLogo} />
            <p>website_name 2023</p>
          </div>
        </div>
        <div className="footer-contact col-md-3 d-flex justify-content-center align-items-center">
          <div>
            <p>Liên hệ</p>
            <div className="footer-item d-flex">
              <img
                className="vector-icon75"
                alt=""
                src={phone}
                style={{ width: "25px", height: "25px", paddingRight: "5px" }}
              />
              <p>: 081 789 4658</p>
            </div>
            <div className="footer-item d-flex">
              <img
                className="vector-icon76"
                alt=""
                src={gmail}
                style={{ width: "30px", height: "25px", paddingRight: "5px" }}
              />
              <p>: websitename@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="footer-about col-md-6 d-flex justify-content-center align-items-center">
          <div>
            <h5>About us:</h5>
            <p>
              wbsitename được thành lập để cung cấp các thông tin chi tiết và
              chính xác về lịch sử, văn hóa, địa lý và nhiều chủ đề khác liên
              quan đến Việt Nam. Chúng tôi muốn tạo ra một không gian để mọi
              người có thể trải nghiệm và cảm nhận về quá khứ của đất nước và
              con người Việt Nam một cách đầy hứng thú.
            </p>
            <p>
              Chúng tôi hi vọng rằng trang web của chúng tôi sẽ giúp người đọc
              hiểu rõ hơn về lịch sử và văn hóa của Việt Nam, từ những chi tiết
              nhỏ nhất đến những sự kiện lịch sử quan trọng. Chúng tôi cũng muốn
              khơi dậy sự tò mò và hứng thú về lịch sử của người đọc thông qua
              các bài viết và thông tin trên trang web.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
