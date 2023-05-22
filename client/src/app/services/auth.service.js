import axios from "axios";
import config from "../config.json";

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "/auth/"
});

const authService = {
    register: async (payload) => {
        const data = await httpAuth.post("signUp", payload);
        return data;
    },
    logIn: async (payload) => {
        const data = await httpAuth.post("signInWithPassword", payload);
        return data;
    }
};

export default authService;
