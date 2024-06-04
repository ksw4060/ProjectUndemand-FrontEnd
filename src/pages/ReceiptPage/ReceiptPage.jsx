import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./ReceiptPage.css";

function ReceiptPage() {
  const location = useLocation();
  const {
    memberId,
    ordererName,
    orderId,
    orderDay,
    address,
    detailAddress,
    totalPrice,
  } = location.state;
  const orderer = ordererName;
  const receiptOrderId = orderId;
  const receiptOrderDay = orderDay.substring(0, 10);
  const receiptAddress = address;
  const receiptDetailAddress = detailAddress;
  const receiptTotalPrice = totalPrice;
  const axiosInstance = axios.create({ withCredentials: true });
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${memberId}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );
        setOrderedProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [memberId]);

  const handleReceiptConfirm = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/order/paymentconfirm`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="receipt-page">
      <div className="topbar-logo">
        <Link
          to="/"
          onClick={() => {
            handleReceiptConfirm();
            window.location.replace("/");
          }}
        >
          Project Undemand
        </Link>
      </div>
      <header className="receipt-page-title">결제 완료</header>
      <div className="receipt-page-content">
        <div className="receipt-page-wrapper">
          <div className="ordered-products-container">
            <header className="container-title">주문한 상품</header>
            {orderedProducts.map((orderedProduct) => (
              <div key={orderedProduct.cartId} className="ordered-products">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL_FOR_IMG}${orderedProduct.productThumbnail}`}
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
              <span>{`주문번호 : ${receiptOrderId}`}</span>
              <span>{`주문인 : ${orderer}`}</span>
              <span>{`주소 : ${receiptAddress}`}</span>
              <span>{`상세주소 : ${receiptDetailAddress}`}</span>
              <span>{`주문일 : ${receiptOrderDay}`}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="receipt-confirm-btn"
        onClick={() => {
          handleReceiptConfirm();
          window.location.replace("/");
        }}
      >
        확인
      </button>
    </div>
  );
}

export { ReceiptPage };
