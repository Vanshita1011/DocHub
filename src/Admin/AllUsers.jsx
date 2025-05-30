import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Form, Button } from "react-bootstrap";
import api from "../axiosInterceptor";
import { toast } from "react-toastify";
import Sidebar from "../Component/Sidebar";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome search icon

export default function AllUsers() {
  const [users, setUsers] = useState([]); // All users fetched from the backend
  const [filteredUsers, setFilteredUsers] = useState([]); // Users filtered by search
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Search input value
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [userToDelete, setUserToDelete] = useState(null); // User to be deleted

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users"); // Fetch users from the backend
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users with all users
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    // Filter users based on the search input
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  // Open the confirmation modal
  const handleShowModal = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  // Handle user deletion
  const handleRemoveUser = async () => {
    if (!userToDelete) return;

    try {
      await api.delete(`/users/${userToDelete}`); // Call backend API to delete user
      setUsers(users.filter((user) => user._id !== userToDelete)); // Update users state
      setFilteredUsers(
        filteredUsers.filter((user) => user._id !== userToDelete)
      ); // Update filtered users
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Try again.");
    } finally {
      setShowModal(false); // Close the modal
      setUserToDelete(null); // Reset the user to delete
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container
        className="mt-5"
        style={{
          width: "80%",
          background: " #f4f4f2",
          borderRadius: "10px ",
        }}
      >
        <Row>
          <Col>
            <h2 className="text-center mb-4 text-custom fw-bold p-3">
              All Registered Users
            </h2>
            <p className="text-center fw-bolder text-soft">
              Total Registered Users:{" "}
              <strong className="text-soft">{users.length}</strong>
            </p>

            {/* Search Input */}
            <Form.Group className="mb-4 d-flex align-items-center w-25">
              <FontAwesomeIcon icon={faSearch} className="me-2" />
              <Form.Control
                type="text"
                placeholder="Search by email"
                value={search}
                onChange={handleSearch}
                style={{ flex: 1 }}
              />
            </Form.Group>

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : filteredUsers.length === 0 ? (
              <p className="text-center">No user found.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="text-custom">#</th>
                    <th className="text-custom">Email</th>
                    <th className="text-custom">Phone Number</th>
                    <th className="text-custom">Gender</th>
                    <th className="text-custom">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.gender}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleShowModal(user._id)}
                        >
                          Remove {""}
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleRemoveUser}
          message1={"Are you sure you want to Remove this User?"}
        />
      </Container>
    </div>
  );
}
