import React, { useState, useEffect } from "react";
import "./ManagementModal.css";
import { MdClose } from "react-icons/md";
import axios from "axios";

function ManagementModal({ selectedProductData, modalClose, type }) {
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [childCategoryName, setChildCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [topsId, setTopsId] = useState(localStorage.getItem("topsId") || "");
  const [bottomsId, setBottomsId] = useState(
    localStorage.getItem("bottomsId") || ""
  );
  const [dressAndSetId, setDressAndSetId] = useState(
    localStorage.getItem("dressAndSetId") || ""
  );
  const [outerwearId, setOuterwearId] = useState(
    localStorage.getItem("outerwearId") || ""
  );
  const [shoesId, setShoesId] = useState(localStorage.getItem("shoesId") || "");
  const [accessoriesId, setAccessoriesId] = useState(
    localStorage.getItem("accessoriesId") || ""
  );
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
  const [imageFile, setImageFile] = useState([]);
  const [thumbnailId, setThumbnailId] = useState("");

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const parentCategoryCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/categorys/parent",
        {
          name: parentCategoryName,
        }
      );
      if (parentCategoryName === "상의") {
        setTopsId(response.data);
      } else if (parentCategoryName === "하의") {
        setBottomsId(response.data);
      } else if (parentCategoryName === "드레스 & 세트") {
        setDressAndSetId(response.data);
      } else if (parentCategoryName === "아우터") {
        setOuterwearId(response.data);
      } else if (parentCategoryName === "신발") {
        setShoesId(response.data);
      } else if (parentCategoryName === "악세서리") {
        setAccessoriesId(response.data);
      }
      setShowModal(true);
      setModalMessage(`상위 카테고리가 생성 되었습니다.`);
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

  useEffect(() => {
    localStorage.setItem("topsId", topsId);
    localStorage.setItem("bottomsId", bottomsId);
    localStorage.setItem("dressAndSetId", dressAndSetId);
    localStorage.setItem("outerwearId", outerwearId);
    localStorage.setItem("shoesId", shoesId);
    localStorage.setItem("accessoriesId", accessoriesId);
  }, [topsId, bottomsId, dressAndSetId, outerwearId, shoesId, accessoriesId]);

  const childCategoryCreate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/categorys/child/${parentId}`,
        {
          name: childCategoryName,
        }
      );
      console.log(response.data);
      setShowModal(true);
      setModalMessage(`하위 카테고리가 생성 되었습니다.`);
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
      formData.append("images", imageFile);

      await axios.post("http://localhost:8080/api/v1/products/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      imageFile
    ) {
      await productCreate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
    }
  };

  const imageDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/thumbnail/delete/${thumbnailId}`
      );
      console.log(response.data);
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
        }
      );
      console.log(response.data);
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
        `http://localhost:8080/api/v1/color/${colorId}`
      );
      console.log(response.data);
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
      const response = await axios.post(
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
        }
      );
      console.log(response.data);
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
      const response = await axios.put(
        `http://localhost:8080/api/v1/inventory/${selectedProductData.inventoryId}`,
        {
          categoryId: categoryId,
          additionalStock: additionalStock,
          isRestockAvailable: isRestockAvailable,
          isRestocked: isRestocked,
          isSoldOut: isSoldOut,
        }
      );
      console.log(response.data);
      setShowModal(true);
      setModalMessage(`인벤토리를 수정하였습니다.`);
    } catch (error) {
      console.error(`Error updating inventory:`, error);
    }
  };

  const handleInventoryUpdateSubmitBtn = async () => {
    if (
      colorId &&
      categoryId &&
      size
      // additionalStock &&
      // isRestockAvailable &&
      // isRestocked &&
      // isSoldOut
    ) {
      await inventoryUpdate();
    } else {
      alert("모든 입력란을 작성해 주세요.");
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
                <span>상품 이미지</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
              <select
                value={parentCategoryName}
                onChange={(e) => setParentCategoryName(e.target.value)}
              >
                <option value="">상위 카테고리를 선택해 주세요.</option>
                <option value="상의">상의</option>
                <option value="하의">하의</option>
                <option value="드레스 & 세트">드레스&세트</option>
                <option value="아우터">아우터</option>
                <option value="신발">신발</option>
                <option value="악세서리">악세서리</option>
              </select>
              <button onClick={handleParentCategorySubmitBtn}>
                Create Parent Category
              </button>
            </div>

            <div className="input-section">
              <h2>하위 카테고리</h2>
              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value="">상위 카테고리를 선택해 주세요.</option>
                <option value={topsId}>상의</option>
                <option value={bottomsId}>하의</option>
                <option value={dressAndSetId}>드레스&세트</option>
                <option value={outerwearId}>아우터</option>
                <option value={shoesId}>신발</option>
                <option value={accessoriesId}>악세서리</option>
              </select>

              <select
                value={childCategoryName}
                onChange={(e) => setChildCategoryName(e.target.value)}
              >
                <option value="">하위 카테고리를 선택해 주세요.</option>
                {parseInt(parentId) === parseInt(topsId) && (
                  <>
                    <option value="후드">후드</option>
                    <option value="맨투맨">맨투맨</option>
                    <option value="반팔 셔츠">반팔 셔츠</option>
                    <option value="긴팔 셔츠">긴팔 셔츠</option>
                    <option value="반팔티">반팔티</option>
                    <option value="긴팔티">긴팔티</option>
                    <option value="니트 & 스웨터">니트 & 스웨터</option>
                    <option value="블라우스">블라우스</option>
                  </>
                )}
                {parseInt(parentId) === parseInt(bottomsId) && (
                  <>
                    <option value="긴바지">긴바지</option>
                    <option value="반바지">반바지</option>
                    <option value="치마">치마</option>
                  </>
                )}
                {parseInt(parentId) === parseInt(dressAndSetId) && (
                  <>
                    <option value="원피스">원피스</option>
                    <option value="투피스">투피스</option>
                    <option value="셋업">셋업</option>
                  </>
                )}
                {parseInt(parentId) === parseInt(outerwearId) && (
                  <>
                    <option value="숏패딩">숏패딩</option>
                    <option value="롱패딩">롱패딩</option>
                    <option value="가디건">가디건</option>
                    <option value="재킷">재킷</option>
                    <option value="코트">코트</option>
                    <option value="무스탕">무스탕</option>
                    <option value="조끼">조끼</option>
                    <option value="경량패딩">경량패딩</option>
                  </>
                )}
                {parseInt(parentId) === parseInt(shoesId) && (
                  <>
                    <option value="스니커즈">스니커즈</option>
                    <option value="샌들 & 슬리퍼">샌들 & 슬리퍼</option>
                    <option value="부츠">부츠</option>
                  </>
                )}
                {parseInt(parentId) === parseInt(accessoriesId) && (
                  <>
                    <option value="모자">모자</option>
                    <option value="양말">양말</option>
                    <option value="가방">가방</option>
                  </>
                )}
              </select>
              <button onClick={handleChildCategorySubmitBtn}>
                Create Child Category
              </button>
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
              {/* <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
              /> */}
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
