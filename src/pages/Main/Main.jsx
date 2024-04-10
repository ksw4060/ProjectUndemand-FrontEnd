import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousels from "../../components/Carousels/Carousels.jsx";
import ProductSlide from "../../components/ProductSlide/ProductSlide.jsx";
import "./Main.css";

const Main = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/products"
        );
        console.log(response.data);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const getBestProducts = () => {
    return allProducts
      .slice()
      .sort((a, b) => b.product_like_cnt - a.product_like_cnt)
      .slice(0, 7);
  };

  const getNewProducts = () => {
    return allProducts
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 7);
  };

  const getSaleProducts = () => {
    return allProducts.filter((product) => product.sale).slice(0, 7);
  };

  return (
    <div className="contents-body">
      <Carousels />
      <ProductSlide products={getBestProducts()} sectionTitle="Best Products" />
      <ProductSlide products={getNewProducts()} sectionTitle="New Products" />
      <ProductSlide products={getSaleProducts()} sectionTitle="Sale Products" />
    </div>
  );
};

export { Main };
