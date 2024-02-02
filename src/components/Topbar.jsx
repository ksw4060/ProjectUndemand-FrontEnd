import { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/Topbar.css';

function Topbar() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className="topbar">
            <div className="logo">
                <Link to="/">Project Undemand</Link>
            </div>
            <div className="topbar-infobox">
                <div className="search-box">검색</div>
                <div className="cart">장바구니</div>
                <div className="sign-box">
                    <div className="signup">
                        <Link to="/signup">회원가입</Link>
                    </div>
                    <div className="login" onClick={handleLoginClick}>
                        <Link to="/login">로그인</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;