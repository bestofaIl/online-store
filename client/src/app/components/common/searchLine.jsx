import React from "react";
import PropTypes from "prop-types";

const SearchLine = ({ value, handleChange }) => {
    return (
        <div className="search-line">
            <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Search..."
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

SearchLine.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default SearchLine;
