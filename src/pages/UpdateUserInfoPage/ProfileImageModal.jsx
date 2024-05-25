import React, { useRef, useState, useCallback, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ProfileImageModal = ({
  showModal,
  setShowModal,
  selectedFile,
  setSelectedFile,
  crop,
  setCrop,
  croppedImageUrl,
  setCroppedImageUrl,
  error,
  setError,
  memberId,
  onClickApplyProfileImage,
  showCroppedImage,
  setShowCroppedImage,
}) => {
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const imageButtonRef = useRef(null);
  const [src, setSrc] = useState(null);

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
    const file = e.target.files?.[0];
    if (!file) return;
    readImageFile(file);
  };

  const handleFileError = (event) => {
    setError("파일을 읽는 중 오류가 발생했습니다.");
    console.error("파일을 읽는 중 오류가 발생했습니다:", event.target.error);
  };

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onCropComplete = (newCrop) => {
    makeClientCrop(newCrop);
  };

  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  const makeClientCrop = useCallback(async (newCrop) => {
    if (imageRef.current && newCrop.width && newCrop.height) {
      const croppedImageUrl = await getCroppedImg(imageRef.current, newCrop);
      setCroppedImageUrl(croppedImageUrl);
    }
  }, []);

  const getCroppedImg = (image, newCrop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = newCrop.width;
    canvas.height = newCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      newCrop.x * scaleX,
      newCrop.y * scaleY,
      newCrop.width * scaleX,
      newCrop.height * scaleY,
      0,
      0,
      newCrop.width,
      newCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          blob.name = "cropped.jpeg";
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        }
      }, "image/jpeg");
    });
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

  return (
    <div id="profile-image-modal-box" ref={imageButtonRef}>
      <div className="profile-image-modal-content">
        <div className="profile-image-modal-content-top">
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            ref={fileInputRef}
          />
          <span className="close" onClick={() => setShowModal(false)}>
            &times;
          </span>
        </div>

        <div className="profile-image-modal-content-middle">
          <div className="crop-container">
            {src && (
              <ReactCrop
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropComplete}
                onImageLoaded={onImageLoaded}
                maxWidth={500}
                maxHeight={500}
                circularCrop={true}
                keepSelection={true}
              >
                <img
                  src={src}
                  alt="Selected"
                  ref={imageRef}
                  style={{ maxWidth: "500px", maxHeight: "500px" }}
                />
              </ReactCrop>
            )}
            {error && <p className="error-message">{error}</p>}
            {showCroppedImage && croppedImageUrl && (
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
        <button
          className="show-cropped-image-btn"
          onClick={() => setShowCroppedImage(true)}
        >
          자르기
        </button>
      </div>
    </div>
  );
};

export default ProfileImageModal;
