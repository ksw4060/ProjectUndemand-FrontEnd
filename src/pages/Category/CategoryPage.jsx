import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import { RiEqualizerLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import CheckBox from "../../components/CheckBox/CheckBox.jsx";
import axios from "axios";

function CategoryPage() {
  const [isCategoryScroll, setIsCategoryScroll] = useState(false);
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedSubcategoryOption, setSelectedSubcategoryOption] =
    useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [prevCategory, setPrevCategory] = useState(null);
  const { category } = useParams();
  const categoryTitle = category.toUpperCase().replace(/-/g, " ");
  const navigate = useNavigate();
  const [filterOptionData, setFilterOptionData] = useState([]);
  // const [productsData, setProductsData] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [unisexProducts, setUnisexProducts] = useState([]);
  const [manProducts, setManProducts] = useState([]);
  const [womanProducts, setWomanProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    const fetchFilterAndProductsData = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:8080/api/v1/categorys"
        );
        setFilterOptionData(categoryResponse.data);

        const productsResponse = await axios.get(
          "http://localhost:8080/api/v1/products"
        );
        // setProductsData(productsResponse.data)

        const bestProductsFiltered = productsResponse.data.sort(
          (a, b) => b.likeCnt - a.likeCnt
        );
        setBestProducts(bestProductsFiltered);

        const createDateFromCreatedAt = (createdAtArray) => {
          const [year, month, day] = createdAtArray;
          return new Date(year, month - 1, day);
        };

        const newProductsFiltered = productsResponse.data.sort(
          (productA, productB) => {
            const dateA = createDateFromCreatedAt(productA.createdAt);
            const dateB = createDateFromCreatedAt(productB.createdAt);
            return dateA - dateB;
          }
        );
        setNewProducts(newProductsFiltered);

        const unisexProductsFiltered = productsResponse.data.filter(
          (product) => product.productType === "UNISEX"
        );
        setUnisexProducts(unisexProductsFiltered);

        const manProductsFiltered = productsResponse.data.filter(
          (product) => product.productType === "MAN"
        );
        setManProducts(manProductsFiltered);

        const womanProductsFiltered = productsResponse.data.filter(
          (product) => product.productType === "WOMAN"
        );
        setWomanProducts(womanProductsFiltered);

        const saleProductsFiltered = productsResponse.data.filter(
          (product) => product.sale === true
        );
        setSaleProducts(saleProductsFiltered);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchFilterAndProductsData();
  }, []);

  const sectionProducts = {
    best: bestProducts,
    new: newProducts,
    unisex: unisexProducts,
    men: manProducts,
    women: womanProducts,
    sale: saleProducts,
  };

  const renderProductCards = () => {
    const products = sectionProducts[currentCategory] || [];

    return products.map((product, index) => (
      <li
        key={index}
        className={`product-card ${isFilterClicked && "filter-active-margin"}`}
      >
        <div
          className={`img-section img${index + 1} ${
            isFilterClicked && "filter-active-img"
          }`}
        ></div>
        <div className="product-info">
          <Link to={`/product/${product.id}`}>{product.productName}</Link>
          <Link to={`/product/${product.id}`}>{product.price}</Link>
        </div>
      </li>
    ));
  };

  const filterUrlMap = {
    상의: "tops",
    하의: "bottoms",
    "dress&set": "dressandset",
    아우터: "outerwear",
    신발: "shoes",
    악세서리: "accessories",
  };

  const subFilterUrlMap = {
    후드: "hoodie",
    맨투맨: "sweatshirt",
    "반팔 셔츠": "shortsleeveshirt",
    "긴팔 셔츠": "longsleeveshirt",
    반팔티: "shortsleevetee",
    긴팔티: "longsleevetee",
    "니트/스웨터": "knitsweater",
    블라우스: "blouse",
    긴바지: "trousers",
    반바지: "shorts",
    치마: "skirt",
    원피스: "dress",
    투피스: "twopiece",
    셋업: "setup",
    숏패딩: "shortpadding",
    롱패딩: "longpadding",
    가디건: "cardigan",
    재킷: "jacket",
    코트: "coat",
    무스탕: "mustang",
    조끼: "vest",
    경량패딩: "lightweightpadding",
    스니커즈: "sneakers",
    "샌들/슬리퍼": "sandalslippers",
    부츠: "boots",
    모자: "hat",
    양말: "socks",
    가방: "bag",
  };

  const filterOptions = filterOptionData.map((category) => {
    const filterUrl = filterUrlMap[category.name];
    const subOptions = category.children.map((child) => ({
      id: subFilterUrlMap[child.name],
      name: child.name,
    }));
    return {
      id: filterUrl,
      name: category.name,
      subOptions: subOptions,
    };
  });

  const genderOptions = filterOptions.filter(
    (category) => category.name !== "dress&set"
  );

  const menUnisexFilterOptions = genderOptions.map((filterOptions) => {
    if (filterOptions.name === "하의") {
      const updatedSubOptions = filterOptions.subOptions.filter(
        (subOption) => subOption.name !== "치마"
      );
      return {
        ...filterOptions,
        subOptions: updatedSubOptions,
      };
    } else {
      return filterOptions;
    }
  });

  useEffect(() => {
    setCurrentCategory(category.split("-")[0]);
  }, [category]);

  useEffect(() => {
    if (prevCategory && prevCategory !== currentCategory) {
      window.location.reload();
    }
    setPrevCategory(currentCategory);
  }, [currentCategory, prevCategory]);

  const priceOptions = [
    { id: "price0", range: "0 ~ 50,000 원" },
    { id: "price1", range: "50,000 ~ 100,000 원" },
    { id: "price2", range: "100,000 ~ 150,000 원" },
    { id: "price3", range: "150,000 ~ 200,000 원" },
    { id: "price4", range: "200,000 ~ 250,000 원" },
    { id: "price5", range: "250,000 원 이상" },
  ];

  const [selectedPriceOptions, setSelectedPriceOptions] = useState(new Set());

  const [showMorePriceOptions, setShowMorePriceOptions] = useState(false);

  const colorOptions = [
    { id: "black", name: "블랙" },
    { id: "white", name: "화이트" },
    { id: "navy", name: "네이비" },
    { id: "gray", name: "그레이" },
    { id: "red", name: "레드" },
    { id: "blue", name: "블루" },
    { id: "green", name: "그린" },
    { id: "yellow", name: "옐로우" },
  ];

  const [selectedColorOptions, setSelectedColorOptions] = useState(new Set());

  const [showMoreColorOptions, setShowMoreColorOptions] = useState(false);

  useEffect(() => {
    const handleCategoryScroll = () => {
      if (window.scrollY > 150) {
        setIsCategoryScroll(true);
      } else {
        setIsCategoryScroll(false);
      }
    };

    window.addEventListener("scroll", handleCategoryScroll);

    return () => {
      window.removeEventListener("scroll", handleCategoryScroll);
    };
  }, []);

  const hanldeFilterClick = () => {
    setIsFilterClicked((prevState) => !prevState);
  };

  const handleShowMoreOptions = (optionType) => {
    if (optionType === "price") {
      setShowMorePriceOptions((prevState) => !prevState);
    } else if (optionType === "color") {
      setShowMoreColorOptions((prevState) => !prevState);
    }
  };

  const handleCategoryOptionSelect = (id) => {
    if (selectedCategoryOption === id) {
      return;
    }
    setSelectedCategoryOption(id);
    const newCategoryUrl = `/${currentCategory}-${id}`;
    navigate(newCategoryUrl, { replace: true });
  };

  const handleSubcategoryOptionSelect = (subOptionId) => {
    if (selectedSubcategoryOption === subOptionId) {
      return;
    }
    setSelectedSubcategoryOption(subOptionId);
    const newSubcategoryUrl = `/${currentCategory}-${selectedCategoryOption}-${subOptionId}`;
    navigate(newSubcategoryUrl, { replace: true });
  };

  return (
    <div className="category-page">
      <div
        className={`title-section ${isCategoryScroll ? "scroll-category" : ""}`}
      >
        <div className="wrapper">
          <h2>{categoryTitle}</h2>
          <div className="filter-box">
            <div className="filter" onClick={() => hanldeFilterClick()}>
              <p>필터 표시</p>
              <RiEqualizerLine className="icons" />
            </div>
            <div className="sort-by">
              <p>정렬 기준</p>
              <FaChevronDown className="icons" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`contents-section ${
          isCategoryScroll ? "scroll-category" : ""
        }`}
      >
        <div className={`filter-section ${isFilterClicked && "filter-active"}`}>
          <ul className="category-options">
            {currentCategory === "best" ||
            currentCategory === "new" ||
            currentCategory === "women" ||
            currentCategory === "sale"
              ? filterOptions.map((option) => (
                  <li
                    key={option.id}
                    className={`filter-option ${
                      selectedCategoryOption === option.id ? "selected" : ""
                    }`}
                    onClick={() => handleCategoryOptionSelect(option.id)}
                  >
                    {option.name}
                  </li>
                ))
              : menUnisexFilterOptions.map((option) => (
                  <li
                    key={option.id}
                    className={`filter-option ${
                      selectedCategoryOption === option.id ? "selected" : ""
                    }`}
                    onClick={() => handleCategoryOptionSelect(option.id)}
                  >
                    {option.name}
                  </li>
                ))}
          </ul>
          {currentCategory === "best" ||
          currentCategory === "new" ||
          currentCategory === "women" ||
          currentCategory === "sale"
            ? filterOptions.map(
                (option) =>
                  selectedCategoryOption === option.id &&
                  option.subOptions && (
                    <ul key={option.id} className="category-sub-options">
                      {option.subOptions.map((subOption) => (
                        <li
                          key={subOption.id}
                          className={`filter-option ${
                            selectedSubcategoryOption === subOption.id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handleSubcategoryOptionSelect(subOption.id)
                          }
                        >
                          {subOption.name}
                        </li>
                      ))}
                    </ul>
                  )
              )
            : menUnisexFilterOptions.map(
                (option) =>
                  selectedCategoryOption === option.id &&
                  option.subOptions && (
                    <ul key={option.id} className="category-sub-options">
                      {option.subOptions.map((subOption) => (
                        <li
                          key={subOption.id}
                          className={`filter-option ${
                            selectedSubcategoryOption === subOption.id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handleSubcategoryOptionSelect(subOption.id)
                          }
                        >
                          {subOption.name}
                        </li>
                      ))}
                    </ul>
                  )
              )}
          <CheckBox
            options={priceOptions}
            selectedOptions={selectedPriceOptions}
            onOptionToggle={(id) => {
              setSelectedPriceOptions((prevOptions) => {
                const updatedOptions = new Set(prevOptions);
                if (updatedOptions.has(id)) {
                  updatedOptions.delete(id);
                } else {
                  updatedOptions.add(id);
                }
                return updatedOptions;
              });
            }}
            showMoreOptions={showMorePriceOptions}
            handleShowMoreOptions={() => handleShowMoreOptions("price")}
            title="가격대"
          />
          <CheckBox
            options={colorOptions}
            selectedOptions={selectedColorOptions}
            onOptionToggle={(id) => {
              setSelectedColorOptions((prevOptions) => {
                const updatedOptions = new Set(prevOptions);
                if (updatedOptions.has(id)) {
                  updatedOptions.delete(id);
                } else {
                  updatedOptions.add(id);
                }
                return updatedOptions;
              });
            }}
            showMoreOptions={showMoreColorOptions}
            handleShowMoreOptions={() => handleShowMoreOptions("color")}
            title="색상"
          />
        </div>
        <div className="products-section">
          <ul className="product-card-box">{renderProductCards()}</ul>
        </div>
      </div>
    </div>
  );
}

export { CategoryPage };
