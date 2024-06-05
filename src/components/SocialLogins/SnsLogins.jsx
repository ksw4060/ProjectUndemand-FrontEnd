import React from "react";
import { SnsSignInUrl } from "./SnsSignInUrl.jsx";
import "./SnsLogin.css";

const SnsLogins = ({ isLoggedin, setIsLoggedin }) => {
  // 각 SNS의 REST API KEY와 Redirect URI는 SnsSignInUrl 컴포넌트에서 사용하도록 변경
  return (
    <div className="sns-login-content">
      <div className="sns-login-button-box">
        <SnsSignInUrl
          type="Naver"
          isLoggedin={isLoggedin}
          setIsLoggedin={setIsLoggedin}
        />
        <SnsSignInUrl
          type="Google"
          isLoggedin={isLoggedin}
          setIsLoggedin={setIsLoggedin}
        />
        <SnsSignInUrl
          type="Kakao"
          isLoggedin={isLoggedin}
          setIsLoggedin={setIsLoggedin}
        />
      </div>
    </div>
  );
};

export { SnsLogins };
