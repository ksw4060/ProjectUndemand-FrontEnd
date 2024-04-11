import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentPage.css";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberId } = location.state;
  const orderMemberId = memberId;
  const [familyName, setFamilyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [postCode, setPostCode] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [notAllow, setNotAllow] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [showPayOption, setShowPayOption] = useState(false);
  const axiosInstance = axios.create({ withCredentials: true });

  useEffect(() => {
    if (
      familyName &&
      firstName &&
      address &&
      detailAddress &&
      phoneNum &&
      postCode
    ) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
      setShowPayOption(false);
    }
  }, [familyName, firstName, address, detailAddress, phoneNum, postCode]);

  useEffect(() => {
    let nameSum;
    if (familyName && firstName) {
      nameSum = familyName + firstName;
    }
    setFullName(nameSum);
  }, [familyName, firstName]);

  useEffect(() => {
    const handleFetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/cart/${orderMemberId}`
        );
        setCartProducts(response.data);
      } catch (error) {
        console.error(`잘못된 요청입니다:`, error);
      }
    };

    handleFetchProduct();
  }, [orderMemberId]);

  useEffect(() => {
    let totalPriceSum = 0;

    cartProducts.forEach((cartProduct) => {
      totalPriceSum += cartProduct.totalPrice;
    });

    setTotalPrice(totalPriceSum);
  }, [cartProducts]);

  async function completeOrder() {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/v1/order/done",
        {
          postCode: postCode,
          address: address,
          detailAddress: detailAddress,
          ordererName: fullName,
          phoneNumber: phoneNum,
          payMethod: payMethod,
        }
      );
      console.log(response.data);
      handlePayment(response.data);
    } catch (error) {
      console.error("Error completing order:", error);
    }
  }

  async function handlePayment(orderInfo) {
    window.IMP.init("imp04081725");
    window.IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: orderInfo.payMethod,
        merchant_uid: orderInfo.merchantUid,
        name: orderInfo.productName,
        amount: orderInfo.totalPrice,
        buyer_name: orderInfo.ordererName,
        buyer_tel: orderInfo.phoneNumber,
        buyer_postcode: orderInfo.postCode,
        buyer_addr: orderInfo.address,
      },
      (rsp) => {
        if (rsp.success) {
          axios
            .post(`http://localhost:8080/api/v1/order/payment/${rsp.imp_uid}`, {
              memberId: orderInfo.memberId,
              orderId: orderInfo.orderId,
              price: orderInfo.totalPrice,
              inventoryIdList: orderInfo.productMgtIds,
            })
            .then((res) => {
              console.log(rsp);
              navigate("/cart/order/done", {
                state: {
                  memberId: orderInfo.memberId,
                  ordererName: orderInfo.ordererName,
                  productMgtIds: orderInfo.productMgtIds,
                  orderId: orderInfo.orderId,
                  orderDay: orderInfo.orderDay,
                  address: orderInfo.address,
                  detailAddress: orderInfo.detailAddress,
                  totalPrice: orderInfo.totalPrice,
                },
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.error(rsp.error_msg);
        }
      }
    );
  }

  const handleShowPayOption = () => {
    setShowPayOption(true);
  };

  return (
    <div className="payment-page">
      <header className="payment-page-title">결제하기</header>
      <div className="payment-page-wrapper">
        <div className="order-section">
          <div className="delivery">
            <header>배송 옵션</header>
            <div className="inputWrap-name">
              <input
                className="input"
                type="text"
                placeholder="성"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="이름"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="inputWrap-address">
              <input
                className="input"
                type="text"
                placeholder="도로명, 건물명을 입력해주세요."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="상세 주소를 입력해주세요."
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
              />
            </div>
            <div className="inputWrap-phone-email">
              <input
                className="input"
                type="text"
                placeholder="우편번호"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="전화번호"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </div>
            <div className="button-section">
              <button
                disabled={notAllow}
                onClick={() => handleShowPayOption()}
                className="save-button"
              >
                저장 및 계속
              </button>
            </div>
          </div>
          <div className="payment">
            <header>결제</header>
            {showPayOption && (
              <>
                <div className="payment-option">
                  <span>결제 수단 선택</span>
                  <div className="payment-option-select">
                    <button
                      onClick={() => setPayMethod("CARD")}
                      className={`option-pay-method ${
                        payMethod === "CARD" ? "selected-pay-method" : ""
                      }`}
                    >
                      카드
                    </button>
                    <button
                      onClick={() => setPayMethod("TRANS")}
                      className={`option-pay-method ${
                        payMethod === "TRANS" ? "selected-pay-method" : ""
                      }`}
                    >
                      계좌이체
                    </button>
                    <button
                      onClick={() => setPayMethod("VBANK")}
                      className={`option-pay-method ${
                        payMethod === "VBANK" ? "selected-pay-method" : ""
                      }`}
                    >
                      가상계좌
                    </button>
                    <button
                      onClick={() => setPayMethod("PHONE")}
                      className={`option-pay-method ${
                        payMethod === "PHONE" ? "selected-pay-method" : ""
                      }`}
                    >
                      휴대폰 결제
                    </button>
                  </div>
                </div>
                <div className="button-section">
                  <button
                    disabled={notAllow}
                    onClick={() => completeOrder()}
                    className="save-button"
                  >
                    주문하기
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="order-review">
            <header>주문 완료</header>
          </div>
        </div>
        <div className="cart-section">
          <header className="cart-title">장바구니</header>
          <div className="cart-info">
            <div className="cart-price">
              <span>상품 금액</span>
              <span>{`${totalPrice} 원`}</span>
            </div>
            <div className="cart-delivery-fee">
              <span>배송비</span>
              <span>0 원</span>
            </div>
            <div className="cart-total-price">
              <span>총 결제 금액</span>
              <span>{`${totalPrice} 원`}</span>
            </div>
            {cartProducts.map((cartProduct) => (
              <div key={cartProduct.cartId} className="cart-product">
                <img
                  src="https://images.unsplash.com/photo-1612731486606-2614b4d74921?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div className="cart-product-info">
                  <span>{cartProduct.productName}</span>
                  <span>{`색상: ${cartProduct.color}`}</span>
                  <span>{`사이즈: ${cartProduct.size}`}</span>
                  <span>{`가격: ${cartProduct.productPrice} 원`}</span>
                  <span>{`수량: ${cartProduct.quantity} / ${cartProduct.totalPrice} 원`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { PaymentPage };
