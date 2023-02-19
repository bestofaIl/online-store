import React from "react";
import { useSelector } from "react-redux";
import { getProductById } from "../../store/products";
import PropTypes from "prop-types";

const ProductPage = ({ id }) => {
    const product = useSelector(getProductById(id));
    if (product) {
        return (
            <div className="product-page">
                <div className="product-page__image">
                    <img src={product.url} />
                </div>
                <div className="product-page__about">
                    <div className="product-page__main">
                        <h4>{product.name}</h4>
                        <div className="d-flex">
                            <div className="product-page__price">
                                <h4>{product.price}</h4>
                            </div>
                            <div className="rate-container">
                                <div className="product-card-description-rate">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <span className="rate-number">12</span>
                            </div>
                        </div>
                    </div>
                    <div className="product-page__description">
                        {product.description}
                    </div>
                    <button className="button-primary-outline">ADD TO CART</button>
                </div>
            </div>
        );
    }
    return "Loading...";
};

ProductPage.propTypes = {
    id: PropTypes.string
};

export default ProductPage;
