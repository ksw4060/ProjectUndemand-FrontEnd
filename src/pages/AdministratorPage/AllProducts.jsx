import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AllProducts.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import axios from "axios";
import ManagementModal from "./ManagementModal.jsx";
import ArticleViewModal from "../../components/ArticleViewModal/ArticleViewModal.jsx";
import swal from "sweetalert";

function AllProducts() {
  const pageSize = 10;
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState([]);
  const [managementModalOpen, setManagementModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [visiblePages, setVisiblePages] = useState([]);
  const [totalPageSize, setTotalPageSize] = useState(0);
  const [productReviewData, setProductReviewData] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  const [reviewAndInquiryModalOpen, setReviewAndInquiryModalOpen] =
    useState(false);
  const [productInquiryData, setProductInquiryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProductsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/products`,
          {
            params: {
              size: pageSize,
              page: currentPage,
              condition: "",
              productType: "",
            },
          }
        );
        setAllProducts(response.data.content);
        setTotalPageSize(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchAllProductsData();
  }, [currentPage, managementModalOpen]);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/products/${productId}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      swal({
        title: "상품을 삭제하였습니다!",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === -1 && currentPage === 0) {
      swal({
        title: "첫번째 페이지입니다.",
      });
    } else if (direction === 1 && currentPage === totalPageSize - 1) {
      swal({
        title: "마지막 페이지입니다.",
      });
    } else {
      setCurrentPage(currentPage + direction);
    }
  };

  useEffect(() => {
    const pageButtons = () => {
      const totalPages = totalPageSize;
      const pages = [];

      const pageSize = 5;

      const currentPageGroup = Math.ceil((currentPage + 1) / pageSize);

      const startPage = (currentPageGroup - 1) * pageSize;
      const endPage = Math.min(startPage + pageSize, totalPages);

      for (let i = startPage; i < endPage; i++) {
        pages.push(i);
      }
      setVisiblePages(pages);
    };

    pageButtons();
  }, [currentPage, totalPageSize]);

  const openManagementModal = () => {
    setManagementModalOpen(true);
  };

  const closeManagementModal = () => {
    setManagementModalOpen(false);
  };

  const openArticleViewModal = async (product, modalType) => {
    if (modalType === "adminReview") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/review/product/${product.productId}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );
        setProductReviewData(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    } else if (modalType === "adminInquiry") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/inquiry/list/${product.productId}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );
        setProductInquiryData(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    }
    setProductInfo(product);
    setModalType(modalType);
    setReviewAndInquiryModalOpen(true);
  };

  const closeArticleViewModal = () => {
    setReviewAndInquiryModalOpen(false);
  };

  return (
    <div className="admin-page-contents-container">
      <div className="admin-page-pd-title">
        <span>상품 관리</span>
        <button
          className="admin-page-pd-btn"
          onClick={() => {
            openManagementModal();
            setModalType("create product");
          }}
        >
          상품 등록
        </button>
      </div>
      {allProducts.map((product) => (
        <div key={product.productId} className="admin-page-pd-container">
          <div className="admin-page-pd-img-container">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL_FOR_IMG}${product.productThumbnails[0]}`}
              alt={`상품 이미지`}
            />
          </div>
          <div className="admin-page-pd-info-container">
            <div className="admin-page-pd-info">
              <span>{`상품 이름: ${product.productName}`}</span>
              <span>{`상품 타입: ${product.productType}`}</span>
              <div className="is-discount-info">
                <span>{`할인 여부: ${product.isDiscount}`}</span>
                <span>
                  {product.isDiscount === true
                    ? `할인율: ${product.discountRate}%`
                    : ""}
                </span>
              </div>
              <span>{`추천 여부: ${product.isRecommend}`}</span>
            </div>
            <span>{`상품 가격: ${product.price}`}</span>
            <span>{`생성일: ${product.createdAt.substring(0, 10)}`}</span>
          </div>
          <div className="admin-page-pd-btn-container">
            <button
              className="admin-page-pd-btn"
              onClick={() =>
                navigate(`/admin/inventory`, {
                  state: {
                    productName: product.productName,
                    productId: product.productId,
                  },
                })
              }
            >
              인벤토리
            </button>
            <button
              className="admin-page-pd-btn"
              onClick={() => {
                openManagementModal();
                setSelectedProductData(product);
                setModalType("image management");
              }}
            >
              상품 이미지
            </button>
            <button
              className="admin-page-pd-btn"
              onClick={() => {
                openManagementModal();
                setSelectedProductData(product);
                setModalType("update product");
              }}
            >
              상품 수정
            </button>
            <button
              className="admin-page-pd-btn"
              onClick={() => {
                deleteProduct(product.productId);
              }}
            >
              상품 삭제
            </button>
            <button
              className="admin-page-pd-btn"
              onClick={() => {
                openArticleViewModal(product, "adminReview");
              }}
            >
              리뷰 관리
            </button>
            <button
              className="admin-page-pd-btn"
              onClick={() => {
                openArticleViewModal(product, "adminInquiry");
              }}
            >
              Q&A 관리
            </button>
          </div>
        </div>
      ))}
      {managementModalOpen && (
        <ManagementModal
          selectedProductData={selectedProductData}
          modalClose={closeManagementModal}
          type={modalType}
        ></ManagementModal>
      )}
      <div className="admin-paging-btn-container">
        <GrFormPrevious
          onClick={() => handlePageChange(-1)}
          className={`admin-page-move-btn ${
            currentPage === 0 && "prev-btn-disable"
          }`}
        />
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`admin-page-num-btn ${
              currentPage === page ? "admin-current-page" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}
        <GrFormNext
          onClick={() => handlePageChange(1)}
          className={`admin-page-move-btn ${
            currentPage === totalPageSize - 1 && "next-btn-disable"
          }`}
        />
      </div>
      {reviewAndInquiryModalOpen && (
        <ArticleViewModal
          modalType={modalType}
          modalClose={closeArticleViewModal}
          productReviewData={productReviewData}
          productInquiryData={productInquiryData}
          product={productInfo}
          thumbnailImage={productInfo.productThumbnails[0]}
        ></ArticleViewModal>
      )}
    </div>
  );
}

export { AllProducts };
