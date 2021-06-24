import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Pages/Signup';


function App() {
  const Routing = () => {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Signup} ></Route>
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
