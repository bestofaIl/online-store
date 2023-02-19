import axios from "axios";
import config from "../config.json";

const http = axios.create({
    baseURL: config.apiEndpoint
});

http.interceptors.response.use((res) => {
    res.data = { content: res.data };
    return res;
});

const httpService = {
    get: http.get,
    post: http.post,
    delete: http.delete,
    patch: http.patch,
    put: http.put
};

export default httpService;
