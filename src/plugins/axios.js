import axios from "axios";
import config from "../config/index";

axios = axios.defaults.baseURL = config.url;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default axios;
