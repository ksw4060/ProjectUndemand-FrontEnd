import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const KakaoLoginHandeler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Url Parameter 로부터 code 를 받아옵니다.
    const getCodeFromUrl = () => {
      return new URL(window.location.href).searchParams.get("code");
    };

    const kakaoLogin = async () => {
      const code = getCodeFromUrl();
      if (!code) {
        // Handle the case where code is not available in the URL
        console.error("Code not found in URL");
        return;
      }

      // 쿠키에서 Authorization과 refreshToken 가져오기
      const authorization = document.cookie
        .split("; ")
        .find((row) => row.startsWith("Authorization="))
        ?.split("=")[1];

      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1];

      // 가져온 값 콘솔에 출력
      console.log("Authorization:", authorization);
      console.log("refreshToken:", refreshToken);
    };

    kakaoLogin();
  }, [navigate]);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export { KakaoLoginHandeler };
