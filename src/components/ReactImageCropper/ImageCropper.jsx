import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import axios from "axios";
import "../../pages/UpdateUserInfoPage/UpdateUserInfoPage.css";

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
    // 파일 입력 이벤트에서 첫 번째 파일을 가져옴
    const file = e.target.files?.[0];
    // 파일이 없을 경우 함수 종료
    if (!file) return;

    // FileReader 객체 생성
    const reader = new FileReader();

    // 파일 읽기가 완료되었을 때 실행될 이벤트 리스너 추가
    reader.addEventListener("load", () => {
      // 새 이미지 객체 생성
      const imageElement = new Image();
      // FileReader 결과를 문자열로 변환하여 이미지 소스 설정
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      // 이미지 로드가 완료되었을 때 실행될 이벤트 리스너 추가
      imageElement.addEventListener("load", (e) => {
        // 이전 에러 메시지가 있다면 초기화
        if (error) setError("");

        // 이미지의 실제 크기 가져오기
        const { naturalWidth, naturalHeight } = e.currentTarget;

        // 이미지 크기가 최소 크기보다 작은지 확인
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          // 에러 메시지 설정
          setError("Image must be at least 150 x 150 pixels.");
          // 이미지 소스 초기화
          return setImgSrc("");
        }
      });

      // 이미지 소스를 상태로 설정
      setImgSrc(imageUrl);
    });

    // 파일을 Data URL 형식으로 읽기
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    // 이벤트에서 현재 타겟의 너비와 높이를 가져옴
    const { width, height } = e.currentTarget;

    // 최소 크기와 현재 이미지 너비를 이용하여 크롭 너비를 퍼센트로 계산
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    // 지정된 비율로 크롭을 만들기 위해 makeAspectCrop 함수 호출
    const crop = makeAspectCrop(
      {
        unit: "%", // 단위를 퍼센트로 설정
        width: cropWidthInPercent, // 계산된 크롭 너비를 설정
      },
      ASPECT_RATIO, // 지정된 비율을 사용
      width, // 현재 이미지의 너비를 전달
      height // 현재 이미지의 높이를 전달
    );

    // 만든 크롭을 이미지의 중심에 맞추기 위해 centerCrop 함수 호출
    const centeredCrop = centerCrop(crop, width, height);

    // 상태 업데이트를 위해 크롭 설정
    setCrop(centeredCrop);
  };

  const onClickApplyProfileImage = async () => {
    try {
      // 크롭된 이미지 URL이 없는 경우 에러 메시지를 설정하고 함수 종료
      if (!croppedImageUrl) {
        setError("이미지가 선택되지 않았습니다.");
        return;
      }

      // 로컬 스토리지에서 Authorization 토큰 가져오기
      const authorization = localStorage.getItem("Authorization");
      const formData = new FormData();

      // 크롭된 이미지 URL을 통해 이미지 데이터를 가져옴
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();

      // FormData 객체에 이미지 파일을 추가
      formData.append("imageFile", blob, "croppedImage.jpeg");

      // 디버깅을 위한 콘솔 출력
      console.log("ImageCropper Test : " + memberId);
      console.log("ImageCropper Test : " + authorization);

      // 프로필 이미지 업로드 요청
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

      // 프로필 이미지 변경 요청이 성공했음을 콘솔에 출력
      console.log("프로필 이미지 변경 요청이 성공적으로 전송되었습니다.");

      // 프로필 데이터를 다시 가져오기 위한 요청
      const profileResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/profile/${memberId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );

      // 가져온 프로필 데이터를 상태에 설정
      setProfileData(profileResponse.data);

      // 프로필 이미지 변경 후 모달 닫기
      closeModal();
      navigate("/user/mypage/profile");
    } catch (error) {
      // 오류 발생 시 에러 메시지를 설정하고 콘솔에 출력
      setError("프로필 이미지 변경 요청 중 오류가 발생했습니다.");
      console.error("프로필 이미지 변경 요청 중 오류가 발생했습니다:", error);
    }
  };

  // 이미지 크롭 및 데이터 URL 설정 함수 정의
  const handleCropImage = () => {
    setCanvasPreview(
      imgRef.current, // HTMLImageElement
      previewCanvasRef.current, // HTMLCanvasElement
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );
    const dataUrl = previewCanvasRef.current.toDataURL();
    console.log(dataUrl.substring(0, 100));
    setCroppedImageUrl(dataUrl);
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
          <button className="crop-button" onClick={handleCropImage}>
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
