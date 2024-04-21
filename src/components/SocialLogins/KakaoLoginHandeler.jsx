import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const KakaoLoginHandeler = (props) => {
  const navigate = useNavigate();
  //쿠키삭제
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
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

      axios
        .get(`http://localhost:8080/login/oauth2/code/kakao?code=${code}`)
        .then((response) => {
          console.log(response.data);
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          if (parseInt(response.status) === 200) {
            // 기존에 저장된 Authorization 토큰과 refreshToken을 삭제합니다.
            localStorage.removeItem("Authorization");
            deleteCookie("refreshToken");
            // 서버에서 받아온 Authorization 토큰과 refreshToken을 브라우저에 저장합니다.
            localStorage.setItem("Authorization", "Bearer " + accessToken);
            document.cookie = `refreshToken=${refreshToken};`;

            const base64Url = accessToken.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(function (c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
            );

            localStorage.setItem("payload", jsonPayload);

            const payload = localStorage.getItem("payload");
            const payloadObject = JSON.parse(payload);
            localStorage.setItem("memberId", payloadObject.memberId);

            // Delay of 1 second before navigating to home page
            setTimeout(() => {
              window.location.replace("/");
            }, 1000);
            setTimeout(() => {
              alert(response.data.email + "님, 반갑습니다.");
            }, 1500);
          }
        })
        .catch((error) => {
          console.error("로그인 실패 : ", error.response);
        });
    };

    kakaoLogin();
  }, [navigate, props]);

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
