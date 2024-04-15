import React, { useState, useEffect } from "react";
import "./MyReviewPage.css";
import { FaRegStar, FaStar } from "react-icons/fa6";
import ReviewUpdateModal from "../../components/ReviewUpdateModal/ReviewUpdateModal";
import axios from "axios";

function MyReviewPage() {
  const [selectedReviewSortOption, setSelectedReviewSortOption] =
    useState("최신순");
  const [selectedInquirySortOption, setSelectedInquirySortOption] =
    useState("최신순");
  const [sortOptionClick, setSortOptionClick] = useState(false);
  const [selectedReviewFilterOption, setSelectedReviewFilterOption] =
    useState("평점");
  const [selectedInquiryFilterOption, setSelectedInquiryFilterOption] =
    useState("전체 보기");
  const [filterOptionClick, setFilterOptionClick] = useState(false);
  const [productReviewData, setProductReviewData] = useState([]);
  const [rUModalOpen, setRUModalOpen] = useState(false);
  const [selectedRId, setSelectedRId] = useState(null);
  const memberId = 1;
  // const [reviewImage, setReviewImage] = useState(null);
  // const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProductReviewData();
  }, [memberId]);

  const fetchProductReviewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/review/user/${memberId}`
      );
      setProductReviewData(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleRUModalOpen = async (reviewId) => {
    setRUModalOpen(true);
    setSelectedRId(reviewId);
  };

  const closeRUModal = () => {
    setRUModalOpen(false);
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/review/${reviewId}/${memberId}`
      );
      setProductReviewData((prevData) =>
        prevData.filter((review) => review.reviewId !== reviewId)
      );
    } catch (error) {
      console.error(error.response.data);
    }
  };

  // const handleImageChange = (e) => {
  //   setImageFile(e.target.files[0]);
  // };

  // const handleImageUpload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("reviewId", reviewId);
  //     formData.append("image", imageFile);

  //     const response = await axios.post(
  //       "http://localhost:8080/api/v1/review/img/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("이미지 업로드 에러:", error);
  //   }
  // };

  // const fetchReviewImg = async (reviewId) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/v1/review/img/${reviewId}`
  //     );
  //     console.log(response.data);
  //     return response.data[0];
  //     // setReviewImage(response.data[0]);
  //   } catch (error) {
  //     console.error("Error fetching review image:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchReviewImages = async () => {
  //     const reviewImages = await Promise.all(
  //       productReviewData.map(async (review) => {
  //         const imgUrl = await fetchReviewImg(review.reviewId);
  //         return imgUrl;
  //       })
  //     );
  //     setReviewImage(reviewImages);
  //   };
  //   fetchReviewImages();
  // }, [productReviewData]);

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} />
        ))}
        {[...Array(remainingStars)].map((_, index) => (
          <FaRegStar key={filledStars + index} />
        ))}
      </>
    );
  };

  return (
    <div className="review-page">
      <div className="review-page-title-container">
        <div className="review-page-title">내 리뷰</div>
        <div className="total-review-count">{`10개의 리뷰`}</div>
      </div>
      <div className="pagination-cnt">{`1-10/10개의 리뷰`}</div>
      <div className="review-page-filter">
        <div className="review-sort-box">
          <div
            className="selected-sort-option"
            onClick={() => setSortOptionClick((prevState) => !prevState)}
          >{`정렬: ${selectedReviewSortOption}`}</div>
          <ul
            className={`review-sort-option ${sortOptionClick && "drop-option"}`}
          >
            <li>최신순</li>
            <li>오래된순</li>
            <li>높은 평점순</li>
            <li>낮은 평점순</li>
          </ul>
        </div>
        <div className="review-search-option"></div>
        <div className="review-filter-box">
          <div
            className="selected-filter-option"
            onClick={() => setFilterOptionClick((prevState) => !prevState)}
          >{`필터: ${selectedReviewFilterOption}`}</div>
          <ul
            className={`review-filter-option ${
              filterOptionClick && "drop-option"
            }`}
          >
            <li>{`별별별별별 (7)`}</li>
            <li>{`별별별별 (3)`}</li>
            <li>{`별별별 (0)`}</li>
            <li>{`별별 (0)`}</li>
            <li>{`별 (0)`}</li>
          </ul>
        </div>
      </div>
      {productReviewData.map((tableRow) => (
        <div key={tableRow.reviewId} className="review-container">
          <div className="review-product">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="txt-info">
              <span>{tableRow.productName}</span>
            </div>
          </div>
          <div className="review-main-content-container">
            <div className="rating-box">
              <div className="star-rate">{renderStars(tableRow.rating)}</div>
            </div>
            <div className="review-box">
              <div className="review-content">{tableRow.reviewContent}</div>
            </div>
            {/* 사용자가 등록한 리뷰 썸네일 들어갈 위치 */}
          </div>
          <div className="review-edit-del-container">
            <div className="review-date">
              <span>마지막 수정일:</span>
              {tableRow.updatedAt.substring(0, 10)}
            </div>
            <div className="review-edit-del">
              <button onClick={() => handleRUModalOpen(tableRow.reviewId)}>
                리뷰 수정
              </button>
              <button onClick={() => handleReviewDelete(tableRow.reviewId)}>
                리뷰 삭제
              </button>
            </div>
          </div>
        </div>
      ))}
      {rUModalOpen && (
        <ReviewUpdateModal
          reviewId={selectedRId}
          memberId={memberId}
          modalClose={closeRUModal}
          updateReviewData={fetchProductReviewData}
        ></ReviewUpdateModal>
      )}
    </div>
  );
}

export { MyReviewPage };
