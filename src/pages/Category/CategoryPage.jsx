import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import { RiEqualizerLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

function CategoryPage() {
  const { categoryPageUrl } = useParams();
  const [currentCategory, setCurrentCategory] = useState(() => {
    return (
      localStorage.getItem("currentCategory") || categoryPageUrl.split("-")[0]
    );
  });

  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] =
    useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [filterOptionData, setFilterOptionData] = useState([]);

  const [isCategoryScroll, setIsCategoryScroll] = useState(false);

  const [isFilterClicked, setIsFilterClicked] = useState(false);

  const [isSortClicked, setIsSortClicked] = useState(false);
  const [sortOptionName, setSortOptionName] = useState("정렬 기준");
  const [selectedSortOption, setSelectedSortOption] = useState("new");

  const [searchString, setSearchString] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const categoryTitle = `${currentCategory.toUpperCase()} ${
    selectedCategoryOption ? `/ ${selectedCategoryOption}` : ""
  } ${selectedSubCategoryOption ? `/ ${selectedSubCategoryOption}` : ""}`;
  const navigate = useNavigate();

  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [visiblePages, setVisiblePages] = useState([]);
  const [totalPageSize, setTotalPageSize] = useState(0);

  useEffect(() => {
    setCurrentCategory(categoryPageUrl.split("-")[0]);
    localStorage.setItem("currentCategory", categoryPageUrl.split("-")[0]);
    setSearchString("");
    setCategoryId("");
  }, [categoryPageUrl, currentCategory]);

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
          new: "NEW",
          best: "BEST",
          unisex: "UNISEX",
          men: "MAN",
          women: "WOMAN",
          recommend: "RECOMMEND",
        };

        const orderMap = {
          new: "LATEST",
          best: "POPULAR",
          lowPrice: "LOW_PRICE",
          highPrice: "HIGH_PRICE",
          higtDiscountRate: "HIGH_DISCOUNT_RATE",
        };

        const condition = conditionMap[currentCategory] || "";
        const category = parseInt(categoryId) || "";
        const order = orderMap[selectedSortOption] || "";
        const keyword = searchString || "";

        const response = await axios.get(
          `http://localhost:8080/api/v1/products`,
          {
            params: {
              size: pageSize,
              page: currentPage,
              condition: condition,
              category: category,
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
    currentCategory,
    selectedSortOption,
    isSearchClicked,
    categoryId,
  ]);

  useEffect(() => {
    console.log("currentCategory :", currentCategory);
    console.log("categoryId :", categoryId);
  }, [currentCategory, categoryId]);

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

  useEffect(() => {
    const isTopMenuClicked = localStorage.getItem("topMenuClicked");

    if (isTopMenuClicked) {
      setSelectedCategoryOption(null);
      setSelectedSubCategoryOption(null);
    }
  }, [categoryPageUrl]);

  const handleSearchBar = () => {
    if (searchString) {
      setIsSearchClicked(true);
    } else {
      return;
    }
  };

  const filterOptions = filterOptionData.map((parentCategory) => {
    const processedParentName = parentCategory.name
      .replace(/[-&]/g, "")
      .toUpperCase();
    const subOptions = parentCategory.children.map((childCategory) => {
      const processedChildName = childCategory.name
        .replace(/[-&]/g, "")
        .toUpperCase();
      return {
        name: processedChildName,
        categoryId: childCategory.categoryId,
        depth: childCategory.depth,
      };
    });
    return {
      name: processedParentName,
      categoryId: parentCategory.categoryId,
      depth: parentCategory.depth,
      children: subOptions,
    };
  });

  const genderOptions = filterOptions.filter(
    (category) => category.name !== "DRESSSET"
  );

  const menUnisexFilterOptions = genderOptions.map((filterOptions) => {
    if (filterOptions.name === "BOTTOM") {
      const updatedSubOptions = filterOptions.children.filter(
        (subOption) => subOption.name !== "SKIRT"
      );
      return {
        ...filterOptions,
        children: updatedSubOptions,
      };
    } else {
      return filterOptions;
    }
  });

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

  const handleFilterClick = () => {
    setIsFilterClicked((prevState) => !prevState);
  };

  const handleSortClick = () => {
    setIsSortClicked((prevState) => !prevState);
  };

  const handleCategoryOptionSelect = (id) => {
    localStorage.setItem("selectedCategoryOption", id.name);
    localStorage.setItem("optionName", id.name);
    localStorage.removeItem("selectedSubCategoryOption");
    localStorage.removeItem("subOptionName");
    localStorage.setItem("parentCategoryId", id.categoryId);
    localStorage.removeItem("childCategoryId");
    if (selectedCategoryOption === id.name && !selectedSubCategoryOption) {
      localStorage.removeItem("selectedCategoryOption");
      localStorage.removeItem("optionName");
      localStorage.removeItem("parentCategoryId");
      const newCategoryUrl = `/${currentCategory}`;
      navigate(newCategoryUrl, { replace: true });
      return;
    }
    const newCategoryUrl = `/${currentCategory}-${id.name}`;
    navigate(newCategoryUrl, { replace: true });
  };

  const handleSubcategoryOptionSelect = (subOptionId) => {
    localStorage.setItem("selectedSubCategoryOption", subOptionId.name);
    localStorage.setItem("subOptionName", subOptionId.name);
    localStorage.setItem("childCategoryId", subOptionId.categoryId);
    if (selectedSubCategoryOption === subOptionId.name) {
      localStorage.removeItem("selectedSubCategoryOption");
      localStorage.removeItem("subOptionName");
      localStorage.removeItem("childCategoryId");
      const newSubcategoryUrl = `/${currentCategory}-${selectedCategoryOption}`;
      navigate(newSubcategoryUrl, { replace: true });
      return;
    }
    const newSubcategoryUrl = `/${currentCategory}-${selectedCategoryOption}-${subOptionId.name}`;
    navigate(newSubcategoryUrl, { replace: true });
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
      localStorage.removeItem("optionName");
      localStorage.removeItem("subOptionName");
      localStorage.removeItem("parentCategoryId");
      localStorage.removeItem("childCategoryId");
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
            {currentCategory === "best" ||
            currentCategory === "new" ||
            currentCategory === "women" ||
            currentCategory === "discount"
              ? filterOptions.map((option, index) => (
                  <li
                    key={index}
                    className={`filter-option ${
                      selectedCategoryOption === option.name ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleCategoryOptionSelect(option);
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
            {allProducts.length > 0 ? (
              allProducts.map((product, index) => (
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
            currentPage === totalPageSize - 1 && "next-btn-disable"
          }`}
        />
      </div>
    </div>
  );
}

export { CategoryPage };
