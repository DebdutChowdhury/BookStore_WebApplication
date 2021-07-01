import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from '../Pages/Signup';
import Home from '../Pages/Home';
import Auth from "../AuthRoute"
import ProtectedRoute from '../ProtectedRoute';
import MyCartBag from '../Component/MyCartBag';
import OrderSucess from '../Component/OrderSuccess';
import BookDeatail from '../Component/BookDetails';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Auth exact path="/" component={Signup} />
                <ProtectedRoute exact path="/home" component={Home} />
                <ProtectedRoute exact path="/bookdetails" component={BookDeatail} />
                <Route path="/cart" component={MyCartBag}/>
                <Route exact path="/ordersucess" component={OrderSucess} />  
            </Switch>
        </BrowserRouter>
    )
}


export default Router;
