// Sidebar.js
import React, { useState, useEffect, useRef } from "react";
import { Offcanvas, Button, Nav } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaFont,
  FaClone,
  FaSignInAlt,
  FaUserPlus,
  FaIcons,
  FaGlobe,
  FaFontAwesome,
} from "react-icons/fa";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardQuestion,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { logout } = useUser();
  const [show, setShow] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
    // localStorage.removeItem("adminToken");
    // localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  // Close sidebar on clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  return (
    <>
      {/* Toggle Button for small screens */}
      <Button
        variant="primary"
        onClick={handleShow}
        className="d-md-none m-2"
        style={{ height: "40px" }}
      >
        ☰
      </Button>

      {/* Sidebar for larger screens */}
      <div
        className="d-none d-md-block sidebar bg-white border-end p-3"
        style={{ width: "17%", height: "100vh", position: "fixed" }}
      >
        <SidebarContent handleLogout={handleLogout} />
      </div>

      {/* Offcanvas for small screens */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="md"
        backdrop={false}
        style={{ width: "250px" }}
      >
        <div ref={sidebarRef}>
          <Offcanvas.Body>
            <SidebarContent handleLogout={handleLogout} />
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
};

const SidebarContent = ({ handleLogout }) => {
  return (
    <div>
      <h4 className="mb-4">
        <img src="/images/logo.png" alt="Logo" width="150px" className="me-2" />
        {/* Modernize */}
      </h4>

      <div className="mb-3">
        <small className="text-muted">HOME</small>
        <Nav defaultActiveKey="/admin-dashboard" className="flex-column">
          <Nav.Link
            to="/admin-dashboard"
            as={NavLink}
            className="d-flex align-items-center gap-2"
          >
            <FaTachometerAlt /> Dashboard
          </Nav.Link>
        </Nav>
      </div>

      <div className="mb-3">
        <small className="text-muted">UTILITIES</small>
        <Nav className="flex-column">
          <Nav.Link
            to="/admin/add-doctor"
            as={NavLink}
            className="d-flex align-items-center gap-2"
          >
            <FontAwesomeIcon icon={faUserPlus} /> Add Doctor
          </Nav.Link>
          <Nav.Link
            to="/admin/all-users"
            as={NavLink}
            className="d-flex align-items-center gap-2"
          >
            <FaClone /> All User
          </Nav.Link>
          <Nav.Link
            to="/admin/queries"
            as={NavLink}
            className="d-flex align-items-center gap-2"
          >
            <FontAwesomeIcon icon={faClipboardQuestion} />
            All Queries
          </Nav.Link>
        </Nav>
      </div>

      <div className="mb-3">
        <small className="text-muted">AUTH</small>
        <Nav className="flex-column">
          <Nav.Link
            onClick={handleLogout}
            className="d-flex align-items-center gap-2"
          >
            <FaSignInAlt /> LogOut
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
