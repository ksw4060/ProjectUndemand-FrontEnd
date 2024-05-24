import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyWishListPage.css";

function MyWishListPage({ isLoggedin, memberId }) {
  const [wishLists, setWishLists] = useState([]);

  useEffect(() => {
    const fetchWishLists = async () => {
      try {
        // 로컬 스토리지에서 Authorization 토큰 가져오기
        const authorization = localStorage.getItem("Authorization");

        // Authorization 헤더를 포함한 axios 요청
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/${memberId}`,
          {
            headers: {
              Authorization: authorization, // 토큰을 Authorization 헤더에 추가
            },
          }
        );

        setWishLists(response.data);
      } catch (error) {
        console.error(`잘못된 요청입니다:`, error);
      }
    };

    fetchWishLists();
  }, [memberId]);

  return (
    <div className="my-wish-list-page">
      <div className="my-wish-list-page-title">
        <span>찜한 상품</span>
      </div>
      <div className="my-wish-list-container">
        {wishLists.map((wishItem) => (
          <div key={wishItem.wishListId} className="my-wish-product-card">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL_FOR_IMG}${wishItem.productThumbnails[0]}`}
              alt={`찜한 상품 이미지`}
            />
            <div className="my-wish-product-info">
              <div className="pd-name-type">
                <span>{wishItem.productName}</span>
                <span>{wishItem.productType}</span>
              </div>
              <div className="pd-price">
                <span>{`상품 가격: ${wishItem.price} 원`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MyWishListPage };
