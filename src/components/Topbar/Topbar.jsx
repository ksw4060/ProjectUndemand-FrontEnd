import React from 'react';
import { Link } from "react-router-dom";
import TopbarData from './TopbarData.jsx';
import './Topbar.css';
import { hover } from '@testing-library/user-event/dist/hover.js';

function Topbar() {
    const { 
        isLoggedin, 
        handleLoginClick, 
        hoveredLinkIndex, 
        categoryLinks, 
        handleMouseOver, 
        handleMouseLeave,
        // isVisible,
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
                    <div className="categorybox">
                        {categoryLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                onMouseOver={() => {
                                    handleMouseOver(index);
                                    setIsMenuVisible(true);
                                }}
                                onMouseLeave={() => {
                                    handleMouseLeave();
                                    setIsMenuVisible(false);
                                }}
                                className={hoveredLinkIndex === index ? "hovered" : ""}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="userbox">
                        <Link to="/signup">회원가입</Link>
                        <Link to="/login" onClick={handleLoginClick}>로그인</Link>
                        <Link to="/">주문조회</Link>
                        <Link to="/">장바구니</Link>
                    </div>
                </div>
                <div className={`test ${isMenuVisible && 'active'}`}>
                    {(hoveredLinkIndex  !== null) && <div className='accordion-menu-container'>
                        {categoryLinks[hoveredLinkIndex].contents.map((content, i) => 
                            {   
                                return (
                                    <ul className="options-box" key={i}>
                                        <li className="option-title">{content.title}</li>
                                        {content.options.map((option, j) => (
                                            <li key={j} className="option">{option}</li>
                                        ))}
                                    </ul>
                                )
                            }
                        )}
                    </div>}
                </div>
                {/* {categoryLinks.map((link, index) => (
                    <div key={index} className={hoveredLinkIndex === index ? 'accordion-menu active' : 'accordion-menu'} onMouseOver={() => handleMouseOver(index)} onMouseLeave={handleMouseLeave}>
                        <div className="accordion-menu-container">
                            {isVisible && link.contents.map((content, i) => (
                                <ul className="options-box" key={i}>
                                    <li className="option-title">{content.title}</li>
                                    {content.options.map((option, j) => (
                                        <li key={j} className="option">{option}</li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default Topbar;
