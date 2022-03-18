import * as axios from "axios";

//https://freecurrencyapi.net/api/v2/latest?apikey=ccb9cf90-2c2b-11ec-8944-d7966e1a9b7b&base_currency=${this.state.base}

export const getApiCurrencies = (baseCurrency) => {
  let baseResult = {
    query: {
      base_currency: "USD",
      timestamp: 1636746544
    },
    data: {
      USD: 1,
      JPY: 113.57144,
      CNY: 6.4008,
      CHF: 0.9153
    }
  };

  axios
    .get(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=02/03/2002`, {
      "Content-Type": "application/xml; charset=utf-8"
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      console.warn(
        "Unfortunately, due to server congestion, the data update date may be out of date"
      );
      return baseResult;
    });
};
