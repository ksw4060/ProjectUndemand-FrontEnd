import React, { useState, useEffect } from "react";
import axios from 'axios';
import Carousels from "../../components/Carousels/Carousels.jsx";
import ProductSlide from "../../components/ProductSlide/ProductSlide.jsx";
import "./Main.css"

const Main = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/products');
                console.log(response.data)
                setAllProducts(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
    
        fetchData();
    }, []);

    const getBestProducts = () => {
        // product_like_cnt 기준으로 내림차순 정렬 후 상위 7개 상품 반환
        return allProducts
            .slice() // 원본 배열을 변경하지 않기 위해 복사본 사용
            .sort((a, b) => b.product_like_cnt - a.product_like_cnt)
            .slice(0, 7);
    };

    const getNewProducts = () => {
        // created_at 기준으로 내림차순 정렬 후 상위 7개 상품 반환
        return allProducts
            .slice() // 원본 배열을 변경하지 않기 위해 복사본 사용
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 7);
    };

    const getSaleProducts = () => {
        // is_sale이 true인 상품 중 7개 반환
        return allProducts.filter(product => product.sale).slice(0, 7);
    };

    // const bestProducts = [
    //     { productName: "Best Product 1", price: "$100" },
    //     { productName: "Best Product 2", price: "$78" },
    //     { productName: "Best Product 3", price: "$99" },
    //     { productName: "Best Product 4", price: "$130" },
    //     { productName: "Best Product 5", price: "$110" },
    //     { productName: "Best Product 6", price: "$100" },
    //     { productName: "Best Product 7", price: "$99" },
    // ];

    // const newProducts = [
    //     { productName: "New Product 1", price: "$80" },
    //     { productName: "New Product 2", price: "$90" },
    //     { productName: "New Product 3", price: "$120" },
    //     { productName: "New Product 4", price: "$200" },
    //     { productName: "New Product 5", price: "$100" },
    //     { productName: "New Product 6", price: "$100" },
    //     { productName: "New Product 7", price: "$90" },
    // ];

    // const saleProducts = [
    //     { productName: "Sale Product 1", price: "$50" },
    //     { productName: "Sale Product 2", price: "$70" },
    //     { productName: "Sale Product 3", price: "$170" },
    //     { productName: "Sale Product 4", price: "$100" },
    //     { productName: "Sale Product 5", price: "$120" },
    //     { productName: "Sale Product 6", price: "$99" },
    //     { productName: "Sale Product 7", price: "$83" },
    // ];

    return (
        <div className="contents-body">
            <Carousels/>
            {/* <ProductSlide title="Best Products" slideItems={bestProducts} />
            <ProductSlide title="New Products" slideItems={newProducts} />
            <ProductSlide title="Sale Products" slideItems={saleProducts} /> */}
            <ProductSlide products={getBestProducts()} sectionTitle="Best Products" />
            <ProductSlide products={getNewProducts()} sectionTitle="New Products" />
            <ProductSlide products={getSaleProducts()} sectionTitle="Sale Products" />
        </div>
    );
};

export { Main };
