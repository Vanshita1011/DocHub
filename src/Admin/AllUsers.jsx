import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import api from "../axiosInterceptor";
import { toast } from "react-toastify";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users"); // Fetch users from the backend
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">All Registered Users</h2>
          <p className="text-center">
            Total Registered Users: <strong>{users.length}</strong>
          </p>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.gender}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}
