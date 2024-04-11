import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./ReceiptPage.css";

function ReceiptPage() {
  const location = useLocation();
  const {
    memberId,
    ordererName,
    // productMgtIds,
    orderId,
    orderDay,
    address,
    detailAddress,
    totalPrice,
  } = location.state;
  const orderMemberId = memberId;
  const orderer = ordererName;
  // const orderedProducts = productMgtIds;
  const receiptOrderId = orderId;
  const receiptOrderDay = orderDay;
  const receiptAddress = address;
  const receiptDetailAddress = detailAddress;
  const receiptTotalPrice = totalPrice;
  const [orderedProducts, setOrderedProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     orderedProducts.forEach(async (productId) => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8080/api/v1/inventory/${productId}`
  //         );
  //         console.log(response.data);
  //       } catch (error) {
  //         console.error(`Error fetching product ${productId}:`, error);
  //       }
  //     });
  //   };

  //   fetchProducts();
  // }, [orderMemberId, orderedProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/cart/${orderMemberId}`
        );
        setOrderedProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [orderMemberId]);

  useEffect(() => {
    const paymentConfirm = async () => {
      try {
        if (orderedProducts.length > 0) {
          const response = await axios.get(
            "http://localhost:8080/api/v1/order/paymentconfirm"
          );
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    paymentConfirm();
  }, [orderedProducts]);

  console.log(orderedProducts);

  return (
    <div className="receipt-page">
      <header className="receipt-page-title">결제 완료</header>
      <div className="receipt-page-content">
        <div className="receipt-page-wrapper">
          <div className="ordered-products-container">
            <header className="container-title">주문한 상품</header>
            {orderedProducts.map((orderedProduct) => (
              <div key={orderedProduct.cartId} className="ordered-products">
                <img
                  src="https://images.unsplash.com/photo-1612731486606-2614b4d74921?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div className="receipt-products-info">
                  <span>{orderedProduct.productName}</span>
                  <span>{`색상: ${orderedProduct.color}`}</span>
                  <span>{`사이즈: ${orderedProduct.size}`}</span>
                  <span>{`수량: ${orderedProduct.quantity} / ${orderedProduct.totalPrice} 원`}</span>
                </div>
              </div>
            ))}
            <span>{`총 결제 금액: ${receiptTotalPrice} 원`}</span>
          </div>
          <div className="receipt-box-container">
            <header className="container-title">배송 및 주문자 정보</header>
            <div className="receipt-box">
              <span>{`주문번호: ${receiptOrderId}`}</span>
              <span>{`주문인: ${orderer}`}</span>
              <span>{`주소: ${receiptAddress}`}</span>
              <span>{`상세주소: ${receiptDetailAddress}`}</span>
              <span>{`주문일:${receiptOrderDay}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ReceiptPage };
