import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import "./layout.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  UserAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Layout, Menu, Dropdown, Space, Divider, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GrDashboard } from "react-icons/gr";
import { BiNavigation } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";

const LayoutAdmin = (props) => {
  const { user, token } = props;
  const { Content, Footer, Sider, Header } = Layout;
  const navigate = useNavigate();

  const [isSubmit, setIsSubmit] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    message.success("Đăng xuất thành công");
    // const { username, password } = values;
    // setIsSubmit(true);
    // const res = await callLogout(username, password);
    // setIsSubmit(false);
    // if (res && res.status === 404) {
    //   console.log("check res logout", res.status);
    //   dispatch(doLogoutAction());
    //   navigate("/login");
    // } else {
    //   notification.error({
    //     message: "Có lỗi xảy",
    //     description: res.message,
    //     duration: 5,
    //   });
    // }
  };
  const items = [
    {
      label: <Link to="/admin">Dashboard</Link>,
      key: "dashboard",
      icon: <GrDashboard size="1.5em" />,
    },
    {
      label: <span>Quản lí </span>,
      key: "crud",
      icon: <MdOutlineManageAccounts style={{ fontSize: "1.8em" }} />,
      children: [
        {
          label: <Link to="/admin/member">MEMBER</Link>,
          key: "crud-member",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to="/admin/editor">EDITOR</Link>,
          key: "crud-editor",
          icon: <UserOutlined />,
        },
      ],
    },
    {
      label: <Link to="/admin/create-role">Tạo Account</Link>,
      key: "addrole",
      icon: <UserAddOutlined style={{ fontSize: "1.5em" }} />,
    },
    {
      label: <span>Điều hướng</span>,
      icon: <BiNavigation size="1.5em" />,
      children: [
        {
          label: <Link to="/">Trang chủ</Link>,
          key: "homepage",
          icon: <HiOutlineHome />,
        },
        {
          label: (
            <Link to="/login">
              <Button onClick={handleLogout}>Đăng xuất</Button>
            </Link>
          ),
          key: "logout",
          icon: <AiOutlineLogout />,
        },
      ],
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
        <Content>
          <Outlet />
        </Content>
        <Footer
          style={{ padding: 0, display: "flex", justifyContent: "center" }}
        >
          lichsuVietNam&copy; 2023.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
