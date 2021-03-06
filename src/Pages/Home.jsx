import React, { Component , Profiler} from 'react'
import BookDetails from '../Component/BookDetails';
import BookDisplay from '../Component/BookDisplay'
import Footer from '../Component/Footer'
import Header from "../Component/Header"
import MyCartBag from '../Component/MyCartBag';
import { withRouter } from 'react-router';
import BookServices from '../Services/BookService';
import { connect } from 'react-redux';
import { BOOK_SELECTED, CART_BOOKS, CART_DETAILS, CART_BOOKS_LIST } from '../Redux/Action/Constants';
import { TimerSharp } from '@material-ui/icons';

const mapStateToProps = (state) => {
    console.log("state",state.state.bookDetails);
    return {
        selectedBook:state.state.bookDetails,
        cartCount:state.state.cartCount,
        cartOpen:state.state.cartOpen,
        cartBookList:state.cartBookList
    }
}

// const mapDispatchToProps = dispatch => ({
//     bookSelected = book => {
//         dispatch({type:BOOK_SELECTED , value:book})
//     }
// })

const service = new BookServices()

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBook: "",
            showBooks: [],
            searchView: "",
            newSearchData: [],
            cartOpen:false,
            _cartbooks:[],
            filterData: [],
            cartCount:0,
            search:false,
            cartBookList:[]
        }
    }

    selectedBook = (book) => {
        this.setState({ selectedBook: book })
        console.log(book);
        this.props.dispatch({type:BOOK_SELECTED , value:book})
        this.props.history.push('/bookdetails')
    }

    getBookFromBookDisplay = (books) => {
        this.setState({ showBooks: books })
        console.log(books);
    }

    rendering = () => {   // for search things
        if(this.state.selectedBook === true){
            console.log("lalalala");
            return <BookDetails displayBookDetails={this.state.selectedBook} />
        }
        else{
            console.log("hahahha");
            return <BookDisplay
            selectedBook={this.selectedBook}
            getBookFromBookDisplay={this.getBookFromBookDisplay}

        />
        }
    }

    searchData = (data, value) => {   // for search things
        this.setState({ searchView: data })
        this.setState({search:true})
        console.log("Searched data: ", data);
        this.filterSearch(data)
        
    }

    filterSearch = (searchInput) => {   // for search things
        console.log(searchInput);
        var arr = [];
        this.state.showBooks.filter(data => data.bookName.toLowerCase().includes(searchInput.toLowerCase())).map((dataSearch) => {
            arr.push(dataSearch);
            console.log("searchedData", dataSearch);
        })
        this.setState({ newSearchData: arr })
        console.log("search arr", arr);
    }

    searchRendering = (data) => {  // for search things
        console.log(data);
        <BookDisplay searchBook={data}/>
    }

    openCart = async() => {
        await this.setState({cartOpen:!this.state.cartOpen})
        this.props.dispatch({type:CART_DETAILS, value:this.state.cartOpen})
        this.props.history.push("/cart")
    }

    getCartBook = () => {
        service.getCartItems().then((res) => {
            this.setState({ _cartbooks: res.data.result });
            this.props.dispatch({type:CART_BOOKS_LIST, value:res.data.result})
            this.props.dispatch({type:CART_BOOKS, value:res.data.result.length})
            console.log(res.data.result);
        })
    }

    componentDidMount(){
        this.getCartBook()
    }

    filer = (id,phase,actualDuration,baseDuration,startTime,commitTime,interactions) => {
        console.log(`${id}`)
        console.log(` phase:${phase}`);
        console.log(`Actual time: ${actualDuration}`);
        console.log(`Base time: ${baseDuration}`);
        console.log(`Start time: ${startTime}`);
        console.log(`Commit time: ${commitTime}`);
        console.log(`Interactions: ${interactions}`);
    }

render() {
    {this.state._cartbooks.map((value) => {
        console.log("value",value.product_id.bookName);
    })}
    return (
        <div>
        <Profiler id="header" onRender={this.filer}>
            <Header headerTag={true} value={true} searchData={this.searchData} openCart={this.openCart} getCartBook={this.state._cartbooks.length}/>
        </Profiler>
            {/* {this.state.selectedBook ? <BookDetails displayBookDetails={this.state.selectedBook} />
                : <BookDisplay
                    selectedBook={this.selectedBook}
                    getBookFromBookDisplay={this.getBookFromBookDisplay}

                />
            } */}
            <BookDisplay
                    selectedBook={this.selectedBook}
                    getBookFromBookDisplay={this.getBookFromBookDisplay}
                    search={this.state.search}
                    newSearchBook={this.state.newSearchData}
            /> 
            {/* {this.state.cartOpen ? <MyCartBag/>:null} */}
            {/* for search things */}
            {/* {this.state.searchView != "" ? this.searchRendering(this.state.newSearchData): this.rendering()}   */}

            <Footer/>
        </div>
    )
}
}
export default connect(mapStateToProps) (withRouter(Home))