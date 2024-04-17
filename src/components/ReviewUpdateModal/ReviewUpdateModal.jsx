import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa6";
import "./ReviewUpdateModal.css";
import axios from "axios";

function ReviewUpdateModal({
  reviewId,
  memberId,
  modalClose,
  updateReviewData,
}) {
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleReviewUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/review/${reviewId}/${memberId}`,
        {
          reviewContent: reviewContent,
          rating: rating,
        }
      );
      setModalMessage(`상품 구매 후기를 수정 하였습니다`);
      setShowModal(true);
      updateReviewData();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleReviewSubmitBtn = async () => {
    if (reviewContent && rating) {
      await handleReviewUpdate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    modalClose();
  };

  return (
    <div className="review-u-modal">
      <div
        className={`review-u-modal-wrapper ${
          showModal && "comfirm-modal-active"
        }`}
      >
        <div className="review-u-modal-top">
          <h2>리뷰 수정</h2>
          <h3>상품에 대한 리뷰를 수정해 주세요</h3>
          <MdClose onClick={modalClose} className="review-u-modal-close" />
        </div>
        <div className="review-u-input-container">
          <div className="rating-input-container">
            <span>평점</span>
            <div className="rating-input">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => setRating(index + 1)}
                  style={{ cursor: "pointer" }}
                >
                  {index < rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
          </div>
          <div className="review-content">
            <span>내 리뷰</span>
            <div className="review-content-textarea-cover">
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </div>
          </div>
          <button
            className="submit-btn"
            onClick={() => handleReviewSubmitBtn()}
          >
            등록
          </button>
        </div>
      </div>
      {showModal && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewUpdateModal;
