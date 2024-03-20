import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import { RiEqualizerLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import CheckBox from '../../components/CheckBox/CheckBox.jsx';
// import axios from 'axios';

function CategoryPage() {
    const [isCategoryScroll, setIsCategoryScroll] = useState(false);
    const [isFilterClicked, setIsFilterClicked] = useState(false);
    const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
    const [selectedSubcategoryOption, setSelectedSubcategoryOption] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [prevCategory, setPrevCategory] = useState(null);
    const { category } = useParams();
    const categoryTitle = category.toUpperCase().replace(/-/g, ' ');
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentCategory(category.split('-')[0]);
    }, [category]);

    useEffect(() => {
        if (prevCategory && prevCategory !== currentCategory) {
            window.location.reload();
        }
        setPrevCategory(currentCategory);
    }, [currentCategory, prevCategory]);

    const categoryOptions = [
        { 
            id: 'tops', 
            name: '상의',
            subOptions: [
                { id: 'hoodie', name: '후드' },
                { id: 'sweatshirt', name: '맨투맨' },
                { id: 'short-sleeve-shirt', name: '반팔 셔츠' },
                { id: 'long-sleeve-shirt', name: '긴팔 셔츠' },
                { id: 'short-sleeve-tee', name: '반팔티' },
                { id: 'long-sleeve-tee', name: '긴팔티' },
                { id: 'knit-sweater', name: '니트/스웨터' },
                { id: 'blouse', name: '블라우스' }
            ] 
        },
        { 
            id: 'bottoms', 
            name: '하의',
            subOptions: [
                { id: 'trousers', name: '긴바지' },
                { id: 'shorts', name: '반바지' },
                { id: 'skirt', name: '치마' }
            ] 
        },
        { 
            id: 'outerwear', 
            name: '아우터',
            subOptions: [
                { id: 'short-padding', name: '숏패딩' },
                { id: 'long-padding', name: '롱패딩' },
                { id: 'cardigan', name: '가디건' },
                { id: 'jacket', name: '재킷' },
                { id: 'coat', name: '코트' },
                { id: 'mustang', name: '무스탕' },
                { id: 'vest', name: '조끼' },
                { id: 'lightweight-padding', name: '경량패딩' }
            ] 
        },
        { 
            id: 'shoes', 
            name: '신발',
            subOptions: [
                { id: 'sneakers', name: '스니커즈' },
                { id: 'sandals-slippers', name: '샌들/슬리퍼' },
                { id: 'boots', name: '부츠' }
            ] 
        },
        { 
            id: 'accessories', 
            name: '악세서리',
            subOptions: [
                { id: 'hat', name: '모자' },
                { id: 'socks', name: '양말' },
                { id: 'bag', name: '가방' }
            ] 
        }
    ];     

    if (category.split('-')[0] === 'women') {
        const dressSetOption = { 
            id: 'dress-and-set', 
            name: '드레스&세트', 
            subOptions: [
                { id: 'dress', name: '원피스' },
                { id: 'two-piece', name: '투피스' },
                { id: 'setup', name: '셋업' }
            ]
        };
        const index = categoryOptions.findIndex(option => option.id === 'shoes');
        categoryOptions.splice(index, 0, dressSetOption);
    }

    const priceOptions = [
        { id: 'price0', range: '0 ~ 50,000 원' },
        { id: 'price1', range: '50,000 ~ 100,000 원' },
        { id: 'price2', range: '100,000 ~ 150,000 원' },
        { id: 'price3', range: '150,000 ~ 200,000 원' },
        { id: 'price4', range: '200,000 ~ 250,000 원' },
        { id: 'price5', range: '250,000 원 이상' }
    ];

    const [selectedPriceOptions, setSelectedPriceOptions] = useState(new Set());

    const [showMorePriceOptions, setShowMorePriceOptions] = useState(false);

    const colorOptions = [
        { id: 'black', name: '블랙' },
        { id: 'white', name: '화이트' },
        { id: 'navy', name: '네이비' },
        { id: 'gray', name: '그레이' },
        { id: 'red', name: '레드' },
        { id: 'blue', name: '블루' },
        { id: 'green', name: '그린' },
        { id: 'yellow', name: '옐로우' }
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

        window.addEventListener('scroll', handleCategoryScroll);

        return () => {
            window.removeEventListener('scroll', handleCategoryScroll);
        };
    }, []);

    // 상품 데이터 받아온 이후에 사용 할 코드
    // useEffect(() => {
    //     axios.get('/products')
    //         .then(response => {
    //             setProducts(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching products:', error);
    //         });
    // }, []);

    // 상품 데이터 받아온 이후에 사용 할 코드
    // const [products, setProducts] = useState([]);

    const hanldeFilterClick = () => {
        setIsFilterClicked(prevState => !prevState);
    };

    const handleShowMoreOptions = (optionType) => {
        if (optionType === 'price') {
            setShowMorePriceOptions(prevState => !prevState);
        } else if (optionType === 'color') {
            setShowMoreColorOptions(prevState => !prevState);
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
            <div className={`title-section ${isCategoryScroll ? 'scroll-category' : ''}`}>
                <div className="wrapper">
                    <h2>{ categoryTitle }</h2>
                    <div className="filter-box">
                        <div className="filter" onClick={() => hanldeFilterClick()}>
                            <p>필터 표시</p>
                            <RiEqualizerLine className='icons'/>
                        </div>
                        <div className="sort-by">
                            <p>정렬 기준</p>
                            <FaChevronDown className='icons'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`contents-section ${isCategoryScroll ? 'scroll-category' : ''}`}>
                <div className={`filter-section ${isFilterClicked && 'filter-active'}`}>
                    <ul className="category-options">
                        {categoryOptions.map(option => (
                            <li 
                                key={option.id} 
                                className={`filter-option ${selectedCategoryOption === option.id ? 'selected' : ''}`}
                                onClick={() => handleCategoryOptionSelect(option.id)}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                    <ul className="category-sub-options">
                        {categoryOptions.map(option => (
                            selectedCategoryOption === option.id && option.subOptions && (
                                option.subOptions.map(subOption => (
                                    <li 
                                        key={subOption.id} 
                                        className={`filter-option ${selectedSubcategoryOption === subOption.id ? 'selected' : ''}`}
                                        onClick={() => handleSubcategoryOptionSelect(subOption.id)}
                                    >
                                        {subOption.name}
                                    </li>
                                ))
                            )
                        ))}
                    </ul>
                    <CheckBox
                        options={priceOptions}
                        selectedOptions={selectedPriceOptions}
                        onOptionToggle={(id) => {
                            setSelectedPriceOptions(prevOptions => {
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
                        handleShowMoreOptions={() => handleShowMoreOptions('price')}
                        title="가격대"
                    />
                    <CheckBox
                        options={colorOptions}
                        selectedOptions={selectedColorOptions}
                        onOptionToggle={(id) => {
                            setSelectedColorOptions(prevOptions => {
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
                        handleShowMoreOptions={() => handleShowMoreOptions('color')}
                        title="색상"
                    />
                </div>
                <div className="products-section">
                    <ul className="product-card-box">
                        <li className={`product-card ${isFilterClicked && "filter-active-margin"}`}>
                            <div className={`img-section img1 ${isFilterClicked && 'filter-active-img'}`}></div>
                            <div className="product-info">
                                <Link to="/">Product Name</Link>
                                <Link to="/">Price</Link>
                            </div>
                        </li>
                        <li className={`product-card ${isFilterClicked && "filter-active-margin"}`}>
                            <div className={`img-section img2 ${isFilterClicked && 'filter-active-img'}`}></div>
                            <div className="product-info">
                                <Link to="/">Product Name</Link>
                                <Link to="/">Price</Link>
                            </div>
                        </li>
                        <li className={`product-card ${isFilterClicked && "filter-active-margin"}`}>
                            <div className={`img-section img3 ${isFilterClicked && 'filter-active-img'}`}></div>
                            <div className="product-info">
                                <Link to="/">Product Name</Link>
                                <Link to="/">Price</Link>
                            </div>
                        </li>
                        <li className={`product-card ${isFilterClicked && "filter-active-margin"}`}>
                            <div className={`img-section img4 ${isFilterClicked && 'filter-active-img'}`}></div>
                            <div className="product-info">
                                <Link to="/">Product Name</Link>
                                <Link to="/">Price</Link>
                            </div>
                        </li>
                        <li className={`product-card ${isFilterClicked && "filter-active-margin"}`}>
                            <div className={`img-section img5 ${isFilterClicked && 'filter-active-img'}`}></div>
                            <div className="product-info">
                                <Link to="/">Product Name</Link>
                                <Link to="/">Price</Link>
                            </div>
                        </li>
                        <li className={`product-card ${isFilterClicked && "filter-active-margin"}`}>
                            <div className={`img-section img6 ${isFilterClicked && 'filter-active-img'}`}></div>
                            <div className="product-info">
                                <Link to="/">Product Name</Link>
                                <Link to="/">Price</Link>
                            </div>
                        </li>
                        <li className={`product-card ${isFilterClicked && "filter-active-margin"}`}>
                            <div className={`img-section img7 ${isFilterClicked && 'filter-active-img'}`}></div>
                            <div className="product-info">
                                <Link to="/">Product Name</Link>
                                <Link to="/">Price</Link>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* 상품 데이터 받아온 이후에 사용 할 코드 */}
                {/* <ul className="product-card-box">
                    {products.map(product => (
                        <li key={product.id} className="product-card">
                            <div className={`img-section img${product.id}`}></div>
                            <div className="product-info">
                                <Link to="/">{product.name}</Link>
                                <Link to="/">{product.price}</Link>
                            </div>
                        </li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
}

export {CategoryPage};