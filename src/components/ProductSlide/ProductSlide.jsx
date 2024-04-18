import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ProductSlide.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function ProductSlide({ products, sectionTitle }) {
  const [marginLeft, setMarginLeft] = useState(0);
  const slideUlRef = useRef(null);
  const sectionType = sectionTitle.split(" ")[0];
  const sectionTypeLowercase = sectionType.toLowerCase();

  useEffect(() => {
    const interval = setInterval(() => {
      setMarginLeft(-10);
      setTimeout(() => {
        setMarginLeft(0);
        if (slideUlRef.current) {
          const firstChild = slideUlRef.current.firstChild;
          if (firstChild) {
            slideUlRef.current.appendChild(firstChild.cloneNode(true));
            slideUlRef.current.removeChild(firstChild);
          }
        }
      }, 0);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const moveLeft = () => {
    if (slideUlRef.current) {
      const lastChild = slideUlRef.current.lastChild;
      if (lastChild) {
        slideUlRef.current.insertBefore(
          lastChild.cloneNode(true),
          slideUlRef.current.firstChild
        );
        slideUlRef.current.removeChild(lastChild);
        setMarginLeft(-10);
        setTimeout(() => setMarginLeft(0), 0);
      }
    }
  };

  const moveRight = () => {
    setMarginLeft(-10);
    setTimeout(() => {
      setMarginLeft(0);
      if (slideUlRef.current) {
        const firstChild = slideUlRef.current.firstChild;
        if (firstChild) {
          slideUlRef.current.appendChild(firstChild.cloneNode(true));
          slideUlRef.current.removeChild(firstChild);
        }
      }
    }, 0);
  };

  return (
    <section className="product-slide">
      <div className="small-title">
        <h1>{sectionTitle}</h1>
      </div>
      <div className="products-box">
        <ul
          ref={slideUlRef}
          className="product-slide-ul"
          style={{ marginLeft: marginLeft + "px" }}
        >
          {products.map((product, index) => (
            <li key={product.productId} className="product-card">
              <img
                className={`product-img${index + 1} product-card-img`}
                src={`http://localhost:8080/${product.productThumbnails[0]}`}
                alt={product.productName}
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
            </li>
          ))}
        </ul>
      </div>
      <FaChevronLeft className="product-slide-left-arrow" onClick={moveLeft} />
      <FaChevronRight
        className="product-slide-right-arrow"
        onClick={moveRight}
      />
      <Link to={`/${sectionTypeLowercase}`} className="link-btn">
        Click Here to More View
      </Link>
    </section>
  );
}

export default ProductSlide;
