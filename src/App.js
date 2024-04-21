/* eslint-disable */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar.jsx";
import { Main } from "./pages/Main/Main.jsx";
import { Signup } from "./pages/AuthPages/Signup.jsx";
import { Login } from "./pages/AuthPages/Login.jsx";
import { KakaoLoginHandeler } from "./components/SocialLogins/KakaoLoginHandeler.jsx";
import { CategoryPage } from "./pages/Category/CategoryPage.jsx";
import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage.jsx";
import { InquiryPage } from "./pages/InquiryPage/InquiryPage.jsx";
import { InquiryDetailPage } from "./pages/InquiryDetailPage/InquiryDetailPage.jsx";
import { CartPage } from "./pages/CartPage/CartPage.jsx";
import { PaymentPage } from "./pages/PaymentPage/PaymentPage.jsx";
import { ReceiptPage } from "./pages/ReceiptPage/ReceiptPage.jsx";
import { MyReviewPage } from "./pages/MyReviewPage/MyReviewPage.jsx";
import { AdministratorPage } from "./pages/AdministratorPage/AdministratorPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [isScroll, setIscroll] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isReceiptPage, setIsReceiptPage] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("Authorization");
    if (accessToken) {
      setIsLoggedin(true);
      setMemberId(localStorage.getItem("memberId"));
    } else {
      setIsLoggedin(false);
      setMemberId("");
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/cart/order/done") {
      setIsReceiptPage(true);
    } else {
      setIsReceiptPage(false);
    }
  }, [location.pathname === "/cart/order/done"]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIscroll(true);
      } else {
        setIscroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="Body">
      {isReceiptPage === false ? (
        <div className={`Top-section ${isScroll ? "scroll" : ""}`}>
          <Topbar
            isMenuVisible={isMenuVisible}
            setIsMenuVisible={setIsMenuVisible}
            isLoggedin={isLoggedin}
          />
        </div>
      ) : (
        <div></div>
      )}

      <div
        className={`Middle-section ${
          isScroll && !isReceiptPage ? "scroll" : ""
        } ${isMenuVisible ? "blur" : ""}`}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/login/oauth2/code/kakao" //redirect_url
            element={<KakaoLoginHandeler />} //당신이 redirect_url에 맞춰 꾸밀 컴포넌트
          />
          <Route path="/:category" element={<CategoryPage />} />
          <Route
            path="/product/:productId"
            element={
              <ProductDetailPage isLoggedin={isLoggedin} memberId={memberId} />
            }
          />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/inquiry/:inquiryId" element={<InquiryDetailPage />} />
          <Route
            path="/cart"
            element={<CartPage memberId={memberId} isLoggedin={isLoggedin} />}
          />
          <Route path="/cart/order" element={<PaymentPage />} />
          <Route path="/cart/order/done" element={<ReceiptPage />} />
          <Route path="/user/review" element={<MyReviewPage />} />
          <Route path="/admin" element={<AdministratorPage />} />
        </Routes>
      </div>

      <div className="Bottom-section">
        <Footer />
      </div>
    </div>
  );
}

export default App;
