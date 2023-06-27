import { Avatar, Button, Col, Dropdown, Row, Space, Tabs } from "antd";
import "./profile.scss";
import imageLogo from "../../assets/logo.png";
import FakeContent from "./Tab/FakeContent";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import ManageAccount from "./Account/ManageAccount";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import SavedArticle from "./Tab/SavedArticle";

const { TabPane } = Tabs;
const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: `Bài viết đã xem`,
    children: <FakeContent />,
  },
  {
    key: "2",
    label: `Bài viết đã lưu`,
    children: (
      <>
        <SavedArticle />
      </>
    ),
  },
  {
    key: "3",
    label: `Quizz đã làm`,
    children: <></>,
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(false);

  const itemsDropdown = [
    {
      label: <label onClick={() => navigate("/")}>Trang chủ</label>,
      key: "homepage",
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
          marginBottom: 20,
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

      {/* content */}

      <Row>
        <Col md={4} offset={1} className="user-info">
          <Space direction="vertical" size={10} style={{ marginTop: 25 }}>
            <Avatar
              size={100}
              icon={<UserOutlined />}
              style={{ marginLeft: 45 }}
            />
            <div className="username" style={{ marginLeft: 55 }}>
              user fullname
            </div>
            <Button onClick={() => setIsModelOpen(true)}>
              Thay đổi thông tin cá nhân
            </Button>
          </Space>
        </Col>

        <Col md={18} offset={1} className="user-tab">
          <div className="tabs">
            <Tabs
              defaultActiveKey="1"
              onChange={onChange}
              items={items}
              centered
              tabBarGutter={150}
              tabBarStyle={{ marign: 10, fontSize: 30 }}
            />
          </div>
        </Col>
      </Row>

      <ManageAccount
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
      />

      <div className="footer">
        <Footer />
      </div>
    </>
  );
};
export default ProfilePage;
