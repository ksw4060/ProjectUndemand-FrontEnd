import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    const KAKAO_REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
    const KAKAO_REDIRECT_URI = `${process.env.REACT_APP_FRONTEND_URL}/users/oauth/kakao/callback/`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button onClick={handleLogin} className="kakao-btn">
      <img src={kakao_btn_img} alt="카카오 로그인" className="kakao-btn-img" />
    </button>
  );
};
