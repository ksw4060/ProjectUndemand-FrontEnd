import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./CategoryBest.css";
import { RiEqualizerLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
// import axios from 'axios';

function CategoryBest() {
    const [isCategoryScroll, setIsCategoryScroll] = useState(false);
    const [isFilterClicked, setIsFilterClicked] = useState(false);

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

    const hanldeFilterClick = () => {
        setIsFilterClicked(prevState => !prevState);
    };

    return (
        <div className="category-page">
            <div className={`title-section ${isCategoryScroll ? 'scroll-category' : ''}`}>
                <div className="wrapper">
                    <h2>Best Products</h2>
                    <div className="filter-box">
                        <div className="filter" onClick={() => hanldeFilterClick()}>
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
                <div className={`filter-section ${isFilterClicked && 'filter-active'}`}>
                    <ul className="category-options">
                        <li className='filter-option'>상의</li>
                        <li className='filter-option'>하의</li>
                        <li className='filter-option'>아우터</li>
                        <li className='filter-option'>신발</li>
                        <li className='filter-option'>악세서리</li>
                    </ul>
                    <ul className="price-options">
                        <li className='filter-option-title'><span>가격대</span> <span>(0)</span></li>
                        <li className='filter-option'><input type="radio" /><span>0 ~ 50,000 원</span></li>
                        <li className='filter-option'><input type="radio" /><span>50,000 ~ 100,000 원</span></li>
                        <li className='filter-option'><input type="radio" /><span>100,000 ~ 150,000 원</span></li>
                        <li className='filter-option'><input type="radio" /><span>150,000 ~ 200,000 원</span></li>
                        {/* <li><input type="radio" /><span>200,000 ~ 250,000 원</span></li>
                        <li><input type="radio" /><span>250,000 ~ 300,000 원</span></li> */}
                    </ul>
                    <ul className="color-options">
                        <li className='filter-option-title'><span>색상</span> <span>(0)</span></li>
                        <li className='filter-option'><input type="radio" /><span>블랙</span></li>
                        <li className='filter-option'><input type="radio" /><span>화이트</span></li>
                        <li className='filter-option'><input type="radio" /><span>네이비</span></li>
                        <li className='filter-option'><input type="radio" /><span>그레이</span></li>
                    </ul>
                </div>
                <div className="products-section">
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
                </div>
                {/* <ul className="product-card-box">
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
                </ul> */}

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

export {CategoryBest};