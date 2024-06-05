// 쿠키 및 로컬 스토리지 관련 유틸리티 함수 정의
const CookieUtil = {
  // 기존의 쿠키 및 로컬 스토리지 함수들...

  // 쿠키 가져오기 함수
  getCookie: (name) => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  },
};

const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const extractUserInfoFromAccessAndRefresh = (AccessToken, RefreshToken) => {
  console.log("extract UserInfo From Access And Refresh 호출됨");

  if (AccessToken) {
    // 기존에 저장된 Authorization 토큰과 memberId를 삭제합니다.
    localStorage.removeItem("Authorization");
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberRole");

    // accessToken 디코딩
    const decodedToken = decodeJWT(AccessToken);

    // decodedToken이 존재한다면 실행
    if (decodedToken?.memberId && decodedToken?.role) {
      const memberId = decodedToken.memberId;
      const memberRole = decodedToken.role;

      // 로컬 스토리지에 새로운 값 저장
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("memberRole", memberRole);
      localStorage.setItem("Authorization", "Bearer " + AccessToken);

      // 쿠키에 refreshToken 저장
      const refreshAuthorization = "Bearer+" + RefreshToken;
      document.cookie = `refreshAuthorization=${refreshAuthorization}; path=/; SameSite=Lax`;
    } else {
      console.error("decodedToken에 id 또는 role이 없음");
    }
  } else {
    console.error("AccessToken이 존재하지 않아, extractUserInfo 실패.");
  }
};

const extractUserInfoFromAccess = (AccessToken) => {
  console.log("extract User Info From Access 호출됨");

  if (AccessToken) {
    // 기존에 저장된 Authorization 토큰과 memberId를 삭제합니다.
    localStorage.removeItem("Authorization");
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberRole");

    // accessToken 디코딩
    const decodedToken = decodeJWT(AccessToken);

    // decodedToken이 존재한다면 실행
    if (decodedToken?.memberId && decodedToken?.role) {
      const memberId = decodedToken.memberId;
      const memberRole = decodedToken.role;

      // 로컬 스토리지에 새로운 값 저장
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("memberRole", memberRole);
      localStorage.setItem("Authorization", "Bearer " + AccessToken);
    } else {
      console.error("decodedToken에 memberId 또는 role이 없음");
    }
  } else {
    console.error("AccessToken이 존재하지 않아, extractUserInfo 실패.");
  }
};

export {
  CookieUtil,
  extractUserInfoFromAccessAndRefresh,
  extractUserInfoFromAccess,
};
