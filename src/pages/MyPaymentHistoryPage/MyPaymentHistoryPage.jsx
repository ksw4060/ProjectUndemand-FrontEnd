import React, { useEffect, useState } from "react";
import axios from "axios";
// CSS
import "./MyPaymentHistoryPage.css";

function MyPaymentHistoryPage({ memberId, isLoggedin }) {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [orderGroup, setOrderGroup] = useState({});

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        // 로컬 스토리지에서 Authorization 토큰 가져오기
        const authorization = localStorage.getItem("Authorization");

        // Authorization 헤더를 포함한 axios 요청
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/paymenthistory/${memberId}`,
          {
            headers: {
              Authorization: authorization,
            },
            withCredentials: true,
          }
        );

        setPaymentHistory(response.data);

        // 그룹화된 데이터로 상태 설정
        const groupedData = groupByOrderId(response.data);
        setOrderGroup(groupedData);
        console.log(groupedData);
      } catch (error) {
        console.error(`잘못된 요청입니다:`, error);
      }
    };

    fetchPaymentHistory();
  }, [memberId]);

  return (
    <div className="my-payment-history-page">
      <div className="payhis-page-title">
        <span>나의 구매 기록</span>
        <div className="total-payhis-count">
          ({`${Object.keys(orderGroup).length}개`})
        </div>
      </div>
      <div className="payhis-page-filter">
        <div className="payhis-sort-box"></div>
        <div className="payhis-search-option"></div>
        <div className="payhis-filter-box"></div>
      </div>
      {Object.keys(orderGroup).map((orderId) => (
        <div key={orderId} className="payment-histories">
          <div className="payment-content-title">
            <span className="weight-font17">
              {new Date(orderGroup[orderId].paiedAt).toLocaleDateString()}
            </span>
            <button className="payhisSmallButton">상세보기</button>
          </div>
          <div className="payment-history-container">
            <div className="payhis-container">
              <div className="payhis-info-container">
                <span className="weight-font17">배송시작</span>
                <span className="weight-font17">주문 번호 : {orderId}</span>
              </div>
              {orderGroup[orderId].products.map((product, index) => {
                const productImgPathUrl = `${process.env.REACT_APP_BACKEND_URL_FOR_IMG}${product.imagePath}`;
                return (
                  <div key={index} className="payhis-product-info-container">
                    <img
                      src={productImgPathUrl}
                      alt={product.productName}
                      className="payhis-product-img"
                    />
                    <div className="payhis-product-info">
                      <div className="price-cart-container">
                        <span className="weight-font17">
                          {product.productName}, {product.option}
                        </span>
                      </div>
                      <div className="price-cart-container">
                        <span className="weight-font17">
                          {product.productPrice} 원, {product.productQuantity}{" "}
                          개
                        </span>
                        <button className="payhisSmallButton">To Cart</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="payment-history-btn-container">
            <button className="payhisSmallButton">교환, 반품신청</button>
            <button className="payhisSmallButton">배송 조회</button>
          </div>
          <div className="payment-history-review-container">
            <button className="payhisSmallButton">구매후기 쓰기</button>
          </div>
          <div className="payment-history-cart-container">
            <button className="payhisSmallButton">
              전체 상품 장바구니에 담기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper function to group payments by orderId
const groupByOrderId = (paymentHistory) => {
  return paymentHistory.reduce((groups, payment) => {
    const {
      orderId,
      paymentId,
      memberId,
      buyerAddr,
      discount,
      merchantUid,
      ordererName,
      orderedAt,
      paiedAt,
      payMethod,
      phoneNumber,
      review,
      statusType,
      totalPrice,
      imagePath,
      productName,
      productPrice,
      productQuantity,
      option,
      productId,
    } = payment;

    if (!groups[orderId]) {
      groups[orderId] = {
        orderId,
        paymentId,
        memberId,
        buyerAddr,
        discount,
        merchantUid,
        ordererName,
        orderedAt,
        paiedAt,
        payMethod,
        phoneNumber,
        review,
        statusType,
        totalPrice,
        products: [],
      };
    }

    groups[orderId].products.push({
      imagePath,
      productName,
      productPrice,
      productQuantity,
      option,
      productId,
    });

    return groups;
  }, {});
};

export { MyPaymentHistoryPage };
