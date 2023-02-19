import React from "react";
import { getCategoryById } from "../../store/categories";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Benefit from "../common/benefit";
import { useHistory } from "react-router-dom";

const ProductCard = ({ name, url, description, price, benefits, category: id, _id }) => {
    const history = useHistory();
    const category = useSelector(getCategoryById(id));
    return (
        <div className="product-card-wrapper">
            <div className="product-card-img">
                <img src={url} />
            </div>
            <div className="product-card-description">
                <h5>{name}</h5>
                <div className="rate-container">
                    <div className="product-card-description-rate">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <span className="rate-number">12</span>
                </div>
                <span className="product-card-description-weak">{category.name}</span>
                <div className="product-card-description-benefit">
                    {benefits.map((benefit, index) => <Benefit key={index} benefit={benefit} />)}
                </div>
                <p className="product-card-description-description">{description}</p>
            </div>
            <div className="product-card-main">
                <h4>{price}</h4>
                <h6>ORIGINAL</h6>
                <button className="button-primary" onClick={() => history.push(`product/${_id}`)}>DETAILS</button>
                <button className="button-primary-outline">ADD TO CART</button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    benefits: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    _id: PropTypes.string
};

export default ProductCard;
