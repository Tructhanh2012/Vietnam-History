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
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.account.user);
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
                  <div className="account_nav">
                    Welcome {user.userName}
                    <DownOutlined />
                  </div>
                </Space>
              </a>
            </Dropdown>
          </span>
        </div>
      </header>

      {/* content */}

      <Row>
        <Col md={5} offset={0} className="user-info">
          <Space direction="vertical" size={10} style={{ marginTop: 25 }}>
            <div className="profile-container">
              <div className="profile js-profile-card ">
                <div className="profile__img">
                  <img src={user.avatar} alt="profile card" />
                </div>
                <div className="profile-title">@{user.role}</div>
                <Row align="middle">
                  <div className="profile-card__cnt js-editor-cnt editor-profile mt-1">
                    <div className="username d-flex info">
                      <h5>Username: </h5>
                      <span className="information">{user.userName}</span>
                    </div>
                    <div className="email d-flex info ">
                      <h5>Email: </h5>
                      <span className="information">{user.email}</span>
                    </div>
                  </div>
                </Row>

                <Row>
                  <Col span={24} align="middle">
                    <div className="btn-edit">
                      <Button
                        className="btn-editprofile"
                        onClick={() => {
                          setIsModelOpen(true);
                        }}
                      >
                        Thay đổi thông tin
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Space>
        </Col>

        <Col md={15} offset={3} className="user-tab">
          <div className="tabs">
            <Tabs
              defaultActiveKey="1"
              onChange={onChange}
              items={items}
              style={{ animation: "pink" }}
              centered
              tabBarGutter={150}
              tabBarStyle={{ marign: 10, fontSize: 25 }}
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
