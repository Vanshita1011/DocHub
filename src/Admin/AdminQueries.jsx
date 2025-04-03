import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import api from "../axiosInterceptor";

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
    try {
      const response = await api.put(`/queries/${id}`, {
        adminResponse: responses[id],
      });
      console.log("Updated Query:", response.data); // Debugging Log

      setQueries(
        queries.map((query) => (query._id === id ? response.data : query))
      );
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  return (
    <div>
      <h2>Admin Queries</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Query</th>
            <th>Response</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query._id}>
              <td>{query.name}</td>
              <td>{query.email}</td>
              <td>{query.query}</td>
              <td>
                <Form.Control
                  type="text"
                  value={responses[query._id] || ""}
                  onChange={(e) =>
                    handleResponseChange(query._id, e.target.value)
                  }
                />
              </td>
              <td>
                <Button onClick={() => handleSendResponse(query._id)}>
                  Send Response
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminQueries;
