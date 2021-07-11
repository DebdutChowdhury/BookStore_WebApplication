import { BOOK_SELECTED, CART_BOOKS, CART_DETAILS, CART_BOOKS_LIST} from "../Action/Constants";

const initialState = {
    bookDetails: [],
    cartCount: '',
    cartOpen:false,
    cartBookList:[]
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
        case CART_BOOKS_LIST:
            console.log("Action", action);
            return {
                ...state, cartBookList: action.value
            }

        default:
            return { state }
    }
}

export default BookDetailsReducers;
