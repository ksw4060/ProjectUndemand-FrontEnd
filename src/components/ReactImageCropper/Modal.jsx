import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";
import "../../pages/UpdateUserInfoPage/UpdateUserInfoPage.css";

const Modal = ({
  memberId,
  profileData,
  updateAvatar,
  closeModal,
  setProfileImageUrl,
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
                updateAvatar={updateAvatar}
                closeModal={closeModal}
                setProfileImageUrl={setProfileImageUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
