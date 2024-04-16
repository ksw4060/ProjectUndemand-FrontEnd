import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopbarData from "./TopbarData.jsx";
import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import "./Topbar.css";

function Topbar({ isMenuVisible, setIsMenuVisible }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("Authorization");
    // 로컬 스토리지에서 Authorization 값이 존재하고, 만료되지 않은 경우 로그인 상태로 설정
    if (accessToken) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [navigate]);

  const {
    handleLoginClick,
    hoveredLinkIndex,
    categoryLinks,
    handleMouseOver,
    handleMouseLeave,
  } = TopbarData();
  /**
   * 로그아웃 클릭 시 , 브라우저에 저장된 Access, Refresh 를 제거합니다.
   * @returns
   */
  const handleLogoutClick = () => {
    // 로컬 스토리지에서 Authorization 값 확인
    const authorization = localStorage.getItem("Authorization");

    if (!authorization) {
      alert("경고: 로그아웃 할 수 없습니다. 인증 정보가 없습니다.");
      return; // 로그아웃을 진행하지 않고 함수 종료
    }

    // 로컬 스토리지에서 Authorization 값 제거
    localStorage.removeItem("Authorization");
    // 쿠키 스토리지에서 refreshToken 값 제거
    deleteCookie("refreshToken");

    // 로그아웃 후에 로그인 상태를 다시 확인하여 업데이트
    const accessToken = localStorage.getItem("Authorization");
    setIsLoggedin(accessToken ? true : false);

    console.log("로그아웃 완료.");
  };

  //쿠키삭제
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

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
                <Link to={link.to} onMouseOver={() => handleMouseOver(index)}>
                  {link.label}
                </Link>
                <div className={`accordion-menu ${isMenuVisible && "active"}`}>
                  {hoveredLinkIndex !== null && (
                    <div className="accordion-menu-container">
                      {categoryLinks[hoveredLinkIndex].contents.map(
                        (content, i) => (
                          <ul className="options-box" key={i}>
                            <li className="option-title">
                              <Link
                                to={`${categoryLinks[hoveredLinkIndex].to}-${content.id}`}
                              >
                                {content.name}
                              </Link>
                            </li>
                            {content.subOptions.map((subOption, j) => (
                              <li key={j} className="option">
                                <Link
                                  to={`${categoryLinks[hoveredLinkIndex].to}-${content.id}-${subOption.id}`}
                                >
                                  {subOption.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ul className="userbox">
            {!isLoggedin && (
              <>
                <li>
                  <Link to="/signup">회원가입</Link>
                </li>
                <li>
                  <Link to="/login" onClick={handleLoginClick}>
                    로그인
                  </Link>
                </li>
              </>
            )}
            {isLoggedin && (
              <>
                <li>
                  <Link to="/login" onClick={handleLogoutClick}>
                    로그아웃
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/inquiry">Q&A</Link>
            </li>
            <li>
              <Link to="/cart?memberId=1">
                <MdOutlineShoppingBag />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
