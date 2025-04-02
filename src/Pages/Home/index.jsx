import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import CarouselComponent from "../../Component/Carousel/CarouselComponent";
import Counter from "../../Component/Counter/Counter";
import {
  homeBottomCardData,
  homeCardData,
} from "../../Component/Cards/AllCardData";
import { HomeBottomCard, HomeCard } from "../../Component/Cards/AllCard";
import EmailInput from "../../Component/Validation/EmailInput";
import SuccessModal from "../Bookapp/SuccessModal";

export default function Home() {
  const [successModal, setSucessModal] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return; // Prevent form submission if empty
    setSucessModal(true);
    setEmail(""); // Clear the input after successful submission
  };
  return (
    <>
      {/* <Header /> */}
      {/* carousel start */}
      <CarouselComponent />
      {/* carousel end */}

      {/* section start */}
      <Container>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="align-self-center one_click fade-in-down">
              <h2 data-aos="fade-up" data-aos-duration="3000">
                Bring Care to Your <br />
                <span style={{ color: "#028885", fontFamily: "Arial" }}>
                  Home With One Click
                </span>
              </h2>
              <img src="/images/bg.png" className="p_bg" alt="img" />
              <p
                className="text-start fs-5 position-relative"
                data-aos="fade-up"
                data-aos-duration="3000"
              >
                Welcome to <span>DOCHUB</span>, where compassionate care meets
                medical excellence. Our state-of-the-art facility offers
                advanced treatments, expert specialists, and personalized
                healthcare services. From emergency care to specialized
                treatments, we prioritize patient well-being, safety, and
                comfort. Experience world-class healthcare with us—your trusted
                partner in health and healing.
              </p>
              <div
                className="click_abt align-items-center"
                data-aos="fade-up"
                data-aos-duration="3000"
              >
                <Link to={"/about-us"}>About Us</Link>
              </div>
            </div>
          </Col>
          <Col
            lg={6}
            md={6}
            sm={12}
            data-aos="fade-right"
            data-aos-duration="2000"
            className="d-flex justify-content-center"
          >
            <img src="/images/doc.jpg" className="fr_img" alt="img" />
          </Col>
        </Row>
        {/*  */}
        <div
          className="container works text center"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <h2 data-aos="fade-up" data-aos-duration="3000">
            We Made It Simple
            <br />
            <span style={{ color: "#028885", fontFamily: "Arial" }}>
              How It Works
            </span>
          </h2>
          <p data-aos="fade-up" data-aos-duration="2000">
            At <span>DOCHUB</span>, we’ve made healthcare simple. Our seamless
            process ensures easy appointment booking, quick check-ins, expert
            consultations, and hassle-free treatments. With advanced technology
            and compassionate care, we prioritize your well-being at every step.
            Experience a smooth, patient-friendly journey—from diagnosis to
            recovery—with us. Your health, made simple!
          </p>
          <div className="container d-flex justify-content-around">
            {homeCardData.map((v, i) => (
              <HomeCard key={i} CardItem={v} />
            ))}
          </div>
        </div>
        {/* notification banner */}
        <div className="appointmentSection  ">
          <div
            className="appointment-section d-flex px-3 my-5 mx-md-3"
            style={{
              borderRadius: "10px",
              height: "370px",
            }}
          >
            <div className="flex-grow-1 px-3 py-4 py-md-5 py-lg-6 ps-lg-5 ">
              <div
                className="h4 text-white"
                data-aos="fade-down"
                data-aos-duration="2000"
              >
                <h1>Book Appointment</h1>
                <h2 className="mt-2">With 100+ Trusted Doctors</h2>
              </div>
              <button
                className="btn btn-light text-dark px-4 py-2 mt-3"
                data-aos="flip-left"
                data-aos-duration="3000"
              >
                <Link
                  to={"/book-appoinment"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Read More
                </Link>
              </button>
            </div>
            <div className="d-none d-md-block col-md-6 col-lg-auto position-relative">
              <img
                className=" position-absolute bottom-0 end-0 appoinImg"
                src="\images\appoinment _img.png"
                alt=""
                style={{ width: "370px" }}
                data-aos="zoom-in-up"
                data-aos-duration="2000"
              />
            </div>
          </div>
        </div>

        {/* Our services */}
        <div className="bg-light p-3">
          <div
            className="eltd-separator text-center"
            data-aos="fade-down"
            data-aos-duration="2000"
          >
            <h2 className="fw-bold ">Our Services</h2>
          </div>

          <h4
            className="d-flex justify-content-center p-3 subTitle4"
            data-aos="fade-down"
            data-aos-duration="2000"
          >
            The care which is directly related to patieant-treatment
          </h4>
          <div>
            <Row className=" justify-content-around p-3 mb-3">
              {homeBottomCardData.map((v, i) => (
                <HomeBottomCard pitems={v} key={i} />
              ))}
            </Row>
          </div>
        </div>
        {/* for home page counter */}

        <Counter />

        {/* notification menu */}

        <Row className="notification">
          <Col lg={6} md={6} sm={12}>
            <div className="rowItem text-start px-2 py-4">
              <div className="rowHeader">
                <h3 className="mb-3">Get The Notification</h3>
              </div>
              <h1>
                <em>We have some</em>
                <br />
                <span>
                  <strong>Good news</strong>
                </span>
              </h1>
              <div className="rowText py-3 mx-auto">
                Sign up for DocHub newsletter to receive all the new offers and
                discounts from DocHub. Discounts are only valid four our
                newsletter subscribers.
              </div>
              <div className="emailSubscribe">
                <form className="d-flex flex-column" onSubmit={handleSubscribe}>
                  <EmailInput value={email} onChange={setEmail} />
                  <button className="btnSubscribe  px-4 py-2 mt-3">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <SuccessModal
              show={successModal}
              onHide={() => {
                setSucessModal(false);
              }}
              message1="You have sucessfully subscribed to our newsletter!"
              message2="Thank you for subscribing"
            />
          </Col>
          <Col lg={6} md={6} sm={12}></Col>
        </Row>
      </Container>
      <ScrollToTop smooth color="#028885" />
      {/* <Footer /> */}
    </>
  );
}
