import { getApiCurrencies } from "../api/api";
//import { getApiCurrencies } from "../api/apiCBR";

const GET_BASE_CURRENCY = "GET_BASE_CURRENCY";
const SELECT_CURRENCY = "SELECT_CURRENCY";
const SET_AMOUNT = "SET_AMOUNT";
const SWAP_CURRENCY = "SWAP_CURRENCY";

let initialState = {
  currencies: ["AED", "CNY", "CHF", "GBP", "EUR"],
  base: "AED",
  date: "1636746500",
  convertTo: "JPY",
  amount: "",
  result: ""
};

export const getCurrencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BASE_CURRENCY: {
      return {
        ...state,
        // currencies: Object.entries(action.allData.data),
        currencies: action.allData.data,
        base: action.allData.query.base_currency,
        date: action.allData.query.timestamp
      };
    }
    case SELECT_CURRENCY: {
      return {
        ...state,
        ...action.currency,
        result: null
      };
    }
    case SET_AMOUNT: {
      return {
        ...state,
        amount: action.amount * 1,
        result:
          state.base !== "USD"
            ? Math.floor(
                (action.amount / state.currencies[state.base]) *
                  state.currencies[state.convertTo]
              )
            : Math.floor(action.amount * state.currencies[state.convertTo])
      };
    }
    case SWAP_CURRENCY: {
      return {
        ...state,
        base: action.base,
        convertTo: action.to,
        result: null
      };
    }

    default:
      return state;
  }
};

export const setCourses = (allData) => ({
  type: GET_BASE_CURRENCY,
  allData
});
export const getBaseCurrency = (baseCurrency) => (dispatch) => {
  getApiCurrencies(baseCurrency).then((response) => {
    dispatch(setCourses(response));
  });
};
export const currencySelect = (currency) => ({
  type: SELECT_CURRENCY,
  currency
});
export const setAmount = (amount) => ({
  type: SET_AMOUNT,
  amount
});
export const swapCurrency = (base, to) => ({
  type: SWAP_CURRENCY,
  base: to,
  to: base
});
