import React, { Component } from 'react'
import '../CSS/Header.css';
import Book from '../Assets/education.svg'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Badge from '@material-ui/core/Badge';
import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import ProfilePopper from './ProfilePopper'

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state= {
      getCartAllBook:[],
      openProfilePopper:false
    }
  }

  sendSearchtext = (e) => {
    this.props.searchData(e.target.value)
  }



  clickToOpenCart = () => {
    this.props.openCart()
  }

  // getCartBook = (value) => {
  //   this.setState({getCartAllBook:value})
  // }


  render() {
    return (
      <>
        <div className="appbar">
          <div>
            <Link to="/home"><img src={Book} alt="" /></Link>
            {!this.props.headerTag && 
            <p className="book"><Link to="/home" style={{ listStyleType: "none", color: 'white', textDecoration: 'none' }}>Bookstore</Link></p>
            }

            {this.props.value && <div className="input">
              <SearchOutlinedIcon className="searchicon" />
              <input type="text" placeholder="Search" onChange={this.sendSearchtext} />
            </div>}
          </div>
          <div>
            <div className="pro" style={{cursor:"pointer"}} >
              <ProfilePopper />
              Profile
            </div>
            <div className="cart">
              <Link to="/cart"><Badge color="secondary"  badgeContent={this.props.getCartBook}>
                <ShoppingCartOutlinedIcon className="carticon" />
              </Badge></Link>
              Cart
            </div>
          </div>
        </div>
      </>
    )
  }
}
// onClick={this.clickToOpenCart}