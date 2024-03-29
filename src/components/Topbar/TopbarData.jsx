import { useState, useEffect } from 'react';
import axios from 'axios';

function TopbarData() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/categorys');
                setCategoryData(response.data);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchCategoryData();
    }, []);

    const categoryUrlMap = {
        "상의": "tops",
        "하의": "bottoms",
        "dress&set": "dressandset",
        "아우터": "outerwear",
        "신발": "shoes",
        "악세서리": "accessories"
    };
    
    const subCategoryUrlMap = {
        "후드": "hoodie",
        "맨투맨": "sweatshirt",
        "반팔 셔츠": "shortsleeveshirt",
        "긴팔 셔츠": "longsleeveshirt",
        "반팔티": "shortsleevetee",
        "긴팔티": "longsleevetee",
        "니트/스웨터": "knitsweater",
        "블라우스": "blouse",
        "긴바지": "trousers",
        "반바지": "shorts",
        "치마": "skirt",
        "원피스": "dress",
        "투피스": "twopiece",
        "셋업": "setup",
        "숏패딩": "shortpadding",
        "롱패딩": "longpadding",
        "가디건": "cardigan",
        "재킷": "jacket",
        "코트": "coat",
        "무스탕": "mustang",
        "조끼": "vest",
        "경량패딩": "lightweightpadding",
        "스니커즈": "sneakers",
        "샌들/슬리퍼": "sandalslippers",
        "부츠": "boots",
        "모자": "hat",
        "양말": "socks",
        "가방": "bag"
    };
    
    const categoryOptions = categoryData.map(category => {
        const categoryUrl = categoryUrlMap[category.name];
        const subOptions = category.children.map(child => ({
            id: subCategoryUrlMap[child.name],
            name: child.name
        }));
        return {
            id: categoryUrl,
            name: category.name,
            subOptions: subOptions
        };
    });

    const genderOptions = categoryOptions.filter(category => category.name !== "dress&set");

    const menUnisexCategoryOptions = genderOptions.map(categoryOptions => {
        if (categoryOptions.name === "하의") {
            const updatedSubOptions = categoryOptions.subOptions.filter(subOption => subOption.name !== "치마");
            return {
                ...categoryOptions,
                subOptions: updatedSubOptions
            };
        } else {
            return categoryOptions;
        }
    });

    const categoryLinks = [
        { 
            to: "/best", 
            label: "Best", 
            contents: categoryOptions
        },
        { 
            to: "/new", 
            label: "New",
            contents: categoryOptions
        },
        { 
            to: "/unisex", 
            label: "Unisex",
            contents: menUnisexCategoryOptions
        },
        { 
            to: "/men", 
            label: "Men",
            contents: menUnisexCategoryOptions
        },
        { 
            to: "/women", 
            label: "Women",
            contents: categoryOptions
        },
        { 
            to: "/sale", 
            label: "Sale",
            contents: categoryOptions
        }
    ];

    const handleLoginClick = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const handleMouseOver = (index) => {
        setHoveredLinkIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredLinkIndex(null);
    };

    return {
        isLoggedIn,
        handleLoginClick,
        hoveredLinkIndex,
        categoryLinks,
        handleMouseOver,
        handleMouseLeave,
    };
}

export default TopbarData;
