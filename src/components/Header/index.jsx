import { Nav, NavDropdown, Navbar, Offcanvas } from "react-bootstrap";
import { Button, Input } from "antd";
import "./header.scss";
import { SearchOutlined } from "@ant-design/icons";
import imageLogo from "../../assets/logo.png";
import { CgMenu } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const expand = "md";
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        className="d-flex navbar-custom"
      >
        <div>
          <Navbar.Brand
            className="logo"
            href="/"
          >
            <img
              alt=""
              src={imageLogo}
            />
          </Navbar.Brand>
        </div>
        <div className="navbar-rightside">
          <span className="input-search">
            <Input
              placeholder=""
              suffix={<SearchOutlined />}
            />
          </span>
          <span className="btn">
            <Button
              className="btn-login"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
          </span>
        </div>
      </Navbar>

      {isMobile ? (
        <Navbar
          variant="dark"
          expand={expand}
          className={`sub-navbar${showOffcanvas ? " show" : ""}`}
          style={{ backgroundColor: "black" }}
        >
          <Navbar.Toggle
            aria-controls="navbar-offcanvas"
            onClick={handleToggleOffcanvas}
          />
        </Navbar>
      ) : (
        <Navbar
          variant="dark"
          expand={expand}
          className="mb-3 sub-navbar"
          style={{ backgroundColor: "black" }}
        >
          <Nav
            fill
            className="w-100"
          >
            <Nav.Item>
              <Nav.Link
                href="/"
                eventKey="1"
              >
                Trang chủ
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/timeline"
                eventKey="2"
              >
                Dòng thời gian
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">Bảng xếp hạng</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item
              className="d-flex justify-content-center cgmenu"
              style={{ cursor: "pointer" }}
            >
              <CgMenu />
            </Nav.Item> */}

            <NavDropdown
              className="nav-dropdown"
              title={<CgMenu />}
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">
                Blog cá nhân
              </NavDropdown.Item>

              <NavDropdown.Item href="#action/3.3">Quizz</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      )}

      <Offcanvas
        show={showOffcanvas}
        onHide={handleToggleOffcanvas}
        placement="end"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav
            fill
            className="flex-column"
          >
            <Nav.Item>
              <Nav.Link
                href="/"
                eventKey="1"
              >
                Trang chủ
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">Dòng thời gian</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">Bảng xếp hạng</Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
