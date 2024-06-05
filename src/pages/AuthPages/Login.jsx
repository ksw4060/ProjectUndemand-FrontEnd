import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 외부
import axios from "axios";
import swal from "sweetalert";
// 컴포넌트 & CSS
import { SnsLogins } from "../../components/SocialLogins/SnsLogins.jsx";
import "./Signup.css";
// import { type } from "@testing-library/user-event/dist/type/index.js";

const Login = ({ isLoggedin, setIsLoggedin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이미 로그인 된 상태에서, 로그인 페이지 접근 제한
  useEffect(() => {
    if (isLoggedin) {
      swal({
        title:
          "이미 로그인을 한 상태에서, 로그인 페이지 접근은 불가합니다. You cannot access the login page while logged in.",
      });
      navigate("/");
    }
  }, [isLoggedin, navigate]);

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
        `${process.env.REACT_APP_BACKEND_URL_FOR_IMG}/login`,
        LoginData
      );

      // 응답에서 JSON 형식의 데이터를 추출
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      console.log(refreshToken, "====================");

      if (parseInt(response.status) === 200) {
        // 기존에 저장된 Authorization 토큰과 refreshToken, memberId, profileImageChange 를 삭제합니다.
        localStorage.removeItem("Authorization");
        localStorage.removeItem("memberId");
        deleteCookie("refreshToken");

        // 서버에서 받아온 Authorization 토큰과 refreshToken을 브라우저에 저장합니다.
        localStorage.setItem("Authorization", "Bearer " + accessToken);
        const bearerRefresh = "Bearer+" + refreshToken;
        document.cookie = `refreshAuthorization=${bearerRefresh}; path=/; Secure; SameSite=Lax`;

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

        const payloadObject = JSON.parse(jsonPayload);
        localStorage.setItem("memberId", payloadObject.memberId);
        localStorage.setItem("memberRole", payloadObject.role);

        setTimeout(() => {
          window.location.replace("/");
        }, 100);
      }
    } catch (error) {
      swal({
        title: "가입되지 않은 이메일 이거나, 이메일이 인증 되지 않았습니다.",
      });
      console.error("로그인 실패 : ", error.response);
    }
  };

  return (
    <div className="signup-box">
      <div className="signup-box-top">
        <div className="title">Login Page</div>
      </div>
      <div className="signup-box-middle">
        <div className="inputWrap">
          <label htmlFor="email" className="inputTitle">
            email
          </label>
          <input
            type="email"
            className="input"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <div className="inputWrap">
          <label htmlFor="password" className="inputTitle">
            password
          </label>
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
          Login
        </button>
        <SnsLogins isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
      </div>
    </div>
  );
};

export { Login };
