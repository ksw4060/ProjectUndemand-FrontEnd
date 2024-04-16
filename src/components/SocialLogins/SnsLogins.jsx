import React from "react";
import { SnsSignInUrl } from "./SnsSignInUrl.jsx";

const SnsLogins = () => {
  // 각 SNS의 REST API KEY와 Redirect URI는 SnsSignInUrl 컴포넌트에서 사용하도록 변경
  return (
    <div className="sign-in-content">
      <div className="sign-in-title">{"SNS Login"}</div>
      <div className="sign-in-button-box">
        <SnsSignInUrl type="kakao" />
        <SnsSignInUrl type="google" />
        <SnsSignInUrl type="naver" />
      </div>
    </div>
  );
};

export { SnsLogins };
