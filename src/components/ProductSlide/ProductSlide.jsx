import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductSlide.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function ProductSlide({ products, sectionTitle }) {
  const sectionType = sectionTitle.split(" ")[0];
  const sectionTypeLowercase = sectionType.toLowerCase();

  const [imgListLength, setImgListLength] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(
    "all 300ms ease-in-out"
  );

  useEffect(() => {
    calcImgListLength(products);
  }, [products]);

  const calcImgListLength = (arr) => {
    const listLength = arr.length;
    setImgListLength(listLength);
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
    <section className="product-slide">
      <div className="small-title">
        <h1>{sectionTitle}</h1>
      </div>
      <div className="products-box">
        <div className="product-slide-ul">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.productId}
              style={{
                transform: `translateX(-${currentIdx * 100 - 100}%)`,
                transition: `${carouselTransition}`,
              }}
            >
              <img
                src={`http://localhost:8080${product.productThumbnails[0]}`}
                alt={product.productName}
                className={`product-card-img`}
              />
              <div className="product-small-info">
                <Link to={`/product/${product.productId}`}>
                  {product.productName}
                </Link>
                {product.isDiscount && (
                  <Link
                    to={`/product/${product.productId}`}
                  >{`${product.discountRate}% 할인 중`}</Link>
                )}
                {product.isRecommend && (
                  <Link to={`/product/${product.productId}`}>추천상품</Link>
                )}
                <Link
                  to={`/product/${product.productId}`}
                  className="product-price"
                >
                  {`${product.price} 원`}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <FaChevronLeft
          className="product-slide-left-arrow"
          onClick={() => slidePrev()}
        />
        <FaChevronRight
          className="product-slide-right-arrow"
          onClick={() => slideNext()}
        />
      </div>
      <Link to={`/${sectionTypeLowercase}`} className="link-btn">
        Click Here to More View
      </Link>
    </section>
  );
}

export default ProductSlide;
