import { useState, useEffect } from 'react';
import axios from 'axios';

function TopbarData() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    const categories = [];

    categoryData.forEach(category => {
        categories.push({
            title: category.name,
            options: category.children.map(child => child.name)
        });
    });

    const genderOptions = categories.filter(category => category.title !== "dress&set");

    const menUnisexCategories = genderOptions.map(category => {
        if (category.title === "하의") {
            const updatedOptions = category.options.filter(option => option !== "치마");

            return {
                ...category,
                options: updatedOptions
            };
        } else {
            return category;
        }
    });

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

    const categoryLinks = [
        { 
            to: "/best", 
            label: "Best", 
            contents: categories
        },
        { 
            to: "/new", 
            label: "New",
            contents: categories
        },
        { 
            to: "/unisex", 
            label: "Unisex",
            contents: menUnisexCategories
        },
        { 
            to: "/men", 
            label: "Men",
            contents: menUnisexCategories
        },
        { 
            to: "/women", 
            label: "Women",
            contents: categories
        },
        { 
            to: "/sale", 
            label: "Sale",
            contents: categories
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
