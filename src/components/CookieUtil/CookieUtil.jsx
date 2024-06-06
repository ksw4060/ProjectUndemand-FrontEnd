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

export { CookieUtil };
