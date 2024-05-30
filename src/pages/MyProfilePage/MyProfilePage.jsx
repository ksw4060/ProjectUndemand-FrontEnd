import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyProfilePage.css";

function MyProfilePage({ isLoggedin, memberId, profileData, profileImageUrl }) {
  const statusToKorean = (status) => {
    return status ? "True" : "False";
  };

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
              src={profileImageUrl}
              alt="프로필 이미지"
              className="profile-image"
            />
          </div>
          <div className="name-joined-container">
            <div className="profile-info-container">
              <div className="profile-info profile-font-size-and-weight">
                <span>이름</span>
                <span>{profileData.member.username || `없음`}</span>
              </div>
            </div>
            <div className="profile-info-container">
              <div className="profile-info profile-font-size-and-weight">
                <span>이메일</span>
                <span>{profileData.member.email || `없음`}</span>
              </div>
            </div>
            <div className="profile-info-container">
              <div className="profile-info profile-font-size-and-weight">
                <span>닉네임</span>
                <span>{profileData.member.nickname || `없음`}</span>
              </div>
            </div>
            <div className="profile-info-container">
              <div className="profile-info profile-font-size-and-weight">
                <span>회원가입 날짜</span>
                <span>{profileData.member.joined_at.substring(0, 10)}</span>
              </div>
            </div>
            <br />
            <div className="profile-navi-page">
              <Link to="/user/mypage/update-info">{`회원정보 수정하기`}</Link>
              <Link to="/user/mypage/profile-detail">{`프로필 상세보기`}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MyProfilePage };
