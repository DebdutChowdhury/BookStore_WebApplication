import { BOOK_SELECTED } from "../Constants";
import { CART_BOOKS } from "../Constants";
import { CART_DETAILS } from "../Constants";

const initialState = {
    bookDetails: [],
    cartCount: '',
    cartOpen:false
}

const BookDetailsReducers = (state = initialState, action) => {
    console.log("Action Type", action.type);
    switch (action.type) {
        case BOOK_SELECTED:
            console.log("Action", action);
            return {
                ...state, bookDetails: action.value
            }
        case CART_BOOKS:
            console.log("Action", action);
            return {
                ...state, cartCount: action.value
            }
        case CART_DETAILS:
            console.log("Action", action);
            return {
                ...state, cartOpen: action.value
            }

        default:
            return { state }
    }
}

export default BookDetailsReducers;
