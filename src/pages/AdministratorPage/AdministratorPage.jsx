import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import { RiEqualizerLine } from "react-icons/ri";
import "./AdministratorPage.css";
import { AllProducts } from "./AllProducts.jsx";
import { Inventory } from "./Inventory.jsx";
import ManagementModal from "./ManagementModal.jsx";

function AdministratorPage() {
  // const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [managementModalOpen, setManagementModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

  // const handleFilterClick = () => {
  //   setIsFilterClicked((prevState) => !prevState);
  // };

  const openManagementModal = () => {
    setManagementModalOpen(true);
  };

  const closeManagementModal = () => {
    setManagementModalOpen(false);
  };

  return (
    <div className="administrator-page">
      <div className="admin-page-navigator">
        <div className="admin-page-title">
          <span
            onClick={() => {
              navigate("/admin");
            }}
          >
            관리자 페이지
          </span>
        </div>
        {/* <div
          className="admin-page-filter-btn"
          onClick={() => handleFilterClick()}
        >
          <p>필터 표시</p>
          <RiEqualizerLine className="admin-page-filter-icon" />
        </div> */}
        <div className="admin-menu-btn-container">
          <button
            onClick={() => {
              openManagementModal();
              setModalType("create category");
            }}
          >
            카테고리 관리
          </button>
          <button
            onClick={() => {
              openManagementModal();
              setModalType("delete product image");
            }}
          >
            상품 이미지 삭제
          </button>
          <button
            onClick={() => {
              openManagementModal();
              setModalType("color management");
            }}
          >
            색상 관리
          </button>
        </div>
      </div>
      <div className="admin-page-contents">
        <Routes>
          <Route path="/" element={<Navigate to="all-products" replace />} />
          <Route path="/all-products" element={<AllProducts />}></Route>
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
        {/* <div className="input-section">{renderMenu()}</div> */}
      </div>
      {managementModalOpen && (
        <ManagementModal
          modalClose={closeManagementModal}
          type={modalType}
        ></ManagementModal>
      )}
    </div>
  );
}

export { AdministratorPage };
