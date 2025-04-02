import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import api from "../axiosInterceptor"; // Assuming axios instance

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await api.get("/queries");
        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };
    fetchQueries();
  }, []);

  return (
    <div>
      <h2>Contact Queries</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query._id}>
              <td>{query.name}</td>
              <td>{query.phone}</td>
              <td>{query.email}</td>
              <td>{query.query}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminQueries;
