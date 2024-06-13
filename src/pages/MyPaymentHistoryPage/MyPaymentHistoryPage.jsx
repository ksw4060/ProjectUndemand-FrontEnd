import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
// CSS
import "./MyPaymentHistoryPage.css";
import { handleCartSubmit, handleAddAllToCart } from "../CartPage/CartUtil.jsx";

function MyPaymentHistoryPage({
  memberId,
  isLoggedin,
  cartProducts,
  setCartProducts,
}) {
  const [orderGroup, setOrderGroup] = useState({});
  const [productInventory, setProductInventory] = useState([]);
  const navigate = useNavigate(); // navigate 사용

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

        // 그룹화된 데이터로 상태 설정
        const groupedData = groupByOrderId(response.data);
        setOrderGroup(groupedData);

        // 각 상품에 대해 데이터 조회
        const fetchProductData = async () => {
          const inventories = [];
          for (const orderId in groupedData) {
            const products = groupedData[orderId].products;
            for (const product of products) {
              const productResponse = await axios.get(
                `${process.env.REACT_APP_BACKEND_BASE_URL}/products/${product.productId}`
              );

              if (productResponse.status === 200) {
                const invenResponse = await axios.get(
                  `${process.env.REACT_APP_BACKEND_BASE_URL}/inventory`,
                  {
                    headers: {
                      Authorization: localStorage.getItem("Authorization"),
                    },
                    withCredentials: true,
                  }
                );

                const invenResData = invenResponse.data;
                const filteredInventory = invenResData.filter(
                  (inven) =>
                    parseInt(inven.productId) === parseInt(product.productId)
                );

                inventories.push(...filteredInventory);
              }
            }
          }
          setProductInventory(inventories);
        };

        fetchProductData();
      } catch (error) {
        console.error(`잘못된 요청입니다:`, error);
      }
    };

    fetchPaymentHistory();
  }, [memberId]);

  const handleSearchInvenId = (color, size) => {
    if (color && size) {
      const searchInventory = productInventory.find(
        (item) => item.color === color && item.size === size
      );
      if (searchInventory) {
        return searchInventory.inventoryId;
      }
    }
    return null;
  };

  const parseOption = (option) => {
    const [color, size] = option.split(", ").map((item) => item.trim());
    return { color, size };
  };

  const handleViewDetail = (orderId) => {
    navigate(`/user/mypage/payment-detail/${orderId}`, {
      state: orderGroup[orderId],
    });
  };

  return (
    <div className="my-payment-history-page">
      <div className="payhis-page-title">
        <span>구매 내역</span>
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
            <button
              className="payhisSmallButton"
              onClick={() => handleViewDetail(orderId)}
            >
              상세보기
            </button>
          </div>
          <div
            className="payment-history-container"
            style={{ marginTop: "20px" }}
          >
            <div className="payhis-container">
              <div className="payhis-info-container">
                <span className="weight-font17">배송시작</span>
                <span className="weight-font17">주문 번호 : {orderId}</span>
              </div>
              {orderGroup[orderId].products.map((product, index) => {
                const productImgPathUrl = `${process.env.REACT_APP_BACKEND_URL_FOR_IMG}${product.imagePath}`;
                const { color, size } = parseOption(product.option);
                const invenId = handleSearchInvenId(color, size);
                return (
                  <div key={index} className="payhis-product-info-container">
                    <Link to={`/product/${product.productId}`}>
                      <img
                        src={productImgPathUrl}
                        alt={product.productName}
                        className="payhis-product-img"
                      />
                    </Link>
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
                        <button
                          className="payhisSmallButton"
                          onClick={() =>
                            handleCartSubmit(
                              isLoggedin,
                              invenId,
                              memberId,
                              product.productQuantity,
                              setCartProducts,
                              navigate
                            )
                          }
                        >
                          To Cart
                        </button>
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
            <button
              className="payhisSmallButton"
              onClick={() =>
                handleAddAllToCart(
                  isLoggedin,
                  orderId,
                  orderGroup,
                  handleSearchInvenId,
                  memberId,
                  setCartProducts,
                  navigate,
                  parseOption
                )
              }
            >
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
