import React, { useState, useEffect } from "react";
import "./PaymentPage.css"

function PaymentPage () {
    const [sirName, setSirName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
        if (sirName && firstName && address && detailAddress && phoneNum && email) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [sirName, firstName, address, detailAddress, phoneNum, email]);

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
                                value={sirName}
                                onChange={(e) => setSirName(e.target.value)}
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
                                placeholder="전화번호"
                                value={phoneNum}
                                onChange={(e) => setPhoneNum(e.target.value)}
                            />
                            <input
                                className="input"
                                type="text"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="button-section">
                            <button disabled={notAllow} className="save-button">
                                    저장 및 계속
                            </button>
                        </div>
                    </div>
                    <div className="payment">
                        <header>결제</header>
                        <div className="payment-option">
                            <span>결제 수단 선택</span>
                            <button className="option-card">
                                토스
                            </button>
                        </div>
                        <div className="button-section">
                            <button disabled={notAllow} className="save-button">
                                    주문하기
                            </button>
                        </div>
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
                            <span>13000원</span>
                        </div>
                        <div className="cart-delivery-fee">
                            <span>배송비</span>
                            <span>0원</span>
                        </div>
                        <div className="cart-total-payment">
                            <span>총 결제 금액</span>
                            <span>13000원</span>
                        </div>
                        <div className="cart-product">
                            <img src="https://images.unsplash.com/photo-1612731486606-2614b4d74921?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <span>Test Product 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { PaymentPage }
