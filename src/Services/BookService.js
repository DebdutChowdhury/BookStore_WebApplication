import AxiosService from './AxiosService';

const axios = new AxiosService();

export default class userService {
    baseUrl = "https://new-bookstore-backend.herokuapp.com/";

    getAllBooks = ()=>{
        return axios.getMethod(`${this.baseUrl}bookstore_user/get/book`)       
    }

    cartQuantity = (data, product_id) => {
        return axios.putMethod(`${this.baseUrl}bookstore_user/cart_item_quantity/${product_id}`,data,{
            headers: {
                'x-access-token': localStorage.getItem('Token')
            }
        })
    }

    addToCartBook = (data, product_id,token) => {
        return axios.postMethod(`${this.baseUrl}bookstore_user/add_cart_item/${product_id}`,data,{
            headers: {
                'x-access-token': localStorage.getItem('Token')
            }
        })
    }

    getCartItems = () => {
        return axios.getMethod(`${this.baseUrl}bookstore_user/get_cart_items`,{
            headers: {
                'x-access-token': localStorage.getItem('Token')
            }
        })
    }

    cartIncrementDecrement=(data,cartItem_id)=>{
        return axios.putMethod(`${this.baseUrl}bookstore_user/cart_item_quantity/${cartItem_id}`,data,{
            headers:{
                'x-access-token' :localStorage.getItem('Token'),
            } 
        })     
    }
    userDetails=(data)=>{
        return axios.putMethod(`${this.baseUrl}bookstore_user/edit_user`,data,{
            headers:{
                'x-access-token' :localStorage.getItem('Token'),
            } 
        })     

    }

   order=(data)=>{
        console.log(localStorage.getItem('Token'));
        return axios.postMethod(`${this.baseUrl}bookstore_user/add/order`,data,{
            headers:{
                'x-access-token':localStorage.getItem('Token'),
            }
        });
    }
    removeCartItem=(id)=>{
        console.log(id);
        return axios.deleteMethod(`${this.baseUrl}bookstore_user/remove_cart_item/${id}`,{
            headers:{
                'x-access-token':localStorage.getItem('Token'),
            }
        });
    }
}