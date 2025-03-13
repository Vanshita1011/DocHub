import React from "react";
import "./Services.css";
import Header from "../../common/Header";
import Footer from "../../common/footer";
import serviceData from "./Servicecontent";
import ServiceCard from "./ServiceCard";
import { Container, Row } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";

export default function Blog() {
  return (
    <div>
      <Header />
      <h1 className="text-center p-4 blogheading">Popular Blogs</h1>
      <Container className="py-5">
        <Row className="justify-content-center">
          {serviceData.map((v, i) => (
            <ServiceCard service={v} key={i} />
          ))}
        </Row>
      </Container>

      <ScrollToTop smooth color="#028885" />
      <Footer />
    </div>
  );
}
