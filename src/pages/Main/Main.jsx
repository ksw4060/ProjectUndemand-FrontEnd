import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../../components/Carousel/Carousel.jsx";
import ProductSlide from "../../components/ProductSlide/ProductSlide.jsx";
import "./Main.css";

const Main = () => {
  const [mainBest, setMainBest] = useState([]);
  const [mainNew, setMainNew] = useState([]);
  const [mainDiscount, setMainDiscount] = useState([]);
  const pageSize = 7;

  const CAROUSEL_IMAGES = [
    "https://images.unsplash.com/photo-1612731486606-2614b4d74921?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517938889432-a2ac9241a486?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    getBestProducts();
    getNewProducts();
    getDiscountProducts();
  }, []);

  const getBestProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products`,
        {
          params: {
            size: pageSize,
            page: 0,
            condition: "best",
            order: "",
          },
        }
      );
      setMainBest(response.data.content);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getNewProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products`,
        {
          params: {
            size: pageSize,
            page: 0,
            condition: "new",
            order: "",
          },
        }
      );
      setMainNew(response.data.content);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getDiscountProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products`,
        {
          params: {
            size: pageSize,
            page: 0,
            condition: "",
            order: "discount",
          },
        }
      );
      setMainDiscount(response.data.content);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div className="contents-body">
      <Carousel imgList={CAROUSEL_IMAGES} />
      <ProductSlide products={mainBest} sectionTitle="Best Products" />
      <ProductSlide products={mainNew} sectionTitle="New Products" />
      <ProductSlide products={mainDiscount} sectionTitle="Discount Products" />
    </div>
  );
};

export { Main };
