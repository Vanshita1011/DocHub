import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table, Button } from "react-bootstrap";

export default function DoctorTable({ doctors, onEdit, onDelete, onView }) {
  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Title</th>
          <th>Hospital</th>
          <th>Experience</th>
          <th>Fee</th>
          <th>About</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doc) => (
          <tr key={doc._id}>
            <td>
              <img src={doc.img} alt="doctor" style={{ width: "150px" }} />
            </td>
            <td>{doc.name}</td>
            <td>{doc.title}</td>
            <td>{doc.hospital}</td>
            <td>{doc.experience}</td>
            <td>{doc.fee}</td>
            <td>{doc.about}</td>
            <td>
              <Button
                className="m-1"
                variant="secondary"
                onClick={() => onView(doc._id)}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
              <Button
                className="m-1"
                variant="warning"
                onClick={() => onEdit(doc)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button
                className="m-1"
                variant="danger"
                onClick={() => onDelete(doc._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
