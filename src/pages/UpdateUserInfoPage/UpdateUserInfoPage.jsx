import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./UpdateUserInfoPage.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function UpdateUserInfoPage({ isLoggedin, memberId, profileData }) {
  let [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef();
  const imageRef = useRef();
  const imageButtonRef = useRef();

  const handleOpenModal = () => {
    setShowModal(true);
    console.log("프로필 이미지 수정 modal 버튼을 클릭했습니다.");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log("프로필 이미지 수정 modal 닫기.");
  };

  const readImageFile = (file) => {
    const reader = new FileReader();
    reader.onerror = handleFileError;
    reader.onload = () => {
      console.log("File read successfully");
      setSrc(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      readImageFile(file);
    } else {
      console.log("No file selected");
    }
  };

  const handleFileError = (event) => {
    setError("파일을 읽는 중 오류가 발생했습니다.");
    console.error("파일을 읽는 중 오류가 발생했습니다:", event.target.error);
  };

  const onCropChange = (crop) => setCrop(crop);

  const onCropComplete = (crop) => makeClientCrop(crop);

  const onImageLoaded = (image) => (imageRef.current = image);

  const onClickApplyProfileImage = async () => {
    try {
      if (!selectedFile) {
        setError("파일이 선택되지 않았습니다.");
        return;
      }

      const authorization = localStorage.getItem("Authorization");
      const formData = new FormData();
      formData.append("imageFile", selectedFile);

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

  const makeClientCrop = async (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const dataUrl = canvas.toDataURL("image/jpeg");
    return dataUrl;
  };

  useEffect(() => {
    if (imageButtonRef.current) {
      if (showModal) {
        imageButtonRef.current.classList.add("active");
      } else {
        imageButtonRef.current.classList.remove("active");
      }
    }
  }, [showModal]);

  useEffect(() => {
    console.log("src changed:", src);
    setSrc(src);
  }, [src]);

  const ProfileImageModal = () => (
    <div id="profile-image-modal-box" ref={imageButtonRef}>
      <div className="profile-image-modal-content">
        <div className="profile-image-modal-content-top">
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            ref={fileInputRef}
          />
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
        </div>

        <div className="profile-image-modal-content-middle">
          <div className="crop-container">
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
                className="modal-profile-image"
              />
            )}
            {error && <p className="error-message">{error}</p>}
            {croppedImageUrl && (
              <div className="image-preview-container">
                <img
                  alt="Preview"
                  src={croppedImageUrl}
                  className="image-preview"
                  style={{ width: "80%", height: "80%" }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="profile-image-modal-content-bottom">
          <button
            onClick={onClickApplyProfileImage}
            className="apply-profile-image-btn"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  const UserInfoInput = ({ label, type = "text" }) => (
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
        <div className="account-img-container">
          <div className="account-img">
            <span>프로필 이미지</span>
            <button onClick={handleOpenModal} id="profile-img-open">
              수정
            </button>
          </div>
          {showModal && <ProfileImageModal />}
        </div>
        <div className="profile-image-edit-container">
          <img
            src={
              profileData && profileData.profileImgPath
                ? `http://localhost:8080${profileData.profileImgPath}`
                : "https://defaultst.imweb.me/common/img/default_profile.png"
            }
            alt="프로필 이미지"
            className="profile-edit-image"
          />
        </div>
        <UserInfoInput label="비밀번호" type="password" />
        <UserInfoInput label="비밀번호 확인" type="password" />
        <div className="uii-birth-day-container">
          <span>생년월일</span>
          <div className="uii-cover">
            <span>{`2024/01/01`}</span>
          </div>
        </div>
      </div>
      <div className="account-delete-container">
        <div className="account-delete">
          <span>계정 비활성화</span>
          <button>비활성화</button>
        </div>
      </div>
      <div className="uui-btn-container">
        <button className="uui-submit-btn">저장</button>
      </div>
    </div>
  );
}

export { UpdateUserInfoPage };
