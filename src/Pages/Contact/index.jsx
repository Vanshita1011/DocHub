import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Contact.css";
import { faqs } from "./Data/Faqs";
import "./faq.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "react-scroll-to-top";
const Contact = () => {
  let [showAns, setShowAns] = useState(faqs[0].id);
  const [errors, setErrors] = useState({}); // Validation errors
  const [queryData, setQueryData] = useState({
    name: "",
    phone: "",
    email: "",
    query: "",
  });
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setQueryData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(queryData.name)) {
      newErrors.name = "Name should contain only alphabets.";
    }

    if (!mobileRegex.test(queryData.phone)) {
      newErrors.phone = "Mobile Number should be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Query Submitted:", queryData);
      setQueryData({
        name: "",
        phone: "",
        email: "",
        query: "",
      });
      setErrors({});
    }
  };
  return (
    <>
      <Container>
        <h2 className="p-5 text-center fw-bold contact-heading fs-1">
          Let's start a conversation
        </h2>
        <Row>
          <Col lg={6} md={12} sm={12} className="p-5">
            <div className="p-2">
              <ul className="fs-4">
                <li className="mb-2">
                  {" "}
                  We're just one click away from helping you manage your
                  healthcare needs with ease. Our hospital appointment system
                  ensures seamless scheduling, connecting you with top doctors
                  at your convenience.
                </li>

                <li className="mb-2">
                  Whether you need a routine check-up or a specialist
                  consultation, booking is quick and hassle-free. Simply fill
                  out the form to share your details, and our team will assist
                  you in securing the best medical care.
                </li>

                <li className="mb-2">
                  {" "}
                  Your health is our priority, and we’re here to provide a
                  smooth, stress-free experience. Have questions? Reach out—we’d
                  love to help!
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} className="p-5">
            <h3 className="p-2 form-heading fw-bold">
              Please fill in the form below or mail us your Query:
            </h3>
            <form className="p-3 rounded book-form " onSubmit={handleSubmits}>
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control mb-2"
                placeholder="Your FullName"
                value={queryData.name}
                onChange={handleInputChanges}
              />
              {errors.name && (
                <p className="text-danger  p-1 bg-warning rounded ">
                  {errors.name}
                </p>
              )}

              <label className="form-label">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                className="form-control mb-2"
                placeholder="Enter your phone number"
                value={queryData.phone}
                onChange={handleInputChanges}
              />
              {errors.phone && (
                <p className="text-danger bg-warning p-1 rounded ">
                  {errors.phone}
                </p>
              )}
              <label className="form-label">Email Id:</label>
              <input
                type="email"
                name="email"
                className="form-control mb-2"
                placeholder="Enter your Email Id"
                value={queryData.email}
                onChange={handleInputChanges}
              />
              <label className="form-label">Tell Us Your Query:</label>
              <textarea
                type="textarea"
                name="query"
                className="form-control mb-2"
                placeholder="Enter Your Query"
                value={queryData.query}
                onChange={handleInputChanges}
              />

              <input type="submit" value="Contact Us" />
            </form>
          </Col>
        </Row>
      </Container>
      <Container>
        <h2 className="faq-heading fw-bold text-center p-2">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="faqouter">
          {faqs.map((faqItems, i) => {
            return (
              <div key={i} className="faqItems d-flex flex-column">
                <h4
                  onClick={() =>
                    setShowAns(showAns === faqItems.id ? null : faqItems.id)
                  }
                  className="bg-light mw-100 p-2 fs-5 fw-bold d-flex justify-content-between align-items-center"
                >
                  {faqItems.question}

                  <FontAwesomeIcon
                    className="plusIcon "
                    icon={faPlus}
                    style={{
                      transform:
                        showAns === faqItems.id
                          ? "rotate(45deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                </h4>
                <p className={showAns === faqItems.id ? "activeAns" : ""}>
                  {faqItems.answer}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
      <ScrollToTop smooth color="#028885" />
    </>
  );
};

export default Contact;
