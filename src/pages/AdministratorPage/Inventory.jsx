import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Inventory.css";
import axios from "axios";
import ManagementModal from "./ManagementModal.jsx";

function Inventory() {
  const location = useLocation();
  const { productName, productId } = location.state;
  const [productInven, setProductInven] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState([]);
  const [managementModalOpen, setManagementModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchAllInvensData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/inventory"
        );
        const productInven = response.data.filter(
          (inven) => parseInt(inven.productId) === parseInt(productId)
        );
        setProductInven(productInven);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchAllInvensData();
  }, [productId, managementModalOpen]);

  const groupProductInvenBySize = (productInven) => {
    const groupedInven = {};
    productInven.forEach((inven) => {
      const key = inven.size;
      if (!groupedInven[key]) {
        groupedInven[key] = [];
      }
      groupedInven[key].push(inven);
    });
    return groupedInven;
  };

  const groupedProductInven = groupProductInvenBySize(productInven);

  const openManagementModal = () => {
    setManagementModalOpen(true);
  };

  const closeManagementModal = () => {
    setManagementModalOpen(false);
  };

  return (
    <div className="inven-page-contents-container">
      <div className="inven-page-title">
        <span>{`<${productName}>의 인벤토리`}</span>
        <button
          className="inven-page-inven-btn"
          onClick={() => {
            openManagementModal();
            setSelectedProductData(productId);
            setModalType("create inventory");
          }}
        >
          인벤토리 생성
        </button>
      </div>
      {Object.entries(groupedProductInven).map(([size, sizeGroup], index) => (
        <div key={index} className="grouped-inven-container">
          <div className="grouped-inven-title">
            <span>{size}</span>
          </div>
          <div className="grouped-inven-group-container">
            {sizeGroup.map((inven, idx) => (
              <div key={idx} className="inven-page-inven-container">
                <div className="inven-page-inven-info-container">
                  <div className="inven-page-inven-info">
                    <span>{`색상: ${inven.color}`}</span>
                    <span>{`카테고리: ${inven.category}`}</span>
                    <div className="about-stock">
                      <span>{`초기 재고: ${inven.initialStock}`}</span>
                      <span>{`추가 재고: ${inven.additionalStock}`}</span>
                      <span>{`현재 재고: ${inven.productStock}`}</span>
                    </div>
                    <div className="about-stock-status">
                      <span>{`재입고 가능 여부: ${inven.restockAvailable}`}</span>
                      <span>{`재입고 여부: ${inven.restocked}`}</span>
                      <span>{`품절 여부: ${inven.soldOut}`}</span>
                    </div>
                  </div>
                </div>
                <div className="inven-page-btn-container">
                  <button
                    className="inven-page-inven-btn"
                    onClick={() => {
                      openManagementModal();
                      setSelectedProductData(inven);
                      setModalType("update inventory");
                    }}
                  >
                    인벤토리 수정
                  </button>
                </div>
              </div>
            ))}
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
    </div>
  );
}

export { Inventory };
