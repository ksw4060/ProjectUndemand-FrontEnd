import React, { useState, useRef } from "react";
import axios from "axios";
// Component
import PencilIcon from "../../components/ReactImageCropper/PencilIcon.jsx";
import Modal from "../../components/ReactImageCropper/Modal.jsx";
import { UserDataFormat } from "./UpdateUserInfoInputBox.jsx";
// Css
import "./UpdateUserInfoPage.css";
import "../../components/ReactImageCropper/ImageCropperModal.css";

const UpdateUserInfoPage = ({ profileData, memberId, setProfileData }) => {
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const nicknameRef = useRef(null);

  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);

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
  // 프로필 이미지가 나오는지 체크하기 위해서, 콘솔로그 출력 [개발단계]
  console.log(profileImageUrl);
  // console.log(profileData);

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

      const response = await axios.put(url, data, { headers });
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

      const response = await axios.put(url, data, { headers });
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

      const response = await axios.put(url, data, { headers });
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
  const gender = profileData?.memberGender || "없음";

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
            ref={genderRef}
          />
          <UserDataFormat
            label="연령대"
            type="text"
            data={memberAges}
            onEdit={handleEditAge}
            onConfirm={handleConfirmAge}
            isEditing={isEditingAge}
            ref={ageRef}
          />
          <UserDataFormat
            label="닉네임"
            type="text"
            data={nickname}
            onEdit={handleEditNickname}
            onConfirm={handleConfirmNickname}
            isEditing={isEditingNickname}
            ref={nicknameRef}
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
