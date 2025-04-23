import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import api from "../axiosInterceptor";
import { useUser } from "../UserContext";
import DoctorFilters from "./DoctorFilters";
import DoctorTable from "./DoctorTable";
import DoctorFormModal from "./DoctorFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function AdminDashboard() {
  const { logout } = useUser(); // Use the logout function

  const [message, setMessage] = useState("");
  const [doctors, setDoctors] = useState([]); // Store fetched doctors
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  const [formData, setFormData] = useState({
    img: "",
    name: "",
    title: "",
    hospital: "",
    experience: "",
    fee: "",
    about: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // localStorage.removeItem("adminToken");
    // localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  // Fetch Admin Authentication Data
  useEffect(() => {
    setLoading(true);
    const fetchAdminData = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return navigate("/admin-login");
      toast.success("Successfully Login");

      try {
        const res = await api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        navigate("/admin-login");
      }
    };

    fetchAdminData();
    fetchDoctors();
  }, [navigate]);

  // Fetch Doctors from MongoDB
  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors/getDoctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Doctor with Confirmation Modal
  const handleShowDeleteModal = (id) => {
    setDoctorToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!doctorToDelete) return;
    try {
      await api.delete(`/doctors/deleteDoctor/${doctorToDelete}`);
      toast.success("Doctor deleted!");
      fetchDoctors();
    } catch (error) {
      toast.error("Error deleting doctor");
    }
    setShowDeleteModal(false);
  };

  // Handle Add / Update Doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("hospital", formData.hospital);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("fee", formData.fee);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    if (formData.img instanceof File) {
      formDataToSend.append("img", formData.img); // Append the image file
    }

    try {
      if (editingId) {
        await api.put(`/doctors/updateDoctor/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Doctor updated successfully!");
      } else {
        await api.post("/doctors/addDoctor", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Doctor added successfully!");
      }
      setShow(false);
      setFormData({
        img: "",
        name: "",
        title: "",
        hospital: "",
        experience: "",
        fee: "",
        about: "",
        email: "",
        password: "",
      });
      fetchDoctors();
    } catch (error) {
      toast.error("Error saving doctor");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedHospital, selectedSpeciality]);

  const filteredDoctors = doctors.filter((doc) => {
    return (
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedHospital === "" || doc.hospital === selectedHospital) &&
      (selectedSpeciality === "" || doc.title === selectedSpeciality)
    );
  });

  const indexOfLast = currentPage * doctorsPerPage;
  const indexOfFirst = indexOfLast - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center  align-items-center"
          style={{ height: "80vh" }}
        >
          <BeatLoader color="#6c63ff" />
        </div>
      ) : (
        <>
          <Container className="mt-5">
            <ToastContainer position="top-right" autoClose={2000} />
            <Row>
              <Col>
                <h2 className="text-custom">Admin Dashboard</h2>
                <p>{message}</p>
                <Button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </Button>
                <Button
                  variant="primary"
                  className="m-3"
                  onClick={() => navigate("/admin/queries")}
                >
                  View Queries
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Manage Doctors</h3>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShow(true);
                    setEditingId(null);
                  }}
                >
                  Add Doctor
                </Button>
              </Col>
            </Row>

            <DoctorFilters
              searchQuery={searchQuery}
              selectedHospital={selectedHospital}
              selectedSpeciality={selectedSpeciality}
              doctors={doctors}
              onSearchChange={setSearchQuery}
              onHospitalChange={setSelectedHospital}
              onSpecialityChange={setSelectedSpeciality}
              onClearFilters={() => {
                setSearchQuery("");
                setSelectedHospital("");
                setSelectedSpeciality("");
              }}
            />
            <Row>
              <Col style={{ overflowX: "auto" }}>
                <Row>
                  <Col lg={10}>
                    <h5 className="mt-2 text-custom">
                      Showing {currentDoctors.length} of{" "}
                      {filteredDoctors.length} doctors (Total: {doctors.length})
                    </h5>
                  </Col>
                </Row>

                <DoctorTable
                  doctors={currentDoctors}
                  onView={(id) => navigate(`/admin/appointments/${id}`)}
                  onEdit={(doc) => {
                    setShow(true);
                    setEditingId(doc._id);
                    setFormData(doc);
                  }}
                  onDelete={handleShowDeleteModal}
                />

                <div className="d-flex justify-content-center m-3 ">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="mx-1"
                  >
                    Previous
                  </Button>
                  <span className="align-self-center mx-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="mx-1"
                  >
                    Next
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Modal for Adding/Editing Doctor */}
            <DoctorFormModal
              show={show}
              onHide={() => setShow(false)}
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              editingId={editingId}
            />
          </Container>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
