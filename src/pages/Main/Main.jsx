import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousels from "../../components/Carousels/Carousels.jsx";
import ProductSlide from "../../components/ProductSlide/ProductSlide.jsx";
import "./Main.css";

const Main = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [mainBest, setMainBest] = useState([]);
  const [mainNew, setMainNew] = useState([]);
  const [mainDiscount, setMainDiscount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/products/all"
        );
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getBestProducts();
    getNewProducts();
    getDiscountProducts();
  }, [allProducts]);

  const getBestProducts = () => {
    return setMainBest(
      allProducts
        .slice()
        .sort((a, b) => b.wishListCount - a.wishListCount)
        .slice(0, 7)
    );
  };

  const getNewProducts = () => {
    return setMainNew(
      allProducts
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 7)
    );
  };

  const getDiscountProducts = () => {
    return setMainDiscount(
      allProducts.filter((product) => product.isDiscount).slice(0, 7)
    );
  };

  useEffect(() => {
    console.log(allProducts);
  }, [allProducts]);

  return (
    <div className="contents-body">
      <Carousels />
      <ProductSlide products={mainBest} sectionTitle="Best Products" />
      <ProductSlide products={mainNew} sectionTitle="New Products" />
      <ProductSlide products={mainDiscount} sectionTitle="Discount Products" />
    </div>
  );
};

export { Main };
