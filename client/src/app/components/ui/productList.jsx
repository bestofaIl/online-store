import React from "react";
import ProductCard from "./productCard";
import PropTypes from "prop-types";

const ProductList = ({ items }) => {
    return <div className="main-page-product-list">
        {items[0] ? items.map(item => <ProductCard key={item._id} {...item} />) : <div className="not-found-image"><img src="https://img.icons8.com/cute-clipart/64/null/nothing-found.png" alt=""/></div>}
    </div>;
};

ProductList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default ProductList;
