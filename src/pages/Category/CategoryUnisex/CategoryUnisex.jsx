import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./CategoryUnisex.css"
import { RiEqualizerLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
// import axios from 'axios';

function CategoryUnisex() {
    const [isCategoryScroll, setIsCategoryScroll] = useState(false);

    // 상품 데이터 받아온 이후에 사용 할 코드
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        const handleCategoryScroll = () => {
            if (window.scrollY > 150) {
                setIsCategoryScroll(true);
            } else {
                setIsCategoryScroll(false);
            }
        };

        window.addEventListener('scroll', handleCategoryScroll);

        return () => {
            window.removeEventListener('scroll', handleCategoryScroll);
        };
    }, []);

    // 상품 데이터 받아온 이후에 사용 할 코드
    // useEffect(() => {
    //     axios.get('/products')
    //         .then(response => {
    //             setProducts(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching products:', error);
    //         });
    // }, []);


    return (
        <div className="category-page">
            <div className={`title-section ${isCategoryScroll ? 'scroll-category' : ''}`}>
                <div className="wrapper">
                    <h2>Unisex Products</h2>
                    <div className="filter-box">
                        <div className="filter">
                            <p>필터 표시</p>
                            <RiEqualizerLine className='icons'/>
                        </div>
                        <div className="sort-by">
                            <p>정렬 기준</p>
                            <FaChevronDown className='icons'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`contents-section ${isCategoryScroll ? 'scroll-category' : ''}`}>
                <ul className="product-card-box">
                    <li className="product-card">
                        <div className="img-section img1"></div>
                        <div className="product-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="img-section img2"></div>
                        <div className="product-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="img-section img3"></div>
                        <div className="product-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="img-section img4"></div>
                        <div className="product-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="img-section img5"></div>
                        <div className="product-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="img-section img6"></div>
                        <div className="product-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                    <li className="product-card">
                        <div className="img-section img7"></div>
                        <div className="product-info">
                            <Link to="/">Product Name</Link>
                            <Link to="/">Price</Link>
                        </div>
                    </li>
                </ul>

                {/* 상품 데이터 받아온 이후에 사용 할 코드 */}
                {/* <ul className="product-card-box">
                    {products.map(product => (
                        <li key={product.id} className="product-card">
                            <div className={`img-section img${product.id}`}></div>
                            <div className="product-info">
                                <Link to="/">{product.name}</Link>
                                <Link to="/">{product.price}</Link>
                            </div>
                        </li>
                    ))}
                </ul> */}

            </div>
        </div>
    );
}

export {CategoryUnisex};