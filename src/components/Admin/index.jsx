import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import "./layout.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  UserAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HeartTwoTone,
  DownOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Layout, Menu, Dropdown, Space, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GrDashboard } from "react-icons/gr";
import { MdPersonAddAlt } from "react-icons/md";

const LayoutAdmin = () => {
  // const isAuthenticated = window.location.pathname.startsWith("/admin");
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  const { Content, Footer, Sider, Header } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(doLogoutAction());
  //   navigate("/");
  // };
  const items = [
    {
      label: <Link to="/admin">Dashboard</Link>,
      key: "dashboard",
      icon: <GrDashboard size="1.5em" />,
    },
    {
      label: <span>Người dùng</span>,
      // key: "user",
      icon: <UserOutlined style={{ fontSize: "1.5em" }} />,
      children: [
        {
          label: <Link to="/admin/user">Quản lý Account</Link>,
          key: "crud",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to="/admin/create-role">Tạo Account</Link>,
          key: "addrole",
          icon: <UserAddOutlined />,
        },
      ],
    },
  ];
  const itemsDropdown = [
    {
      label: (
        <label
        // onClick={handleLogout}
        >
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
    {
      label: <label onClick={() => navigate("/")}>Trang chủ</label>,
      key: "logout",
    },
  ];

  const [collapsed, setCollapsed] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // const user = useSelector((state) => state.account.user);
  return (
    <Layout
      style={{ minHeight: "100vh", overflow: "hidden" }}
      className="layoutAdmin"
    >
      {isAuthenticated && userRole === "ADMIN" && (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="layoutAdmin__title">
            <div
              style={{
                height: 32,
                margin: 16,
                textAlign: "center",
                fontSize: "large",
                marginTop: "30px",
              }}
            >
              Admin
              <Divider />
            </div>
          </div>

          <Menu
            defaultSelectedKeys={[activeMenu]}
            mode="inline"
            items={items}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
      )}
      <Layout className="layoutAdmin__header">
        {isAuthenticated && userRole === "ADMIN" && (
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              // height: "20%",
            }}
          >
            <div
              className="layoutAdmin__header__welcome"
              // style={{ position: "absolute", right: "15px" }}
            >
              <span>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </span>

              {/* <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault}>
                  <Space>
                    Welcome{user?.userName}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown> */}
            </div>
          </Header>
        )}
        <Content>
          <Outlet />
        </Content>
        {isAuthenticated && userRole === "ADMIN" && (
          <Footer
            style={{ padding: 0, display: "flex", justifyContent: "center" }}
          >
            webname&copy; 2023.
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
