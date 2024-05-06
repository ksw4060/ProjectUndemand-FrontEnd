import React, { useState } from "react";
import "./ManagementModal.css";
import { MdClose } from "react-icons/md";
import axios from "axios";

function ManagementModal({ selectedProductData, modalClose, type }) {
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [childCategoryName, setChildCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [delCategoryId, setDelCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("WOMAN");
  const [price, setPrice] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [isDiscount, setIsDiscount] = useState(false);
  const [discountRate, setDiscountRate] = useState(0);
  const [isRecommend, setIsRecommend] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [size, setSize] = useState("FREE");
  const [initialStock, setInitialStock] = useState("");
  const [isRestockAvailable, setIsRestockAvailable] = useState(false);
  const [isRestocked, setIsRestocked] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [additionalStock, setAdditionalStock] = useState("");
  const [color, setColor] = useState("");
  const [colorId, setColorId] = useState("");
  const [thumbnailImageFile, setThumbnailImageFile] = useState([]);
  const [contentImageFile, setContentImageFile] = useState([]);
  const [thumbnailId, setThumbnailId] = useState("");

  const parentCategoryCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/categorys/parent",
        {
          name: parentCategoryName,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setShowModal(true);
      setModalMessage(
        `상위 카테고리 ${parentCategoryName}(이)가 생성 되었습니다. 카테고리 ID는 [${response.data}]입니다.`
      );
    } catch (error) {
      console.error("Error creating parent category:", error);
    }
  };

  const handleParentCategorySubmitBtn = async () => {
    if (parentCategoryName) {
      await parentCategoryCreate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const childCategoryCreate = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/categorys/child/${parentId}`,
        {
          name: childCategoryName,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setShowModal(true);
      setModalMessage(
        `하위 카테고리 ${childCategoryName}(이)가 생성 되었습니다.`
      );
    } catch (error) {
      console.error("Error creating child category:", error);
    }
  };

  const handleChildCategorySubmitBtn = async () => {
    if (parentId && childCategoryName) {
      await childCategoryCreate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const handleDeleteCategoryBtn = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/categorys/${delCategoryId}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setShowModal(true);
      setModalMessage(`카테고리를 삭제하였습니다.`);
    } catch (error) {
      console.error("Error creating child category:", error);
    }
  };

  const handleImageChange = (e) => {
    setThumbnailImageFile(e.target.files[0]);
  };

  const handleContentImageChange = (e) => {
    setContentImageFile(e.target.files[0]);
  };

  const productCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productType", productType);
      formData.append("price", parseInt(price));
      formData.append("productInfo", productInfo);
      formData.append("manufacturer", manufacturer);
      formData.append("isDiscount", isDiscount);
      formData.append("discountRate", parseInt(discountRate));
      formData.append("isRecommend", isRecommend);
      formData.append("thumbnail_images", thumbnailImageFile);
      formData.append("content_images", contentImageFile);

      await axios.post("http://localhost:8080/api/v1/products/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("Authorization"),
        },
      });
      setShowModal(true);
      setModalMessage(`상품을 등록하였습니다.`);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleProductCreateSubmitBtn = async () => {
    if (
      productName &&
      productType &&
      price &&
      productInfo &&
      manufacturer &&
      thumbnailImageFile &&
      contentImageFile
    ) {
      await productCreate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const imageDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/thumbnail/delete/${thumbnailId}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setShowModal(true);
      setModalMessage(`${response.data}`);
    } catch (error) {
      console.error("이미지 삭제 에러:", error);
    }
  };

  const handleImageDelete = async () => {
    if (thumbnailId) {
      await imageDelete();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const productUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/products/${selectedProductData.productId}`,
        {
          productName: productName,
          productType: productType,
          price: price,
          productInfo: productInfo,
          manufacturer: manufacturer,
          isDiscount: isDiscount,
          discountRate: discountRate,
          isRecommend: isRecommend,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setShowModal(true);
      setModalMessage(`${response.data.productName} 상품을 수정하였습니다.`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleProductUpdateSubmitBtn = async () => {
    if (productName && productType && price) {
      await productUpdate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const colorCreate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/color/new`,
        {
          color: color,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setShowModal(true);
      setModalMessage(`${response.data}`);
    } catch (error) {
      console.error(`Error creating color:`, error);
    }
  };

  const handleColorCreateSubmitBtn = async () => {
    if (color) {
      await colorCreate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const colorDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/color/${colorId}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setModalMessage(`${response.data}`);
      setShowModal(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleColorDeleteSubmitBtn = async () => {
    if (colorId) {
      await colorDelete();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const inventoryCreate = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/inventory/new`,
        {
          productId: selectedProductData,
          colorId: colorId,
          categoryId: categoryId,
          size: size,
          initialStock: initialStock,
          isRestockAvailable: isRestockAvailable,
          isRestocked: isRestocked,
          isSoldOut: isSoldOut,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setShowModal(true);
      setModalMessage(`인벤토리를 생성하였습니다.`);
    } catch (error) {
      console.error(`Error creating inventory:`, error);
    }
  };

  const handleInventoryCreateSubmitBtn = async () => {
    if (colorId && categoryId && size && initialStock) {
      await inventoryCreate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const inventoryUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/inventory/${selectedProductData.inventoryId}`,
        {
          categoryId: categoryId,
          additionalStock: additionalStock,
          isRestockAvailable: isRestockAvailable,
          isRestocked: isRestocked,
          isSoldOut: isSoldOut,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setShowModal(true);
      setModalMessage(`인벤토리를 수정하였습니다.`);
    } catch (error) {
      console.error(`Error updating inventory:`, error);
    }
  };

  const handleInventoryUpdateSubmitBtn = async () => {
    if (colorId && categoryId && size) {
      await inventoryUpdate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const handleThumbnailSubmitBtn = async () => {
    try {
      const formData = new FormData();
      formData.append("productId", selectedProductData.productId);
      formData.append("image", thumbnailImageFile);

      await axios.post(
        "http://localhost:8080/api/v1/thumbnail/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      setShowModal(true);
      setModalMessage(`상품 썸네일을 추가하였습니다.`);
    } catch (error) {
      console.error(`Error submit thumbnail:`, error);
    }
  };

  const handleContentSubmitBtn = async () => {
    try {
      const formData = new FormData();
      formData.append("productId", selectedProductData.productId);
      formData.append("image", contentImageFile);

      await axios.post(
        "http://localhost:8080/api/v1/product/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      setShowModal(true);
      setModalMessage(`상품 상세 이미지를 추가하였습니다.`);
    } catch (error) {
      console.error(`Error submit thumbnail:`, error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    modalClose();
  };

  return (
    <div className="management-modal">
      {type === "update product" && (
        <div
          className={`management-modal-container ${
            showModal && "confirm-modal-active"
          }`}
        >
          <div className="management-modal-top">
            <h2>상품 수정</h2>
            <div className="update-product-info">
              <img
                src={`http://localhost:8080${selectedProductData.productThumbnails[0]}`}
                alt=""
                className="update-product-img-info"
              />
              <span>{selectedProductData.productName}</span>
            </div>
            <MdClose onClick={modalClose} className="close-management-modal" />
          </div>
          <div className="management-modal-input-container">
            <div className="input-section">
              <div className="up-modal-pd-name">
                <span>상품 이름</span>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={selectedProductData.productName}
                />
              </div>
              <div className="up-modal-pd-type">
                <span>상품 타입</span>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option value="WOMAN">Woman</option>
                  <option value="MAN">Man</option>
                  <option value="UNISEX">Unisex</option>
                </select>
              </div>
              <div className="up-modal-pd-price">
                <span>상품 가격</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={selectedProductData.price}
                />
              </div>
              <div className="up-modal-pd-info">
                <span>상품 정보</span>
                <input
                  type="text"
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                  placeholder={`상품 정보를 입력해주세요.`}
                />
              </div>
              <div className="up-modal-pd-manufacturer">
                <span>제조사</span>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  placeholder={`제조사를 입력해주세요.`}
                />
              </div>
              <div className="up-modal-pd-isdiscount">
                <span>할인 여부</span>
                <select
                  value={isDiscount ? "true" : "false"}
                  onChange={(e) => setIsDiscount(e.target.value === "true")}
                >
                  <option value="">세일 상품으로 등록 할까요?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              {isDiscount && (
                <div className="up-modal-pd-discount-rate">
                  <span>할인율</span>
                  <input
                    type="number"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                    placeholder={selectedProductData.discountRate}
                  />
                </div>
              )}
              <div className="up-modal-pd-isrecommend">
                <span>추천 여부</span>
                <select
                  value={isRecommend ? "true" : "false"}
                  onChange={(e) => setIsRecommend(e.target.value === "true")}
                >
                  <option value="">추천 상품으로 등록 할까요?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button onClick={handleProductUpdateSubmitBtn}>
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
      {type === "color management" && (
        <div
          className={`management-modal-container ${
            showModal && "confirm-modal-active"
          }`}
        >
          <div className="management-modal-top">
            <h2>색상 관리</h2>
            <MdClose
              onClick={() => {
                modalClose();
              }}
              className="close-management-modal"
            />
          </div>
          <div className="management-modal-input-container">
            <div className="input-section">
              <h2>색상 등록</h2>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter color name"
              />
              <button onClick={handleColorCreateSubmitBtn}>색상 등록</button>
            </div>
            <div className="input-section">
              <h2>색상 삭제</h2>
              <input
                type="number"
                value={colorId}
                onChange={(e) => setColorId(e.target.value)}
                placeholder="Enter color ID"
              />
              <button onClick={handleColorDeleteSubmitBtn}>색상 삭제</button>
            </div>
          </div>
        </div>
      )}
      {type === "create product" && (
        <div
          className={`management-modal-container ${
            showModal && "confirm-modal-active"
          }`}
        >
          <div className="management-modal-top">
            <h2>상품 등록</h2>
            <MdClose
              onClick={() => {
                modalClose();
              }}
              className="close-management-modal"
            />
          </div>
          <div className="management-modal-input-container">
            <div className="input-section">
              <div className="modal-pd-name">
                <span>상품 이름</span>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="상품 이름을 입력해주세요."
                />
              </div>
              <div className="modal-pd-type">
                <span>상품 타입</span>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option value="WOMAN">Woman</option>
                  <option value="MAN">Man</option>
                  <option value="UNISEX">Unisex</option>
                </select>
              </div>
              <div className="modal-pd-price">
                <span>상품 가격</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="상품 가격을 입력해주세요."
                />
              </div>
              <div className="modal-pd-info">
                <span>상품 정보</span>
                <input
                  type="text"
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                  placeholder="상품 정보를 입력해주세요."
                />
              </div>
              <div className="modal-pd-manufacturer">
                <span>제조사</span>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  placeholder="제조사를 입력해주세요."
                />
              </div>
              <div className="modal-pd-isdiscount">
                <span>할인 여부</span>
                <select
                  value={isDiscount ? "true" : "false"}
                  onChange={(e) => setIsDiscount(e.target.value === "true")}
                >
                  <option value="">할인 상품으로 등록 할까요?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              {isDiscount && (
                <div className="modal-pd-discount-rate">
                  <span>할인율</span>
                  <input
                    type="number"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                    placeholder="할인율을 입력해주세요."
                  />
                </div>
              )}
              <div className="modal-pd-isrecommend">
                <span>추천 여부</span>
                <select
                  value={isRecommend ? "true" : "false"}
                  onChange={(e) => setIsRecommend(e.target.value === "true")}
                >
                  <option value="">추천 상품으로 등록 할까요?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="modal-pd-image-submit">
                <span>상품 썸네일 이미지</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="modal-pd-cont-img-submit">
                <span>상품 상세 이미지</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleContentImageChange}
                />
              </div>
              <button onClick={handleProductCreateSubmitBtn}>상품 등록</button>
            </div>
          </div>
        </div>
      )}
      {type === "delete product image" && (
        <div
          className={`management-modal-container ${
            showModal && "confirm-modal-active"
          }`}
        >
          <div className="management-modal-top">
            <h2>상품 이미지 삭제</h2>
            <MdClose
              onClick={() => {
                modalClose();
              }}
              className="close-management-modal"
            />
          </div>
          <div className="management-modal-input-container">
            <div className="modal-pd-image-del">
              <span>상품 이미지 삭제</span>
              <input
                type="text"
                value={thumbnailId}
                onChange={(e) => setThumbnailId(e.target.value)}
                placeholder="삭제할 상품 이미지의 ID를 입력해주세요."
              />
              <button onClick={handleImageDelete}>이미지 삭제</button>
            </div>
          </div>
        </div>
      )}
      {type === "create category" && (
        <div
          className={`management-modal-container ${
            showModal && "confirm-modal-active"
          }`}
        >
          <div className="management-modal-top">
            <h2>카테고리 관리</h2>
            <MdClose
              onClick={() => {
                modalClose();
              }}
              className="close-management-modal"
            />
          </div>
          <div className="management-modal-input-container">
            <div className="input-section">
              <h2>상위 카테고리</h2>
              <input
                type="text"
                value={parentCategoryName}
                onChange={(e) => setParentCategoryName(e.target.value)}
                placeholder="상위 카테고리의 이름을 입력해주세요."
              />
              <button onClick={handleParentCategorySubmitBtn}>
                상위 카테고리 생성
              </button>
            </div>

            <div className="input-section">
              <h2>하위 카테고리</h2>
              <input
                type="text"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                placeholder="상위 카테고리의 ID를 입력해주세요."
              />

              <input
                type="text"
                value={childCategoryName}
                onChange={(e) => setChildCategoryName(e.target.value)}
                placeholder="하위 카테고리의 이름을 입력해주세요."
              />
              <button onClick={handleChildCategorySubmitBtn}>
                하위 카테고리 생성
              </button>
            </div>

            <div className="input-section">
              <h2>카테고리 삭제</h2>
              <input
                type="text"
                value={delCategoryId}
                onChange={(e) => setDelCategoryId(e.target.value)}
                placeholder="삭제할 카테고리의 ID를 입력해주세요."
              />
              <button onClick={handleDeleteCategoryBtn}>카테고리 삭제</button>
            </div>
          </div>
        </div>
      )}
      {type === "create inventory" && (
        <div
          className={`management-modal-container ${
            showModal && "confirm-modal-active"
          }`}
        >
          <div className="management-modal-top">
            <h2>인벤토리 생성</h2>
            <MdClose
              onClick={() => {
                modalClose();
              }}
              className="close-management-modal"
            />
          </div>
          <div className="management-modal-input-container">
            <div className="input-section">
              <input
                type="number"
                value={colorId}
                onChange={(e) => setColorId(e.target.value)}
                placeholder="Enter color ID"
              />
              <input
                type="number"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="Enter category ID"
              />
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="FREE">FREE</option>
                <option value="XSMALL">XSMALL</option>
                <option value="SMALL">SMALL</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LARGE">LARGE</option>
                <option value="XLARGE">XLARGE</option>
              </select>
              <input
                type="number"
                value={initialStock}
                onChange={(e) => setInitialStock(e.target.value)}
                placeholder="Enter initial stock"
              />
              <select
                value={isRestockAvailable ? "true" : "false"}
                onChange={(e) =>
                  setIsRestockAvailable(e.target.value === "true")
                }
              >
                <option value="">재입고 가능 상품으로 등록 할까요?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <select
                value={isRestocked ? "true" : "false"}
                onChange={(e) => setIsRestocked(e.target.value === "true")}
              >
                <option value="">재입고 상품으로 등록 할까요?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <select
                value={isSoldOut ? "true" : "false"}
                onChange={(e) => setIsSoldOut(e.target.value === "true")}
              >
                <option value="">품절 상품으로 등록 할까요?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <button onClick={handleInventoryCreateSubmitBtn}>
                Create Inventory
              </button>
            </div>
          </div>
        </div>
      )}
      {type === "update inventory" && (
        <div
          className={`management-modal-container ${
            showModal && "confirm-modal-active"
          }`}
        >
          <div className="management-modal-top">
            <h2>인벤토리 수정</h2>
            <MdClose
              onClick={() => {
                modalClose();
              }}
              className="close-management-modal"
            />
          </div>
          <div className="management-modal-input-container">
            <div className="input-section">
              <input
                type="number"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="Enter category ID"
              />
              <input
                type="number"
                value={additionalStock}
                onChange={(e) => setAdditionalStock(e.target.value)}
                placeholder="Enter additional stock"
              />
              <select
                value={isRestockAvailable ? "true" : "false"}
                onChange={(e) =>
                  setIsRestockAvailable(e.target.value === "true")
                }
              >
                <option value="">재입고 가능 상품으로 등록 할까요?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <select
                value={isRestocked ? "true" : "false"}
                onChange={(e) => setIsRestocked(e.target.value === "true")}
              >
                <option value="">재입고 상품으로 등록 할까요?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <select
                value={isSoldOut ? "true" : "false"}
                onChange={(e) => setIsSoldOut(e.target.value === "true")}
              >
                <option value="">품절 상품으로 등록 할까요?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <button onClick={handleInventoryUpdateSubmitBtn}>
                Update Inventory
              </button>
            </div>
          </div>
        </div>
      )}
      {type === "image management" && (
        <div
          className={`management-modal-container ${
            showModal && "confirm-modal-active"
          }`}
        >
          <div className="management-modal-top">
            <h2>상품 이미지 관리</h2>
            <MdClose
              onClick={() => {
                modalClose();
              }}
              className="close-management-modal"
            />
          </div>
          <div className="management-modal-input-container">
            <div className="modal-pd-image-submit">
              <span>상품 썸네일 이미지</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button onClick={() => handleThumbnailSubmitBtn()}>
                썸네일 추가
              </button>
            </div>
            <div className="modal-pd-cont-img-submit">
              <span>상품 상세 이미지</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleContentImageChange}
              />
              <button onClick={() => handleContentSubmitBtn()}>
                상세 이미지 추가
              </button>
            </div>
            <div className="modal-pd-image-del">
              <span>썸네일 이미지 삭제</span>
              <input
                type="text"
                value={thumbnailId}
                onChange={(e) => setThumbnailId(e.target.value)}
                placeholder="삭제할 상품 이미지의 ID를 입력해주세요."
              />
              <button onClick={handleImageDelete}>썸네일 이미지 삭제</button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => closeModal()}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagementModal;
