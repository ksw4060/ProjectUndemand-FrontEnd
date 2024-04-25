import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AllProducts.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import axios from "axios";
import ManagementModal from "./ManagementModal.jsx";

function AllProducts() {
  const pageSize = 10;
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState([]);
  const [managementModalOpen, setManagementModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [visiblePages, setVisiblePages] = useState([]);
  const [totalPageSize, setTotalPageSize] = useState(0);

  const navigate = useNavigate();

  // const handleConditionChange = () => {
  //   setCurrentPage(0);
  // };

  useEffect(() => {
    const fetchAllProductsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/products",
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
  }, [currentPage]);

  const handlePageChange = (direction) => {
    if (direction === -1 && currentPage === 0) {
      alert("첫번째 페이지입니다.");
    } else if (direction === 1 && currentPage === totalPageSize - 1) {
      alert("마지막 페이지입니다.");
    } else {
      setCurrentPage(currentPage + direction);
    }
  };

  useEffect(() => {
    const pageButtons = () => {
      const totalPageCount = totalPageSize;
      const pages = [];
      for (let i = 0; i < totalPageCount; i++) {
        pages.push(i);
      }
      setVisiblePages(pages);
    };

    pageButtons();
  }, [totalPageSize]);

  const openManagementModal = () => {
    setManagementModalOpen(true);
  };

  const closeManagementModal = () => {
    setManagementModalOpen(false);
    window.location.reload();
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
              src={`http://localhost:8080${product.productThumbnails[0]}`}
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
          </div>
          <div className="pd-created-info-container">
            <span>{`생성일: ${product.createdAt.substring(0, 10)}`}</span>
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
                  setModalType("update product");
                }}
              >
                상품 수정
              </button>
            </div>
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
    </div>
  );
}

export { AllProducts };
