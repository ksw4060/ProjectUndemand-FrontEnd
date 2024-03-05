/* eslint-disable */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar.jsx";
import { Main } from "./pages/Main/Main.jsx";
import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx";
import { CategoryBest } from "./pages/Category/CategoryBest/CategoryBest.jsx"
import { CategoryNew } from "./pages/Category/CategoryNew/CategoryNew.jsx";
import { CategoryUnisex } from "./pages/Category/CategoryUnisex/CategoryUnisex.jsx";
import { CategoryMen } from "./pages/Category/CategoryMen/CategoryMen.jsx"
import { CategoryWomen } from "./pages/Category/CategoryWomen/CategoryWomen.jsx"
import { CategorySale } from "./pages/Category/CategorySale/CategorySale.jsx"
import Footer from "./components/Footer/Footer.jsx"
import './App.css';

function App() {
  const [isScroll, setIscroll] = useState(false);
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
    window.scrollTo(0, 0); // 페이지가 이동될 때 항상 스크롤을 맨 위로 옮깁니다.
  }, [navigate]);

  return (
    <div className="Body">
      <div className={`Top-section ${isScroll ? 'scroll' : ''}`}>
        <Topbar />
      </div>

      <div className={`Middle-section ${isScroll ? 'scroll' : ''}`}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/best" element={<CategoryBest />}></Route>
          <Route path="/new" element={<CategoryNew />}></Route>
          <Route path="/unisex" element={<CategoryUnisex />}></Route>
          <Route path="/men" element={<CategoryMen />}></Route>
          <Route path="/women" element={<CategoryWomen />}></Route>
          <Route path="/sale" element={<CategorySale />}></Route>
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
