import React from "react";
import Carousels from "./Carousels/Carousels.jsx"
import BestSection from "./BestSection/BestSection.jsx"
import NewSection from "./NewSection/NewSection.jsx";
import SaleSection from "./SaleSection/SaleSection.jsx";
import "./Main.css"

const Main = () => {
    return (
        <div className="contents-body">
            <Carousels/>
            <BestSection/>
            <NewSection/>
            <SaleSection/>
        </div>
    );
};

export { Main };