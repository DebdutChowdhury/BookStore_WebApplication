import React, { Component } from 'react';
import '../CSS/BookDisplay.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import BookService from '../Services/BookService';
import book1 from "../Assets/book1.png";
import { Button } from '@material-ui/core';
import Paginations from "@material-ui/lab/Pagination";
import PaginationBar from './PaginationBar';
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const service = new BookService();

const styles = theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  });

class BookDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            age: "",
            _books: [],
            _cartBooks: [],
            postsPerPage: "8",
            currentPage: "1",
            books: [],
            checkbook: false,
            loader:false
        })
    }

    changepage = (e, newpage) => {
        console.log("imvdn");
        console.log(e.target.value);
        this.setState({ currentPage: newpage });
    };

    storeBooks = (books) => {
        this.books = books;
        return this.books;
    }
    getBooks = () => {
        return this.books;
    }
    handleChange = (event) => {
        this.setState({ age: event.target.value });
    };

    componentDidMount() {
        this.GetAllBooks();
    }

    GetAllBooks = () => {
        var books = [];
        this.handleToggle()
        service.getAllBooks().then((res) => {
            books = res.data.result;
            var boo = this.storeBooks(books);
            this.setState({ _books: boo });
            this.sentBooksToHome(this.state._books)
            this.handleClose()
        }).catch((err) => {
            this.handleClose()
            console.log(err);
        })
    }
    getBooks = () => {
        console.log("rerender");
        this.setState({
            _books: this.getBooks(),
        })
    }

    goBookDetails = (book) => {
        this.props.selectedBook(book)
    }

    sentBooksToHome = (books) => {
        this.props.getBookFromBookDisplay(books)
    }


    handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({ loader:false});
    };

    handleToggle = () => {
      this.setState({ loader: !this.state.loader });
    };

    sort = (e) => {
        console.log([...this.state._books]);
        if(e.target.value === "asec"){
            let sortData = [...this.state._books].sort(function(a,b){
                return a.price - b.price
            })
            this.setState({_books:sortData})
        }
        else if(e.target.value === "dsec"){
            let sortData = [...this.state._books].sort(function(a,b){
                return b.price - a.price
            })
            this.setState({_books:sortData})
        }

        else if(e.target.value === "alp-asec"){
            let sortData = [...this.state._books].sort(function(a,b){
                if(a.bookName < b.bookName){
                    return -1;
                }
                return 0;
            })
            this.setState({_books:sortData})
        }
    }

    render() {
        console.log("searhed book in display",this.props.newSearchBook);
        const {classes} = this.props;
        const LastBook = this.state.currentPage * this.state.postsPerPage;
        const FirstBook = LastBook - this.state.postsPerPage;
        const currentBooks = this.props.search ? this.props.newSearchBook.slice(FirstBook, LastBook) : this.state._books.slice(FirstBook, LastBook);
        return (
            <>{this.state.loader ?
                <Backdrop
                  className={classes.backdrop}
                  open={this.state.loader}
                  onClick={this.handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>:
                <div className="usercontent">
                    <div className="inlineheader">
                        <div className="headers">
                            Books
                        </div>
                        <div className="select">
                            <select style={{ width: '157px', height: '47px' }} onChange={(e) => this.sort(e)} >
                                <option selected >Sort by relevance</option>
                                <option value="dsec" >Price: high to low</option>
                                <option value="asec"  >Price: low to high</option>
                                <option value="alp-asec" >Sort By: (A-Z)</option>
                            </select>
                        </div>
                    </div>
                    <div className="books">
                        {currentBooks.map((book, index) => {
                            return <div className="showbooks" onClick={()=>this.goBookDetails(book)}>
                                <div className="bookimage">
                                    <img src={book1} alt="" />
                                </div>
                                <div className="content">
                                    <div className="bookname">{book.bookName}</div>
                                    <div className="author">by{book.author}</div>
                                    <div className="rating">
                                        <div className="rate">4.5 &#9733;</div>
                                    </div>
                                    <div className="price">Rs.{book.price}</div>
                                </div>
                            </div>
                        })
                        }
                    </div>

                    {/* <PaginationBar _books={this.state._books}
                        postsPerPage={this.state.postsPerPage}
                        currentPage={this.state.currentPage}
                        changepage={this.changepage}
                    /> */}
                    <div className="paginationBlock">
                        <Paginations
                            count={Math.floor(this.state._books.length / this.state.postsPerPage + 1)}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.changepage}
                        />
                    </div>

                </div>
                }
            </>
        )
    }
}
export default withStyles(styles)(BookDisplay)