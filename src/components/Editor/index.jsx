const EditorLayout = () => {
  const { Content, Footer, Sider, Header } = Layout;
  const navigate = useNavigate();

  const items = [
    {
      label: <Link to="/editor">Quản lí bài viết</Link>,
      key: "editor_management",
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
};
export default EditorLayout;
