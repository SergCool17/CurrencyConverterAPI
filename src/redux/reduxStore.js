import { applyMiddleware, combineReducers, createStore } from "redux";
import { getCurrencyReducer } from "./currency-reducer";
import { themeReducer } from "./theme-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  currenciesData: getCurrencyReducer,
  theme: themeReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;
