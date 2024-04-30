// import { useState, useEffect } from "react";
// import axios from "axios";

// function TopbarData() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
//   const [categoryData, setCategoryData] = useState([]);

//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/v1/categorys"
//         );
//         setCategoryData(response.data);
//       } catch (error) {
//         console.error("Error fetching category data:", error);
//       }
//     };

//     fetchCategoryData();
//   }, []);

//   const processedCategoryData = categoryData.map((parentCategory) => {
//     const processedParentName = parentCategory.name
//       .replace(/[-&]/g, "")
//       .toUpperCase();
//     const processedChildren = parentCategory.children.map((childCategory) => {
//       const processedChildName = childCategory.name
//         .replace(/[-&]/g, "")
//         .toUpperCase();

//       return {
//         name: processedChildName,
//         categoryId: childCategory.categoryId,
//         depth: childCategory.depth,
//       };
//     });

//     return {
//       name: processedParentName,
//       categoryId: parentCategory.categoryId,
//       depth: parentCategory.depth,
//       children: processedChildren,
//     };
//   });

//   const genderOptions = processedCategoryData.filter(
//     (category) => category.name !== "DRESSSET"
//   );

//   const processedMUCategoryData = genderOptions.map((categoryOptions) => {
//     if (categoryOptions.name === "BOTTOM") {
//       const updatedSubOptions = categoryOptions.children.filter(
//         (subOption) => subOption.name !== "SKIRT"
//       );
//       return {
//         ...categoryOptions,
//         children: updatedSubOptions,
//       };
//     } else {
//       return categoryOptions;
//     }
//   });

//   const categoryLinks = [
//     {
//       to: "/best",
//       label: "Best",
//       contents: processedCategoryData,
//     },
//     {
//       to: "/new",
//       label: "New",
//       contents: processedCategoryData,
//     },
//     {
//       to: "/unisex",
//       label: "Unisex",
//       contents: processedMUCategoryData,
//     },
//     {
//       to: "/men",
//       label: "Men",
//       contents: processedMUCategoryData,
//     },
//     {
//       to: "/women",
//       label: "Women",
//       contents: processedCategoryData,
//     },
//     {
//       to: "/recommend",
//       label: "Recommend",
//       contents: processedCategoryData,
//     },
//   ];

//   const handleLoginClick = () => {
//     setIsLoggedIn(!isLoggedIn);
//   };

//   const handleMouseOver = (index) => {
//     setHoveredLinkIndex(index);
//   };

//   const handleMouseLeave = () => {
//     setHoveredLinkIndex(null);
//   };

//   return {
//     isLoggedIn,
//     handleLoginClick,
//     hoveredLinkIndex,
//     categoryLinks,
//     handleMouseOver,
//     handleMouseLeave,
//   };
// }

// export default TopbarData;
