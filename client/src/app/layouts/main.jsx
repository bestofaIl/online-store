import React, { useState } from "react";
import CategoryList from "../components/ui/categories/categoryList";
import { useSelector } from "react-redux";
import { getCategories } from "../store/categories";
import { getProducts } from "../store/products";
import ProductList from "../components/ui/productList";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import SearchLine from "../components/common/searchLine";

const Main = () => {
    const categories = useSelector(getCategories());
    const products = useSelector(getProducts());

    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedCategory, setSelectedCategory] = useState();

    const [searchQuery, setSearchQuery] = useState("");
    const searchReg = new RegExp(searchQuery, "i");

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
        setSelectedCategory();
        setCurrentPage(1);
    };

    function filterProducts(data) {
        const searchProducts = searchQuery ? data.filter(item => searchReg.test(item.name)) : data;
        return selectedCategory ? data.filter(item => item.category === selectedCategory) : searchProducts;
    }

    if (products) {
        const filteredProduct = filterProducts(products);
        const productCount = filteredProduct.length;
        const productCrop = paginate(currentPage, filteredProduct, pageSize);
        return <>
            <div className="main-page-wrapper">
                {categories ? <CategoryList items={categories} selectedItem={selectedCategory} onItemSelect={handleCategorySelect}/> : "Loading..."}
                <div className="main-content">
                    <SearchLine value={searchQuery} handleChange={handleSearchQuery} />
                    {categories ? <ProductList items={productCrop}/> : "Loading..."}
                    <div className="test">
                        <Pagination itemsCount={productCount} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
                    </div>
                </div>
            </div>
        </>;
    }
    return "Loading...";
};

export default Main;
