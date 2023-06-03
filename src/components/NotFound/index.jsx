import "./notFound.scss";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-12 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">
                  Xin lỗi! Tôi không tìm thấy nội dung bạn tìm kiếm.
                </h3>

                <p>Bấm nút để quay trở lại.</p>

                <Link to="/" className="link_404">
                  TRANG CHỦ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
