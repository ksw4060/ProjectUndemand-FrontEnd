import React, { useState } from 'react';
import "./AdministratorPage.css"
import axios from 'axios';

function AdministratorPage() {
    const [parentCategoryName, setParentCategoryName] = useState('');
    const [childCategoryName, setChildCategoryName] = useState('');
    const [parentId, setParentId] = useState('');
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('WOMAN');
    const [price, setPrice] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [manufacturer, setManufacturer] = useState('');

    const handleParentCategorySubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/categorys/parent', {
                name: parentCategoryName
            });
            console.log(response.data); // Assuming response contains some relevant data
            } catch (error) {
                console.error('Error creating parent category:', error);
            }
        };
    
        const handleChildCategorySubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/categorys/child/${parentId}`, {
                name: childCategoryName
            });
            console.log(response.data); // Assuming response contains some relevant data
            } catch (error) {
                console.error('Error creating child category:', error);
            }
        };
    
        const handleProductSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/products/new', {
                productName,
                productType,
                price,
                productInfo,
                manufacturer
            });
            console.log(response.data); // Assuming response contains some relevant data
            } catch (error) {
                console.error('Error creating product:', error);
            }
        };
    
        return (
        <div className="administrator-page">
            <div className="input-section">
                <h2>Parent Category</h2>
                <input
                    type="text"
                    value={parentCategoryName}
                    onChange={(e) => setParentCategoryName(e.target.value)}
                    placeholder="Enter parent category name"
                />
                <button onClick={handleParentCategorySubmit}>Create Parent Category</button>
            </div>

            <div className="input-section">
                <h2>Child Category</h2>
                <input
                    type="text"
                    value={childCategoryName}
                    onChange={(e) => setChildCategoryName(e.target.value)}
                    placeholder="Enter child category name"
                />
                <input
                    type="text"
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    placeholder="Enter parent category ID"
                />
                <button onClick={handleChildCategorySubmit}>Create Child Category</button>
            </div>

            <div className="input-section">
                <h2>Product</h2>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                />
                <select value={productType} onChange={(e) => setProductType(e.target.value)}>
                <option value="WOMAN">Woman</option>
                <option value="MAN">Man</option>
                <option value="UNISEX">Unisex</option>
                </select>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                />
                <input
                    type="text"
                    value={productInfo}
                    onChange={(e) => setProductInfo(e.target.value)}
                    placeholder="Enter product info"
                />
                <input
                    type="text"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    placeholder="Enter manufacturer"
                />
                <button onClick={handleProductSubmit}>Create Product</button>
            </div>
        </div>
    );
}

export { AdministratorPage };
