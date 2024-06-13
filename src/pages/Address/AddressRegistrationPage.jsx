import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// CSS
import "./AddressListPage.css";
import "./AddressRegistrationPage.css";
// reeact-daum-postcode
import DaumPostcode from "react-daum-postcode";

function AddressRegistrationPage({ isLoggedin, memberId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    addressId: "",
    addressName: "",
    recipient: "",
    postCode: "",
    address: "",
    detailAddress: "",
    isDefaultAddress: false,
    phoneNumberPrefix: "",
    phoneNumberPart1: "",
    phoneNumberPart2: "",
    recipientPhone: "010",
  });

  const themeObj = {
    bgColor: "#FFFFFF",
    pageBgColor: "#FFFFFF",
    postcodeTextColor: "#C05850",
    emphTextColor: "#222222",
  };

  const postCodeStyle = {
    width: "360px",
    height: "480px",
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setAddressData((prevState) => {
      const updatedState = { ...prevState, [name]: newValue };

      if (
        name === "phoneNumberPrefix" ||
        name === "phoneNumberPart1" ||
        name === "phoneNumberPart2"
      ) {
        updatedState.recipientPhone = `${
          updatedState.phoneNumberPrefix || "010"
        }-${updatedState.phoneNumberPart1 || ""}-${
          updatedState.phoneNumberPart2 || ""
        }`;
      }

      return updatedState;
    });
  };

  const handleNewAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/address/${memberId}`,
        addressData,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
          withCredentials: true,
        }
      );
      console.log("Address created:", response.data);
      navigate("/user/mypage/address");
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };
  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const completeHandler = (data) => {
    console.log(data);
    setAddressData((prevState) => ({
      ...prevState,
      address: `${data.roadAddress}`,
      postCode: `${data.zonecode}`,
    }));
    setIsOpen(false);
  };

  const closeHandler = (state) => {
    if (state === "FORCE_CLOSE") {
      setIsOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsOpen(false);
    }
  };

  return (
    <div className="my-address-list-page">
      <div className="my-address-list-page-top">
        <div className="my-address-list-page-title">
          <h2>Address</h2>
        </div>
        <p>자주 쓰는 배송지를 등록 관리하실 수 있습니다.</p>
      </div>

      <form
        onSubmit={handleNewAddressSubmit}
        className="address-registration-form"
      >
        <div className="form-group top-border input-height-default">
          <label>
            배송지명 <span className="required">*</span>
          </label>
          <input
            type="text"
            name="addressName"
            value={addressData.addressName}
            onChange={handleChange}
            required
            className="addressName-input"
          />
        </div>
        <div className="form-group input-height-default">
          <label>
            성명 <span className="required">*</span>
          </label>
          <input
            type="text"
            name="recipient"
            value={addressData.recipient}
            onChange={handleChange}
            required
            className="recipient-input"
          />
        </div>
        <div className="form-group address-form">
          <label style={{ padding: "20px" }}>
            주소 <span className="required">*</span>
          </label>
          <div className="address-input-container">
            <div className="zipcode-input-box input-height-default">
              <input
                type="text"
                name="zipCode"
                value={addressData.postCode}
                onChange={handleChange}
                readOnly
                placeholder="우편번호"
                className="zipcode-input"
              />
              <button type="button" onClick={toggleHandler}>
                주소 찾기
              </button>
            </div>

            {isOpen && (
              <div className="postcode-modal-overlay">
                <div className="postcode-modal-content">
                  <div className="postcode-modal-body">
                    <DaumPostcode
                      theme={themeObj}
                      style={postCodeStyle}
                      onComplete={completeHandler}
                      onClose={closeHandler}
                    />
                  </div>
                </div>
              </div>
            )}
            <input
              type="text"
              name="address"
              value={addressData.address}
              onChange={handleChange}
              readOnly
              placeholder="기본주소"
              className="address-input"
            />
            <input
              type="text"
              name="detailAddress"
              value={addressData.detailAddress}
              onChange={handleChange}
              placeholder="나머지주소"
              className="address-detail-input input-height-default"
            />
          </div>
        </div>
        <div className="form-group input-height-default">
          <label>
            휴대전화 <span className="required">*</span>
          </label>
          <div className="phone-input">
            <select
              name="phoneNumberPrefix"
              value={addressData.phoneNumberPrefix}
              onChange={handleChange}
            >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="018">018</option>
              <option value="019">019</option>
            </select>
            -
            <input
              type="text"
              name="phoneNumberPart1"
              value={addressData.phoneNumberPart1}
              maxLength="4"
              onChange={handleChange}
              className="phone-number-input input-height-default"
            />
            -
            <input
              type="text"
              name="phoneNumberPart2"
              value={addressData.phoneNumberPart2}
              maxLength="4"
              onChange={handleChange}
              className="phone-number-input input-height-default"
            />
          </div>
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="isDefaultAddress"
            name="isDefaultAddress"
            checked={addressData.isDefaultAddress}
            onChange={handleChange}
          />
          <label htmlFor="isDefaultAddress">기본 배송지로 저장</label>
        </div>
        <div className="form-actions">
          <button type="submit" onClick={handleNewAddressSubmit}>
            배송지 등록
          </button>
          <Link to="/user/mypage/address">취소</Link>
        </div>
      </form>
      <div class="ec-base-help">
        <h3>배송주소록 유의사항</h3>
        <div class="inner">
          <ol>
            <li class="item1">
              배송 주소록은 최대 10개까지 등록할 수 있으며, 별도로 등록하지 않을
              경우 최근 배송 주소록 기준으로 자동 업데이트 됩니다.
            </li>
            <li class="item2">
              자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면
              선택된 주소록은 업데이트 대상에서 제외됩니다.
            </li>
            <li class="item3">
              기본 배송지는 1개만 저장됩니다. 다른 배송지를 기본 배송지로
              설정하시면 기본 배송지가 변경됩니다.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export { AddressRegistrationPage };
