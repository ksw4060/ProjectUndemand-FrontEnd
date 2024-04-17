import React from "react";
import axios from "axios";

const SnsSignInUrl = ({ type }) => {
  // 클릭 이벤트 핸들러
  const handleSignIn = () => {
    console.log("============ handleKakaoSignIn 시작 ============");
    const KAKAO_REST_API_KEY = "81fa8d3580398bf42bea9ff7159e6fe7";
    const KAKAO_REDIRECT_URL = "http://localhost:3000/login/oauth2/code/kakao";
    // const KAKAO_REDIRECT_URL = "http://localhost:8080/login/oauth2/code/kakao";
    // 각 SNS에 맞는 로그인 URL을 가져와서 리다이렉트
    // window.location.href = `http://localhost:8080/oauth2/authorization/${type}`;
    // axios
    //   .post(`http://localhost:8080/oauth2/authorization/${type}`)
    //   .then((response) => {
    //     console.log(response.data).catch((error) => {
    //       console.error("로그인 실패 : ", error.response);
    //     });
    //   });
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
    console.log("============ handleKakaoSignIn 시작 ============");
  };

  // 각 SNS에 대한 로그인 링크 생성 함수

  return <button onClick={handleSignIn}>Sign in with {type}</button>;
};

export { SnsSignInUrl };
