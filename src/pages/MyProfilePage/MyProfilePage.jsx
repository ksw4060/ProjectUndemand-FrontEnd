import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyProfilePage.css";

function MyProfilePage({ isLoggedin, memberId }) {
  const [profileData, setProfileData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [wishLists, setWishLists] = useState([]);

  console.log("로그인여부 : ", isLoggedin);

  // 공통 데이터 가져오는 함수
  const fetchUserData = async (url, setter) => {
    try {
      const authorization = localStorage.getItem("Authorization");
      const response = await axios.get(url, {
        headers: {
          Authorization: authorization,
        },
      });
      setter(response.data);
    } catch (error) {
      console.error(`잘못된 요청입니다:`, error);
    }
  };

  // 회원 프로필 데이터
  useEffect(() => {
    const fetchProfileData = async () => {
      await fetchUserData(
        `http://localhost:8080/api/v1/profile/${memberId}`,
        setProfileData
      );
    };

    fetchProfileData();
  }, [memberId]);

  // 결제 내역 데이터
  useEffect(() => {
    fetchUserData(
      `http://localhost:8080/api/v1/paymenthistory/${memberId}`,
      setPaymentHistory
    );
  }, [memberId]);

  // 찜한 상품 데이터
  useEffect(() => {
    fetchUserData(
      `http://localhost:8080/api/v1/wishlist/${memberId}`,
      setWishLists
    );
  }, [memberId]);

  if (!profileData) {
    return <div>로그인 시간이 만료되었습니다. 다시 로그인 해주세요.</div>;
  }

  return (
    <div className="my-profile-page">
      <div className="my-profile-page-title">
        <span>My Page</span>
      </div>
      <div className="short-my-profile">
        <div className="profile-container">
          <div className="profile-image-container">
            <img
              src={
                `http://localhost:8080${profileData.profileImgPath}` ||
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
    </div>
  );
}

export { MyProfilePage };
