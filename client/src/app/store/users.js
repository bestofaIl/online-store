import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { history } from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        authRequested: (state) => {
            state.error = null;
        },
        userRequested: (state) => {
            state.isLoading = true;
        },
        userReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        authRequestSucceed: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { authRequested, authRequestSucceed } = actions;

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const { data } = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSucceed({ userId: data.userId }));
    } catch (e) {
    }
};

export const logIn = ({ payload, redirect }) => async (dispatch) => {
    authRequested();
    try {
        const { data } = await authService.logIn(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSucceed({ userId: data.userId }));
        console.log(history);
        history.push(redirect);
    } catch (e) {
        console.log(e);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;

export default usersReducer;
