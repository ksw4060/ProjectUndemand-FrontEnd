import React, { useEffect, useState } from "react";
import "./MyPaymentHistoryPage.css";
import axios from "axios";

function MyPaymentHistoryPage({ memberId, isLoggedin }) {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        // 로컬 스토리지에서 Authorization 토큰 가져오기
        const authorization = localStorage.getItem("Authorization");

        // Authorization 헤더를 포함한 axios 요청
        const response = await axios.get(
          `http://localhost:8080/api/v1/paymenthistory/${memberId}`,
          {
            headers: {
              Authorization: authorization, // 토큰을 Authorization 헤더에 추가
            },
          }
        );

        setPaymentHistory(response.data);
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
          ({`${paymentHistory.length}개의 구매 기록`})
        </div>
      </div>
      <div className="payhis-page-filter">
        <div className="payhis-sort-box"></div>
        <div className="payhis-search-option"></div>
        <div className="payhis-filter-box"></div>
      </div>
      {paymentHistory.map((payment) => (
        <div key={payment.paymentId} className="payhis-container">
          <div className="payhis-product-info-container">
            <div className="payhis-product-info">
              <span>{payment.product}</span> {/* 상품 이름 */}
              <span>{payment.option}</span> {/* 상품 옵션 */}
              <span>{payment.productPrice}</span> {/* 상품 가격 */}
            </div>
            <span>{payment.totalPrice}</span> {/* 구매 금액 */}
            <span>
              {payment.review ? "내가 작성한 리뷰" : "구매 리뷰 남기기"}
            </span>{" "}
            {/* 리뷰 여부 */} {/* 구매 날짜 */}
          </div>
          <div className="payhis-info-container">
            <span>{new Date(payment.payedAte).toLocaleDateString()}</span>{" "}
            {/* 결제 날짜 */}
          </div>
        </div>
      ))}
    </div>
  );
}

export { MyPaymentHistoryPage };
