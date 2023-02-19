import React from "react";
import PropTypes from "prop-types";

const Category = ({ _id, name, url, selectedItem, onItemSelect }) => {
    return (
        <div className={"category" + (selectedItem === _id ? " active" : "")} onClick={() => onItemSelect(_id)}>
            <img src={url} alt={name} width="50px" height="50px"/>
            <div className="category-text">{name}</div>
        </div>
    );
};

Category.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    selectedItem: PropTypes.string,
    onItemSelect: PropTypes.func
};

export default Category;
