import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./SaleSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function SaleSection() {
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
        <section className="sale-products">
            <div className="small-title">
                <h1>Sale Products</h1>
            </div>
            <div className="products-box">
                <ul ref={slideUlRef} className="sale-products-slide-ul" style={{ marginLeft: marginLeft + "px" }}>
                    <li className="product-card">
                        <div className="sale-products-img1 product-card-img"></div>
                        <div className="sale-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="sale-products-img2 product-card-img"></div>
                        <div className="sale-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="sale-products-img3 product-card-img"></div>
                        <div className="sale-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="sale-products-img4 product-card-img"></div>
                        <div className="sale-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="sale-products-img5 product-card-img"></div>
                        <div className="sale-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="sale-products-img6 product-card-img"></div>
                        <div className="sale-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="sale-products-img7 product-card-img"></div>
                        <div className="sale-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                </ul>
            </div>
            <FaChevronLeft className="sale-products-left-arrow" onClick={moveLeft}/>
            <FaChevronRight className="sale-products-right-arrow" onClick={moveRight}/>
            <Link to="/" className="link-btn">Click Here to More View</Link>
        </section>
    );
}

export default SaleSection;
