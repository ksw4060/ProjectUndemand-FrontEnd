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
  const [isScroll, setIscroll] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isReceiptPage, setIsReceiptPage] = useState(false);

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
          <Route path="/" element={<Main />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/login/oauth2/code/kakao" //redirect_url
            element={<KakaoLoginHandeler />} //당신이 redirect_url에 맞춰 꾸밀 컴포넌트
          />
          <Route path="/:category" element={<CategoryPage />}></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetailPage />}
          ></Route>
          <Route path="/inquiry" element={<InquiryPage />}></Route>
          <Route
            path="/inquiry/:inquiryId"
            element={<InquiryDetailPage />}
          ></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/cart/order" element={<PaymentPage />}></Route>
          <Route path="/cart/order/done" element={<ReceiptPage />}></Route>
          <Route path="/user/review" element={<MyReviewPage />}></Route>
          <Route path="/admin" element={<AdministratorPage />}></Route>
        </Routes>
      </div>

      <div className="Bottom-section">
        <Footer />
        <div className="nothing"></div>
      </div>
    </div>
  );
}

export default App;
