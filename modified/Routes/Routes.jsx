import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllUsers from "../AdminPages/All Users/AllUsers";
import Dashboard from "../AdminPages/Dashboard/Dashboard";
import AllArticles from "../AdminPages/All Articles/AllArticles";
import AddPublisher from "../AdminPages/Add Publisher/AddPublisher";
import ApprovedArticles from "../Pages/Approved Articles/ApprovedArticles";
import ArticleDetails from "../Pages/Article Details/ArticleDetails";
import Subscription from "../Pages/Subscription/Subscription";
import AddArticles from "../Pages/Add Articles/AddArticles";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/My Profile/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "add-articles",
        element: (
          <PrivateRoute>
            <AddArticles></AddArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "approved-articles",
        element: <ApprovedArticles></ApprovedArticles>,
      },
      {
        path: "article-details",
        element: <ArticleDetails></ArticleDetails>,
      },
      {
        path: "subscription",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-profile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "all-user",
        element: (
          <PrivateRoute>
            <AllUsers></AllUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "all-articles",
        element: (
          <PrivateRoute>
            <AllArticles></AllArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "add-publisher",
        element: (
          <PrivateRoute>
            <AddPublisher></AddPublisher>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
