import React, { useState, useEffect } from "react";
import "./AdministratorPage.css";
import axios from "axios";

function AdministratorPage() {
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
  const [activeMenu, setActiveMenu] = useState(null);
  const [productId, setProductId] = useState("");
  const [colorId, setColorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [size, setSize] = useState("FREE");
  const [initialStock, setInitialStock] = useState("");
  const [additionalStock, setAdditionalStock] = useState("");
  const [productStock, setProductStock] = useState("");
  const [color, setColor] = useState("");

  const handleParentCategorySubmit = async () => {
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
      } else if (parentCategoryName === "dress&set") {
        setDressAndSetId(response.data);
      } else if (parentCategoryName === "아우터") {
        setOuterwearId(response.data);
      } else if (parentCategoryName === "신발") {
        setShoesId(response.data);
      } else if (parentCategoryName === "악세서리") {
        setAccessoriesId(response.data);
      }
    } catch (error) {
      console.error("Error creating parent category:", error);
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

  const handleChildCategorySubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/categorys/child/${parentId}`,
        {
          name: childCategoryName,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating child category:", error);
    }
  };

  const handleProductSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/products/new",
        {
          productName,
          productType,
          price,
          productInfo,
          manufacturer,
          //isSale, // 추가 필요
          //isRecommend, // 추가 필요
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleInventorySubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/inventory/new`,
        {
          productId,
          colorId,
          categoryId,
          size,
          initialStock,
          // 변경사항 : additionalStock(추가 재고)은 생성 요청시 등록 불가, productStock은 초기 재고로 자동 저장
          additionalStock, // 삭제 필요
          productStock, // 삭제 필요
          //isRestockAvailable, // or true // 추가 필요
          //isRestocked, // or true // 추가 필요
          //isSoldOut, // or true // 추가 필요
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(`Error creating inventory:`, error);
    }
  };

  const handleColorSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/color/new`,
        {
          color,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(`Error creating color:`, error);
    }
  };

  const renderMenu = () => {
    switch (activeMenu) {
      case "categoryCreate":
        return (
          <>
            <div className="input-section">
              <h2>Parent Category</h2>
              <select
                value={parentCategoryName}
                onChange={(e) => setParentCategoryName(e.target.value)}
              >
                <option value="">상위 카테고리를 선택해 주세요.</option>
                <option value="상의">상의</option>
                <option value="하의">하의</option>
                <option value="dress&set">드레스&세트</option>
                <option value="아우터">아우터</option>
                <option value="신발">신발</option>
                <option value="악세서리">악세서리</option>
              </select>
              <button onClick={handleParentCategorySubmit}>
                Create Parent Category
              </button>
            </div>

            <div className="input-section">
              <h2>Child Category</h2>
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
                    <option value="니트/스웨터">니트/스웨터</option>
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
                    <option value="샌들/슬리퍼">샌들/슬리퍼</option>
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
              <button onClick={handleChildCategorySubmit}>
                Create Child Category
              </button>
            </div>
          </>
        );
      case "productCreate":
        return (
          <div className="input-section">
            <h2>Product</h2>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
            />
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="WOMAN">Woman</option>
              <option value="MAN">Man</option>
              <option value="UNISEX">Unisex</option>
            </select>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
            <input
              type="text"
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              placeholder="Enter product info"
            />
            <input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Enter manufacturer"
            />
            <button onClick={handleProductSubmit}>Create Product</button>
          </div>
        );
      case "inventoryCreate":
        return (
          <>
            <div className="input-section">
              <h2>Color</h2>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter color name"
              />
              <button onClick={handleColorSubmit}>Create Color</button>
            </div>

            <div className="input-section">
              <h2>Inventory</h2>
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
              />
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
              <input
                type="number"
                value={additionalStock}
                onChange={(e) => setAdditionalStock(e.target.value)}
                placeholder="Enter additional stock"
              />
              <input
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                placeholder="Enter product stock"
              />
              <button onClick={handleInventorySubmit}>Create Inventory</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="administrator-page">
      <div className="admin-menu">
        <button onClick={() => setActiveMenu("categoryCreate")}>
          카테고리 생성
        </button>
        <button onClick={() => setActiveMenu("productCreate")}>
          상품 생성
        </button>
        <button onClick={() => setActiveMenu("inventoryCreate")}>
          인벤토리 생성
        </button>
      </div>
      <div className="input-section">{renderMenu()}</div>
    </div>
  );
}

export { AdministratorPage };
