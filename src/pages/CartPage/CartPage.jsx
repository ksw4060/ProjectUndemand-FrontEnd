import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import axios from "axios";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import WishBtn from "../../components/WishBtn/WishBtn.jsx";

function CartPage({ memberId, isLoggedin }) {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ withCredentials: true }); // 결제 로직에서 중요한 녀석입니다. 삭제 금지.
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const authorization = localStorage.getItem("Authorization");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${memberId}`,
          {
            headers: {
              Authorization: authorization,
            },
          }
        );
        setCartProducts(response.data);
      } catch (error) {
        console.error(`Failed to fetch cart:`, error);
      }
    };

    fetchCart();
  }, [memberId]);

  const handleIncrement = async (cartId, quantity) => {
    const newQuantity = quantity + 1;
    await updateQuantityOnServer(cartId, newQuantity);
  };

  const handleDecrement = async (cartId, quantity) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      await updateQuantityOnServer(cartId, newQuantity);
    }
  };

  const updateQuantityOnServer = async (cartId, quantity) => {
    try {
      const authorization = localStorage.getItem("Authorization");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${cartId}`,
        { quantity: quantity },
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${memberId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      setCartProducts(response.data);
    } catch (error) {
      console.error(`Failed to update quantity - cartId: ${cartId}`, error);
    }
  };

  const handleRemoveBtn = async (cartId) => {
    try {
      const authorization = localStorage.getItem("Authorization");
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${cartId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      const updatedCartProducts = cartProducts.filter(
        (product) => product.cartId !== cartId
      );
      setCartProducts(updatedCartProducts);
    } catch (error) {
      console.error(
        `Failed to remove product from cart - cartId: ${cartId}`,
        error
      );
    }
  };

  const handleOrderBtn = async () => {
    try {
      const authorization = localStorage.getItem("Authorization");
      const cartIds = cartProducts.map((product) => product.cartId);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/order/create`,
        { cartIds: cartIds },
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      console.log(response.data);
      navigate(`/cart/order`, {
        state: {
          memberId: memberId,
        },
      });
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  const totalPrice = cartProducts.reduce((acc, cartProduct) => {
    return acc + cartProduct.totalPrice;
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-page-wrapper">
        <div className="cart">
          <div className="cart-top">
            <header className="page-title">장바구니</header>
          </div>
          {cartProducts.map((cartProduct, index) => {
            return (
              <div key={cartProduct.cartId} className="cart-middle">
                <img
                  src={`http://localhost:8080${cartProduct.productThumbnail}`}
                  alt={cartProduct.productName}
                  className="cart-img"
                />
                <div className="cart-option-info">
                  <div className="cart-product-name">
                    {cartProduct.productName}
                  </div>
                  <div className="cart-product-type">
                    {cartProduct.productType}
                  </div>
                  <div className="cart-product-color">{cartProduct.color}</div>
                  <div className="cart-product-size-quantity">
                    <div className="size">
                      <span>{cartProduct.size}</span>
                    </div>
                    <div className="quantity">
                      <span>수량</span>
                      <div className="quantity-input-cart">
                        <span>{cartProduct.quantity}</span>
                        <div className="btn-flex-cart">
                          <MdOutlineKeyboardArrowUp
                            onClick={() =>
                              handleIncrement(
                                cartProduct.cartId,
                                cartProduct.quantity
                              )
                            }
                          />
                          <MdOutlineKeyboardArrowDown
                            onClick={() =>
                              handleDecrement(
                                cartProduct.cartId,
                                cartProduct.quantity
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cart-btn-container">
                    <WishBtn
                      memberId={memberId}
                      productId={cartProduct.productId}
                      isLoggedin={isLoggedin}
                      pageType={"cart"}
                    />
                    <FaRegTrashCan
                      onClick={() => handleRemoveBtn(cartProduct.cartId)}
                    />
                  </div>
                </div>
                <div className="cart-product-price">{`${cartProduct.totalPrice} 원`}</div>
              </div>
            );
          })}
        </div>
        <div className="bill">
          <div className="bill-top">
            <header className="page-title">주문 내역</header>
          </div>
          <div className="bill-middle">
            <div className="bill-product-price">
              <span>상품 금액</span>
              <span>{`${totalPrice} 원`}</span>
            </div>
            <div className="bill-delivery-price">
              <span>배송비</span>
              <span>{`무료`}</span>
            </div>
            <div className="bill-total-price">
              <span>총 결제 금액</span>
              <span>{`${totalPrice} 원`}</span>
            </div>
          </div>
          <div className="bill-bottom">
            <button className="order-btn" onClick={handleOrderBtn}>
              주문결제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CartPage };
