import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyProfilePage.css";

function MyProfilePage({ isLoggedin, memberId, profileData }) {
  //   const [profileData, setProfileData] = useState(null);

  const ProfileImageSrc = localStorage.getItem("ProfileImage");
  const profileImageUrl =
    profileData && ProfileImageSrc
      ? `http://localhost:8080${ProfileImageSrc.replace(
          "src/main/resources/static/",
          ""
        )}`
      : "https://defaultst.imweb.me/common/img/default_profile.png";

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
                <span>이메일인증</span>
                <span>
                  {statusToKorean(profileData.member.is_certified_email)}
                </span>
              </div>
            </div>
            <div className="profile-info-container">
              <div className="profile-info profile-font-size-and-weight">
                <span>휴대폰 인증</span>
                <span>{statusToKorean(profileData.member.phone)}</span>
              </div>
            </div>
            <div className="profile-info-container">
              <div className="profile-info profile-font-size-and-weight">
                <span>소셜 로그인</span>
                <span>
                  {` ${profileData.member.social_type}` || `일반 로그인 멤버`}
                </span>
              </div>
            </div>
            <div className="profile-info-container">
              <div className="profile-info profile-font-size-and-weight">
                <span>회원가입 날짜</span>
                <span>{profileData.member.joined_at.substring(0, 10)}</span>
              </div>
            </div>
            {/* <span className="user-name-info">
              계정활성화여부 : {statusToKorean(profileData.member.is_active)}
            </span>
            <span className="user-name-info">
              관리자여부 : {statusToKorean(profileData.member.is_admin)}
            </span> */}
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
