import React, { useState, useRef } from "react";
import axios from "axios";
import ProfileImageModal from "./ProfileImageModal";
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
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };
  const ProfileImageSrc = localStorage.getItem("ProfileImage");
  const profileImageUrl =
    profileData && ProfileImageSrc
      ? `http://localhost:8080${ProfileImageSrc.replace(
          "src/main/resources/static/",
          ""
        )}`
      : "https://defaultst.imweb.me/common/img/default_profile.png";

  //   const handleOpenModal = () => {
  //     setShowModal(true);
  //     console.log("프로필 이미지 수정 modal 버튼을 클릭했습니다.");
  //   };

  //   const handleCloseModal = () => {
  //     setShowModal(false);
  //     setShowCroppedImage(false);
  //     console.log("프로필 이미지 수정 modal 닫기.");
  //   };

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

  const UserInfoInput = ({ label, type }) => (
    <div className="uii-container">
      <span>{label}</span>
      <div className="uii-cover">
        <input type={type} />
      </div>
    </div>
  );

  return (
    <div className="update-user-info-page">
      <div className="update-user-info-page-title">
        <span>회원 정보 수정</span>
      </div>

      <div className="user-info-input-container">
        <div className="account-img-container profile-container">
          {/* <div className="account-img">
            <span>프로필 이미지</span>
            <button onClick={handleOpenModal} id="profile-img-open">
              변경하기
            </button>
          </div>
          {showModal && (
            <ProfileImageModal
              showModal={showModal}
              setShowModal={setShowModal}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              crop={crop}
              setCrop={setCrop}
              croppedImageUrl={croppedImageUrl}
              setCroppedImageUrl={setCroppedImageUrl}
              error={error}
              setError={setError}
              memberId={memberId}
              onClickApplyProfileImage={onClickApplyProfileImage}
              showCroppedImage={showCroppedImage}
              setShowCroppedImage={setShowCroppedImage}
            />
          )} */}
          <div className="avatar-wrapper">
            <img src={profileImageUrl} alt="Avatar" className="avatar" />
            {/* <img src={avatarUrl.current} alt="Avatar" className="avatar" /> */}
            <button
              className="change-photo-button"
              title="Change photo"
              onClick={() => setModalOpen(true)}
            >
              <PencilIcon />
            </button>
          </div>
          <h2 className="profile-name">Mack Aroney</h2>
          <p className="profile-title">Software Engineer</p>
          {modalOpen && (
            <Modal
              memberId={memberId}
              profileData={profileData}
              setProfileData={setProfileData}
              setProfileImageChange={setProfileImageChange} // 추가
              updateAvatar={updateAvatar}
              closeModal={() => setModalOpen(false)}
            />
          )}
        </div>
        <div className="profile-image-edit-container">
          <img
            src={profileImageUrl}
            alt="프로필 이미지"
            className="profile-edit-image"
          />
        </div>
        <UserInfoInput label="비밀번호" type="password" />
        <UserInfoInput label="비밀번호 확인" type="password" />
        <UserInfoInput label="닉네임" type="text" />
      </div>
      <div className="account-checkbox-container">
        <div className="account-checkbox">
          <span>계정 비활성화</span>
          <button>비활성화</button>
        </div>
      </div>
      <div className="account-checkbox-container">
        <div className="account-checkbox">
          <span>휴대폰 인증</span>
          <button>인증하기</button>
        </div>
      </div>
      <div className="uui-btn-container">
        <button className="uui-submit-btn">저장하기</button>
      </div>
    </div>
  );
};

export { UpdateUserInfoPage };
