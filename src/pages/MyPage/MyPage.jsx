import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MyProfilePage } from "../MyProfilePage/MyProfilePage.jsx";
import { MyPaymentHistoryPage } from "../MyPaymentHistoryPage/MyPaymentHistoryPage.jsx";
import { MyWishListPage } from "../MyWishListPage/MyWishListPage.jsx";
import { MyReviewPage } from "../MyReviewPage/MyReviewPage.jsx";
import { UpdateUserInfoPage } from "../UpdateUserInfoPage/UpdateUserInfoPage.jsx";
import "./MyPage.css";

function MyPage() {
  const [selectedPage, setSelectedPage] = useState("my profile");

  useEffect(() => {
    console.log(selectedPage);
  }, [selectedPage]);

  return (
    <div className="my-page">
      <div className="my-page-navigator-container">
        <div className="my-page-navigator">
          <span onClick={() => setSelectedPage("my profile")}>
            <Link to="/user/mypage/profile">프로필</Link>
          </span>
          <span onClick={() => setSelectedPage("my payment history")}>
            <Link to="/user/mypage/payment-history">주문기록</Link>
          </span>
          <span onClick={() => setSelectedPage("my wish list")}>
            <Link to="/user/mypage/my-wish-list">위시리스트</Link>
          </span>
          <span onClick={() => setSelectedPage("my review")}>
            <Link to="/user/mypage/my-review">내 리뷰</Link>
          </span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="profile" replace />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/payment-history" element={<MyPaymentHistoryPage />} />
        <Route path="/my-wish-list" element={<MyWishListPage />} />
        <Route path="/my-review" element={<MyReviewPage />} />
        <Route path="/update-info" element={<UpdateUserInfoPage />}></Route>
      </Routes>
    </div>
  );
}

export { MyPage };
