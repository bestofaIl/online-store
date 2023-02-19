import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCategoriesList } from "../../../store/categories";
import PropTypes from "prop-types";
import { loadProductsList } from "../../../store/products";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadProductsList());
    }, []);

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AppLoader;
