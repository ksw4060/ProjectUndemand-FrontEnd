import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ArticleSubmitModal.css";
import { MdClose } from "react-icons/md";
import axios from "axios";

function ArticleSubmitModal({ modalType, modalClose }) {
  const [writer, setWriter] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryPassword, setInquiryPassword] = useState("");
  const [inquiryCategory, setInquiryCategory] = useState("");
  const { productId } = useParams();

  const handleInquirySubmit = async () => {
    await axios
      .post(`http://localhost:8080/api/v1/inquiry/new/${productId}`, {
        memberId: "1",
        name: writer,
        email: email,
        inquiryContent: inquiryContent,
        inquiryTitle: inquiryTitle,
        password: inquiryPassword,
        inquiryType: inquiryCategory,
        isSecret: "true",
      })
      .then((response) => {
        alert(`${response.data.name}님의 문의 글을 등록하였습니다.`);
      })
      .catch((error) => {
        console.error("요청을 보내는 중 오류가 발생했습니다:", error);
      });
  };

  const handleCategoryBtnClick = (category) => {
    setInquiryCategory(category);
  };

  const handleSubmitBtnClick = async () => {
    if (writer && email && inquiryContent && inquiryTitle && inquiryPassword) {
      await handleInquirySubmit();
    } else {
      alert("모든 필수 정보를 입력해주세요.");
    }
  };

  return (
    <div className="article-submit-modal">
      {modalType === "review" ? (
        <div className="review-writing-modal">
          <div className="modal-top-section">
            <h2>리뷰 작성</h2>
            <h3>제품에 대한 리뷰를 작성해 주세요</h3>
            <div className="review-writing-modal-product-info">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="review-writing-modal-img-info"
              />
              <span>상품 이름</span>
            </div>
            <MdClose
              onClick={modalClose}
              className="close-review-writing-modal"
            />
          </div>
          <div className="modal-content-section">
            <div className="review-rate">
              <span>평점</span>
              <span>별 별 별 별 별</span>
            </div>
            <div className="review-writing">
              <div className="review-content">
                <span>내 리뷰</span>
                <input type="text" />
              </div>
              <div className="review-title">
                <span>리뷰 제목</span>
                <input type="text" />
              </div>
            </div>
            <div className="review-select-option">
              <div className="size-option">
                <span>제품의 사이즈는 어떤가요?</span>
              </div>
              <div className="comfort-option">
                <span>제품의 착용감은 어떤가요?</span>
              </div>
              <div className="recommend-option">
                <span>제품을 추천하실 의향이 있으신가요?</span>
              </div>
            </div>
            <div className="review-add-picture">
              <span>사진 추가</span>
              <span>{`제품 착용 모습, 스타일링을 보여주는 사진을 추가하세요. (최대 5장)`}</span>
              <div className="add-btn"></div>
            </div>
            <div className="additional-info">
              <span>추가 정보</span>
              <span>
                해당 정보는 다른 구매자가 제품을 선택 및 구매하는데 도움이
                됩니다.
              </span>
              <span>평소 착용하는 사이즈</span>
              <input type="" />
            </div>
            <button className="submit-btn">등록</button>
          </div>
        </div>
      ) : (
        <div className="inquiry-writing-modal">
          <div className="modal-top-section">
            <h2>문의 글 작성</h2>
            <h3>제품에 대한 문의 사항을 작성해 주세요</h3>
            <div className="review-writing-modal-product-info">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="review-writing-modal-img-info"
              />
              <span>상품 이름</span>
            </div>
            <MdClose
              onClick={modalClose}
              className="close-review-writing-modal"
            />
          </div>
          <div className="modal-content-section">
            <div className="writer-info">
              <span className="first-label">작성자</span>
              <div className="input-cover">
                <input
                  type="text"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                  placeholder="ex) 홍길동"
                />
              </div>
              <span className="last-label">이메일</span>
              <div className="input-cover">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex) gildong@gmail.com"
                />
              </div>
            </div>
            <div className="inquiry-writing">
              <span className="first-label">내 문의 글</span>
              <div className="content-input-cover">
                <textarea
                  value={inquiryContent}
                  onChange={(e) => setInquiryContent(e.target.value)}
                />
              </div>
              <span className="last-label">문의 글 제목</span>
              <div className="title-input-cover">
                <input
                  type="text"
                  value={inquiryTitle}
                  onChange={(e) => setInquiryTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="inquiry-category-select">
              <span className="first-label">문의 카테고리</span>
              <div className="category-button-box">
                <button
                  onClick={() => handleCategoryBtnClick("PRODUCT")}
                  className={inquiryCategory === "PRODUCT" ? "active" : ""}
                >
                  상품 문의 글
                </button>
                <button
                  onClick={() => handleCategoryBtnClick("DELIVERY")}
                  className={inquiryCategory === "DELIVERY" ? "active" : ""}
                >
                  배송 문의 글
                </button>
                <button
                  onClick={() => handleCategoryBtnClick("EXCHANGE")}
                  className={inquiryCategory === "EXCHANGE" ? "active" : ""}
                >
                  교환 문의 글
                </button>
                <button
                  onClick={() => handleCategoryBtnClick("RETURN")}
                  className={inquiryCategory === "RETURN" ? "active" : ""}
                >
                  반품 문의 글
                </button>
                <button
                  onClick={() => handleCategoryBtnClick("REFUND")}
                  className={inquiryCategory === "REFUND" ? "active" : ""}
                >
                  취소 문의 글
                </button>
                <button
                  onClick={() => handleCategoryBtnClick("ETC")}
                  className={inquiryCategory === "ETC" ? "active" : ""}
                >
                  기타 문의 글
                </button>
                {console.log(inquiryCategory)}
              </div>
            </div>
            <div className="additional-info">
              <span className="first-label">문의 글 비밀 번호</span>
              <div className="input-cover">
                <input
                  type="password"
                  value={inquiryPassword}
                  onChange={(e) => setInquiryPassword(e.target.value)}
                />
              </div>
              <span className="last-label">
                해당 정보는 구매자의 프라이버시를 지키는데 사용됩니다.
              </span>
            </div>
            <div className="inquiry-btn-box">
              <button
                className="submit-btn"
                onClick={() => {
                  handleSubmitBtnClick();
                }}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleSubmitModal;
