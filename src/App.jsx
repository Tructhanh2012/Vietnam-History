import React, { useEffect, useState } from "react";
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
import RankingPage from "./pages/rank";
import TimelinePage from "./pages/timeline";
// import QuizzApp from "./components/Quiz";
import BlogPage from "./pages/blog";
import EditorLayout from "./components/Editor";
import EditorProfile from "./components/Editor/Profile/EditorProfile";
import ManageEvent from "./components/Editor/Article/ManagEvent";
import EditorCompose from "./components/Editor/Article/EditorCompose";
import EditorDashboardPage from "./components/Editor/Dashboard/EditorDashboardPage";
import QuizzDetail from "./pages/quizList/QuizzDetail";
import QuizListPage from "./pages/quiz";
import BlogCard from "./components/Home/BlogCard";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticleDetails from "./pages/article/ArticleDetails";
import CreateQuizPage from "./components/Editor/Quiz/CreateQuiz";
import Navbar from "./components/Header/Navbar";
import EventDetail from "./components/DongSuKien/eventDetail";
import CharactersPage from "./pages/characters";
import HeaderPage from "./components/Header/Header";
import EditorTable from "./components/Admin/User/EditorTable";
// import QuizDetail from "./pages/quizList/QuizzDetail";

const Layout = () => {
  return (
    <>
      <div className="layout-app">
        <HeaderPage />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);
  const user = useSelector((state) => state.account.user);

  const FetchAccount = async () => {
    if (window.location.pathname === "/login") return;
    if (window.location.pathname === "/register") return;
    // if (window.location.pathname === "/") return;

    const res = await callFetchAccount();
    if (res && res.token) {
      dispatch(doGetAccountAction(res));
    }
  };
  useEffect(() => {
    // FetchAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "rank", element: <RankingPage /> },
        { path: "timeline", element: <TimelinePage /> },
        { path: "character", element: <CharactersPage /> },
        { path: "singleEvent/:slug", element: <ArticleDetails /> },
        { path: "quizdt/:id", element: <QuizzDetail /> },
        // { path: "article/:slug", element: <ArticlePage /> },
        // { path: "singleEvent/:slug", element: <ArticleDetails /> },
        { path: "article", element: <ArticleDetails /> },
        {
          path: "/timeline/:idHistory",
          element: <EventDetail />,
        },
        {
          path: "quizz",
          // element: <QuizzPage />,
          element: <QuizListPage />,
        },
        // {
        //   path: "quizzdt",
        //   element: <QuizzApp />,
        // },
        {
          path: "quizdt",
          element: <QuizzDetail />,
        },

        {
          path: "try",
          element: <BlogCard />,
        },

        // {
        //   path: "quizz",
        //   element: <QuizzPage />,
        //   children: [
        //     { index: true, element: <QuizzPage /> },
        //     { path: ":id", element: <QuizzApp /> },
        //   ],
        // },
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

            // <ProtectedRoute>
            //   <AdminPage />
            // </ProtectedRoute>

            <AdminPage />
          ),
        },
        {
          path: "member",
          element: <UserTable />,
        },
        {
          path: "editor",
          element: <EditorTable />,
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
        {
          path: "create-quiz",
          // element: <TextEditor />,
          element: <CreateQuizPage />,
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
      path: "/header",
      element: <HeaderPage />,
    },
  ]);
  return (
    <>
      {/* {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )} */}

      <RouterProvider router={router} />

      {/* {isAuthenticated === true ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )} */}
    </>
  );
}
