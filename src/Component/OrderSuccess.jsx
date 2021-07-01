import '../CSS/OrderSuccess.css';
import React from 'react';
import Header from '../Component/Header';
import Order from '../Assets/last.png';
import Footer from './Footer';
import { Button} from '@material-ui/core';


export default class OrderSucess extends React.Component {
    constructor(props) {
        super(props);
    }
    goToDashboard=()=>{
        this.props.history.push('/home')
    }
    render() {
        return (
            <div>
                <Header />
                <div className="orderbody">
                    <div className="image">
                        <img src={Order} alt="" />
                    </div>
                    <div className="texts">
                        hurray!!! your order is confirmed the order  id is #12345 save the 
                        order id for further communication   
                    </div>
                     <div className="table">
                        <table>
                            <tr>
                                <th>Email us</th>
                                <th>Contact us</th>
                                <th>Address</th>
                            </tr>
                            <tr>
                                <td>admin@bookstore.com</td>
                                <td>#91 987654321</td>
                                <td>Ranaghat, Kolkata </td>
                            </tr>
                        </table>
                    </div>
                    <Button variant="contained" fullWidth className="continue-shop" onClick={this.goToDashboard}>CONTINUE SHOPPING</Button>

                </div> 
                     <Footer />
            </div>
        )
    }

}