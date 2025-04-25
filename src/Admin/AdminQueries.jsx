import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../axiosInterceptor";
import Sidebar from "../Component/Sidebar";

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    api
      .get("/queries")
      .then((res) => setQueries(res.data))
      .catch((err) => console.error("Error fetching queries:", err));
  }, []);

  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleSendResponse = async (id) => {
    if (!responses[id] || responses[id].trim() === "") {
      toast.error("Please enter a response before submitting.");
      return;
    }

    try {
      const response = await api.put(`/queries/${id}`, {
        adminResponse: responses[id],
      });

      console.log("Updated Query:", response.data);
      setQueries(
        queries.map((query) =>
          query._id === id ? { ...query, adminResponse: responses[id] } : query
        )
      );

      toast.success("Response submitted successfully!");
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Failed to submit response. Try again.");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container className="mt-4" style={{ width: "80%" }}>
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <Button variant="secondary" onClick={() => window.history.back()}>
        Back
      </Button> */}
        <h2 className="text-center mb-4">Admin Queries</h2>
        <Row>
          {queries.map((query) => (
            <Col md={6} lg={4} key={query._id} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-bold"> {query.email}</Card.Title>
                  <Card.Subtitle className="mb-2">
                    <strong>Name:</strong>
                    {query.name}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Query:</strong> {query.query}
                  </Card.Text>

                  {/* Show response if it exists */}
                  {query.adminResponse && (
                    <Card.Text className="text-success">
                      <strong>Response:</strong> {query.adminResponse}
                    </Card.Text>
                  )}

                  <Form.Group controlId={`response-${query._id}`}>
                    <Form.Label className="fw-bold">Enter Response</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your response..."
                      value={responses[query._id] || ""}
                      onChange={(e) =>
                        handleResponseChange(query._id, e.target.value)
                      }
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="mt-2 w-100"
                    onClick={() => handleSendResponse(query._id)}
                  >
                    Send Response
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AdminQueries;
