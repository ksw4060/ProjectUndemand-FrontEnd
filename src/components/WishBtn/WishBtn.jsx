import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./WishBtn.css";

const WishBtn = ({ memberId, productId, isLoggedin, pageType }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/wishlist/${memberId}`
      );
      const memberWishlist = response.data;
      memberWishlist.forEach((wishProduct) => {
        if (parseInt(wishProduct.productId) === parseInt(productId)) {
          setIsWishlist(true);
        }
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleWishSubmit = async () => {
    if (isLoggedin === true) {
      try {
        if (!isWishlist) {
          // Add to wishlist
          const response = await axios.post(
            `http://localhost:8080/api/v1/wishlist/${productId}/${memberId}`
          );
          console.log(response.data);
          setIsWishlist(true);
        } else {
          // Remove from wishlist
          const response = await axios.delete(
            `http://localhost:8080/api/v1/wishlist/${productId}/${memberId}`
          );
          console.log(response.data);
          setIsWishlist(false);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    } else {
      alert("로그인 후 이용 가능해요!");
    }
  };

  const renderWishButton = () => {
    if (pageType === "productDetail") {
      return (
        <li className="pd-page-heart-btn" onClick={() => handleWishSubmit()}>
          {!isWishlist ? <FaRegHeart /> : <FaHeart />}
          <span>찜하기</span>
        </li>
      );
    } else if (pageType === "cart") {
      return (
        <span
          className="cart-page-heart-btn"
          onClick={() => handleWishSubmit()}
        >
          {!isWishlist ? <FaRegHeart /> : <FaHeart />}
        </span>
      );
    }
  };

  // return (
  //   <span className="heart-btn" onClick={() => handleWishSubmit()}>
  //     {!isWishlist ? <FaRegHeart /> : <FaHeart />}
  //   </span>
  // );
  return renderWishButton();
};

export default WishBtn;
