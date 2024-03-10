import React from 'react';
import { Link } from "react-router-dom";
import TopbarData from './TopbarData.jsx';
import './Topbar.css';

function Topbar() {
    const { 
        isLoggedin, 
        handleLoginClick, 
        hoveredLinkIndex, 
        categoryLinks, 
        handleMouseOver,
        handleMouseLeave,
        isMenuVisible,
        setIsMenuVisible
    } = TopbarData();

    return (
        <div className="topbar">
            <div className="topbar-logo">
                <Link to="/">Project Undemand</Link>
            </div>
            <div className="topbar-navbar">
                <div className="topbar-navbar-container">
                    <ul 
                        className="categorybox"                                 
                        onMouseLeave={() => {
                            setIsMenuVisible(false);
                            handleMouseLeave();
                        }}
                    >
                        {categoryLinks.map((link, index) => (
                            <li 
                                key={index} 
                                onMouseOver={() => setIsMenuVisible(true)}
                                className={hoveredLinkIndex === index ? "hovered" : ""}
                            >
                                <Link to={link.to} onMouseOver={() => handleMouseOver(index)}>{link.label}</Link>
                                <div className={`accordion-menu ${isMenuVisible && 'active'}`}>
                                    {(hoveredLinkIndex !== null) &&
                                        <div className='accordion-menu-container'>
                                            {categoryLinks[hoveredLinkIndex].contents.map((content, i) => (
                                                <ul className="options-box" key={i}>
                                                    <li className="option-title">{content.title}</li>
                                                    {content.options.map((option, j) => (
                                                        <li key={j} className="option">{option}</li>
                                                    ))}
                                                </ul>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className="userbox">
                        <li>
                            <Link to="/signup">회원가입</Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={handleLoginClick}>로그인</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
