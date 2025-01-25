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
import Error from "../Pages/Error/Error";
import AdminRoute from "./AdminRoute";
import MyArticles from "../Pages/My Articles/MyArticles";
// import MyArticles from "../Pages/My Articles/MyArticles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
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
        path: "subscription",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>
          </PrivateRoute>
        ),
      },
      {
        path: "my-articles",
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "article-details/:id",
        element: <ArticleDetails></ArticleDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/my-articles/${params.id}`),
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
      <AdminRoute>
        <Dashboard></Dashboard>
      </AdminRoute>
    ),
    children: [
      {
        path: "all-user",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-articles",
        element: (
          <AdminRoute>
            <AllArticles></AllArticles>
          </AdminRoute>
        ),
      },
      {
        path: "add-publisher",
        element: (
          <AdminRoute>
            <AddPublisher></AddPublisher>
          </AdminRoute>
        ),
      },
    ],
  },
]);
