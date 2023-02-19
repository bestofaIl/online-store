import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "./productPage";

const Products = () => {
    const { productId } = useParams();
    return <>
        {productId ? <ProductPage id={productId} /> : "Not found"}
    </>;
};

export default Products;
