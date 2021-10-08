import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import {store} from "./config/redux/Store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right"/>
      <Router>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/" exact component={Login}/>
      </Router>
    </Provider>
  );
}

export default App;
