import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

import { MyProfilePage } from "../MyProfilePage/MyProfilePage.jsx";
import { MyPaymentHistoryPage } from "../MyPaymentHistoryPage/MyPaymentHistoryPage.jsx";
import { PaymentDetailPage } from "../PaymentDetail/PaymentDetailPage.jsx";
import { MyWishListPage } from "../MyWishListPage/MyWishListPage.jsx";
import { MyReviewPage } from "../MyReviewPage/MyReviewPage.jsx";
import { UpdateUserInfoPage } from "../UpdateUserInfoPage/UpdateUserInfoPage.jsx";
import PasswordCheckPage from "../PasswordCheckPage/PasswordCheckPage.jsx";
import "./MyPage.css";

function MyPage({
  isLoggedin,
  memberId,
  profileData,
  profileImageUrl,
  setProfileImageUrl,
  cartProducts,
  setCartProducts,
}) {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

  // PrivateRoutes 설정으로 인해, 이용불가. 추후 구현예정 [24.06.05]

  //   useEffect(() => {
  //     const checkLoginStatus = async () => {
  //       if (!isLoggedin) {
  //         const result = await swal({
  //           title: "로그인을 하지 않은 유저는 회원 페이지를 이용할 수 없습니다.",
  //           buttons: {
  //             confirm: {
  //               text: "로그인 페이지로 이동",
  //               value: true,
  //               visible: true,
  //               className: "",
  //               closeModal: true,
  //             },
  //           },
  //         });

  //         if (result) {
  //           navigate("/login");
  //         }
  //       }
  //     };

  //     checkLoginStatus();
  //   }, [isLoggedin, navigate]);

  return (
    <div className="my-page">
      <div className="my-page-navigator-container">
        <div className="my-page-navigator">
          <span>
            <Link to="/user/mypage/profile">프로필</Link>
          </span>
          <span>
            <Link to="/user/mypage/payment-history">결제 내역</Link>
          </span>
          <span>
            <Link to="/user/mypage/my-wish-list">찜 상품</Link>
          </span>
          <span>
            <Link to="/user/mypage/my-review">내 리뷰</Link>
          </span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="profile" replace />} />
        <Route
          path="/profile"
          element={
            <MyProfilePage
              isLoggedin={isLoggedin}
              memberId={memberId}
              profileData={profileData}
              profileImageUrl={profileImageUrl}
            />
          }
        />
        <Route
          path="/payment-history"
          element={
            <MyPaymentHistoryPage
              isLoggedin={isLoggedin}
              memberId={memberId}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route
          path="/payment-detail/:orderId"
          element={
            <PaymentDetailPage
              isLoggedin={isLoggedin}
              memberId={memberId}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route
          path="/my-wish-list"
          element={
            <MyWishListPage isLoggedin={isLoggedin} memberId={memberId} />
          }
        />
        <Route
          path="/my-review"
          element={<MyReviewPage isLoggedin={isLoggedin} memberId={memberId} />}
        />
        <Route
          path="/password-check"
          element={
            <PasswordCheckPage isLoggedin={isLoggedin} memberId={memberId} />
          }
        />
        <Route
          path="/update-info"
          element={
            <UpdateUserInfoPage
              isLoggedin={isLoggedin}
              memberId={memberId}
              profileData={profileData}
              profileImageUrl={profileImageUrl}
              setProfileImageUrl={setProfileImageUrl}
            />
          }
        />
      </Routes>
    </div>
  );
}

export { MyPage };
