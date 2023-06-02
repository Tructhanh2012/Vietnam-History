import { Link } from "react-router-dom";
import imageLogo from "../../assets/logo.png";
import "./header.scss";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  return (
    <>
      <div className="fullHeader">
        <div className="header row">
          <div className="col-md-2 d-flex justify-content-center align-items-center">
            <img
              src={imageLogo}
              alt=""
            />
          </div>
          <div className="col-md-3"></div>
          <div className="search-bar col-md-4 d-flex justify-content-center align-items-center ">
            <div className="search">
              <input
                type="submit"
                value="Tìm kiếm"
              />
              <input
                type="text"
                name="search"
                placeholder="Nhập từ khóa tìm kiếm"
              />
            </div>
          </div>
          <div
            id="register"
            className=" col-md-1 d-flex justify-content-center align-items-center"
          >
            <Link to="/register">ĐĂNG KÝ</Link>
          </div>
          <div
            id="login"
            className="col-md-1 d-flex justify-content-center align-items-center"
          >
            <Link to="/login">ĐĂNG NHẬP </Link>
          </div>
        </div>
        <div id="main">
          <ul id="nav">
            <li>
              <Link to="/">TRANG CHỦ</Link>
            </li>
            <li>
              <Link to="">DÒNG THỜI GIAN</Link>
            </li>
            <li>
              <Link to="">QUIZ</Link>
            </li>
            <li>
              <a
                href=""
                className="more"
              >
                <AiOutlineMenu />
              </a>
              <ul className="subnav">
                <li>
                  <Link to="">Tư liệu</Link>
                </li>
                <li>
                  <Link to="">Tư liệu</Link>
                </li>
                <li>
                  <Link to="">Tư liệu</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
