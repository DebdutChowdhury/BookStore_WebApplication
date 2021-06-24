import './App.css';
import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter,Redirect } from 'react-router-dom';
import Signup from './Pages/Signup';
// import UserDashboard from './Pages/UserPanel/Userpanel'
// import Cart from './Pages/Cart/cart';


function App() {
  const Routing =()=>{
    return(
    <Router>
      <div>
        <Switch>
         <Route exact path="/" component={Signup} ></Route>         
         {/* <Route exact path="/userdashboard" component={UserDashboard} ></Route>          */}
         {/* <Route exact path="/cart" component={Cart} ></Route>          */}
         </Switch>
      </div>
    </Router>)
  }
  return (
    <>
     <Routing />
    </>
  );
}

export default App;
