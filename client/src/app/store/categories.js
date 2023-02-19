import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceived: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
        }
    }
});

const { reducer: categoriesReducer } = categoriesSlice;
const { categoriesReceived, categoriesRequested } = categoriesSlice.actions;

export const loadCategoriesList = () => async (dispatch) => {
    try {
        dispatch(categoriesRequested());
        const { content } = await categoryService.fetchAll();
        dispatch(categoriesReceived(content));
    } catch (e) {

    }
};

export const getCategories = () => (state) => state.categories.entities;

export const getCategoryById = (id) => (state) => {
    if (state.categories.entities) {
        return state.categories.entities.find(category => category._id === id);
    }
};

export const getCategoriesLoadingStatus = () => (state) => state.categories.isLoading;

export default categoriesReducer;
