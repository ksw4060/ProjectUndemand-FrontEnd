import { useState, useEffect } from 'react';

function TopbarData() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const categoryLinks = [
        { 
            to: "/best", 
            label: "Best", 
            contents: [
                { title: "상의", options: ["후드", "맨투맨", "반팔 셔츠", "긴팔 셔츠", "반팔티", "긴팔티", "니트/스웨터", "블라우스"] },
                { title: "하의", options: ["긴바지", "반바지", "치마"] },
                { title: "아우터", options: ["숏패딩", "롱패딩", "가디건", "재킷", "코트", "무스탕", "조끼", "경량패딩"] },
                { title: "신발", options: ["스니커즈", "샌들/슬리퍼", "부츠"] },
                { title: "악세서리", options: ["모자", "양말", "가방"] },
            ]
        },
        { 
            to: "/new", 
            label: "New",
            contents: [
                { title: "상의", options: ["후드", "맨투맨", "반팔 셔츠", "긴팔 셔츠", "반팔티", "긴팔티", "니트/스웨터", "블라우스"] },
                { title: "하의", options: ["긴바지", "반바지", "치마"] },
                { title: "아우터", options: ["숏패딩", "롱패딩", "가디건", "재킷", "코트", "무스탕", "조끼", "경량패딩"] },
                { title: "신발", options: ["스니커즈", "샌들/슬리퍼", "부츠"] },
                { title: "악세서리", options: ["모자", "양말", "가방"] },
            ]
        },
        { 
            to: "/unisex", 
            label: "Unisex",
            contents: [
                { title: "상의", options: ["후드", "맨투맨", "반팔 셔츠", "긴팔 셔츠", "반팔티", "긴팔티", "니트/스웨터", "블라우스"] },
                { title: "하의", options: ["긴바지", "반바지", "치마"] },
                { title: "아우터", options: ["숏패딩", "롱패딩", "가디건", "재킷", "코트", "무스탕", "조끼", "경량패딩"] },
                { title: "신발", options: ["스니커즈", "샌들/슬리퍼", "부츠"] },
                { title: "악세서리", options: ["모자", "양말", "가방"] },
            ] 
        },
        { 
            to: "/men", 
            label: "Men",
            contents: [
                { title: "상의", options: ["후드", "맨투맨", "반팔 셔츠", "긴팔 셔츠", "반팔티", "긴팔티", "니트/스웨터", "블라우스"] },
                { title: "하의", options: ["긴바지", "반바지", "치마"] },
                { title: "아우터", options: ["숏패딩", "롱패딩", "가디건", "재킷", "코트", "무스탕", "조끼", "경량패딩"] },
                { title: "신발", options: ["스니커즈", "샌들/슬리퍼", "부츠"] },
                { title: "악세서리", options: ["모자", "양말", "가방"] },
            ]
        },
        { 
            to: "/women", 
            label: "Women",
            contents: [
                { title: "상의", options: ["후드", "맨투맨", "반팔 셔츠", "긴팔 셔츠", "반팔티", "긴팔티", "니트/스웨터", "블라우스"] },
                { title: "하의", options: ["긴바지", "반바지", "치마"] },
                { title: "드레스 & 세트", options: ["원피스", "투피스", "셋업"] },
                { title: "아우터", options: ["숏패딩", "롱패딩", "가디건", "재킷", "코트", "무스탕", "조끼", "경량패딩"] },
                { title: "신발", options: ["스니커즈", "샌들/슬리퍼", "부츠"] },
                { title: "악세서리", options: ["모자", "양말", "가방"] },
            ]
        },
        { 
            to: "/sale", 
            label: "Sale",
            contents: [
                { title: "상의", options: ["후드", "맨투맨", "반팔 셔츠", "긴팔 셔츠", "반팔티", "긴팔티", "니트/스웨터", "블라우스"] },
                { title: "하의", options: ["긴바지", "반바지", "치마"] },
                { title: "아우터", options: ["숏패딩", "롱패딩", "가디건", "재킷", "코트", "무스탕", "조끼", "경량패딩"] },
                { title: "신발", options: ["스니커즈", "샌들/슬리퍼", "부츠"] },
                { title: "악세서리", options: ["모자", "양말", "가방"] },
            ]
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [hoveredLinkIndex]);

    // useEffect(() => {
    //     const handleMouseOverWrapper = (index) => {
    //         return () => handleMouseOver(index);
    //     };

    //     const handleMouseLeaveWrapper = () => {
    //         return () => handleMouseLeave();
    //     };

    //     categoryLinks.forEach((link, index) => {
    //         const element = document.getElementById(`category-link-${index}`);
    //         element.addEventListener('mouseover', handleMouseOverWrapper(index));
    //         element.addEventListener('mouseleave', handleMouseLeaveWrapper());
    //     });

    //     return () => {
    //         categoryLinks.forEach((link, index) => {
    //             const element = document.getElementById(`category-link-${index}`);
    //             element.removeEventListener('mouseover', handleMouseOverWrapper(index));
    //             element.removeEventListener('mouseleave', handleMouseLeaveWrapper());
    //         });
    //     };
    // }, [categoryLinks]);

    return {
        isLoggedIn,
        handleLoginClick,
        hoveredLinkIndex,
        categoryLinks,
        handleMouseOver,
        handleMouseLeave,
        isVisible,
    };
}

export default TopbarData;
