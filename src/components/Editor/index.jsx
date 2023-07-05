import { Button, Divider, Dropdown, Layout, Menu, Space } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React from "react";
import { GrArticle, GrDashboard } from "react-icons/gr";
import { TfiWrite } from "react-icons/tfi";
import { TiDocumentAdd } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";

import { MdOutlineQuiz } from "react-icons/md";
import { BiSelectMultiple } from "react-icons/bi";

const EditorLayout = () => {
  const { Content, Footer, Sider, Header } = Layout;

  const items = [
    {
      label: <Link to="/">Trang Chủ</Link>,
      key: "editor-dashboard",
      icon: <AiOutlineHome size="1.5em" />,
    },
    {
      label: <Link to="/editor">Dashboard</Link>,
      key: "editor-dashboard",
      icon: <GrDashboard size="1.5em" />,
    },
    {
      label: <span>Bài viết</span>,
      icon: <GrArticle size="1.5em" />,
      children: [
        {
          label: <Link to="/editor/manageEvent">Quản lí bài viết</Link>,
          key: "manageEvent",
          icon: <TfiWrite />,
        },
        {
          label: <Link to="/editor/compose-article">Thêm bài viết</Link>,
          key: "compose-article",
          icon: <TiDocumentAdd size="1.4em" />,
        },
      ],
    },
    {
      label: <span>Quiz</span>,
      icon: <MdOutlineQuiz size="1.5em" />,
      children: [
        {
          label: <Link to="/editor/create-quiz">Tạo quiz</Link>,
          key: "create-quiz",
          icon: <BiSelectMultiple />,
        },
      ],
    },
    {
      label: <Link to="/editor/editor-profile">Thông tin cá nhân</Link>,
      key: "editor-profile",
      icon: <CgProfile size="1.5em" />,
    },
    {
      label: (
        <Link to="/login">
          <Button>Đăng xuất</Button>
        </Link>
      ),
      key: "btn-logout",
      icon: <AiOutlineLogout size="1.5em" />,
    },
  ];
  const [collapsed, setCollapsed] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <>
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
              Editor
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
          {/* <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="layoutAdmin__header__welcome"></div>
          </Header> */}

          <Content>
            <Outlet />
          </Content>

          <Footer
            style={{ padding: 0, display: "flex", justifyContent: "center" }}
          >
            webname&copy; 2023.
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default EditorLayout;
