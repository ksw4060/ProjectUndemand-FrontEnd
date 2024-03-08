import React from 'react';
import { Link } from "react-router-dom";
import TopbarData from './TopbarData';
import { IoCartOutline } from "react-icons/io5";
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
                        <Link to="/best">Best</Link>
                        <Link to="/new">New</Link>
                        <Link to="/unisex">Unisex</Link>
                        <Link to="/men">Men</Link>
                        <Link to="/women">Women</Link>
                        <Link to="/sale">Sale</Link>
                    </div>
                    <div className="userbox">
                        <Link to="/signup">회원가입</Link>
                        <Link to="/login" onClick={handleLoginClick}>로그인</Link>
                        <Link to="/">주문조회</Link>
                        <Link to="/"><IoCartOutline /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
