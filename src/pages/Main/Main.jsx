import React from "react";
import Carousels from "../../components/Carousels/Carousels.jsx";
import ProductSlide from "../../components/ProductSlide/ProductSlide.jsx";
import "./Main.css"

const Main = () => {
    const bestProducts = [
        { productName: "Best Product 1", price: "$100" },
        { productName: "Best Product 2", price: "$78" },
        { productName: "Best Product 3", price: "$99" },
        { productName: "Best Product 4", price: "$130" },
        { productName: "Best Product 5", price: "$110" },
        { productName: "Best Product 6", price: "$100" },
        { productName: "Best Product 7", price: "$99" },
    ];

    const newProducts = [
        { productName: "New Product 1", price: "$80" },
        { productName: "New Product 2", price: "$90" },
        { productName: "New Product 3", price: "$120" },
        { productName: "New Product 4", price: "$200" },
        { productName: "New Product 5", price: "$100" },
        { productName: "New Product 6", price: "$100" },
        { productName: "New Product 7", price: "$90" },
    ];

    const saleProducts = [
        { productName: "Sale Product 1", price: "$50" },
        { productName: "Sale Product 2", price: "$70" },
        { productName: "Sale Product 3", price: "$170" },
        { productName: "Sale Product 4", price: "$100" },
        { productName: "Sale Product 5", price: "$120" },
        { productName: "Sale Product 6", price: "$99" },
        { productName: "Sale Product 7", price: "$83" },
    ];

    return (
        <div className="contents-body">
            <Carousels/>
            <ProductSlide title="Best Products" slideItems={bestProducts} />
            <ProductSlide title="New Products" slideItems={newProducts} />
            <ProductSlide title="Sale Products" slideItems={saleProducts} />
        </div>
    );
};

export { Main };
