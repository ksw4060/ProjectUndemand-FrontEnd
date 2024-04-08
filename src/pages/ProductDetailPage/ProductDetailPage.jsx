import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetailPage.css";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import ArticleViewModal from "../../components/ArticleViewModal/ArticleViewModal.jsx"
import ArticleSubmitModal from "../../components/ArticleSubmitModal/ArticleSubmitModal.jsx";

function ProductDetailPage() {
    let { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [dropdownStates, setDropdownStates] = useState([false, false, false, false]);
    const [reviewAndInquiryModalOpen, setReviewAndInquiryModalOpen] = useState(false);
    const [reviewWritingAndInquiryPostingModalOpen, setReviewWritingAndInquiryPostingModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const memberId = 1;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/products/${productId}`);
                if (response.status === 200) {
                    setProduct(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleCartSubmit = async () => {
        await axios.post(`http://localhost:8080/api/v1/cart/add/${productId}`, {
            memberId: memberId,
            quantity: quantity
        })
        .then(response => {
            alert(`장바구니에 상품을 담았습니다!`);
            navigate(`/cart?memberId=${memberId}`)
        })
        .catch(error => {
            console.error('요청을 보내는 중 오류가 발생했습니다:', error);
        });
    };

    const handleIncrement = () => {
        if (quantity < 100) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };
    
    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const toggleDropdown = (index) => {
        setDropdownStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const openArticleViewModal = (type) => {
        setModalType(type);
        setReviewAndInquiryModalOpen(true);
    };

    const closeArticleViewModal = () => {
        setReviewAndInquiryModalOpen(false);
    };
    
    const openArticleSubmitModal = (type) => {
        setModalType(type);
        setReviewWritingAndInquiryPostingModalOpen(true);
    }

    const closeArticleSubmitModal = () => {
        setReviewWritingAndInquiryPostingModalOpen(false);
    }

    return (
        <div className="detail-page">
            {loading ? (
                <div className="loading-fail">
                    로딩중...
                </div>
            ) : (
                <>
                    <div className="img-and-option-section">
                        <div className="img-box">
                            <ul className="thumbnail-img-container">
                                <li className="thumbnail-img"></li>
                                <li className="thumbnail-img"></li>
                                <li className="thumbnail-img"></li>
                                <li className="thumbnail-img"></li>
                                <li className="thumbnail-img"></li>
                            </ul>
                            <div className="hero-img-container">
                                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="hero-img"/>
                            </div>
                        </div>
                        <div className="option-and-info-box">
                            <div className="option-container">
                                <ul className="option-txt-box">
                                    {product.sale && <li className="is-sale">30% 할인 중!</li>}
                                    <li className="product-name">{product.productName}</li>
                                    <li className="product-type">{product.productType}</li>
                                    <li className="product-price">{product.price} 원</li>
                                </ul>
                                <div className="option-select-box">
                                    <div className="option-color-container">
                                        <p>색상 선택</p>
                                        <ul>
                                            <li className="option-color"></li>
                                            <li className="option-color"></li>
                                            <li className="option-color"></li>
                                            <li className="option-color"></li>
                                            <li className="option-color"></li>
                                        </ul>
                                    </div>
                                    <div className="option-size-container">
                                        <p>사이즈 선택</p>
                                        <ul>
                                            <li className="option-size">S</li>
                                            <li className="option-size">M</li>
                                            <li className="option-size">L</li>
                                            <li className="option-size">XL</li>
                                            <li className="option-size">XXL</li>
                                        </ul>
                                    </div>
                                    <div className="option-quantity-container">
                                        <p>수량 선택</p>
                                        <div className="quantity-input">
                                            <p>{quantity}</p>
                                            <div className="btn-flex">
                                                <MdOutlineKeyboardArrowUp onClick={() => handleIncrement()} />
                                                <MdOutlineKeyboardArrowDown onClick={() => handleDecrement()}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="option-btn-box">
                                    <ul className="option-btn-container">
                                        {/* <li className="option-btn">주문하기</li> */}
                                        <li className="option-btn" onClick={() => handleCartSubmit()}>장바구니</li>
                                        <li className="option-btn">찜하기</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="option-dropdown-info">
                                <ul className="option-dropdown-info-container">
                                    <li className="option-info">
                                        <div className="option-info-title" onClick={() => toggleDropdown(0)}>
                                            <p>상품 설명</p>
                                            {dropdownStates[0] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                                        </div>
                                        <ul className={`option-info-script ${dropdownStates[0] ? 'open' : ''}`}>
                                            <li>{`상품 설명: ${product.productInfo}`}</li>
                                            <li>{`제조사: ${product.manufacturer}`}</li>
                                        </ul>
                                    </li>
                                    <li className="option-info">
                                        <div className="option-info-title" onClick={() => toggleDropdown(1)}>
                                            <p>리뷰</p>
                                            {dropdownStates[1] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                                        </div>
                                        <ul className={`option-info-script ${dropdownStates[1] ? 'open' : ''}`}>
                                            <li><Link onClick={() => openArticleSubmitModal('review')}>리뷰 작성하기</Link></li>
                                            <li>상품에 대한 리뷰들을 볼 수 있습니다.</li>
                                            <li><Link onClick={() => openArticleViewModal('review')}>리뷰 더 보기</Link></li>
                                        </ul>
                                    </li>
                                    <li className="option-info">
                                        <div className="option-info-title" onClick={() => toggleDropdown(2)}>
                                            <p>상품 재고</p>
                                            {dropdownStates[2] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                                        </div>
                                        <div className={`option-info-script ${dropdownStates[2] ? 'open' : ''}`}>
                                            <p>상품에 대한 설명이 들어갑니다.</p>
                                        </div>
                                    </li>
                                    <li className="option-info">
                                        <div className="option-info-title" onClick={() => toggleDropdown(3)}>
                                            <p>Q&A</p>
                                            {dropdownStates[3] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                                        </div>
                                        <ul className={`option-info-script ${dropdownStates[3] ? 'open' : ''}`}>
                                            <li><Link onClick={() => openArticleSubmitModal('inquiry')}>상품 문의하기</Link></li>
                                            <li>상품에 대한 문의 글들을 볼 수 있습니다.</li>
                                            <li><Link onClick={() => openArticleViewModal('inquiry')}>문의 글 더 보기</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                {reviewAndInquiryModalOpen && (<ArticleViewModal modalType={modalType} modalClose={closeArticleViewModal}></ArticleViewModal>)}
                                {reviewWritingAndInquiryPostingModalOpen && (<ArticleSubmitModal modalType={modalType} modalClose={closeArticleSubmitModal}></ArticleSubmitModal>)}
                            </div>
                        </div>
                    </div>
                    <div className="detail-section">
                        <div className="detail-img-box">
                            <ul className="detail-img-container">
                                <li className="detail-img">
                                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </li>
                                <li className="detail-img">
                                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </li>
                                <li className="detail-img">
                                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </li>
                                <li className="detail-img">
                                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </li>
                                <li className="detail-img">
                                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </li>
                                <li className="detail-img">
                                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export { ProductDetailPage };