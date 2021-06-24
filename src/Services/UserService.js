import AxiosService from './AxiosService';

const axios = new AxiosService();

export default class userService {
    baseUrl = " https://backend-bookstore.herokuapp.com/";

    userRegistration = (data) => {
        return axios.postMethod(`${this.baseUrl}bookstore_user/registration`, data);
    }

    userlogin = (data) => {
        return axios.postMethod(`${this.baseUrl}bookstore_user/login`, data);
    }
}