import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Carousel = ({ imgList }) => {
  const [imgListLength, setImgListLength] = useState(0);
  const [newArr, setNewArr] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(
    "all 300ms ease-in-out"
  );

  useEffect(() => {
    calcImgListLength(imgList);
    makeNewDataArray(imgList);
  }, [imgList]);

  const calcImgListLength = (arr) => {
    const listLength = arr.length;
    setImgListLength(listLength);
  };

  const makeNewDataArray = (arr) => {
    const firstData = arr[0];
    const lastData = arr[arr.length - 1];
    const modifiedArray = [lastData, ...arr, firstData];
    setNewArr(modifiedArray);
  };

  const slidePrev = () => {
    const prevIdx = currentIdx - 1;
    setCurrentIdx(prevIdx);

    if (prevIdx === 0) {
      moveToNthSlide(imgListLength);
    }

    setCarouselTransition("all 300ms ease-in-out");
  };

  const slideNext = () => {
    const nextIdx = currentIdx + 1;
    setCurrentIdx(nextIdx);

    if (nextIdx === imgListLength + 1) {
      moveToNthSlide(1);
    }

    setCarouselTransition("all 300ms ease-in-out");
  };

  const moveToNthSlide = (n) => {
    setTimeout(() => {
      setCarouselTransition("");
      setCurrentIdx(n);
    }, 250);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-img-wrap">
        {newArr.map((src, index) => (
          <img
            src={src}
            alt={index}
            key={index}
            style={{
              transform: `translateX(-${currentIdx * 100}%)`,
              transition: `${carouselTransition}`,
            }}
            className={`carousel-img-card ${
              index === currentIdx - 1 || index === currentIdx + 1
                ? "side-img"
                : "current-img"
            }`}
          />
        ))}
      </div>
      <FaChevronLeft className="prev-btn" onClick={() => slidePrev()} />
      <FaChevronRight className="next-btn" onClick={() => slideNext()} />
    </div>
  );
};

export default Carousel;
