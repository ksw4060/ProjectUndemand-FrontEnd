import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import axios from "axios";
import "./Profile.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({
  closeModal,
  updateAvatar,
  memberId,
  profileData,
  setProfileData,
  setProfileImageChange,
}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

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

      console.log("ImageCropper Test : " + memberId);
      console.log("ImageCropper Test : " + authorization);

      // 프로필 이미지 업로드
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

      // 프로필 데이터를 다시 가져오기
      const profileResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/profile/${memberId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );

      // 프로필 데이터 업데이트
      setProfileData(profileResponse.data);

      // 로컬 스토리지에 ProfileImageChange 업데이트
      localStorage.removeItem("profileImageChange");
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
        now.getHours()
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
      localStorage.setItem("profileImageChange", formattedDate);

      // 프로필 이미지 변경 후 모달 닫기
      closeModal();
      navigate("/user/mypage/profile");
    } catch (error) {
      setError("프로필 이미지 변경 요청 중 오류가 발생했습니다.");
      console.error("프로필 이미지 변경 요청 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <>
      <label className="file-input-container">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="file-input"
        />
      </label>
      {error && <p className="error-message">{error}</p>}
      {imgSrc && (
        <div className="cropper-container">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="crop-button"
            onClick={() => {
              setCanvasPreview(
                imgRef.current, // HTMLImageElement
                previewCanvasRef.current, // HTMLCanvasElement
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              console.log(dataUrl.substring(0, 100));
              setCroppedImageUrl(dataUrl);
            }}
          >
            Crop Image
          </button>
          {croppedImageUrl && (
            <button className="crop-button" onClick={onClickApplyProfileImage}>
              Apply Profile Image
            </button>
          )}
        </div>
      )}
      {crop && <canvas ref={previewCanvasRef} className="preview-canvas" />}
    </>
  );
};

export default ImageCropper;
