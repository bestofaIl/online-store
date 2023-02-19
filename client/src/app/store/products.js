import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer } = productsSlice;
const { productsRequested, productReceived } = productsSlice.actions;

export const loadProductsList = () => async (dispatch) => {
    try {
        dispatch(productsRequested());
        const { content } = await productService.fetchAll();
        dispatch(productReceived(content));
    } catch (e) {

    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductById = (id) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find(product => product._id === id);
    }
};

export default productsReducer;
