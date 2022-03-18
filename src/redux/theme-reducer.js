import { getCBRApiCurrencies } from "../api/apiCBR";

const THEME_COLOR = "THEME_COLOR";

const initialState = {
  lang: "EN",
  color: ""
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_COLOR: {
      return {
        ...state,
        color: action.color
      };
    }
    default:
      return state;
  }
};

export const setThemeColor = (color) => ({ type: THEME_COLOR, color });

export const setLang = (allData) => ({
  type: GET_BASE_CURRENCY,
  allData
});
export const getBaseCurrency = (baseCurrency) => (dispatch) => {
  getCBRApiCurrencies(baseCurrency).then((response) => {
    dispatch(setLang(response));
  });
};
