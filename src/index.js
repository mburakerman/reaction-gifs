import React from "react";
import { render } from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import App from "./app";

import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  selectedOption: { value: "happy", label: "Happy" },
  feelings: {},
  copiedToClipboard: false
};

const rootReducer = (state = initialState, action) => {
  if (action.type === "MENU") {
    return {
      ...state,
      selectedOption: action.payload
    };
  } else if (action.type === "GIPHY") {
    return {
      ...state,
      feelings: action.payload
    };
  } else {
    return state;
  }
};

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
