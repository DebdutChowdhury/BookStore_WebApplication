import AxiosService from './AxiosService';

const axios = new AxiosService();

export default class userService {
    baseUrl = "https://new-bookstore-backend.herokuapp.com/";

    userRegistration = (data) => {
        return axios.postMethod(`${this.baseUrl}bookstore_user/registration`, data);
    }

    userlogin = (data) => {
        return axios.postMethod(`${this.baseUrl}bookstore_user/login`, data);
    }

    getAllBooks = ()=>{
        return axios.getMethod(`${this.baseUrl}bookstore_user/get/book`)       
    }
}