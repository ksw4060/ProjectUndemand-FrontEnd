import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";
import "./Profile.css";

const Modal = ({
  updateAvatar,
  closeModal,
  memberId,
  profileData,
  setProfileData,
  setProfileImageChange,
}) => {
  return (
    <div
      className="modal-container"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-overlay"></div>
      <div className="modal-wrapper">
        <div className="modal-content-wrapper">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close-button"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
              <ImageCropper
                memberId={memberId}
                profileData={profileData}
                setProfileData={setProfileData}
                updateAvatar={updateAvatar}
                closeModal={closeModal}
                setProfileImageChange={setProfileImageChange} // 추가
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
