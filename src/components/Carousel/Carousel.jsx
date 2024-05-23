import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Carousel = () => {
  const [loading, setLoading] = useState(true);
  const [carouselProducts, setCarouselProducts] = useState([]);
  const memoizedRankingData = useMemo(
    () => carouselProducts,
    [carouselProducts]
  );
  const [imgListLength, setImgListLength] = useState(0);
  const [newArrs, setNewArrs] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(
    "all 300ms ease-in-out"
  );
  const navigate = useNavigate();

  const getCarouselProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/products/ranking`,
        {
          params: {
            limit: 5,
          },
        }
      );
      setCarouselProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCarouselProducts();
  }, []);

  useEffect(() => {
    if (memoizedRankingData.length > 0) {
      setLoading(false);
      calcImgListLength(memoizedRankingData);
      makeNewDataArray(memoizedRankingData);
    }
  }, [memoizedRankingData]);

  const calcImgListLength = (arr) => {
    const listLength = arr.length;
    setImgListLength(listLength);
  };

  const makeNewDataArray = (arr) => {
    const firstData = arr[0];
    const lastData = arr[arr.length - 1];
    const modifiedArray = [lastData, ...arr, firstData];
    setNewArrs(modifiedArray);
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="carousel-img-wrap">
          {newArrs.map((newArr, index) => (
            <div
              style={{
                transform: `translateX(-${currentIdx * 100}%)`,
                transition: `${carouselTransition}`,
              }}
              className={`carousel-img-card ${
                index === currentIdx ? "current-img" : "side-img"
              }`}
              key={index}
            >
              <img
                src={`${process.env.REACT_APP_BACKEND_URL_FOR_IMG}${newArr.productThumbnails}`}
                alt={index}
                className={`carousel-img`}
                onClick={() => navigate(`/product/${newArr.productId}`)}
              />
              <div className="carousel-text">
                <span
                  className="carousel-text-pd-name"
                  onClick={() => navigate(`/product/${newArr.productId}`)}
                >
                  {newArr.productName}
                </span>
                <span
                  className="carousel-text-pd-type"
                  onClick={() => navigate(`/product/${newArr.productId}`)}
                >
                  {newArr.productType}
                </span>
                {newArr.isDiscount === true && (
                  <span
                    className="carousel-text-pd-discount"
                    onClick={() => navigate(`/product/${newArr.productId}`)}
                  >
                    {`${newArr.discountRate}% 할인 중`}
                  </span>
                )}
                {newArr.isRecommend === true && (
                  <span
                    className="carousel-text-pd-recommend"
                    onClick={() => navigate(`/product/${newArr.productId}`)}
                  >
                    추천 상품!
                  </span>
                )}
                <span
                  className="carousel-text-pd-price"
                  onClick={() => navigate(`/product/${newArr.productId}`)}
                >
                  {`${newArr.price} 원`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <FaChevronLeft className="prev-btn" onClick={() => slidePrev()} />
      <FaChevronRight className="next-btn" onClick={() => slideNext()} />
    </div>
  );
};

export default Carousel;
