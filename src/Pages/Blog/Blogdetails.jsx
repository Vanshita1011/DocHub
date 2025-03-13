import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../common/Header";
import Footer from "../../common/footer";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "react-scroll-to-top";

const blogData = [
  {
    id: "1",
    img: "/images/blog/blog-1.jpg",
    title: "Telehealth Services Are Ready To Help Your Family",
    description:
      "Telehealth is the use of digital communication tools, such as video calls, phone consultations, and mobile apps, to connect patients with healthcare professionals. This innovative approach allows individuals to receive medical care without the need for in-person visits, saving time and reducing exposure to illnesses.",
    benefits: "Benefits of Telehealth for Families",
    benefitsdescription:
      "Convenience – No more long waits at the doctor’s office; access healthcare from anywhere.",
    future:
      "Telehealth services are revolutionizing healthcare access, making it easier and more efficient for families to receive the medical attention they deserve. Whether it's a late-night fever or managing chronic conditions, telehealth ensures that your family’s health is always a priority.",
  },
  {
    id: "2",
    img: "/images/blog/blog-2.jpg",
    title: "Doccure – Making your clinic painless visit",
    description:
      "In today’s fast-paced world, convenience is key, especially when it comes to healthcare. Long waiting hours, scheduling issues, and last-minute cancellations make clinic visits a hassle for both patients and doctors. This is where Doccure steps in, revolutionizing the way people book doctor appointments and manage healthcare visits.",
    benefits: "Why Choose Doccure?",
    benefitsdescription:
      "Easy Online Booking Gone are the days of calling clinics and waiting for confirmations. With Doccure, patients can book appointments with just a few clicks, choosing their preferred doctor based on availability, ratings, and location.",
    future:
      "With Doccure, clinic visits are no longer stressful. Whether you’re a patient looking for quality healthcare or a doctor aiming to enhance practice efficiency, this platform is your go-to solution. Experience the future of healthcare booking with Doccure—where convenience meets care!",
  },
  {
    id: "3",
    img: "/images/blog/blog-3.jpg",
    title: "What are the benefits of Online Doctor Booking",
    description:
      "In today's fast-paced world, technology has revolutionized every aspect of our lives, including healthcare. Online doctor booking platforms have emerged as a convenient and efficient way for patients to connect with healthcare professionals without the hassle of waiting in long queues or making endless phone calls. Whether you're booking a routine check-up or consulting a specialist, online doctor appointment systems offer numerous advantages.",
    benefits: "Convenience & Accessibility",
    benefitsdescription:
      "One of the most significant benefits of online doctor booking is the convenience it provides. Patients can schedule appointments anytime, anywhere, using their smartphones, tablets, or computers. This eliminates the need to visit clinics in person just to book a consultation.",
    future:
      "Online doctor booking is transforming the healthcare industry by making medical consultations more accessible, efficient, and patient-friendly. With benefits like convenience, reduced waiting times, and enhanced safety, these digital platforms are becoming an essential tool for modern healthcare services.Are you ready to experience the ease of online doctor appointments? Book your consultation today and take a step towards hassle-free healthcare!",
  },
  {
    id: "4",
    img: "/images/blog/blog-4.jpg",
    title: "From Click to Care",
    description:
      "Gone are the days of long waiting times and endless phone calls to schedule a doctor’s appointment. Online doctor booking platforms allow patients to connect with healthcare professionals with just a few clicks. These platforms provide real-time availability, appointment scheduling, and even video consultations, making healthcare more accessible than ever before.",
    benefits: "A Step Towards the Future",
    benefitsdescription:
      "The digitalization of healthcare services is just the beginning. With advancements in AI, telemedicine, and wearable health devices, the future of online doctor consultations looks promising. Patients can expect faster diagnoses, personalized treatment plans, and seamless coordination between healthcare providers.",
    future:
      "From a simple click to receiving the right medical care, online doctor booking platforms are transforming the way we approach healthcare. In a world where time is precious, these platforms ensure that quality medical care is just a click away.",
  },
  {
    id: "5",
    img: "/images/blog/blog-5.jpg",
    title: "The Smart Way to See a Doctor: Benefits of Online Appointments",
    description:
      "In today’s fast-paced world, convenience is key. Whether it’s shopping, banking, or even working, technology has transformed how we complete everyday tasks. The healthcare industry is no exception. With the rise of online doctor appointments, patients can now access healthcare services from the comfort of their homes. Here’s why online doctor appointments are a smart choice for modern healthcare seekers.",
    benefits: " Access to a Wide Range of Specialists",
    benefitsdescription:
      "Finding the right specialist can be challenging, especially in rural areas. Online doctor appointments give patients the ability to connect with specialists nationwide, ensuring they receive expert care without the need to travel long distances.",
    future:
      "Online doctor appointments have revolutionized the way we access healthcare. They offer convenience, affordability, safety, and accessibility while maintaining high-quality medical care. If you haven’t tried virtual healthcare yet, now is the perfect time to embrace this smart, modern approach to seeing a doctor.",
  },
  {
    id: "6",
    img: "/images/blog/blog-6.jpg",
    title: "Say Goodbye to Long Queues",
    description:
      "Waiting in long queues at hospitals and clinics is a frustrating experience that wastes valuable time and energy. With the rise of digital healthcare solutions, online doctor booking platforms have transformed the way patients access medical care. Now, you can schedule appointments with just a few clicks, eliminating unnecessary wait times and ensuring a seamless healthcare experience.",
    benefits: "Benefits for Both Patients and Doctors",
    benefitsdescription:
      "The shift to online booking benefits not only patients but also healthcare providers. Doctors can manage their schedules more efficiently, reduce overbooking, and ensure a better patient experience. Clinics can streamline their operations, reduce crowding, and improve overall service quality.",
    future:
      "The shift to online booking benefits not only patients but also healthcare providers. Doctors can manage their schedules more efficiently, reduce overbooking, and ensure a better patient experience. Clinics can streamline their operations, reduce crowding, and improve overall service quality.",
  },
  {
    id: "7",
    img: "/images/blog/blog-7.jpg",
    title: "Your Doctor, Just a Click Away",
    description:
      "Online doctor booking is a digital solution that allows patients to schedule consultations with healthcare professionals at their convenience. Whether it’s a routine check-up, a specialist appointment, or an urgent medical concern, you can connect with a qualified doctor with just a few taps on your smartphone or clicks on your computer.",
    benefits: "Why Choose Online Doctor Booking?",
    benefitsdescription:
      "Whether you need a general physician, a dermatologist, a psychologist, or any other specialist, online platforms provide access to a broad network of healthcare professionals.",
    future:
      "The rise of telemedicine and online doctor booking is transforming the way we access healthcare. It bridges the gap between doctors and patients, making medical consultations more accessible, efficient, and stress-free.",
  },
  {
    id: "8",
    img: "/images/blog/blog-8.jpg",
    title: "The Smart Way to See a Doctor",
    description:
      "In today’s fast-paced world, finding time for a doctor’s visit can be challenging. Long wait times, scheduling conflicts, and travel hassles often make healthcare less accessible. Fortunately, technology has transformed the way we approach medical consultations. Online doctor booking is the smart, convenient, and efficient way to see a doctor without unnecessary delays.",
    benefits: "Seamless Online Consultations",
    benefitsdescription:
      "Many online booking platforms offer telemedicine services, allowing you to consult a doctor via video call from the comfort of your home. This is particularly beneficial for minor ailments, follow-up appointments, and chronic disease management.",
    future:
      "The rise of online doctor booking systems is revolutionizing healthcare accessibility. Whether you’re managing a busy schedule, seeking specialist care, or simply looking for a hassle-free way to consult a doctor, online appointment platforms provide a smarter, faster, and more efficient healthcare experience.",
  },
  {
    id: "9",
    img: "/images/blog/blog-9.jpg",
    title: "24/7 Healthcare Access",
    description:
      "Gone are the days of long waiting times and endless phone calls to schedule a doctor’s appointment. Online doctor booking platforms allow patients to connect with healthcare professionals with just a few clicks. These platforms provide real-time availability, appointment scheduling, and even video consultations, making healthcare more accessible than ever before.",
    benefits: "A Step Towards the Future",
    benefitsdescription:
      "The digitalization of healthcare services is just the beginning. With advancements in AI, telemedicine, and wearable health devices, the future of online doctor consultations looks promising. Patients can expect faster diagnoses, personalized treatment plans, and seamless coordination between healthcare providers.",
    future:
      "From a simple click to receiving the right medical care, online doctor booking platforms are transforming the way we approach healthcare. In a world where time is precious, these platforms ensure that quality medical care is just a click away.",
  },
];

export default function Blogdetails() {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === id);

  if (!blog) {
    return <h2>Blog Not Found</h2>;
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col lg={12}>
            <img
              src={blog.img}
              alt="Blog"
              className="d-flex p-3 img-fluid"
              style={{
                justifySelf: "center",
              }}
            />
          </Col>
          <Col lg={12}>
            <div
              className="d-flex p-4 "
              style={{ gap: "40px", justifyContent: "center" }}
            >
              <p>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ color: "#00a6fb", marginRight: "7px" }}
                />
                Admin
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ color: "#00a6fb", marginRight: "7px" }}
                />
                22june 2023
              </p>
            </div>
            <h2
              className="d-flex justify-content-center fw-bold p-2"
              style={{ color: "#007c9d" }}
            >
              {blog.title}
            </h2>
            <p>{blog.description}</p>
            <br />
            <h3 className="fw-bold" style={{ color: "#007c9d" }}>
              {blog.benefits}
            </h3>
            <br />
            <p>{blog.benefitsdescription}</p>
            <br />
            <p>{blog.future}</p>
            <br />
          </Col>
        </Row>
      </Container>
      <ScrollToTop smooth color="#028885" />
      <Footer />
    </>
  );
}
