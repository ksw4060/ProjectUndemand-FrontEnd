import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./CartPage.css"
import axios from "axios";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegHeart, FaRegTrashCan } from "react-icons/fa6";

function CartPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstance = axios.create({ withCredentials: true });
    const queryParams = new URLSearchParams(location.search);
    const memberId = parseInt(queryParams.get('memberId'));
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/cart/${memberId}`);
                setCartProducts(response.data);
            } catch (error) {
                console.error(`잘못된 요청입니다:`, error);
            }
        };

        fetchCart();
    }, [memberId]);

    const handleIncrement = (index) => {
        const updatedCartProducts = [...cartProducts];
        const updatedProduct = { ...updatedCartProducts[index] };
        updatedProduct.quantity++;
        updatedCartProducts[index] = updatedProduct;
        setCartProducts(updatedCartProducts);
        updateQuantityOnServer(updatedProduct.cartId, updatedProduct.quantity);
    };
    
    const handleDecrement = (index) => {
        const updatedCartProducts = [...cartProducts];
        const updatedProduct = { ...updatedCartProducts[index] };
        if (updatedProduct.quantity > 0) {
            updatedProduct.quantity--;
            updatedCartProducts[index] = updatedProduct;
            setCartProducts(updatedCartProducts);
            updateQuantityOnServer(updatedProduct.cartId, updatedProduct.quantity);
        }
    };

    const updateQuantityOnServer = async (cartId, quantity) => {
        try {
            await axios.put(`http://localhost:8080/api/v1/cart/${cartId}`, {
                quantity: quantity
            });
            const response = await axios.get(`http://localhost:8080/api/v1/cart/${memberId}`);
            const updatedProduct = response.data;
            setCartProducts(updatedProduct);
        } catch (error) {
            console.error(`수량 및 가격 수정 실패 - cartId: ${cartId}`, error);
        }
    };

    const handleWishBtn = () => {

    };

    const handleRemoveBtn = async (cartId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/cart/${cartId}`);
            const updatedCartProducts = cartProducts.filter(product => product.cartId !== cartId);
            setCartProducts(updatedCartProducts);
        } catch (error) {
            console.error(`장바구니에서 상품 빼기 실패 - cartId: ${cartId}`, error);
        }
    };

    const totalPrice = cartProducts.reduce((acc, cartProduct) => {
        return acc + (cartProduct.totalPrice);
    }, 0);

    const handleOrderBtn = async () => {
        try {
            const cartIds = cartProducts.map(product => product.cartId);
            const response = await axiosInstance.post(`http://localhost:8080/api/v1/order/create`, {
                cartIds: cartIds
            })
            console.log(response.data)
            navigate(`/cart/order`)
        } catch (error) {
            console.error('요청을 보내는 중 오류가 발생했습니다:', error);
        }
    }

    return (
        <div className="cart-page">
            <div className="cart-page-wrapper">
                <div className="cart">
                    <div className="cart-top">
                        <h3 className="page-title">장바구니</h3>
                    </div>
                    {cartProducts.map((cartProduct, index) => (
                        <div key={cartProduct.cartId} className="cart-middle">
                            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="cart-img"/>
                            <div className="cart-option-info">
                                <div className="cart-product-name">{cartProduct.productName}</div>
                                <div className="cart-product-type">{cartProduct.productType}</div>
                                <div className="cart-product-color">{cartProduct.color}</div>
                                <div className="cart-product-size-quantity">
                                    <div className="size">
                                        <span>{cartProduct.size}</span>
                                    </div>
                                    <div className="quantity">
                                        <span>수량</span>
                                        <div className="quantity-input-cart">
                                            <span>{cartProduct.quantity}</span>
                                            <div className="btn-flex-cart">
                                                <MdOutlineKeyboardArrowUp onClick={() => handleIncrement(index)} />
                                                <MdOutlineKeyboardArrowDown onClick={() => handleDecrement(index)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-btn-container">
                                    <FaRegHeart onClick={() => handleWishBtn()} />
                                    <FaRegTrashCan onClick={() => handleRemoveBtn(cartProduct.cartId)} />
                                </div>
                            </div>
                            <div className="cart-product-price">{`${cartProduct.totalPrice} 원`}</div>
                        </div>
                    ))}
                </div>
                <div className="bill">
                    <div className="bill-top">
                        <h3 className="page-title">주문 내역</h3>
                    </div>
                    <div className="bill-middle">
                        <div className="bill-product-price">
                            <span>상품 금액</span>
                            <span>{`${totalPrice} 원`}</span>
                        </div>
                        <div className="bill-delivery-price">
                            <span>배송비</span>
                            <span>{`무료`}</span>
                        </div>
                        <div className="bill-total-price">
                            <span>총 결제 금액</span>
                            <span>{`${totalPrice} 원`}</span>
                        </div>
                    </div>
                    <div className="bill-bottom">
                        <button className="order-btn" onClick={() => handleOrderBtn()}>주문결제</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CartPage };