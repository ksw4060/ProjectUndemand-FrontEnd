import React from "react";
import { SnsSignInUrl } from "./SnsSignInUrl.jsx";
import "./SnsLogin.css";

const SnsLogins = () => {
  // 각 SNS의 REST API KEY와 Redirect URI는 SnsSignInUrl 컴포넌트에서 사용하도록 변경
  return (
    <div className="sns-login-content">
      <div className="sns-login-button-box">
        <SnsSignInUrl type="Naver" />
        <SnsSignInUrl type="Google" />
        <SnsSignInUrl type="Kakao" />
      </div>
    </div>
  );
};

export { SnsLogins };
