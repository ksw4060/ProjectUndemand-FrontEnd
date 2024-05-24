import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../../components/Carousel/Carousel.jsx";
import ProductSlide from "../../components/ProductSlide/ProductSlide.jsx";
import "./Main.css";

const Main = () => {
  const [mainBest, setMainBest] = useState([]);
  const [mainNew, setMainNew] = useState([]);
  const [mainRecommend, setMainRecommend] = useState([]);
  const pageSize = 7;

  useEffect(() => {
    getBestProducts();
    getNewProducts();
    getRecommendProducts();
  }, []);

  const getBestProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/products`,
        {
          params: {
            size: pageSize,
            page: 0,
            condition: "BEST",
            category: "",
            order: "",
            keyword: "",
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
        `${process.env.REACT_APP_BACKEND_BASE_URL}/products`,
        {
          params: {
            size: pageSize,
            page: 0,
            condition: "NEW",
            category: "",
            order: "",
            keyword: "",
          },
        }
      );
      setMainNew(response.data.content);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getRecommendProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/products`,
        {
          params: {
            size: pageSize,
            page: 0,
            condition: "RECOMMEND",
            category: "",
            order: "",
            keyword: "",
          },
        }
      );
      setMainRecommend(response.data.content);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div className="contents-body">
      <Carousel />
      <ProductSlide products={mainBest} sectionTitle="Best Products" />
      <ProductSlide products={mainNew} sectionTitle="New Products" />
      <ProductSlide
        products={mainRecommend}
        sectionTitle="Recommend Products"
      />
    </div>
  );
};

export { Main };
