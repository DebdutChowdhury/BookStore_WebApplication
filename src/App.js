import './App.css';
import Router from "./Router/Router"
import { Provider } from 'react-redux'
import Store from "./Redux/Store/Store";
import store from "./Redux/Store/Store";

store.subscribe(()=>console.log("see store",store.getState()))

function App() {
  return (
    <>
    <Provider store={Store}>
      <Router/>
      </Provider>
    </>
  );
}

export default App;

