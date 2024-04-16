import React from "react";

const SnsSignInUrl = ({ type }) => {
  // 클릭 이벤트 핸들러
  const handleSignIn = () => {
    // 각 SNS에 맞는 로그인 URL을 가져와서 리다이렉트
    window.location.href = generateSignInUrl(type);
  };

  // 각 SNS에 대한 로그인 링크 생성 함수
  const generateSignInUrl = (type) => {
    // 해당 SNS에 대한 로그인 URL
    return `http://localhost:8080/oauth2/authorization/${type}`;
  };

  return <button onClick={handleSignIn}>Sign in with {type}</button>;
};

export { SnsSignInUrl };
