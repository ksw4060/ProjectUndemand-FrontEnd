import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// CSS
import "./MyWishListPage.css";
import WishBtn from "../../components/WishBtn/WishBtn.jsx";

function MyWishListPage({ isLoggedin, memberId }) {
  const [wishLists, setWishLists] = useState([]);

  useEffect(() => {
    const fetchWishLists = async () => {
      try {
        // Authorization 헤더를 포함한 axios 요청
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/${memberId}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
            withCredentials: true,
          }
        );

        setWishLists(response.data);
        console.log(response.data);
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
        <div className="total-payhis-count">
          ({`${Object.keys(wishLists).length}개`})
        </div>
      </div>
      <div className="my-wish-list-container">
        {wishLists.map((wishItem) => (
          <div key={wishItem.wishListId} className="my-wish-product-card">
            <Link to={`/product/${wishItem.productId}`}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL_FOR_IMG}${wishItem.productThumbnails[0]}`}
                alt={wishItem.productName}
                className="wish-product-image"
              />
            </Link>
            <div className="my-wish-product-info">
              <div className="pd-name-type">
                <WishBtn
                  memberId={memberId}
                  productId={wishItem.productId}
                  isLoggedin={isLoggedin}
                  pageType={"profileWishList"}
                />
                <span>
                  {wishItem.productName}, {wishItem.productType}
                </span>
              </div>
              <div className="pd-price">
                <span>{`${wishItem.price} 원`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MyWishListPage };
