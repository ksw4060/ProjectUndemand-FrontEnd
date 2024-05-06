import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineShoppingBag, MdOutlineMenu } from "react-icons/md";
import "./Topbar.css";

function Topbar({
  isMenuVisible,
  setIsMenuVisible,
  processedCategoryData,
  processedMUCategoryData,
  handleConditionSelect,
  handleCategoryOptionSelect,
  handleSubcategoryOptionSelect,
  isLoggedin,
  memberId,
}) {
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const categoryLinks = [
    {
      to: "/products/BEST",
      label: "BEST",
      contents: processedCategoryData,
    },
    {
      to: "/products/NEW",
      label: "NEW",
      contents: processedCategoryData,
    },
    {
      to: "/products/UNISEX",
      label: "UNISEX",
      contents: processedMUCategoryData,
    },
    {
      to: "/products/MEN",
      label: "MEN",
      contents: processedMUCategoryData,
    },
    {
      to: "/products/WOMEN",
      label: "WOMEN",
      contents: processedCategoryData,
    },
    {
      to: "/products/RECOMMEND",
      label: "RECOMMEND",
      contents: processedCategoryData,
    },
  ];

  const handleMouseOver = (index) => {
    setHoveredLinkIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredLinkIndex(null);
  };

  /**
   * 2024.05.04 프로필로부터 데이터를 가져오기 위한 작업
   */
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/profile/${memberId}`)
      .then((response) => {
        setProfileData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [memberId]);

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

  const handleBurgerBtnClick = () => {
    setIsBurgerClicked((prevState) => !prevState);
    setIsMenuVisible((prevState) => !prevState);
  };

  return (
    <div className="topbar">
      <div className="topbar-logo">
        <Link to="/">
          <img src="/ODD_LOGO_FULL.png" alt="ODD Logo" />
        </Link>
        <div className="topbar-navbar-narrow">
          <MdOutlineMenu
            className="burger-menu-btn"
            onClick={() => handleBurgerBtnClick()}
          />
          <div
            className={`nnavbar-accordion-menu-container ${
              isBurgerClicked === true ? "burger-menu-drop" : ""
            }`}
          >
            <div className="nnavbar-accordion-menu">
              <div className="conditions-container">
                {categoryLinks.map((link, index) => (
                  <div key={index} className="condition-link">
                    <Link
                      to={link.to}
                      onMouseOver={() => handleMouseOver(index)}
                      onClick={() => {
                        handleConditionSelect(link);
                        setIsBurgerClicked(false);
                        setIsMenuVisible(false);
                      }}
                      className={
                        hoveredLinkIndex === index ? "condition-hovered" : ""
                      }
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="user-btn-container">
                {!isLoggedin ? (
                  <ul className="user-btn-box logged-in-false">
                    <li>
                      <Link
                        to="/signup"
                        onClick={() => {
                          setIsBurgerClicked(false);
                          setIsMenuVisible(false);
                        }}
                      >
                        Join
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={() => {
                          setIsBurgerClicked(false);
                          setIsMenuVisible(false);
                        }}
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inquiry"
                        onClick={() => {
                          setIsBurgerClicked(false);
                          setIsMenuVisible(false);
                        }}
                      >
                        Q&A
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="user-btn-box logged-in-true">
                    <li>
                      <Link
                        to="/cart"
                        onClick={() => setIsBurgerClicked(false)}
                      >
                        <MdOutlineShoppingBag />
                      </Link>
                    </li>
                    <li className="hello-user">
                      <Link to="/user/mypage">
                        <span>
                          {profileData && profileData.nickname
                            ? `Hello, ${profileData.nickname}!`
                            : `Hello, ODD!`}
                        </span>
                        <img
                          src={
                            profileData && profileData.profileImgPath
                              ? profileData.profileImgPath
                              : "https://defaultst.imweb.me/common/img/default_profile.png"
                          }
                          alt="Profile img"
                        />
                      </Link>
                    </li>
                    <li className="wishlist-btn">
                      <Link
                        to="/wishlist"
                        onClick={() => setIsBurgerClicked(false)}
                      >
                        Wish List
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inquiry"
                        onClick={() => setIsBurgerClicked(false)}
                      >
                        Q&A
                      </Link>
                    </li>
                    <li className="logout-btn">
                      <Link
                        onClick={() => {
                          handleLogoutClick();
                          setIsBurgerClicked(false);
                        }}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="topbar-navbar-normal">
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
                    handleConditionSelect(link);
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
                                  to={`${categoryLinks[hoveredLinkIndex].to}-${content.name}`}
                                  onClick={() => {
                                    // localStorage.setItem(
                                    //   "selectedCategoryOption",
                                    //   content.name
                                    // );
                                    // localStorage.setItem(
                                    //   "parentCategoryId",
                                    //   content.categoryId
                                    // );
                                    // localStorage.removeItem("childCategoryId");
                                    // localStorage.removeItem(
                                    //   "selectedSubCategoryOption"
                                    // );
                                    handleCategoryOptionSelect(content);
                                  }}
                                >
                                  {content.name}
                                </Link>
                              </li>
                              {content.children.map((children, j) => (
                                <li key={j} className="option">
                                  <Link
                                    to={`${categoryLinks[hoveredLinkIndex].to}-${content.name}-${children.name}`}
                                    onClick={() => {
                                      localStorage.setItem(
                                        "selectedCategoryOption",
                                        content.name
                                      );
                                      // localStorage.setItem(
                                      //   "selectedSubCategoryOption",
                                      //   children.name
                                      // );
                                      localStorage.setItem(
                                        "parentCategoryId",
                                        content.categoryId
                                      );
                                      // localStorage.setItem(
                                      //   "childCategoryId",
                                      //   children.categoryId
                                      // );
                                      handleSubcategoryOptionSelect(children);
                                    }}
                                  >
                                    {children.name}
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
                <Link to="/signup">Join</Link>
              </li>
              <li>
                <Link to="/login">Log in</Link>
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
                  <span>
                    {profileData && profileData.nickname
                      ? `Hello, ${profileData.nickname}!`
                      : `Hello, ODD!`}
                  </span>
                  <img
                    src={
                      profileData && profileData.profileImgPath
                        ? profileData.profileImgPath
                        : "https://defaultst.imweb.me/common/img/default_profile.png"
                    }
                    alt="Profile img"
                  />
                </Link>
                <ul className="user-dropdown-menu">
                  <li className="mypage-btn">
                    <Link to="/user/mypage">My Page</Link>
                  </li>
                  <li className="wishlist-btn">
                    <Link to="/wishlist">Wish List</Link>
                  </li>
                  <li>
                    <Link to="/inquiry">Q&A</Link>
                  </li>
                  <li className="logout-btn">
                    <Link onClick={handleLogoutClick}>Log out</Link>
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
