import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/reduxStore";
import ReactReduxConverter from "./ReactReduxConverter";

import "./styles.css";

const App = () => {
  return (
    <div className="App">
      <ReactReduxConverter />
    </div>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
