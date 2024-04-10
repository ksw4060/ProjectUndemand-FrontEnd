/* eslint-disable */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, passwordValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlepassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  const loginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    console.log(email, password);

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginData
      );
      localStorage.setItem("access", response.data["accessToken"]);
      // document.cookie = `refresh=${response.data.refresh}; path=/; Secure; SameSite=Lax`; // 백엔드와 연동시 refresh 토큰 활용할 수 있을때 되살릴 코드
      const base64Url = response.data["accessToken"].split(".")[1];
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
      alert("로그인 성공!");

      // window.location.replace("/")
      const payload = localStorage.getItem("payload");
      const payloadObject = JSON.parse(payload);

      if (payloadObject.is_admin) {
        navigate("/admin-home"); // is_admin이 true인 경우 admin-home으로 이동
        window.location.reload();
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      if (error.response.data["withdrawal_true"]) {
        alert(error.response.data["withdrawal_true"]);
        window.location.reload();
      } else {
        alert("이메일과 비밀번호를 확인해주세요.");
      }
    }
  };

  return (
    <div className="login-box">
      <div className="login-box-top">
        <div className="title">로그인</div>
      </div>

      <div className="login-box-middle">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={password}
            onChange={handlepassword}
          />
        </div>
        <div className="errorMessageWrap">
          {!passwordValid && password.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
      </div>

      <div className="login-box-bottom">
        <button
          onClick={loginSubmit}
          disabled={notAllow}
          className="loginButton"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export { Login };
