/* eslint-disable */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar.jsx";
import { Main } from "./pages/Main/Main.jsx";
import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx";
import { CategoryPage } from "./pages/Category/CategoryPage.jsx";
import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage.jsx";
import { InquiryPage } from "./pages/InquiryPage/InquiryPage.jsx";
import { InquiryDetailPage } from "./pages/InquiryDetailPage/InquiryDetailPage.jsx";
import { PaymentPage } from "./pages/PaymentPage/PaymentPage.jsx";
import { AdministratorPage } from "./pages/AdministratorPage/AdministratorPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

function App() {
  const [isScroll, setIscroll] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 120) {
          setIscroll(true);
        } else {
          setIscroll(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="Body">
      <div className={`Top-section ${isScroll ? 'scroll' : ''}`}>
        <Topbar isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
      </div>

      <div className={`Middle-section ${isScroll ? 'scroll' : ''} ${isMenuVisible ? 'blur' : ''}`}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/:category" element={<CategoryPage />}></Route>
          <Route path="/product/:productId" element={<ProductDetailPage />}></Route>
          <Route path="/inquiry" element={<InquiryPage />}></Route>
          <Route path="/inquiry/:inquiryId" element={<InquiryDetailPage />}></Route>
          <Route path="/cart/order" element={<PaymentPage />}></Route>
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
