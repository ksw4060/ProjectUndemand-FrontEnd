import React from "react";

// 쿠키 및 로컬 스토리지 관련 유틸리티 함수 정의
const CookieUtil = {
  // 기존의 쿠키 및 로컬 스토리지 함수들...

  // 쿠키 가져오기 함수
  getCookie: (name) => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  },

  // 로컬 스토리지 설정 함수
  setLocalStorage: (key, value) => {
    localStorage.setItem(key, value);

    // 커스텀 이벤트 발생
    const event = new CustomEvent("localStorageChanged", {
      detail: { key, value },
    });
    window.dispatchEvent(event);
  },
};

const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const extractUserInfo = () => {
  const token = CookieUtil.getCookie("accessToken"); // 엑세스 토큰 이름을 'accessToken'으로 가정
  if (token) {
    const decoded = decodeJWT(token);
    if (decoded) {
      const userId = decoded.id;
      const userRole = decoded.role;
      CookieUtil.setLocalStorage("userId", userId);
      CookieUtil.setLocalStorage("userRole", userRole);
    }
  }
};

export { CookieUtil, decodeJWT, extractUserInfo };
