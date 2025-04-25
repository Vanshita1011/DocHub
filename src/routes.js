import { createBrowserRouter } from "react-router-dom";
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
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import Profile from "./Component/Profile";
import DoctorAppointments from "./Admin/DoctorAppointments";
import DoctorLogin from "./Component/DoctorLogin";
import DoctorDashboard from "./Component/DoctorDashboard";
import Layout from "./common/Layout";
import BookingGuide from "./Component/BookingGuide";
import AdminQueries from "./Admin/AdminQueries";
import OtpLogin from "./Component/OtpLogin";

export const allRoutes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "book-appoinment",
        element: <Bookapp />,
      },
      {
        path: "book-appointment/:id",
        element: <Bookdetails />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <Blogdetails />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "policy",
        element: <Policy />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },

      {
        path: "*",
        element: <Error404 />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin-login",
        element: <AdminLogin />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "admin/appointments/:doctorId",
        element: <DoctorAppointments />,
      },
      {
        path: "doctor-login",
        element: <DoctorLogin />,
      },
      {
        path: "booking-guide",
        element: <BookingGuide />,
      },
      {
        path: "doctor-dashboard",
        element: <DoctorDashboard />,
      },
      {
        path: "admin/queries",
        element: <AdminQueries />,
      },
      {
        path: "otp-login",
        element: <OtpLogin />,
      },
    ],
  },
]);
