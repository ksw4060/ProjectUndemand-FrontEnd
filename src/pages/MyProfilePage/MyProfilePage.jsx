import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyProfilePage.css";

function MyProfilePage({ isLoggedin, memberId }) {
  const [profileData, setProfileData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [wishLists, setWishLists] = useState([]);

  console.log("로그인여부 : ", isLoggedin);

  // 회원 프로필 데이터
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/profile/${memberId}`)
      .then((response) => {
        setProfileData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`잘못된 요청입니다:`, error);
      });
  }, [memberId]);

  // 결제 내역 데이터
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/paymenthistory/${memberId}`)
      .then((response) => {
        setPaymentHistory(response.data);
      })
      .catch((error) => {
        console.error(`잘못된 요청입니다:`, error);
      });
  }, [memberId]);

  // 찜한 상품 데이터
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/wishlist/${memberId}`)
      .then((response) => {
        setWishLists(response.data);
      })
      .catch((error) => {
        console.error(`잘못된 요청입니다:`, error);
      });
  }, [memberId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-profile-page">
      <div className="my-profile-page-title">
        <span>프로필</span>
      </div>
      <div className="short-my-profile">
        <div className="profile-container">
          <div className="profile-image-container">
            <img
              src={
                profileData.profileImgPath ||
                "https://defaultst.imweb.me/common/img/default_profile.png"
              }
              alt="프로필 이미지"
              className="profile-image"
            />
          </div>
          <div className="name-joined-container">
            <span className="user-name-info">
              이름 : {profileData.member.username || `없음`}
            </span>
            <span className="user-name-info">
              이메일 : {profileData.member.email || `없음`}
            </span>
            <span className="user-name-info">
              닉네임 : {profileData.member.nickname || `없음`}
            </span>
            <span className="user-joined-date-info">
              {"PU멤버 가입: " + profileData.member.joined_at.substring(0, 10)}
            </span>
            <br />
            <Link to="/user/mypage/update-info">{`회원정보 수정`}</Link>
            <Link to="/user/mypage/profile-detail">{`프로필 상세보기`}</Link>
          </div>
        </div>
      </div>
      <div className="short-payment-history">
        <div className="sph-title">
          <span>최근 주문한 상품 미리보기</span>
          <span>
            <Link to="/user/mypage/payment-history">더 보기</Link>
          </span>
        </div>
        {paymentHistory.length > 0 ? (
          paymentHistory.slice(-3).map((payment) => (
            <div key={payment.paymentId} className="payhis-container">
              <div className="payhis-product-info-container">
                <div className="payhis-product-info">
                  <span>{payment.product}</span> {/* 상품 이름 */}
                  <span>{payment.option}</span> {/* 상품 옵션 */}
                  <span>{payment.productPrice}</span> {/* 상품 가격 */}
                </div>
                <span>{payment.totalPrice}</span> {/* 구매 금액 */}
                <span>
                  {payment.review ? "내가 작성한 리뷰" : "구매 리뷰 남기기"}
                </span>{" "}
                {/* 리뷰 여부 */} {/* 구매 날짜 */}
              </div>
              <div className="payhis-info-container">
                <span>{new Date(payment.payedAte).toLocaleDateString()}</span>{" "}
                {/* 결제 날짜 */}
              </div>
            </div>
          ))
        ) : (
          <div className="payhis-product-info-zero-data">
            최근 주문한 상품이 없습니다
          </div>
        )}
      </div>
      <div className="short-wish-list">
        <div className="swl-title">
          <span>찜한 상품 미리보기</span>
          <span>
            <Link to="/user/mypage/wish-list">더 보기</Link>
          </span>
        </div>
        {wishLists.length > 0 ? (
          wishLists.slice(-3).map((payment) => (
            <div key={payment.paymentId} className="swl-card-container">
              <div className="payhis-product-info-container">
                <div className="payhis-product-info">
                  <span>{payment.product}</span> {/* 상품 이름 */}
                  <span>{payment.option}</span> {/* 상품 옵션 */}
                  <span>{payment.productPrice}</span> {/* 상품 가격 */}
                </div>
                <span>{payment.totalPrice}</span> {/* 구매 금액 */}
                <span>
                  {payment.review ? "내가 작성한 리뷰" : "구매 리뷰 남기기"}
                </span>{" "}
                {/* 리뷰 여부 */} {/* 구매 날짜 */}
              </div>
              <div className="payhis-info-container">
                <span>{new Date(payment.payedAte).toLocaleDateString()}</span>{" "}
                {/* 결제 날짜 */}
              </div>
            </div>
          ))
        ) : (
          <div className="payhis-product-info-zero-data">
            찜한 상품이 없네요! 원하시는 상품을 찜해보세요.
          </div>
        )}
        <div className="swl-card-container">
          <div className="sph-card">
            <img src="" alt="" />
            <div className="sph-card-text">
              <span>{`상품 이름`}</span>
            </div>
          </div>
          <div className="sph-card">
            <img src="" alt="" />
            <div className="sph-card-text">
              <span>{`상품 이름`}</span>
            </div>
          </div>
          <div className="sph-card">
            <img src="" alt="" />
            <div className="sph-card-text">
              <span>{`상품 이름`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="short-my-review">
        <div className="smr-title">
          <span>내 리뷰 미리보기</span>
          <span>
            <Link to="/user/mypage/my-review">더 보기</Link>
          </span>
        </div>
        <div className="smr-card-container">
          <div className="review-container">
            <div className="review-product">
              <img src={``} alt={``} />
              <div className="txt-info">
                <span>{`상품 이름`}</span>
              </div>
            </div>
            <div className="review-main-content-container">
              <div className="rating-box">
                <div className="star-rate">{`renderStars(userReviewData.rating)`}</div>
              </div>
              <div className="review-box">
                <div className="my-review-content">
                  {`userReviewData.reviewContent`}
                </div>
              </div>
              <img src={``} alt={``} />
            </div>
            <div className="review-edit-del-container">
              <div className="review-date">
                <span>작성일:</span>
                {`userReviewData.createdAt.substring(0, 10)`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MyProfilePage };

// import { FaRegStar, FaStar } from "react-icons/fa6";
// 별점 생성 함수
// const renderStars = (rating) => {
//   const filledStars = Math.floor(rating);
//   const remainingStars = 5 - filledStars;

//   return (
//     <>
//       {[...Array(filledStars)].map((_, index) => (
//         <FaStar key={index} />
//       ))}
//       {[...Array(remainingStars)].map((_, index) => (
//         <FaRegStar key={filledStars + index} />
//       ))}
//     </>
//   );
// };
