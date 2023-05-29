import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";

/* gọi API
const getAccount = async () =>
{
  if (window.location.pathname === "/login") return;
    if (window.location.pathname === "/register") return;
    if (window.location.pathname === "/") return;
    const res;
}
useEffect(()=>{},[]);
*/

const Layout = () => {
  return (
    <>
      <div className="layout-app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
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

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            // Authenticate !!!!!
            <AdminPage />
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
