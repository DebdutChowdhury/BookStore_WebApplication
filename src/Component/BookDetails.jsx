import React, { Component } from "react";
import "../CSS/BookDetails.css";
import Book from "../Assets/book1.png";
import image from "../Assets/Image 11@2x.png";
import UserService from "../Services/BookService";
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import RemoveCircleOutlineTwoToneIcon from '@material-ui/icons/RemoveCircleOutlineTwoTone';
import CustomerFeedback from "./CustomerFeedback";
import { connect } from 'react-redux';
import Header from "./Header";
import Footer from "./Footer"

const mapStateToProps = (state) => {
    console.log("state", state.cartOpen);
    return {
        selectedBook: state.bookDetails,
        cartCount: state.cartCount,
        cartBookList: state.cartBookList
    }
}

const service = new UserService();

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class BookDeatail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputQuantity: true,
            getCart: [],
            cartId: "",
            loader: false,
            cartCount: this.props.cartCount,
            cartBag: false
        }
    }

    componentDidMount() {
        this.getCartBooks()
    }

    getCartBooks = () => {
        this.handleToggle()
        service.getCartItems().then((res) => {
            console.log("getCart", res);
            this.setState({ getCart: res.data.result });
            console.log("getCartdata", this.state.getCart);
            this.handleClose()
        })
    }

    addedtoCart = (value) => {
        this.setState({ inputQuantity: !this.state.inputQuantity })
        let data = {
            isCart: true
        }
        // this.handleToggle()
        let token = localStorage.getItem('Token')
        service.addToCartBook(data, value._id, token).then((res) => {
            console.log(value);
            console.log(res);
            this.getCartBooks()
            this.setState({ cartId: value._id })
            console.log("cartId", this.state.cartId);
            // for batch update after click cart
            let count = this.state.cartCount + 1
            this.setState({ cartCount: count })
            console.log(this.state.cartCount);
            // this.handleClose()
        })
            .catch((err) => {
                this.handleClose()
                console.log(err);
            })
    }

    increaseBook = (quantity, productid) => {
        console.log("quantity", quantity);
        // this.componentDidMount();
        let data = {
            "quantityToBuy": quantity + 1
        }
        console.log(data, productid);
        service.cartQuantity(data, productid).then((res) => {
            console.log(res);
            // props.get();
        }).catch((err) => {
            console.log(err);
        })
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ loader: false });
    };

    handleToggle = () => {
        this.setState({ loader: !this.state.loader });
    };

    allCartBooks = (id) => {
        console.log(id);
        let cbook = this.state.getCart.find(function (element) {
            console.log(element.product_id._id);
            if (element.product_id._id == id) {
                console.log("true");
                return true
            }
            else {
                console.log("false");
                return false
            }
        })
        let cb = Boolean(cbook)
        return cb
    }

    render() {
        const { classes } = this.props;
        console.log("selectedbook", this.state.getCart);
        {
            this.state.getCart.map((v) => {
                console.log("book", v.product_id.bookName);
            })
        }
        return (
            <>
                {this.state.loader ?
                    <Backdrop
                        className={classes.backdrop}
                        open={this.state.loader}
                        onClick={this.handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop> : <>
                        <Header headerTag={false} getCartBook={this.state.cartCount} />
                        <div className="mainContainer">
                            <div className="container">
                                <div className="imgs-container">
                                    <div className="twoimg-comtainer">
                                        <div className="imgsmall1">
                                            <img src={Book} className="mediumimg" alt="" />
                                        </div>
                                        <div className="image2">
                                            <img src={Book} className="mediumimg" alt="" />
                                        </div>
                                    </div>
                                    <div className="mainimg">
                                        <img src={image} className="bigimg" alt="" />
                                    </div>
                                </div>
                                <div className="wishlist">
                                    {this.allCartBooks(this.props.selectedBook._id) ? <><div className="addOrRemove">
                                        Added To Bag
                                    </div></> : <button
                                        className="addtobag"
                                        onClick={() => this.addedtoCart(this.props.selectedBook)}
                                    >
                                        Add To Bag
                                    </button> 
                                    }

                                </div>
                            </div>
                            <div className="details">
                                <div className="bookdetail">
                                    <div className="cardcontainer">
                                        <div className="titlee">
                                            {this.props.selectedBook.bookName}
                                        </div>
                                        <div className="author">
                                            <span className="byauthor">by</span>
                                            <span className="authorname">
                                                {this.props.selectedBook.author}
                                            </span>
                                        </div>
                                        <div className="card-rating">
                                            <div className="star">
                                                <div className="number">4.5 &#9733;</div>
                                                <div className="rating-star">
                                                    <i class="zmdi zmdi-star"></i>
                                                </div>
                                            </div>

                                            <span style={{ color: "grey", marginLeft: "8px" }}>(20)</span>
                                        </div>
                                        <div className="card-price">
                                            <span className="discount-price">
                                                Rs.
                                                {this.props.selectedBook.discountPrice}
                                            </span>
                                            <span className="price">
                                                <strike>
                                                    Rs.
                                                    {this.props.selectedBook.price}
                                                </strike>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="horizoantalline">
                                    <hr></hr>
                                </div>
                                <div className="desc-book">
                                    <div className="desc-title">
                                        <span className="dot"></span>
                                        <span>Book Detail</span>
                                    </div>
                                    <div className="lorem">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                                        assumenda minus libero minima ad, optio recusandae! Laboriosam
                                        velit, labore nulla minima vel magni accusamus unde ratione
                                        nostrum rerum! Voluptas asperiores ratione tempora magni atque
                                        sunt doloribus velit molestias! Commodi blanditiis hic sunt illo
                                        cum libero repellat voluptates quia sapiente quos.
                                    </div>
                                </div>

                                <div className="horizoantalline">
                                    {" "}
                                    <hr></hr>
                                </div>
                                {/* <div className="customer-feedback-container">
                                    <span className="feedback">Customer Feedback</span>
                                    <CustomerFeedback />
                                </div>
                                <div className="reviews">

                                </div> */}
                            </div>
                        </div>
                        <Footer/>
                    </>
                }
            </>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BookDeatail))

