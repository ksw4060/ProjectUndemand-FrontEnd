import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyWishListPage.css";

function MyWishListPage({ isLoggedin, memberId }) {
  const [wishLists, setWishLists] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/wishlist/${memberId}`)
      .then((response) => {
        setWishLists(response.data);
      })
      .catch((error) => {
        console.error(`잘못된 요청입니다:`, error);
      });
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
              src={`http://localhost:8080${wishItem.productThumbnails[0]}`}
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
