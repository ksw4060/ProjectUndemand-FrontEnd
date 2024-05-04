import React, { useState, useEffect } from "react";
import "./UpdateUserInfoPage.css";

function UpdateUserInfoPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  return (
    <div className="update-user-info-page">
      <div className="update-user-info-page-title">
        <span>회원 정보 수정</span>
      </div>
      <div className="user-info-input-container">
        <div className="uii-password-container">
          <span>비밀번호</span>
          <div className="uii-cover">
            <input type="password" />
          </div>
        </div>
        <div className="uii-password-container">
          <span>비밀번호 확인</span>
          <div className="uii-cover">
            <input type="password" />
          </div>
        </div>
        {/* <div className="uii-phone-num-container">
          <span>전화번호</span>
          <div className="uii-cover">
            <input type="text" />
          </div>
        </div> */}
        <div className="uii-birth-day-container">
          <span>생년월일</span>
          <div className="uii-cover">
            <span>{`2024/01/01`}</span>
          </div>
        </div>
        {/* <div className="uii-address-container">
          <span>주소</span>
          <div className="uii-cover uii-address">
            <input type="text" placeholder="주소" />
          </div>
          <div className="uii-cover uii-detail-address">
            <input type="text" placeholder="상세주소" />
          </div>
        </div> */}
      </div>
      <div className="account-delete-container">
        <div className="account-delete">
          <span>계정 삭제</span>
          <button>삭제</button>
        </div>
      </div>
      <div className="uui-btn-container">
        <button className="uui-submit-btn">저장</button>
      </div>
    </div>
  );
}

export { UpdateUserInfoPage };
