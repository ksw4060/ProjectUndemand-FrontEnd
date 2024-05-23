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
    if (isLoggedin === true) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/${memberId}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
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
    } else {
      return;
    }
  };

  const handleWishSubmit = async () => {
    if (isLoggedin === true) {
      try {
        if (!isWishlist) {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/${productId}/${memberId}`,
            null,
            {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            }
          );
          console.log(response.data);
          setIsWishlist(true);
        } else {
          const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/${productId}/${memberId}`,
            {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            }
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

  return renderWishButton();
};

export default WishBtn;
