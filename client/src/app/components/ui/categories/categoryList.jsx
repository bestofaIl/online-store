import React from "react";
import Category from "./category";
import PropTypes from "prop-types";

const CategoryList = ({ items, ...rest }) => {
    return (
        <div className="category-list">
            {items.map((item) => <Category key={item._id} {...item} {...rest} />)}
            <Category _id="" name="All" {...rest} url="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-all-inclusive-hospitality-services-flaticons-lineal-color-flat-icons.png"/>
        </div>
    );
};

CategoryList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default CategoryList;
