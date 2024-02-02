/* eslint-disable */
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar.jsx";
import { Home } from "./components/Home.jsx";
import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx";
import './App.css';

function App() {
  return (
    <div className="Body">
      <div className="Top-section">
        <Topbar />
      </div>

      <div className="Middle-section">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>

      <div className="Bottom-section">
      </div>
    </div>
  );
}

export default App;
