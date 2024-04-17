import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Signup.css";
import { SnsLogins } from "../../components/SocialLogins/SnsLogins.jsx";
import { type } from "@testing-library/user-event/dist/type/index.js";

const Login = () => {
  // 로그인 시 주소창 접근 제한 http://localhost:8080/oauth2/authorization/kakao
  const navigate = useNavigate();
  const token = localStorage.getItem("Authorization");
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

  //쿠키삭제
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

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
      const email = response.data.email;

      if (parseInt(response.status) === 200) {
        // 기존에 저장된 Authorization 토큰과 refreshToken을 삭제합니다.
        localStorage.removeItem("Authorization");
        deleteCookie("refreshToken");
        // 서버에서 받아온 Authorization 토큰과 refreshToken을 브라우저에 저장합니다.
        localStorage.setItem("Authorization", "Bearer " + accessToken);
        document.cookie = `refreshToken=${refreshToken};`;
        // Delay of 1 second before navigating to home page
        setTimeout(() => {
          navigate("/");
        }, 300);
        setTimeout(() => {
          alert(response.data.email + "님, 반갑습니다.");
        }, 1000);
      }
      // response.status 가 201 이 아닌 상황에서의 예외처리도 생각 해야합니다.
    } catch (error) {
      alert("가입되지 않은 이메일 이거나, 이메일 인증이 되지 않았습니다.");
      //   console.error("로그인 실패 : ", error.response);
      console.error("로그인 실패 : ", error.response);
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
        <SnsLogins />
        {/* <GoogleLogin /> */}
        {/* <NaverLogin /> */}
      </div>
    </div>
  );
};

export { Login };