import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import { RiEqualizerLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import CheckBox from "../../components/CheckBox/CheckBox.jsx";
import axios from "axios";

function CategoryPage() {
  const { category } = useParams();
  const [isCategoryScroll, setIsCategoryScroll] = useState(false);
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] =
    useState(null);
  const [currentCategory, setCurrentCategory] = useState(() => {
    return localStorage.getItem("currentCategory") || category.split("-")[0];
  });
  // const [prevCategory, setPrevCategory] = useState(null);
  const [optionName, setOptionName] = useState("");
  const [subOptionName, setSubOptionName] = useState("");
  const categoryTitle = `${currentCategory.toUpperCase()} ${
    optionName ? `/ ${optionName.toUpperCase()}` : ""
  } ${subOptionName ? `/ ${subOptionName}` : ""}`;
  const navigate = useNavigate();
  const [filterOptionData, setFilterOptionData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [visiblePages, setVisiblePages] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    setCurrentCategory(category.split("-")[0]);
    localStorage.setItem("currentCategory", category.split("-")[0]);
  }, [category, currentCategory]);

  const fetchFilterData = async () => {
    try {
      const categoryResponse = await axios.get(
        "http://localhost:8080/api/v1/categorys"
      );
      setFilterOptionData(categoryResponse.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  const handleConditionChange = () => {
    setCurrentPage(0);
  };

  const handlePageChange = (direction) => {
    setCurrentPage(currentPage + direction);
  };

  const pageButtons = () => {
    const totalPageCount = pageSize;
    const pages = [];
    for (let i = 0; i < totalPageCount; i++) {
      pages.push(i);
    }
    setVisiblePages(pages);
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const conditionMap = {
          best: "best",
          new: "new",
          discount: "discount",
        };

        const productTypeMap = {
          unisex: "UNISEX",
          men: "MAN",
          women: "WOMAN",
        };

        const condition = conditionMap[currentCategory] || "";
        const productType = productTypeMap[currentCategory] || "";

        const response = await axios.get(
          `http://localhost:8080/api/v1/products`,
          {
            params: {
              size: pageSize,
              page: currentPage,
              condition: condition,
              productType: productType,
            },
          }
        );
        setAllProducts(response.data);
      } catch (error) {
        console.error("상품을 불러오는 도중 에러가 발생했습니다:", error);
      }
    };

    fetchProductsData();
    handleConditionChange();
  }, [currentPage, currentCategory]);

  useEffect(() => {
    pageButtons();
  }, [allProducts]);

  // useEffect(() => {
  //   if (prevCategory && prevCategory !== currentCategory) {
  //     setSelectedCategoryOption(null);
  //     setSelectedSubCategoryOption(null);
  //     setOptionName("");
  //     setSubOptionName("");
  //   }
  //   setPrevCategory(currentCategory);
  // }, [currentCategory, prevCategory]);

  useEffect(() => {
    const isTopMenuClicked = localStorage.getItem("topMenuClicked");

    if (isTopMenuClicked) {
      setSelectedCategoryOption(null);
      setSelectedSubCategoryOption(null);
      setOptionName("");
      setSubOptionName("");
    }
  }, [category]);

  const filterUrlMap = {
    상의: "tops",
    하의: "bottoms",
    "드레스 & 세트": "dressandset",
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
    "니트 & 스웨터": "knitsweater",
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
    "샌들 & 슬리퍼": "sandalslippers",
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
    (category) => category.name !== "드레스 & 세트"
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
    localStorage.setItem("selectedCategoryOption", id);
    localStorage.removeItem("selectedSubCategoryOption");
    if (selectedCategoryOption === id) {
      setSelectedSubCategoryOption(null);
    }
    setSelectedCategoryOption(id);
    setSelectedSubCategoryOption(null);
    const newCategoryUrl = `/${currentCategory}-${id}`;
    navigate(newCategoryUrl, { replace: true });
  };

  const handleSubcategoryOptionSelect = (subOptionId) => {
    localStorage.setItem("selectedSubCategoryOption", subOptionId);
    if (selectedSubCategoryOption === subOptionId) {
      return;
    }
    setSelectedSubCategoryOption(subOptionId);
    const newSubcategoryUrl = `/${currentCategory}-${selectedCategoryOption}-${subOptionId}`;
    navigate(newSubcategoryUrl, { replace: true });
  };

  useEffect(() => {
    const storedCategoryOption = localStorage.getItem("selectedCategoryOption");
    const storedSubCategoryOption = localStorage.getItem(
      "selectedSubCategoryOption"
    );
    const storedOptionName = localStorage.getItem("optionName");
    const storedSubOptionName = localStorage.getItem("subOptionName");

    if (storedCategoryOption) {
      setSelectedCategoryOption(storedCategoryOption);
    }
    if (storedSubCategoryOption) {
      setSelectedSubCategoryOption(storedSubCategoryOption);
    }
    if (storedOptionName) {
      setOptionName(storedOptionName);
    }
    if (storedSubOptionName) {
      setSubOptionName(storedSubOptionName);
    }
  }, [category]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("selectedCategoryOption");
      localStorage.removeItem("selectedSubCategoryOption");
      localStorage.removeItem("optionName");
      localStorage.removeItem("subOptionName");
    };
  }, []);

  return (
    <div className="category-page">
      <div
        className={`title-section ${isCategoryScroll ? "scroll-category" : ""}`}
      >
        <div className="wrapper">
          <span className="category-path">{categoryTitle}</span>
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
            currentCategory === "discount"
              ? filterOptions.map((option) => (
                  <li
                    key={option.id}
                    className={`filter-option ${
                      selectedCategoryOption === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleCategoryOptionSelect(option.id);
                      setOptionName(option.name);
                      setSubOptionName("");
                      localStorage.setItem("optionName", option.name);
                      localStorage.removeItem("subOptionName");
                    }}
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
                    onClick={() => {
                      handleCategoryOptionSelect(option.id);
                      setOptionName(option.name);
                      setSubOptionName("");
                      localStorage.setItem("optionName", option.name);
                      localStorage.removeItem("subOptionName");
                    }}
                  >
                    {option.name}
                  </li>
                ))}
          </ul>
          {currentCategory === "best" ||
          currentCategory === "new" ||
          currentCategory === "women" ||
          currentCategory === "discount"
            ? filterOptions.map(
                (option) =>
                  selectedCategoryOption === option.id &&
                  option.subOptions && (
                    <ul key={option.id} className="category-sub-options">
                      {option.subOptions.map((subOption) => (
                        <li
                          key={subOption.id}
                          className={`filter-option ${
                            selectedSubCategoryOption === subOption.id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            handleSubcategoryOptionSelect(subOption.id);
                            setSubOptionName(subOption.name);
                            localStorage.setItem(
                              "subOptionName",
                              subOption.name
                            );
                          }}
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
                            selectedSubCategoryOption === subOption.id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            handleSubcategoryOptionSelect(subOption.id);
                            setSubOptionName(subOption.name);
                            localStorage.setItem(
                              "subOptionName",
                              subOption.name
                            );
                          }}
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
          <div>
            <div className="product-card-box">
              {allProducts.length > 0 ? (
                allProducts.map((product, index) => (
                  <div
                    key={product.productId}
                    className={`product-card ${
                      isFilterClicked && "filter-active-margin"
                    }`}
                  >
                    <img
                      src={`http://localhost:8080/${product.productThumbnails[0]}`}
                      alt={product.productName}
                      className={`img-section img${index + 1} ${
                        isFilterClicked && "filter-active-img"
                      }`}
                    />
                    <div className="product-info">
                      <Link to={`/product/${product.productId}`}>
                        {product.productName}
                      </Link>
                      {product.isDiscount && (
                        <Link
                          to={`/product/${product.productId}`}
                        >{`${product.discountRate}% 할인 중`}</Link>
                      )}
                      {product.isRecommend && (
                        <Link to={`/product/${product.productId}`}>
                          추천상품
                        </Link>
                      )}
                      <Link
                        to={`/product/${product.productId}`}
                        className="product-price"
                      >
                        {`${product.price} 원`}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <span>{`${category} 상품이 없습니다.`}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="paging-btn-container">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 0}
          className="prev-next-btn"
        >
          <GrFormPrevious />
        </button>
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`page-num-btn ${
              currentPage === page ? "current-page" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(1)} className="prev-next-btn">
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}

export { CategoryPage };
