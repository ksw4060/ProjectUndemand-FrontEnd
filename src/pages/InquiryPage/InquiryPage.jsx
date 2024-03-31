import React from 'react';
import { Link } from "react-router-dom";
import './InquiryPage.css';
// import axios from 'axios';

const inquiryCategories = [
    {className: "view-all", title: "전체 보기"},
    {className: "product-inquiry", title: "상품 문의"},
    {className: "shipping-inquiry", title: "배송 문의"},
    {className: "exchange-return-cancellation-inquiry", title: "교환/반품/취소 문의"},
    {className: "other-inquiry", title: "기타 문의"}
]

const inquiryTableHeads = [
    {className: "inquiry-num", title: "번호"},
    {className: "inquiry-info", title: "상품정보"},
    {className: "inquiry-category", title: "카테고리"},
    {className: "inquiry-title", title: "제목"},
    {className: "inquiry-writer", title: "작성자"},
    {className: "inquiry-date", title: "작성일"}
]

const inquiryTableRows = [
    {   
        inquiryNum: 1,
        inquiryInfo: {
            productImgSrc: "https://images.unsplash.com/photo-1612731486606-2614b4d74921?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Test Product 1",
            productId: 1
        },
        inquiryCategory: "배송 문의",
        inquiryTitle: "배송을 3일 이내에 받아볼 수 있을까요?",
        inquiryWriter: "l****",
        inquiryDate: "2024/03/25"
    },
    {
        inquiryNum: 2,
        inquiryInfo: {
                productImgSrc: "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                productName: "Test Product 2",
                productId: 2
            },
        inquiryCategory: "교환/반품/취소 문의",
        inquiryTitle: "사이즈 교환 문의 드려요!",
        inquiryWriter: "b******",
        inquiryDate: "2024/03/31"
    }
]

function InquiryPage () {
    return (
        <div className="inquiry-page">
            <div className="inquiry-title-section">
                <h3>문의하기</h3>
            </div>
            <div className="inquiry-category-section">
                {inquiryCategories.map(category => (
                    <div key={category.className} className={category.className}>{category.title}</div>
                ))}
            </div>
            <div className="inquiry-article-section">
                <div className="table-head">
                    {inquiryTableHeads.map(tableHead => (
                        <div key={tableHead.className} className={tableHead.className}>{tableHead.title}</div>
                    ))}
                </div>
                <div className="table-row-wrapper">
                    {inquiryTableRows.map(tableRow => (
                        <div key={tableRow.inquiryNum} className="table-row">
                            <p className="inquiry-num">{tableRow.inquiryNum}</p>
                            <div className="inquiry-info">
                                <Link to={`/product/${tableRow.inquiryInfo.productId}`}>
                                    <img src={tableRow.inquiryInfo.productImgSrc} alt={tableRow.inquiryInfo.productName} className="inquiry-img"/>
                                </Link>
                                <Link to={`/product/${tableRow.inquiryInfo.productId}`}>
                                    <p>{tableRow.inquiryInfo.productName}</p>
                                </Link>
                            </div>
                            <p className="inquiry-category">{tableRow.inquiryCategory}</p>
                            <p className="inquiry-title">
                                <Link to={`/inquiry/${tableRow.inquiryNum}`} className="inquiry-detail-link">
                                    {tableRow.inquiryTitle}
                                </Link>
                            </p>
                            <p className="inquiry-writer">{tableRow.inquiryWriter}</p>
                            <p className="inquiry-date">{tableRow.inquiryDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export { InquiryPage };