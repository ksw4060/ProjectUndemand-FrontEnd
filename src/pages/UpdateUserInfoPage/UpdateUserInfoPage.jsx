import React, { useState, useRef } from "react";
import axios from "axios";
import "./UpdateUserInfoPage.css";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import "./Profile.css";

const UpdateUserInfoPage = ({
  profileData,
  memberId,
  setProfileData,
  setProfileImageChange,
}) => {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    aspect: 1,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  //   const [showModal, setShowModal] = useState(false);
  const [showCroppedImage, setShowCroppedImage] = useState(false);
  const [error, setError] = useState("");

  const [isEditingGender, setIsEditingGender] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const nicknameRef = useRef(null);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };
  const profileImageUrl =
    profileData && profileData.profileImgPath
      ? `${
          process.env.REACT_APP_BACKEND_URL_FOR_IMG
        }${profileData.profileImgPath.replace(
          "src/main/resources/static/",
          ""
        )}`
      : "https://defaultst.imweb.me/common/img/default_profile.png";
  //   console.log(profileImageUrl);
  //   console.log(profileData);

  const onClickApplyProfileImage = async () => {
    try {
      if (!croppedImageUrl) {
        setError("이미지가 선택되지 않았습니다.");
        return;
      }

      const authorization = localStorage.getItem("Authorization");
      const formData = new FormData();
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      formData.append("imageFile", blob, "croppedImage.jpeg");

      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/profile/image/${memberId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authorization,
          },
        }
      );

      console.log("프로필 이미지 변경 요청이 성공적으로 전송되었습니다.");
    } catch (error) {
      setError("프로필 이미지 변경 요청 중 오류가 발생했습니다.");
      console.error("프로필 이미지 변경 요청 중 오류가 발생했습니다:", error);
    }
  };

  // Common UserInfo Component
  const UserInfo = ({ label, data, onEdit }) => (
    <div className="profile-info-container">
      <div className="profile-checkbox">
        <div className="userinfo-checkbox">
          <span>{label}</span>
          <span>{data || "없음"}</span>
        </div>
        <button className="profile-info-edit-btn" onClick={onEdit}>
          수정
        </button>
      </div>
    </div>
  );

  const UserInfoInput = ({ label, type, data, onConfirm }) => (
    <div className="profile-info-container">
      <div className="profile-checkbox">
        <div className="uii-container">
          <span>{label}</span>
          <div className="uii-cover">
            <input type={type} defaultValue={data} ref={nicknameRef} />
          </div>
        </div>
        <button className="profile-info-confirm-btn" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );

  const UserAgeSelect = ({ label, data, onConfirm }) => (
    <div className="profile-info-container">
      <div className="profile-checkbox">
        <div className="uii-container">
          <span>{label}</span>
          <select
            className="form-select form-select-sm"
            defaultValue={data}
            ref={ageRef}
          >
            <option value="AGE_0_TO_10">0세 ~ 10세 이하</option>
            <option value="TEENS">10대</option>
            <option value="TWENTIES">20대</option>
            <option value="THIRTIES">30대</option>
            <option value="FORTIES_AND_ABOVE">40대 이상</option>
          </select>
        </div>
        <button className="profile-info-confirm-btn" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );

  const UserGenderSelect = ({ label, data, onConfirm }) => (
    <div className="profile-info-container">
      <div className="profile-checkbox">
        <div className="uii-container">
          <span>{label}</span>
          <select
            className="form-select form-select-sm"
            defaultValue={data}
            ref={genderRef}
          >
            <option value="MAN">MAN | 남자</option>
            <option value="WOMAN">WOMAN | 여자</option>
            <option value="ETC">ETC | 공통</option>
          </select>
        </div>
        <button className="profile-info-confirm-btn" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );

  // Refactored UserDataFormat to choose between different input components
  const UserDataFormat = ({
    label,
    type,
    data,
    onEdit,
    onConfirm,
    isEditing,
  }) => {
    const renderInputComponent = () => {
      switch (label) {
        case "연령대":
          return (
            <UserAgeSelect label={label} data={data} onConfirm={onConfirm} />
          );
        case "성별":
          return (
            <UserGenderSelect label={label} data={data} onConfirm={onConfirm} />
          );
        default:
          return (
            <UserInfoInput
              label={label}
              type={type}
              data={data}
              onConfirm={onConfirm}
            />
          );
      }
    };

    return (
      <div className="profile-info-data-container">
        {isEditing ? (
          renderInputComponent()
        ) : (
          <UserInfo label={label} data={data} onEdit={onEdit} />
        )}
      </div>
    );
  };

  const handleEditGender = () => setIsEditingGender(true);
  const handleConfirmGender = async () => {
    setIsEditingGender(false);
    try {
      const newGender = genderRef.current.value;
      const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/profile/${memberId}/gender`;
      const data = newGender;
      const headers = {
        Authorization: localStorage.getItem("Authorization"),
        "Content-Type": "application/json",
      };

      // Log the request details to the console
      console.log("PUT Request URL:", url);
      console.log("PUT Request Data:", data);
      console.log("PUT Request Headers:", headers);

      const response = await axios.put(url, data, { headers });

      // Log the response to the console
      console.log("PUT Request Response:", response);

      setProfileData((prevData) => ({
        ...prevData,
        member_gender: newGender,
      }));
    } catch (error) {
      console.error("Error updating gender:", error);
    }
  };

  const handleEditAge = () => setIsEditingAge(true);
  const handleConfirmAge = async () => {
    setIsEditingAge(false);
    try {
      const newAge = ageRef.current.value;
      const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/profile/${memberId}/age`;
      const data = newAge;
      const headers = {
        Authorization: localStorage.getItem("Authorization"),
        "Content-Type": "application/json",
      };

      // Log the request details to the console
      console.log("PUT Request URL:", url);
      console.log("PUT Request Data:", data);
      console.log("PUT Request Headers:", headers);

      // Make the request and capture the response
      const response = await axios.put(url, data, { headers });

      // Log the response to the console
      console.log("PUT Request Response:", response);

      setProfileData((prevData) => ({
        ...prevData,
        memberAges: newAge,
      }));
    } catch (error) {
      console.error("Error updating age:", error);
    }
  };

  const handleEditNickname = () => setIsEditingNickname(true);
  const handleConfirmNickname = async () => {
    setIsEditingNickname(false);
    try {
      const newNickname = nicknameRef.current.value;
      const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/profile/${memberId}/nickname`;
      const data = newNickname;
      const headers = {
        Authorization: localStorage.getItem("Authorization"),
        "Content-Type": "application/json",
      };

      // Log the request details to the console
      console.log("PUT Request URL:", url);
      console.log("PUT Request Data:", data);
      console.log("PUT Request Headers:", headers);

      // Make the request and capture the response
      const response = await axios.put(url, data, { headers });

      // Log the response to the console
      console.log("PUT Request Response:", response);

      setProfileData((prevData) => ({
        ...prevData,
        member: {
          ...prevData.member,
          nickname: newNickname,
        },
      }));
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  const nickname = profileData?.member?.nickname || "없음";
  const memberAges = profileData?.memberAges || "없음";
  const gender = profileData?.member_gender || "없음";

  return (
    <div className="update-user-info-page">
      <div className="update-user-info-page-title">
        <span>회원 정보 수정</span>
      </div>

      <div className="user-info-input-container">
        <div className="profile-container">
          <div className="profile-image-wrapper">
            <img
              src={profileImageUrl}
              alt="profileImage"
              className="profile-image"
            />
            <button
              className="change-photo-button"
              title="Change photo"
              onClick={() => setModalOpen(true)}
            >
              <PencilIcon />
            </button>
          </div>
          {modalOpen && (
            <Modal
              memberId={memberId}
              profileData={profileData}
              setProfileData={setProfileData}
              updateAvatar={updateAvatar}
              closeModal={() => setModalOpen(false)}
            />
          )}
        </div>
        <div className="user-info-container">
          <UserDataFormat
            label="성별"
            type="text"
            data={gender}
            onEdit={handleEditGender}
            onConfirm={handleConfirmGender}
            isEditing={isEditingGender}
          />
          <UserDataFormat
            label="연령대"
            type="text"
            data={memberAges}
            onEdit={handleEditAge}
            onConfirm={handleConfirmAge}
            isEditing={isEditingAge}
          />
          <UserDataFormat
            label="닉네임"
            type="text"
            data={nickname}
            onEdit={handleEditNickname}
            onConfirm={handleConfirmNickname}
            isEditing={isEditingNickname}
          />
        </div>
      </div>
      <div className="profile-info-container">
        <div className="account-activate">
          <span>계정 비활성화</span>
          <button>비활성화</button>
        </div>
      </div>
      <div className="profile-info-container">
        <div className="account-activate">
          <span>휴대폰 인증</span>
          <button>인증하기</button>
        </div>
      </div>
      {/* <div className="uui-btn-container">
        <button className="uui-submit-btn">저장하기</button>
      </div> */}
    </div>
  );
};

export { UpdateUserInfoPage };
