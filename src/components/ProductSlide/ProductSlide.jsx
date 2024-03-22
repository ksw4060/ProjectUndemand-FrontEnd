import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ProductSlide.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function ProductSlide({ title, slideItems }) {
    const [marginLeft, setMarginLeft] = useState(0);
    const slideUlRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setMarginLeft(-10);
            setTimeout(() => {
                setMarginLeft(0);
                slideUlRef.current.appendChild(slideUlRef.current.firstChild);
            }, 0);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const moveLeft = () => {
        slideUlRef.current.insertBefore(slideUlRef.current.lastChild, slideUlRef.current.firstChild);
        setMarginLeft(-10);
        setTimeout(() => setMarginLeft(0), 0);
    };

    const moveRight = () => {
        setMarginLeft(-10);
        setTimeout(() => {
            setMarginLeft(0);
            slideUlRef.current.appendChild(slideUlRef.current.firstChild);
        }, 0);
    };

    return (
        <section className="product-slide">
            <div className="small-title">
                <h1>{title}</h1>
            </div>
            <div className="products-box">
                <ul ref={slideUlRef} className="product-slide-ul" style={{ marginLeft: marginLeft + "px" }}>
                    {slideItems.map((item, index) => (
                        <li key={index} className="product-card">
                            <div className={`product-img${index + 1} product-card-img`}></div>
                            <div className="product-small-info">
                                <Link to="/">{item.productName}</Link>
                                <Link to="/">{item.price}</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <FaChevronLeft className="left-arrow" onClick={moveLeft}/>
            <FaChevronRight className="right-arrow" onClick={moveRight}/>
            <Link to="/" className="link-btn">Click Here to More View</Link>
        </section>
    );
}

export default ProductSlide;
