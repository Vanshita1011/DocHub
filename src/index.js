import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Bookapp from "./Pages/Bookapp";
import Blog from "./Pages/Blog";
import Error404 from "./Pages/Error404";
import Bookdetails from "./Pages/Bookapp/Bookdetails";
import Blogdetails from "./Pages/Blog/Blogdetails";
import Terms from "./Pages/Terms";
import Policy from "./Pages/Policy";
import Contact from "./Pages/Contact";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import Profile from "./Component/Profile";
import DoctorAppointments from "./Admin/DoctorAppointments";
import DoctorLogin from "./Component/DoctorLogin";
import DoctorDashboard from "./Component/DoctorDashboard";
import LastVisitedPageTracker from "./LastVisitedPageTracker";

// import reportWebVitals from './reportWebVitals';

const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LastVisitedPageTracker />
        <Home />
      </>
    ),
  },
  {
    path: "about-us",
    element: (
      <>
        <LastVisitedPageTracker />
        <About />
      </>
    ),
  },
  {
    path: "book-appoinment",
    element: (
      <>
        <LastVisitedPageTracker />
        <Bookapp />
      </>
    ),
  },
  {
    path: "book-appointment/:id",
    element: (
      <>
        <LastVisitedPageTracker />
        <Bookdetails />
      </>
    ),
  },
  {
    path: "blog",
    element: (
      <>
        <LastVisitedPageTracker />
        <Blog />
      </>
    ),
  },
  {
    path: "blog/:id",
    element: (
      <>
        <LastVisitedPageTracker />
        <Blogdetails />
      </>
    ),
  },
  {
    path: "terms",
    element: (
      <>
        <LastVisitedPageTracker />
        <Terms />
      </>
    ),
  },
  {
    path: "policy",
    element: (
      <>
        <LastVisitedPageTracker />
        <Policy />
      </>
    ),
  },
  {
    path: "contact-us",
    element: (
      <>
        <LastVisitedPageTracker />
        <Contact />
      </>
    ),
  },

  {
    path: "*",
    element: (
      <>
        <LastVisitedPageTracker />
        <Error404 />
      </>
    ),
  },
  {
    path: "/signUp",
    element: (
      <>
        <LastVisitedPageTracker />
        <SignUp />
      </>
    ),
  },
  {
    path: "signIn",
    element: (
      <>
        <LastVisitedPageTracker />
        <SignIn />
      </>
    ),
  },
  {
    path: "profile",
    element: (
      <>
        <LastVisitedPageTracker />
        <Profile />
      </>
    ),
  },
  {
    path: "admin-login",
    element: (
      <>
        <LastVisitedPageTracker />
        <AdminLogin />
      </>
    ),
  },
  {
    path: "admin-dashboard",
    element: (
      <>
        <LastVisitedPageTracker />
        <AdminDashboard />
      </>
    ),
  },
  {
    path: "admin/appointments/:doctorId",
    element: (
      <>
        <LastVisitedPageTracker />
        <DoctorAppointments />
      </>
    ),
  },
  {
    path: "doctor-login",
    element: (
      <>
        <LastVisitedPageTracker />
        <DoctorLogin />
      </>
    ),
  },
  {
    path: "doctor-dashboard",
    element: (
      <>
        <LastVisitedPageTracker />
        <DoctorDashboard />
      </>
    ),
  },
]);

allRoutes.subscribe(() => {
  window.scrollTo(0, 0);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={allRoutes} />
    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
