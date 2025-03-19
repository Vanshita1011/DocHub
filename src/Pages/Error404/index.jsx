import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-3">Oops! Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you are looking for might have been removed or doesn't exist.
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Container>
  );
};

export default Error404;
