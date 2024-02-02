/* eslint-disable */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css'

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordCheckValid, setPasswordCheckValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
        if (emailValid && passwordValid && passwordCheckValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [emailValid, passwordValid, passwordCheckValid]);

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
    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    };
    const handlePasswordCheck = (e) => {
        const newPasswordCheck = e.target.value;
        setPasswordCheck(newPasswordCheck);

        if (newPasswordCheck === password) {
            setPasswordCheckValid(true);
        } else {
            setPasswordCheckValid(false);
        }
    };
    const signupSubmit = async (e) => {
        e.preventDefault();

        const signupData = {
            username,
            email,
            password,
            isActive: false // 활성화 여부를 false로 초기화
        };
    
        try {
            // 서버에 회원가입 요청을 보내고 응답을 받아옴
            const response = await axios.post("http://localhost:8000/signup", signupData);
            // console.log(response.data)
            
            // 서버에서 이메일 전송
            await sendVerificationEmail(email, response.data["accessToken"]);
            
            // alert(response.data['message'])
            alert(`${response.data.user["username"]}님 환영합니다! \n가입 시 입력한 이메일로 이동하여 계정을 활성화해주세요!`)
            navigate("/login");
        } catch (error) {
            if (error.response.data['email']) {
                alert(error.response.data['email']);
            } else if (error.response.data['username']) {
                alert(error.response.data['username']);
            } else if (error.response.data['password']) {
                alert(error.response.data['password']);
            } //else if (error.response.data['re_password']) {
            //     alert(error.response.data['re_password']);
            // } else if (error.response.data['username']) {
            //     alert(error.response.data['username']);
            // } else if (error.response.data['empty']) {
            //     alert(error.response.data['empty'])
            // } else if (error.response.data['not_match']) {
            //     alert(error.response.data['not_match'])
            // }
        };
    }

    const sendVerificationEmail = async (userEmail, verificationToken) => {
        // 여기에서 이메일 전송 로직을 구현 (예: 서버에 요청하여 이메일 보내기)
        // 이 함수는 실제로는 서버 측에서 작동해야 함
        // 예를 들어, Node.js의 nodemailer를 사용하여 이메일을 보낼 수 있음
        console.log(`이메일 전송 요청: ${userEmail}, 토큰: ${verificationToken}`);
    };

    return (
        <div className="signup-box">
            <div className="signup-box-top">
                <div className="title">
                    회원가입
                </div>
            </div>
            
            <div className="signup-box-middle">
                <div className="inputTitle">이름</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        type="text"
                        placeholder="홍길동"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

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
                        onChange={handlePassword}
                    />
                </div>
                <div className="errorMessageWrap">
                    {!passwordValid && password.length > 0 && (
                        <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                    )}
                </div>

                <div className="inputTitle">비밀번호 확인</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        type="password"
                        placeholder="비밀번호를 다시 한번 입력해 주세요."
                        value={passwordCheck}
                        onChange={handlePasswordCheck}
                    />
                </div>
                <div className="errorMessageWrap">
                    {!passwordCheckValid && passwordCheck.length > 0 && (
                        <div>비밀번호와 일치하지 않습니다.</div>
                    )}
                </div>
            </div>
            
            <div className="signup-box-bottom">
                <button onClick={signupSubmit} disabled={notAllow} className="loginButton">
                        확인
                </button>
            </div>
        </div>
    );
}

export { Signup };