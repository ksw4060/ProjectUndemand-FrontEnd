import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MyProfilePage } from "../MyProfilePage/MyProfilePage.jsx";
import { MyPaymentHistoryPage } from "../MyPaymentHistoryPage/MyPaymentHistoryPage.jsx";
import { MyWishListPage } from "../MyWishListPage/MyWishListPage.jsx";
import { MyReviewPage } from "../MyReviewPage/MyReviewPage.jsx";
import { UpdateUserInfoPage } from "../UpdateUserInfoPage/UpdateUserInfoPage.jsx";
import { PasswordCheckPage } from "../PasswordCheckPage/PasswordCheckPage.jsx";
import "./MyPage.css";

function MyPage(myPageProps) {
  const [selectedPage, setSelectedPage] = useState("my profile");
  const isLoggedin = myPageProps.isLoggedin;
  const memberId = myPageProps.memberId;
  const profileData = myPageProps.profileData;
  const setProfileData = myPageProps.setProfileData;

  useEffect(() => {
    console.log(selectedPage);
  }, [selectedPage, myPageProps]);

  return (
    <div className="my-page">
      <div className="my-page-navigator-container">
        <div className="my-page-navigator">
          <span onClick={() => setSelectedPage("my profile")}>
            <Link to="/user/mypage/profile">프로필</Link>
          </span>
          <span onClick={() => setSelectedPage("my payment history")}>
            <Link to="/user/mypage/payment-history">결제 내역</Link>
          </span>
          <span onClick={() => setSelectedPage("my wish list")}>
            <Link to="/user/mypage/my-wish-list">찜 상품</Link>
          </span>
          <span onClick={() => setSelectedPage("my review")}>
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
            />
          }
        />
        <Route
          path="/payment-history"
          element={
            <MyPaymentHistoryPage isLoggedin={isLoggedin} memberId={memberId} />
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
              setProfileData={setProfileData}
            />
          }
        />
      </Routes>
    </div>
  );
}

export { MyPage };
