import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './ArticleViewModal.css'
import { MdClose } from "react-icons/md";
import axios from 'axios';

function ArticleViewModal({ modalType, modalClose }) {
    const [selectedReviewSortOption, setSelectedReviewSortOption] = useState("최신순");
    const [selectedInquirySortOption, setSelectedInquirySortOption] = useState("최신순");
    const [sortOptionClick, setSortOptionClick] = useState(false);
    const [selectedReviewFilterOption, setSelectedReviewFilterOption] = useState("평점");
    const [selectedInquiryFilterOption, setSelectedInquiryFilterOption] = useState("전체 보기");
    const [filterOptionClick, setFilterOptionClick] = useState(false);
    const [productInquiryData, setProductInquiryData] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const productInquiryResponse = await axios.get(`http://localhost:8080/api/v1/inquiry/list/${productId}`);
                setProductInquiryData(productInquiryResponse.data);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchArticleData();
    }, [productId]);

    return (
        <div className="article-view-modal">
            <div className="product-info-section">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='img-info'/>
                <div className="txt-info">
                    <span>상품 이름</span>
                    <span>상품 가격</span>
                </div>
                <MdClose onClick={modalClose} className="close-modal"/>
            </div>
            {modalType === "review" ? (
                <>
                    <div className="rating-and-recommendations-section">
                        <div className="star-rate">별별별별별</div>
                        <div className="review-count">{`10개의 리뷰`}</div>
                        <div className="rate-box">
                            <div className="size-rate">
                                <span>제품의 사이즈는 어떤가요?</span>
                            </div>
                            <div className="comfort-rate">
                                <span>제품의 착용감은 어떤가요?</span>
                            </div>
                            <div className="recommend-rate">
                                <span>제품을 추천하실 의향이 있으신가요?</span>
                            </div>
                        </div>
                    </div>
                    <div className="pagination-info-section">{`1-10/10개의 리뷰`}</div>
                    <div className="review-filter-section">
                        <div className="review-sort-box">
                            <div className="selected-sort-option" onClick={() => setSortOptionClick(prevState => !prevState)}>{`정렬: ${selectedReviewSortOption}`}</div>
                            <ul className={`review-sort-option ${sortOptionClick && "drop-option"}`}>
                                <li>최신순</li>
                                <li>오래된순</li>
                                <li>높은 평점순</li>
                                <li>낮은 평점순</li>
                            </ul>
                        </div>
                        <div className="review-search-option"></div>
                        <div className="review-filter-box">
                            <div className="selected-filter-option" onClick={() => setFilterOptionClick(prevState => !prevState)}>{`필터: ${selectedReviewFilterOption}`}</div>
                            <ul className={`review-filter-option ${filterOptionClick && "drop-option"}`}>
                                <li>{`별별별별별 (7)`}</li>
                                <li>{`별별별별 (3)`}</li>
                                <li>{`별별별 (0)`}</li>
                                <li>{`별별 (0)`}</li>
                                <li>{`별 (0)`}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="review-section">
                        <div className="rating-and-recommendations-box">
                            <div className="star-rate">별별별별별</div>
                            <div className="rate-box">
                                <div className="size-rate">
                                    <span>제품의 사이즈는 어떤가요?</span>
                                </div>
                                <div className="comfort-rate">
                                    <span>제품의 착용감은 어떤가요?</span>
                                </div>
                                <div className="recommend-rate">
                                    <span>제품을 추천하실 의향이 있으신가요?</span>
                                </div>
                            </div>
                        </div>
                        <div className="review-box">
                            <h2 className="review-title">테스트 리뷰 1</h2>
                            <div className="review-content">첫번째 테스트 리뷰입니다.</div>
                            <div className="like-box">
                                <div className="like">좋아요</div>
                                <div className="bad">싫어요</div>
                            </div>
                        </div>
                        <div className="writer-info-box">
                            <div className="review-writer">{`찰스`}</div>
                            <div className="review-date">{`2024.04.03`}</div>
                            <div className="review-usual-size">{`260mm`}</div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="inquiry-title-section">
                        <div className="inquiry-count">{`10개의 문의 글`}</div>
                        <div className="count-box">
                            <div className="product-inquiry-count">
                                <span>상품 문의 글</span>
                            </div>
                            <div className="delivery-inquiry-count">
                                <span>배송 문의 글</span>
                            </div>
                            <div className="exchange-inquiry-count">
                                <span>교환 문의 글</span>
                            </div>
                            <div className="return-inquiry-count">
                                <span>반품 문의 글</span>
                            </div>
                            <div className="cancellation-inquiry-count">
                                <span>취소 문의 글</span>
                            </div>
                            <div className="other-inquiry-count">
                                <span>기타 문의 글</span>
                            </div>
                        </div>
                    </div>
                    <div className="pagination-info-section">{`1-10/10개의 문의 글`}</div>
                    <div className="inquiry-filter-section">
                        <div className="inquiry-sort-box">
                            <div className="selected-sort-option" onClick={() => setSortOptionClick(prevState => !prevState)}>{`정렬: ${selectedInquirySortOption}`}</div>
                            <ul className={`inquiry-sort-option ${sortOptionClick && "drop-option"}`}>
                                <li>최신순</li>
                                <li>오래된순</li>
                            </ul>
                        </div>
                        <div className="inquiry-search-option"></div>
                        <div className="inquiry-filter-box">
                            <div className="selected-filter-option" onClick={() => setFilterOptionClick(prevState => !prevState)}>{`필터: ${selectedInquiryFilterOption}`}</div>
                            <ul className={`inquiry-filter-option ${filterOptionClick && "drop-option"}`}>
                                <li>{`전체 보기`}</li>
                                <li>{`상품 문의`}</li>
                                <li>{`배송 문의`}</li>
                                <li>{`교환 문의`}</li>
                                <li>{`반품 문의`}</li>
                                <li>{`취소 문의`}</li>
                                <li>{`기타 문의`}</li>
                            </ul>
                        </div>
                    </div>
                    {productInquiryData.map(tableRow => (
                        <div key={tableRow.inquiryId} className="inquiry-section">
                            <div className="inquiry-num-and-category-box">
                                <div className="inquiry-num">
                                    <span>{`번호: ${tableRow.inquiryId}`}</span>
                                </div>
                                <div className="inquiry-category">
                                    <span>{`카테고리: ${tableRow.inquiryType}`}</span>
                                </div>
                            </div>
                            <div className="inquiry-content-box">
                                <h2 className="inquiry-title">{tableRow.inquiryTitle}</h2>
                                {/* <img src={tableRow.inquiryInfo ? tableRow.inquiryInfo.productImgSrc : ''} alt={tableRow.inquiryInfo ? tableRow.inquiryInfo.productName : ''} className="inquiry-img"/> */}
                            </div>
                            <div className="writer-info-box">
                                <div className="inquiry-writer">{`${tableRow.name.slice(0, 1)}${'*'.repeat(Math.max(0, tableRow.name.length - 1)).slice(0, 2)}`}</div>
                                <div className="inquiry-date">{tableRow.createdAt}</div>
                            </div>
                        </div>
                    ))}
                </>
            )}
            
        </div>
    )
}

export default ArticleViewModal;