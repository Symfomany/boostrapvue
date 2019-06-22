import axios from "axios";
import config from "../config/index";

const xhr = axios.create({
  baseURL: config.url,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default xhr;
