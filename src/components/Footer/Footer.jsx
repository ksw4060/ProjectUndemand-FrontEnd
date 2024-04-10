import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="section section1">
        <div className="footer-box1">
          <h2>C/S CENTER</h2>
          <h2>T.010-0000-0000</h2>
          <p>평일 am 10:00 - pm 05:00 . 점심 pm 12:00 - pm 01:00</p>
          <p>토.일.공휴일 휴무</p>
        </div>
        <div className="footer-box1">
          <h3>ACCOUNT</h3>
          <p>우리 000000-00-000000 . 토스 010-0000-0000</p>
          <p>예금주 : 주식회사 PU</p>
        </div>
      </div>
      <div className="section section2">
        <h2>ProjectUndemand</h2>
        <div className="footer-box2">
          <h4>TEAM. ProjectUndemand</h4>
          <h4>Back-End. 김성우 / 서채연</h4>
          <h4>DevOps. 임상빈</h4>
          <h4>Front-End. 이주한</h4>
        </div>
      </div>
      <div className="section section3">
        <h2>INFORMATION</h2>
        <div className="footer-box3">
          <h4>김성우 : E-mail / GitHub / Blog / Tel</h4>
          <h4>서채연 : E-mail / GitHub / Blog / Tel</h4>
          <h4>임상빈 : E-mail / GitHub / Blog / Tel</h4>
          <h4>이주한 : E-mail / GitHub / Blog / Tel</h4>
        </div>
      </div>
    </div>
  );
}

export default Footer;
