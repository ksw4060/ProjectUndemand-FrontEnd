import { React } from "react";
import { Link } from "react-router-dom";
import TopbarData from "./TopbarData.jsx";
import { MdOutlineShoppingBag } from "react-icons/md";
import "./Topbar.css";

function Topbar({ isMenuVisible, setIsMenuVisible, isLoggedin }) {
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

    localStorage.removeItem("memberId");
    // 쿠키 스토리지에서 refreshToken 값 제거
    deleteCookie("refreshToken");

    console.log("로그아웃 완료.");

    window.location.replace("/login");
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
                <Link
                  to={link.to}
                  onMouseOver={() => handleMouseOver(index)}
                  onClick={() => {
                    localStorage.removeItem("selectedCategoryOption");
                    localStorage.removeItem("selectedSubCategoryOption");
                    localStorage.removeItem("optionName");
                    localStorage.removeItem("subOptionName");
                    localStorage.setItem("topMenuClicked", true);
                  }}
                >
                  {link.label}
                </Link>
                <div className={`accordion-menu ${isMenuVisible && "active"}`}>
                  {hoveredLinkIndex !== null && (
                    <div className="accordion-menu-container">
                      {categoryLinks[hoveredLinkIndex].contents.map(
                        (content, i) => {
                          return (
                            <ul className="options-box" key={i}>
                              <li className="option-title">
                                <Link
                                  to={`${categoryLinks[hoveredLinkIndex].to}-${content.id}`}
                                  onClick={() => {
                                    localStorage.setItem(
                                      "selectedCategoryOption",
                                      content.id
                                    );
                                    localStorage.setItem(
                                      "optionName",
                                      content.name
                                    );
                                    localStorage.setItem(
                                      "categoryId",
                                      content.parentCategoryId
                                    );
                                    localStorage.removeItem("topMenuClicked");
                                  }}
                                >
                                  {content.name}
                                </Link>
                              </li>
                              {content.subOptions.map((subOption, j) => (
                                <li key={j} className="option">
                                  <Link
                                    to={`${categoryLinks[hoveredLinkIndex].to}-${content.id}-${subOption.id}`}
                                    onClick={() => {
                                      localStorage.setItem(
                                        "selectedCategoryOption",
                                        content.id
                                      );
                                      localStorage.setItem(
                                        "optionName",
                                        content.name
                                      );
                                      localStorage.setItem(
                                        "selectedSubCategoryOption",
                                        subOption.id
                                      );
                                      localStorage.setItem(
                                        "subOptionName",
                                        subOption.name
                                      );
                                      localStorage.setItem(
                                        "categoryId",
                                        subOption.childCategoryId
                                      );
                                      localStorage.removeItem("topMenuClicked");
                                    }}
                                  >
                                    {subOption.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {!isLoggedin ? (
            <ul className="userbox logged-in-false">
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLoginClick}>
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/inquiry">Q&A</Link>
              </li>
            </ul>
          ) : (
            <ul className="userbox logged-in-true">
              <li>
                <Link to="/cart">
                  <MdOutlineShoppingBag />
                </Link>
              </li>
              <li className="hello-user">
                <Link to="/user/mypage">
                  <span>회원님, 반가워요!</span>
                  <img src="" alt="" />
                </Link>
                <ul className="user-dropdown-menu">
                  <li className="mypage-btn">
                    <Link to="/user/mypage">마이페이지</Link>
                  </li>
                  <li className="wishlist-btn">
                    <Link to="/wishlist">위시리스트</Link>
                  </li>
                  <li>
                    <Link to="/inquiry">Q&A</Link>
                  </li>
                  <li className="logout-btn">
                    <Link onClick={handleLogoutClick}>로그아웃</Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
