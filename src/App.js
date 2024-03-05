/* eslint-disable */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar.jsx";
import { Main } from "./pages/Main/Main.jsx";
import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx";
import Footer from "./components/Footer/Footer.jsx"
import './App.css';

function App() {
  const [isScroll, setIscroll] = useState(false);

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
