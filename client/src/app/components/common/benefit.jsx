import React from "react";
import PropTypes from "prop-types";

const Benefit = ({ benefit }) => {
    return <>
        <span className="product-card-description-weak">{benefit}</span>
        <span className="dot">&#x2022;</span>
    </>;
};

Benefit.propTypes = {
    benefit: PropTypes.string
};

export default Benefit;
