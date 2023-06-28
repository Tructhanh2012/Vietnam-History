import { NavLink } from "react-router-dom";
import imageLogo from "../../assets/logo.png";
import blogImg from "../../assets/blog.jpg";
import { Divider, Dropdown, Space, Breadcrumb } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./blog.scss";
import Meta from "antd/es/card/Meta";
import { Card, Col, Row } from "antd";
import Footer from "../../components/Footer";

const BreadcrumbRank = () => {
  return (
    <Breadcrumb
      style={{ marginLeft: 30, padding: 20 }}
      separator=">"
      items={[
        {
          title: "Trang chủ",
          href: "/",
        },
        {
          title: "Blog",
          href: "/blog",
        },
      ]}
    />
  );
};

const BlogPage = () => {
  const itemsDropdown = [
    {
      label: <label onClick={() => navigate("/")}>Trang chủ</label>,
      key: "homepage",
    },
    {
      label: <label onClick={() => navigate("/profile")}>Trang cá nhân</label>,
      key: "profile",
    },
    {
      label: <label onClick={() => navigate("/login")}>Đăng xuất</label>,
      key: "logout",
    },
  ];
  return (
    <>
      <header
        className="header"
        style={{
          position: "initial",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          //   marginBottom: 20,
          backgroundColor: "#333",
        }}
      >
        <div className="wrapper" style={{ padding: "10px" }}>
          <span className="logo">
            <NavLink to="/">
              <img alt="" src={imageLogo} />
            </NavLink>
          </span>

          <span
            className="user-dropdown"
            style={{ position: "absolute", right: "76px", gap: "5px" }}
          >
            <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault}>
                <Space>
                  @userName
                  {/* Welcome admin {user?.fullName} */}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </span>
        </div>
      </header>

      <div className="banner">
        <img className="banner-img" src={blogImg} />
        <span className="title">
          <h3>"Chia sẻ quá khứ, viết nên tương lai </h3>
          <h3>
            Hãy cùng nhau khám phá và chia sẻ lịch sử qua việc viết blog!"
          </h3>
        </span>
      </div>

      <BreadcrumbRank />
      <Divider orientation="left">
        <h6>Blog gần đây</h6>
      </Divider>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="cuztomize-row">
        <Col className="gutter-row" span={5} offset={2}>
          <Card
            // style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
              />
            }
          >
            <Meta
              title="Tuyên ngôn độc lập Dân chủ Cộng hòa"
              //description="This is the description"
            />
          </Card>
        </Col>
        <Col className="gutter-row" span={5}>
          <Card
            //style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
              />
            }
          >
            <Meta
              title="Tuyên ngôn độc lập Dân chủ Cộng hòa"
              //description="This is the description"
            />
          </Card>
        </Col>
        <Col className="gutter-row" span={5}>
          <Card
            // style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
              />
            }
          >
            <Meta
              title="Tuyên ngôn độc lập Dân chủ Cộng hòa"
              //description="This is the description"
            />
          </Card>
        </Col>
        <Col className="gutter-row" span={5}>
          <Card
            // style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
              />
            }
          >
            <Meta
              title="Tuyên ngôn độc lập Dân chủ Cộng hòa"
              //description="This is the description"
            />
          </Card>
        </Col>
      </Row>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
