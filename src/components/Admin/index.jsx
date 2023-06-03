import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import "./layout.scss";
import { Link, Outlet } from "react-router-dom";
import {
  UserAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HeartTwoTone,
  DownOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Layout, Menu, Dropdown, Space, Divider } from "antd";
import { useSelector } from "react-redux";
import { GrDashboard } from "react-icons/gr";
import { MdPersonAddAlt } from "react-icons/md";

const LayoutAdmin = () => {
  const { Content, Footer, Sider, Header } = Layout;

  const items = [
    {
      label: <Link to="/admin">Dashboard</Link>,
      key: "dashboard",
      icon: <GrDashboard />,
    },
    {
      label: <span>Người dùng</span>,
      // key: "user",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to="/admin/user">CRUD</Link>,
          key: "crud",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to="/admin/create-role">Tạo role</Link>,
          key: "addrole",
          icon: <UserAddOutlined />,
        },
      ],
    },
  ];
  const itemsDropdown = [
    {
      label: <label>Đăng xuất</label>,
      key: "logout",
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // const user = useSelector((state) => state.account.user);
  return (
    <Layout
      style={{ minHeight: "100vh", overflow: "hidden" }}
      className="layoutAdmin"
    >
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

      <Layout className="layoutAdmin__header">
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
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

            <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault}>
                <Space>
                  Welcome
                  {/* Welcome admin {user?.fullName} */}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content>
          <Outlet />
        </Content>

        <Footer style={{ padding: 0 }}>webname&copy; 2023.</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
