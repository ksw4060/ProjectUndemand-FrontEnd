import React from "react";
import "./MyWishListPage.css";

function MyWishListPage() {
  return (
    <div className="my-wish-list-page">
      <div className="my-wish-list-page-title">
        <span>위시리스트</span>
      </div>
      <div className="my-wish-list-container">
        {[1, 2, 3, 4, 5, 6, 7].map((cnt) => (
          <div key={cnt} className="my-wish-product-card">
            <img src="" alt={`찜한 상품 이미지`} />
            <div className="my-wish-product-info">
              <div className="pd-name-type">
                <span>{`상품 이름`}</span>
                <span>{`상품 타입(ex. UNISEX, MAN, WOMAN)`}</span>
              </div>
              <div className="pd-price">
                <span>{`상품 가격: 0 원`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MyWishListPage };
