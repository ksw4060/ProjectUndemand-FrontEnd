import React, { useState } from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./ProductDetailPage.css";

function ProductDetailPage() {
    const [quantity, setQuantity] = useState(0);
    const [dropdownStates, setDropdownStates] = useState([false, false, false, false]);

    const handleIncrement = () => {
        if (quantity < 100) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };
    
    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const toggleDropdown = (index) => {
        setDropdownStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return (
        <div className="detail-page">
            <div className="img-and-option-section">
                <div className="img-box">
                    <ul className="thumbnail-img-container">
                        <li className="thumbnail-img"></li>
                        <li className="thumbnail-img"></li>
                        <li className="thumbnail-img"></li>
                        <li className="thumbnail-img"></li>
                        <li className="thumbnail-img"></li>
                    </ul>
                    <div className="hero-img-container">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="hero-img"/>
                    </div>
                </div>
                <div className="option-box">
                    <ul className="option-txt-box">
                        <li className="is-sale">30% 할인 중!</li>
                        <li className="product-name">Yellow Hoodie & Pants Set</li>
                        <li className="product-category">Woman</li>
                        <li className="product-price">$ 25.53</li>
                    </ul>
                    <div className="option-select-box">
                        <div className="option-color-container">
                            <p>색상 선택</p>
                            <ul>
                                <li className="option-color"></li>
                                <li className="option-color"></li>
                                <li className="option-color"></li>
                                <li className="option-color"></li>
                                <li className="option-color"></li>
                            </ul>
                        </div>
                        <div className="option-size-container">
                            <p>사이즈 선택</p>
                            <ul>
                                <li className="option-size">S</li>
                                <li className="option-size">M</li>
                                <li className="option-size">L</li>
                                <li className="option-size">XL</li>
                                <li className="option-size">XXL</li>
                            </ul>
                        </div>
                        <div className="option-quantity-container">
                            <p>수량 선택</p>
                            <div className="quantity-input">
                                <p>{quantity}</p>
                                <div className="btn-flex">
                                    <MdOutlineKeyboardArrowUp onClick={handleIncrement} />
                                    <MdOutlineKeyboardArrowDown onClick={handleDecrement}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="option-btn-box">
                        <ul className="option-btn-container">
                            <li className="option-btn">주문하기</li>
                            <li className="option-btn">장바구니</li>
                            <li className="option-btn">찜하기</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="detail-section">
                <div className="detail-img-box">
                    <ul className="detail-img-container">
                        <li className="detail-img">
                            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </li>
                        <li className="detail-img">
                            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </li>
                        <li className="detail-img">
                            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </li>
                        <li className="detail-img">
                            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </li>
                        <li className="detail-img">
                            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </li>
                        <li className="detail-img">
                            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </li>
                    </ul>
                </div>
                <div className="detail-dropdown-info">
                    <ul className="detail-dropdown-info-container">
                        <li className="detail-info">
                            <div className="detail-info-title" onClick={() => toggleDropdown(0)}>
                                <p>상품 설명</p>
                                {dropdownStates[0] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                            </div>
                            <div className={`detail-info-script ${dropdownStates[0] ? 'open' : ''}`}>
                                <p>상품에 대한 설명이 들어갑니다.</p>
                            </div>
                        </li>
                        <li className="detail-info">
                            <div className="detail-info-title" onClick={() => toggleDropdown(1)}>
                                <p>제조사</p>
                                {dropdownStates[1] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                            </div>
                            <div className={`detail-info-script ${dropdownStates[1] ? 'open' : ''}`}>
                                <p>상품에 대한 설명이 들어갑니다.</p>
                            </div>
                        </li>
                        <li className="detail-info">
                            <div className="detail-info-title" onClick={() => toggleDropdown(2)}>
                                <p>상품 재고</p>
                                {dropdownStates[2] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                            </div>
                            <div className={`detail-info-script ${dropdownStates[2] ? 'open' : ''}`}>
                                <p>상품에 대한 설명이 들어갑니다.</p>
                            </div>
                        </li>
                        <li className="detail-info">
                            <div className="detail-info-title" onClick={() => toggleDropdown(3)}>
                                <p>리뷰</p>
                                {dropdownStates[3] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                            </div>
                            <div className={`detail-info-script ${dropdownStates[3] ? 'open' : ''}`}>
                                <p>상품에 대한 설명이 들어갑니다.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export { ProductDetailPage };