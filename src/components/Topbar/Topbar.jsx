import React from 'react';
import { Link } from "react-router-dom";
import TopbarData from './TopbarData';
import './Topbar.css';

function Topbar() {
    const { isLoggedin, handleLoginClick } = TopbarData();

    return (
        <div className="topbar">
            <div className="topbar-logo">
                <Link to="/">Project Undemand</Link>
            </div>
            <div className="topbar-navbar">
                <div className="container">
                    <div className="categorybox">
                        <Link to="/">Best</Link>
                        <Link to="/">New</Link>
                        <Link to="/">Unisex</Link>
                        <Link to="/">Men</Link>
                        <Link to="/">Women</Link>
                        <Link to="/">Sale</Link>
                    </div>
                    <div className="userbox">
                        <Link to="/signup">회원가입</Link>
                        <Link to="/login" onClick={handleLoginClick}>로그인</Link>
                        <Link to="/">주문조회</Link>
                        <Link to="/">장바구니</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
