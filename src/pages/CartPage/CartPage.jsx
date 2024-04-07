import React, { useState } from "react";
import "./CartPage.css"
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegHeart, FaRegTrashCan } from "react-icons/fa6";

function CartPage() {
    const [quantity, setQuantity] = useState(0);
    const [selectedSize, setSelectedSize] = useState('XS');

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

    const handleWishBtn = () => {

    }

    const handleRemoveBtn = () => {

    }

    return (
        <div className="cart-page">
            <div className="cart-page-wrapper">
                <div className="cart">
                    <div className="cart-top">
                        <h3 className="page-title">장바구니</h3>
                    </div>
                    <div className="cart-middle">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="cart-img"/>
                        <div className="cart-option-info">
                            <div className="cart-product-name">테스트 상품 1</div>
                            <div className="cart-product-type">Man</div>
                            <div className="cart-product-color">yellow</div>
                            <div className="cart-product-size-quantity">
                                <div className="size">
                                    <span>사이즈</span>
                                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="FREE">FREE</option>
                                        {console.log(selectedSize)}
                                    </select>
                                </div>
                                <div className="quantity">
                                    <span>수량</span>
                                    <div className="quantity-input-cart">
                                        <span>{quantity}</span>
                                        <div className="btn-flex-cart">
                                            <MdOutlineKeyboardArrowUp onClick={() => handleIncrement()} />
                                            <MdOutlineKeyboardArrowDown onClick={() => handleDecrement()}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-btn-container">
                                <FaRegHeart onClick={() => handleWishBtn} />
                                <FaRegTrashCan onClick={() => handleRemoveBtn} />
                            </div>
                        </div>
                        <div className="cart-product-price">30000원</div>
                    </div>
                </div>
                <div className="bill">
                    <div className="bill-top">
                        <h3 className="page-title">주문 내역</h3>
                    </div>
                    <div className="bill-middle">
                        <div className="bill-product-price">
                            <span>상품 금액</span>
                            <span>{`30000 원`}</span>
                        </div>
                        <div className="bill-delivery-price">
                            <span>배송비</span>
                            <span>{`무료`}</span>
                        </div>
                        <div className="bill-total-price">
                            <span>총 결제 금액</span>
                            <span>{`30000 원`}</span>
                        </div>
                    </div>
                    <div className="bill-bottom">
                        <button className="order-btn">주문결제</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CartPage };