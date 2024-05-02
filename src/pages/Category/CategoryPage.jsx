import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import { RiEqualizerLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

function CategoryPage({
  filterOptions,
  menUnisexFilterOptions,
  selectedCategoryOption,
  setSelectedCategoryOption,
  selectedSubCategoryOption,
  setSelectedSubCategoryOption,
  categoryId,
  setCategoryId,
  handleCategoryOptionSelect,
  handleSubcategoryOptionSelect,
  setIsCondiChange,
  prevCondition,
  setPrevCondition,
}) {
  const { categoryPageUrl } = useParams();
  const [urlCondition, setUrlCondition] = useState(
    localStorage.getItem("condition")
  );

  const [isCategoryScroll, setIsCategoryScroll] = useState(false);

  const [isFilterClicked, setIsFilterClicked] = useState(true);

  const [isSortClicked, setIsSortClicked] = useState(false);
  const [sortOptionName, setSortOptionName] = useState("정렬 기준");
  const [selectedSortOption, setSelectedSortOption] = useState("new");

  const [searchString, setSearchString] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const categoryTitle = `${urlCondition} ${
    selectedCategoryOption ? `/ ${selectedCategoryOption}` : ""
  } ${selectedSubCategoryOption ? `/ ${selectedSubCategoryOption}` : ""}`;

  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [visiblePages, setVisiblePages] = useState([]);
  const [totalPageSize, setTotalPageSize] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setUrlCondition(categoryPageUrl.split("-")[0]);
    setSearchString("");
  }, [categoryPageUrl]);

  useEffect(() => {
    if (prevCondition && prevCondition !== urlCondition) {
      setIsCondiChange(true);
    }
    setPrevCondition(urlCondition);
  }, [urlCondition, prevCondition]);

  useEffect(() => {
    const handleConditionChange = () => {
      setCurrentPage(0);
    };

    handleConditionChange();
  }, [categoryPageUrl, selectedSortOption, isSearchClicked]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const conditionMap = {
          NEW: "NEW",
          BEST: "BEST",
          UNISEX: "UNISEX",
          MEN: "MAN",
          WOMEN: "WOMAN",
          RECOMMEND: "RECOMMEND",
        };

        const orderMap = {
          new: "LATEST",
          best: "POPULAR",
          lowPrice: "LOW_PRICE",
          highPrice: "HIGH_PRICE",
          higtDiscountRate: "HIGH_DISCOUNT_RATE",
        };

        const category = categoryId || "";
        const condition = conditionMap[urlCondition] || "";
        const order = orderMap[selectedSortOption] || "";
        const keyword = searchString || "";

        const response = await axios.get(
          `http://localhost:8080/api/v1/products`,
          {
            params: {
              size: pageSize,
              page: currentPage,
              category: category,
              condition: condition,
              order: order,
              keyword: keyword,
            },
          }
        );
        setAllProducts(response.data.content);
        setTotalPageSize(response.data.totalPages);
        setIsSearchClicked(false);
      } catch (error) {
        console.error("상품을 불러오는 도중 에러가 발생했습니다:", error);
      }
    };

    fetchProductsData();
  }, [
    currentPage,
    selectedSortOption,
    isSearchClicked,
    categoryId,
    urlCondition,
  ]);

  const memoizedProductsData = useMemo(() => allProducts, [allProducts]);
  const memoizedTotalPageSize = useMemo(() => totalPageSize, [totalPageSize]);

  // useEffect(() => {
  //   console.log("urlCondition", urlCondition);
  // }, [urlCondition]);

  // useEffect(() => {
  //   console.log("currentPage", currentPage);
  // }, [currentPage]);

  // useEffect(() => {
  //   console.log("selectedSortOption", selectedSortOption);
  // }, [selectedSortOption]);

  // useEffect(() => {
  //   console.log("isSearchClicked", isSearchClicked);
  // }, [isSearchClicked]);

  // useEffect(() => {
  //   console.log("categoryId", categoryId);
  // }, [categoryId]);

  // useEffect(() => {
  //   console.log("allProducts:", allProducts);
  // }, [allProducts]);

  const handlePageChange = (direction) => {
    if (direction === -1 && currentPage === 0) {
      alert("첫번째 페이지입니다.");
    } else if (direction === 1 && currentPage === memoizedTotalPageSize - 1) {
      alert("마지막 페이지입니다.");
    } else {
      setCurrentPage(currentPage + direction);
    }
  };

  useEffect(() => {
    const pageButtons = () => {
      const totalPages = memoizedTotalPageSize;
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
  }, [currentPage, memoizedTotalPageSize]);

  const handleSearchBar = () => {
    if (searchString) {
      setIsSearchClicked(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    const handleCategoryScroll = () => {
      if (window.scrollY > 150 && window.innerWidth > 1200) {
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

  const handleFilterClick = () => {
    setIsFilterClicked((prevState) => !prevState);
  };

  const handleSortClick = () => {
    setIsSortClicked((prevState) => !prevState);
  };

  useEffect(() => {
    const storedCategoryOption = localStorage.getItem("selectedCategoryOption");
    const storedSubCategoryOption = localStorage.getItem(
      "selectedSubCategoryOption"
    );
    const storedParentCategoryId = localStorage.getItem("parentCategoryId");
    const storedChildCategoryId = localStorage.getItem("childCategoryId");

    if (storedCategoryOption) {
      setSelectedCategoryOption(storedCategoryOption);
    } else {
      setSelectedCategoryOption(null);
    }
    if (storedSubCategoryOption) {
      setSelectedSubCategoryOption(storedSubCategoryOption);
    } else {
      setSelectedSubCategoryOption(null);
    }
    if (storedParentCategoryId) {
      setCategoryId(storedParentCategoryId);
      if (storedChildCategoryId) {
        setCategoryId(storedChildCategoryId);
      } else {
        setCategoryId(storedParentCategoryId);
      }
    }
  }, [categoryPageUrl]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("selectedCategoryOption");
      localStorage.removeItem("selectedSubCategoryOption");
      localStorage.removeItem("parentCategoryId");
      localStorage.removeItem("childCategoryId");
      localStorage.removeItem("condition");
    };
  }, []);

  const handleNavigateCOS = (parentCategory) => {
    if (
      selectedCategoryOption === parentCategory.name &&
      !selectedSubCategoryOption
    ) {
      const newCategoryUrl = `/${urlCondition}`;
      navigate(newCategoryUrl, { replace: true });
    } else {
      const newCategoryUrl = `/${urlCondition}-${parentCategory.name}`;
      navigate(newCategoryUrl, { replace: true });
    }
  };

  const handleNavigateSCOS = (childCategory) => {
    if (selectedSubCategoryOption === childCategory.name) {
      const newSubcategoryUrl = `/${urlCondition}-${selectedCategoryOption}`;
      navigate(newSubcategoryUrl, { replace: true });
    } else {
      const newSubcategoryUrl = `/${urlCondition}-${selectedCategoryOption}-${childCategory.name}`;
      navigate(newSubcategoryUrl, { replace: true });
    }
  };

  return (
    <div className="category-page">
      <div
        className={`title-section ${isCategoryScroll ? "scroll-category" : ""}`}
      >
        <div className="wrapper">
          <span className="category-path">{categoryTitle}</span>
          <div className="filter-box">
            <div className="filter" onClick={() => handleFilterClick()}>
              <p>필터 표시</p>
              <RiEqualizerLine className="icons" />
            </div>
            <div className="sort-by" onClick={() => handleSortClick()}>
              <p>{sortOptionName}</p>
              <FaChevronDown className="icons" />
              <ul
                className={`category-page-dropdown-menu ${
                  isSortClicked === true && "sort-dropdown-active"
                }`}
              >
                <li
                  onClick={() => {
                    setSelectedSortOption("new");
                    setSortOptionName("최신순");
                  }}
                >
                  최신순
                </li>
                <li
                  onClick={() => {
                    setSelectedSortOption("best");
                    setSortOptionName("인기순");
                  }}
                >
                  인기순
                </li>
                <li
                  onClick={() => {
                    setSelectedSortOption("lowPrice");
                    setSortOptionName("낮은 가격순");
                  }}
                >
                  낮은 가격순
                </li>
                <li
                  onClick={() => {
                    setSelectedSortOption("highPrice");
                    setSortOptionName("높은 가격순");
                  }}
                >
                  높은 가격순
                </li>
                <li
                  onClick={() => {
                    setSelectedSortOption("higtDiscountRate");
                    setSortOptionName("할인율순");
                  }}
                >
                  할인율순
                </li>
              </ul>
            </div>
            <div className="search-bar-container">
              <div className="search-bar">
                <input
                  type="text"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  placeholder={`검색`}
                />
                <IoMdSearch onClick={() => handleSearchBar()} />
              </div>
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
            {urlCondition === "BEST" ||
            urlCondition === "NEW" ||
            urlCondition === "WOMEN" ||
            urlCondition === "RECOMMEND"
              ? filterOptions.map((option, index) => (
                  <li
                    key={index}
                    className={`filter-option ${
                      selectedCategoryOption === option.name ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleCategoryOptionSelect(option);
                      handleNavigateCOS(option);
                    }}
                  >
                    {option.name}
                  </li>
                ))
              : menUnisexFilterOptions.map((option, index) => (
                  <li
                    key={index}
                    className={`filter-option ${
                      selectedCategoryOption === option.name ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleCategoryOptionSelect(option);
                      handleNavigateCOS(option);
                    }}
                  >
                    {option.name}
                  </li>
                ))}
          </ul>
          {urlCondition === "BEST" ||
          urlCondition === "NEW" ||
          urlCondition === "WOMEN" ||
          urlCondition === "RECOMMEND"
            ? filterOptions.map(
                (option, index) =>
                  selectedCategoryOption === option.name &&
                  option.children && (
                    <ul key={index} className="category-sub-options">
                      {option.children.map((subOption, index) => (
                        <li
                          key={index}
                          className={`filter-option ${
                            selectedSubCategoryOption === subOption.name
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            handleSubcategoryOptionSelect(subOption);
                            handleNavigateSCOS(subOption);
                          }}
                        >
                          {subOption.name}
                        </li>
                      ))}
                    </ul>
                  )
              )
            : menUnisexFilterOptions.map(
                (option, index) =>
                  selectedCategoryOption === option.name &&
                  option.children && (
                    <ul key={index} className="category-sub-options">
                      {option.children.map((subOption, index) => (
                        <li
                          key={index}
                          className={`filter-option ${
                            selectedSubCategoryOption === subOption.name
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            handleSubcategoryOptionSelect(subOption);
                            handleNavigateSCOS(subOption);
                          }}
                        >
                          {subOption.name}
                        </li>
                      ))}
                    </ul>
                  )
              )}
        </div>
        <div className="products-section">
          <div className="product-card-box">
            {memoizedProductsData.length > 0 ? (
              memoizedProductsData.map((product, index) => (
                <div
                  key={index}
                  className={`product-card ${
                    isFilterClicked && "filter-active-margin"
                  }`}
                >
                  <img
                    src={`http://localhost:8080${product.productThumbnails[0]}`}
                    alt={product.productName}
                    className={`img-section ${
                      isFilterClicked && "filter-active-img"
                    }`}
                  />
                  <div className="product-info">
                    <div className="product-info-top-container">
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
                    </div>
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
              <span>{`${categoryPageUrl} 상품이 없습니다.`}</span>
            )}
          </div>
        </div>
      </div>
      <div className="category-paging-btn-container">
        <GrFormPrevious
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 0}
          className={`category-page-move-btn ${
            currentPage === 0 && "prev-btn-disable"
          }`}
        />
        {visiblePages.map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`category-page-num-btn ${
              currentPage === page ? "category-current-page" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}
        <GrFormNext
          onClick={() => handlePageChange(1)}
          className={`category-page-move-btn ${
            currentPage === memoizedTotalPageSize - 1 && "next-btn-disable"
          }`}
        />
      </div>
    </div>
  );
}

export { CategoryPage };
