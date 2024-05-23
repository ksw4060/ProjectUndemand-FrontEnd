import { useRef, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import "./Profile.css";

const Profile = ({
  isLoggedin,
  memberId,
  profileData,
  setProfileData,
  setProfileImageChange,
}) => {
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );

  const profileImageUrl =
    profileData && profileData.profileImgPath
      ? `http://localhost:8080${profileData.profileImgPath.replace(
          "src/main/resources/static/",
          ""
        )}`
      : "https://defaultst.imweb.me/common/img/default_profile.png";
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  return (
    <div className="profile-container">
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
  );
};

export default Profile;
