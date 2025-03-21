import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import LastVisitedPageTracker from "../LastVisitedPageTracker";

const Layout = () => {
  return (
    <>
      <LastVisitedPageTracker />
      <Header /> {/* Common Header for all pages */}
      <Outlet /> {/* This will render the current page */}
      <Footer />
    </>
  );
};

export default Layout;
