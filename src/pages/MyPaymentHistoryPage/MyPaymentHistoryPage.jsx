import React from "react";
import "./MyPaymentHistoryPage.css";

function MyPaymentHistoryPage() {
  return (
    <div className="my-payment-history-page">
      <div className="payhis-page-title">
        <span>나의 구매 기록</span>
        <div className="total-payhis-count">({`0개의 구매 기록`})</div>
      </div>
      <div className="payhis-page-filter">
        <div className="payhis-sort-box"></div>
        <div className="payhis-search-option"></div>
        <div className="payhis-filter-box"></div>
      </div>
      {[1, 2, 3, 4, 5, 6, 7].map((cnt) => (
        <div key={cnt} className="payhis-container">
          <div className="payhis-product-img-container">
            <img src="" alt={`구매한 상품 이미지`} />
          </div>
          <div className="payhis-product-info-container">
            <div className="payhis-product-info">
              <span>{`상품 이름`}</span>
              <span>{`상품 옵션`}</span>
              <span>{`상품 가격`}</span>
            </div>
            <span>{`구매 금액`}</span>
          </div>
          <div className="payhis-info-container">
            <span>{`구매 날짜`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export { MyPaymentHistoryPage };
