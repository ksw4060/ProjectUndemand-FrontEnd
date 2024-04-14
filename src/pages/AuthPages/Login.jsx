import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Signup.css";
// import { KakaoLogin } from "../../components/SocialLogins/KakaoLogin.jsx";

const Login = () => {
  // 로그인 시 주소창 접근 제한
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const LoginData = {
      email,
      password,
    };

    // 서버에 회원가입 요청을 보내고 응답을 받아옴
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        LoginData
      );

      // 응답에서 JSON 형식의 데이터를 추출
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      if (parseInt(response.status) === 200) {
        // 기존에 저장된 Authorization 토큰과 refreshToken을 삭제합니다.
        localStorage.removeItem("Authorization");
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // 새로운 값으로 갱신하여 다시 저장합니다.
        localStorage.setItem("Authorization", "Bearer " + accessToken);
        document.cookie = `refreshToken=${refreshToken};`;
        navigate("/"); // 로그인 성공시 홈으로 이동합니다.
      }
      // response.status 가 201 이 아닌 상황에서의 예외처리도 생각 해야합니다.
    } catch (error) {
      console.error("로그인 가입 실패 : ", error.response.data);
    }
  };

  return (
    <div className="signup-box">
      <div className="signup-box-top">
        <div className="title">PU 로그인</div>
      </div>
      <div className="signup-box-middle">
        <label htmlFor="email" className="inputTitle">
          이메일 주소
        </label>
        <div className="inputWrap">
          <input
            type="email"
            className="input"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <label htmlFor="password" className="inputTitle">
          비밀번호
        </label>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
      </div>
      <div className="signup-box-bottom">
        <button onClick={handleLogin} className="loginButton">
          로그인
        </button>
        {/* <KakaoLogin /> */}
        {/* <GoogleLogin /> */}
        {/* <NaverLogin /> */}
      </div>
    </div>
  );
};

export { Login };
