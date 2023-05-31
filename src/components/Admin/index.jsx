const LayoutAdmin = () => {
  return (
    <>
      <div className="layout-app">
        {/* {isAdminRoute && userRole === "ADMIN" && <Header />} */}
        <Header />
        <Outlet />
        <Footer />
        {/* {isAdminRoute && userRole === "ADMIN" && <Footer />} */}
      </div>
    </>
  );
};

export default LayoutAdmin;
