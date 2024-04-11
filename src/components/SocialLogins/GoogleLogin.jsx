const SocialGoogle = () => {
  const handleGoogleLogin = () => {
    const GOOGLE_URL = `${process.env.REACT_APP_BACKEND_URL}/users/google/login/`;

    window.location.href = GOOGLE_URL;
  };

  return (
    <button onClick={handleGoogleLogin} className="google-btn">
      <img src={google_btn_img} alt="구글 로그인" className="google-btn-img" />
      <span>Sign in with Google</span>
    </button>
  );
};
