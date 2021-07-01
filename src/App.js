import './App.css';
import Router from "./Router/Router"
import { Provider } from 'react-redux'
import Store from "./Store";
import store from './Store';

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

