const EditorLayout = () => {
  const { Content, Footer, Sider, Header } = Layout;
  const navigate = useNavigate();

  const items = [
    {
      label: <Link to="/editor">Quản lí bài viết</Link>,
      key: "editor_management",
      // icon: <GrDashboard />,
    },
    {
      label: <span>Người dùng</span>,
      // key: "user",
      // icon: <UserOutlined />,
      children: [
        {
          label: <Link to="/editor/write-article">CRUD</Link>,
          key: "write-article",
          icon: <TeamOutlined />,
        },
      ],
    },
  ];
};
export default EditorLayout;
