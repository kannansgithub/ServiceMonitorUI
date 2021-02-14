import axios from "axios";
import reduxStore  from '../store';
import { SHOW_LOADER, HIDE_LOADER } from '../constants';
const { dispatch } = reduxStore;
const instance= axios.create({
  baseURL: "http://localhost:10010/api/v1"
});
instance.interceptors.request.use(
  (config) => {
    dispatch({ type: SHOW_LOADER });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    dispatch({ type: HIDE_LOADER });
    return response;
  },
  (error) => {
    dispatch({ type: HIDE_LOADER });
    return Promise.reject(error);
  }
);


export default instance;