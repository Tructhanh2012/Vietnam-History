import React, { useState } from "react";
import "./styles/reset.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import LayoutAdmin from "./components/Admin";
import ProfilePage from "./pages/profile";
import UserTable from "./components/Admin/User/UserTable";
import RegisterRole from "./components/Admin/User/RegisterRole";
import LearnByMap from "./components/Map";

/* gọi API
const getAccount = async () =>
{
  if (window.location.pathname === "/login") return;
    if (window.location.pathname === "/register") return;
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
        <LearnByMap />
        <Footer />
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
        {
          path: "user",
          element: <UserTable />,
        },
        {
          path: "create-role",
          element: <RegisterRole />,
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
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
