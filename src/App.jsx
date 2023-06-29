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
import EditorPage from "./components/Editor/EditorPage";
import RankingPage from "./pages/rank";
import TimelinePage from "./pages/timeline";
import TextEditor from "./pages/editor/TextEditor";
import ArticlePage from "./pages/article";
import QuizzPage from "./pages/quizList";
import Navbar from "./components/Header/Navbar";
import QuizzApp from "./components/Quiz";
import BlogPage from "./pages/blog";
import EditorLayout from "./components/Editor";
import EditorProfile from "./components/Editor/EditorProfile";
import EditorDashboard from "./components/Editor/Dashboard/EditorDashboardPage";
import ManageEvent from "./components/Editor/Article/ManagEvent";
import EditorCompose from "./components/Editor/Article/EditorCompose";
import EditorDashboardPage from "./components/Editor/Dashboard/EditorDashboardPage";
import EventDetail from "./components/DongSuKien/eventDetail";

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
        {/* <Header /> */}
        <Navbar />
        <Outlet />
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
      children: [
        { index: true, element: <Home /> },
        { path: "rank", element: <RankingPage /> },
        { path: "article", element: <ArticlePage /> },
        { path: "quizdbp", element: <QuizzApp /> },
        { path: "timeline", element: <TimelinePage /> },
        {
          path: "/timeline/:idHistory",
          element: <EventDetail />,
        },
        {
          path: "quizz",
          element: <QuizzPage />,
        },
      ],
    },

    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/blog",
      element: <BlogPage />,
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
      path: "/editor",
      element: <EditorLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <EditorDashboardPage />,
        },
        {
          path: "manageEvent",
          element: <ManageEvent />,
        },
        {
          path: "editor-profile",
          element: <EditorProfile />,
        },
        {
          path: "compose-article",
          // element: <TextEditor />,
          element: <EditorCompose />,
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
