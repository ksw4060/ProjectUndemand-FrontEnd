import React, { useState, useEffect, useRef } from "react";
import "./Carousels.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function Carousels() {
  const [marginLeft, setMarginLeft] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideUlRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarginLeft(-1440);
      setTimeout(() => {
        setMarginLeft(0);
        slideUlRef.current.appendChild(slideUlRef.current.firstChild);
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 0);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const moveLeft = () => {
    slideUlRef.current.insertBefore(
      slideUlRef.current.lastChild,
      slideUlRef.current.firstChild
    );
    setMarginLeft(-1440);
    setTimeout(() => setMarginLeft(0), 0);
    setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const moveRight = () => {
    setMarginLeft(-1440);
    setTimeout(() => {
      setMarginLeft(0);
      slideUlRef.current.appendChild(slideUlRef.current.firstChild);
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 0);
  };

  return (
    <section className="carousels">
      <ul
        id="carousels-slide-ul"
        ref={slideUlRef}
        style={{ marginLeft: marginLeft + "px" }}
      >
        <li
          id="carousels-slide1"
          className={
            currentSlideIndex === 0 || currentSlideIndex === 1
              ? "side-img"
              : "current-img"
          }
        ></li>
        <li
          id="carousels-slide2"
          className={
            currentSlideIndex === 1 || currentSlideIndex === 2
              ? "side-img"
              : "current-img"
          }
        ></li>
        <li
          id="carousels-slide3"
          className={
            currentSlideIndex === 2 || currentSlideIndex === 0
              ? "side-img"
              : "current-img"
          }
        ></li>
      </ul>
      <FaChevronLeft className="carousels-left-arrow" onClick={moveLeft} />
      <FaChevronRight className="carousels-right-arrow" onClick={moveRight} />
    </section>
  );
}

export default Carousels;
