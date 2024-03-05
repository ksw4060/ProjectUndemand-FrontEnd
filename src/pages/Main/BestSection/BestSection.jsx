import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./BestSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function BestSection() {
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
        <section className="best-products">
            <div className="small-title">
                <h1>Best Products</h1>
            </div>
            <div className="products-box">
                <ul ref={slideUlRef} className="best-products-slide-ul" style={{ marginLeft: marginLeft + "px" }}>
                    <li className="product-card">
                        <div className="best-products-img1 product-card-img"></div>
                        <div className="best-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="best-products-img2 product-card-img"></div>
                        <div className="best-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="best-products-img3 product-card-img"></div>
                        <div className="best-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="best-products-img4 product-card-img"></div>
                        <div className="best-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="best-products-img5 product-card-img"></div>
                        <div className="best-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="best-products-img6 product-card-img"></div>
                        <div className="best-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="best-products-img7 product-card-img"></div>
                        <div className="best-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                </ul>
            </div>
            <FaChevronLeft className="best-products-left-arrow" onClick={moveLeft}/>
            <FaChevronRight className="best-products-right-arrow" onClick={moveRight}/>
            <Link to="/" className="link-btn">Click Here to More View</Link>
        </section>
    );
}

export default BestSection;
