import React from "react";
import carouselData from "./carouselData";

export default function CarouselComponent() {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-indicators">
        {carouselData.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={slide.active ? "active" : ""}
            aria-current={slide.active ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${slide.active ? "active" : ""}`}
          >
            <div
              className={`d-flex align-items-center justify-content-${slide.textAlign}`}
              style={{ maxHeight: "600px", position: "relative" }}
            >
              <div
                className={`text-container text-white text-${slide.textAlign} p-4 bg-transparent`}
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                style={{
                  position: "absolute",
                  maxWidth: "100%",
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                }}
              >
                <h1 className="fw-bold">{slide.title}</h1>
                <h1 className="text-info fw-bold">{slide.subtitle}</h1>
              </div>
              <img src={slide.imgSrc} className="d-block w-100" alt="Slide" />
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
