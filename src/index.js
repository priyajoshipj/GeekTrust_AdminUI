import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk" 
import { createStore,applyMiddleware , compose} from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import rootReducer from "./store/reducers/rootReducer";

// Sweet Alert 2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export default MySwal;
const middlewares = [thunk];

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
