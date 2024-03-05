import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./NewSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function NewSection() {
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
        <section className="new-products">
            <div className="small-title">
                <h1>New Products</h1>
            </div>
            <div className="products-box">
                <ul ref={slideUlRef} className="new-products-slide-ul" style={{ marginLeft: marginLeft + "px" }}>
                    <li className="product-card">
                        <div className="new-products-img1 product-card-img"></div>
                        <div className="new-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="new-products-img2 product-card-img"></div>
                        <div className="new-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="new-products-img3 product-card-img"></div>
                        <div className="new-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="new-products-img4 product-card-img"></div>
                        <div className="new-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="new-products-img5 product-card-img"></div>
                        <div className="new-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="new-products-img6 product-card-img"></div>
                        <div className="new-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="new-products-img7 product-card-img"></div>
                        <div className="new-procucts-small-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                </ul>
            </div>
            <FaChevronLeft className="new-products-left-arrow" onClick={moveLeft}/>
            <FaChevronRight className="new-products-right-arrow" onClick={moveRight}/>
            <Link to="/" className="link-btn">Click Here to More View</Link>
        </section>
    );
}

export default NewSection;
