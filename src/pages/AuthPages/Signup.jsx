/* eslint-disable no-useless-escape */
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Signup.css";

const Signup = () => {
  // 로그인 시 주소창 접근 제한
  const token = localStorage.getItem("access");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordCheckValid, setPasswordCheckValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const isAllValid =
      emailValid && passwordValid && passwordCheckValid && nicknameValid;
    setNotAllow(!isAllValid);
    console.log("emailValid : " + emailValid);
    console.log("passwordValid : " + passwordValid);
    console.log("passwordCheckValid : " + passwordCheckValid);
    console.log("nicknameValid : " + nicknameValid);
  }, [emailValid, passwordValid, passwordCheckValid, nicknameValid]);

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (emailRegex.test(newEmail)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handleNickname = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    const isNicknameValid = newNickname.trim().length > 0;
    setNicknameValid(isNicknameValid);
  };
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordRegex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPasswordValid(passwordRegex.test(newPassword));
  };
  const handlePasswordCheck = (e) => {
    const newPasswordCheck = e.target.value;
    setPasswordCheck(newPasswordCheck);
    const isPasswordMatch = newPasswordCheck === password;
    setPasswordCheckValid(isPasswordMatch);
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const signupData = {
      email,
      nickname,
      password,
      //   isActive: false,
      // 활성화 여부를 false로 초기화
    };

    // 서버에 회원가입 요청을 보내고 응답을 받아옴
    try {
      const response = await axios.post(
        "http://localhost:8080/join",
        signupData
      );
      const data = response;
      console.log(data);

      if (parseInt(response.status) === 201) {
        // Redirect to login.html
        // console.log("성공! 회원 id: " + data.id);
        navigate("/login"); // 로그인 성공시 홈으로 이동합니다.
      }
      // response.status 가 201 이 아닌 상황에서의 예외처리도 생각 해야합니다.
    } catch (error) {
      console.error("회원 가입 실패 : ", error.response.data);
    }
  };

  return (
    <div className="signup-box">
      <div className="signup-box-top">
        <div className="title">PU 회원가입</div>
      </div>
      <div className="signup-box-middle">
        <label htmlFor="email" className="inputTitle">
          이메일 주소
        </label>
        <div className="inputWrap">
          <input
            type="email"
            id="email"
            value={email}
            className="input"
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        <label htmlFor="nickname" className="inputTitle">
          닉네임
        </label>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            id="nickname"
            value={nickname}
            onChange={handleNickname}
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

        <label htmlFor="password_certify" className="inputTitle">
          비밀번호 확인
        </label>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            id="password_certify"
            value={passwordCheck}
            onChange={handlePasswordCheck}
          />
        </div>

        <div className="errorMessageWrap">
          {!passwordCheckValid && passwordCheck.length > 0 && (
            <div>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>

        <div className="errorMessageWrap">
          {!passwordValid && (
            <div>
              <div>
                비밀번호는 최소 8자에서 최대 20자 사이의 문자열이어야 합니다.
              </div>
              <div>
                적어도 하나의 알파벳, 숫자, 특수 문자가 포함되어야 합니다.
              </div>
              <div>
                문자열에는 알파벳, 숫자, 특수 문자 이외의 다른 문자가
                포함되어서는 안 됩니다.
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="signup-box-bottom">
        <button
          onClick={handleSignup}
          disabled={notAllow}
          className="loginButton"
        >
          회원가입
        </button>
        <p className="login-link">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export { Signup };
