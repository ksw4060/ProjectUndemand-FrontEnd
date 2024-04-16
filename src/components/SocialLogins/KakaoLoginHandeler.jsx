import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const KakaoLoginHandeler = (props) => {
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

  useEffect(() => {
    const kakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log(code);
      navigate("/");
      //   await axios({
      //     method: "GET",
      //     url: `${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`,
      //     headers: {
      //       "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
      //       "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
      //     },
      //   }).then((res) => {
      //     //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
      //     console.log(res);
      //     //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
      //     localStorage.setItem("name", res.data.account.kakaoName);
      //     //로그인이 성공하면 이동할 페이지
      //     navigate("/");
      //   });
    };
    kakaoLogin();
  }, [navigate, props.history]);

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
