import { useEffect } from "react";
import axios from "axios";

function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";").map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

const TokenRefreshComponent = () => {
  useEffect(() => {
    const previousAuthorization = localStorage.getItem("Authorization");
    const refreshToken = getCookie("refreshToken");

    // setInterval 를 통해, 반복적으로 호출
    const accessTokenGenerator = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/reissue/access`,
          { refreshToken: refreshToken },
          {
            headers: {
              Authorization: previousAuthorization,
              "Content-Type": "application/json",
            },
          }
        );
        const newAccessToken = response.data["accessToken"];
        // 기존에 저장된 Authorization 토큰과 refreshToken과 memberId 를 삭제합니다.
        localStorage.removeItem("Authorization");
        localStorage.removeItem("memberId");
        // 서버에서 받아온 Authorization 토큰과 refreshToken을 브라우저에 저장합니다.
        localStorage.setItem("Authorization", "Bearer " + newAccessToken);
        const base64Url = newAccessToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const payloadObject = JSON.parse(jsonPayload);
        console.log("memberId : ", payloadObject.memberId);
        localStorage.setItem("memberId", payloadObject.memberId);
        console.info("accessToken 이 갱신 되었습니다.");
      } catch (error) {
        console.error("access token 재발급 실패.");
      }
    };
    // 5 분마다 엑세스토큰 갱신
    const interval = setInterval(accessTokenGenerator, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);
};

export default TokenRefreshComponent;
