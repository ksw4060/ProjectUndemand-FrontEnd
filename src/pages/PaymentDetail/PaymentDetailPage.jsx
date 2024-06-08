import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
// CSS
import "./PaymentDetailPage.css";

function PaymentDetailPage({ memberId }) {
  const { orderId } = useParams();
  const location = useLocation();
  const paymentDetails = location.state || {};
  const [orderDetail, setOrderDetail] = useState(paymentDetails);
  const [orderGroup, setOrderGroup] = useState({});
  const [paymentHistories, setPaymentHistories] = useState([]);

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

        setPaymentHistories(response.data);

        // 그룹화된 데이터로 상태 설정
        const groupedData = groupByOrderId(response.data);
        setOrderGroup(groupedData);
        console.log(groupedData);

        if (!orderDetail || Object.keys(orderDetail).length === 0) {
          setOrderDetail(groupedData[orderId] || {});
        }
      } catch (error) {
        console.error(`잘못된 요청입니다:`, error);
      }
    };

    fetchPaymentHistory();
  }, [memberId, orderId]);

  console.log(orderDetail);

  return (
    <div className="payment-histories">
      <h1>주문 상세</h1>
      <p>주문 번호: {orderId}</p>
      {orderDetail && Object.keys(orderDetail).length > 0 ? (
        <div>
          <div className="order-detail">
            <h2>결제 정보</h2>
            <div className="payment-content-title">
              <span>상품 가격</span>
              <span>{orderDetail.totalPrice} 원</span>
            </div>
            <div className="payment-content-title">
              <span>할인 금액</span>
              <span>0 원</span>
            </div>
            <div className="payment-content-title">
              <span>배송비</span>
              <span>0 원</span>
            </div>
            <div className="payment-content-title">
              <span>결제 상태</span>
              <span>{orderDetail.statusType}</span>
            </div>
            <div className="payment-content-title">
              <span>{orderDetail.payMethod.toUpperCase()} / 일시불</span>
              <span>{orderDetail.totalPrice} 원</span>
            </div>
            <div className="payment-content-title">
              <span className="weight-font17">총 결제 금액</span>
              <span className="weight-font17">{orderDetail.totalPrice} 원</span>
            </div>
          </div>
          {/* MyPaymentHistoryPage */}
          <div key={orderId} className="payment-histories">
            <div className="payment-content-title">
              <span className="weight-font17">
                {new Date(orderDetail.paiedAt).toLocaleDateString()}
              </span>
              <span className="weight-font17">주문 번호 {orderId}</span>
            </div>
            <div className="payment-history-container">
              <div className="payhis-container">
                <div className="payhis-info-container">
                  <span className="weight-font17">배송시작</span>
                </div>
                {orderDetail.products.map((product, index) => {
                  const productImgPathUrl = `${process.env.REACT_APP_BACKEND_URL_FOR_IMG}${product.imagePath}`;
                  return (
                    <div key={index} className="payhis-product-info-container">
                      <img
                        src={productImgPathUrl}
                        alt={product.productName}
                        className="payhis-product-img"
                      />
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
                          <button className="payhisSmallButton">To Cart</button>
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
              <button className="payhisSmallButton">
                전체 상품 장바구니에 담기
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>주문 상세 정보를 불러오는 중입니다...</p>
      )}
      <div className="order-detail">
        <div className="payment-content-title">
          <h2>{orderDetail.ordererName}</h2>
        </div>
        <div className="payment-content-title">
          <span>{orderDetail.buyerAddr} </span>
        </div>
        <div className="payment-content-title">
          <span>{orderDetail.phoneNumber} </span>
        </div>
        <div className="payment-content-title">
          <span>배송 요청사항 : 없음</span>
        </div>
      </div>
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

export { PaymentDetailPage };
