import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { extractUserInfoFromAccess } from "../../components/CookieUtil/CookieUtil.jsx";

const ACCESS_TOKEN_EXPIRATION_PERIOD = 5 * 60 * 1000; // 5분 (단위: 밀리초)

// Access token을 주기적으로 갱신하는 컴포넌트
export const PeriodicAccessTokenRefresher = () => {
  const requestCount = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const accessTokenGenerator = async () => {
      try {
        requestCount.current += 1;
        console.log(`Access token request count: ${requestCount.current}`);

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/reissue/access`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const newAccessToken = response.data["accessToken"];
        extractUserInfoFromAccess(newAccessToken);
      } catch (error) {
        console.error(
          "refresh token이 만료되었거나 존재하지 않습니다. ",
          error
        );

        navigate("/login");
      }
    };

    const interval = setInterval(
      accessTokenGenerator,
      ACCESS_TOKEN_EXPIRATION_PERIOD
    );

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

// 소셜 로그인 후 access token 재발급 함수
export const socialLoginAccessToken = async (navigate) => {
  try {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("memberId");

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/reissue/access`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const newAccessToken = response.data["accessToken"];
    localStorage.setItem("Authorization", "Bearer " + newAccessToken);

    const base64Url = newAccessToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payloadObject = JSON.parse(jsonPayload);
    console.log("memberId : ", payloadObject.memberId);
    localStorage.setItem("memberId", payloadObject.memberId);
    localStorage.setItem("memberRole", payloadObject.role);
  } catch (error) {
    console.error(
      "refresh token 이 만료되었기 때문에, access token 재발급에 실패했습니다. ",
      error
    );

    navigate("/login");
  }
};
