import React, { Component } from "react";
import { getCurrencies } from "./api/api";
import { Seotext } from "./Seotext";

class Converter extends Component {
  /*  state = {
    currencies: ["USD", "CNY", "CHF", "GBP", "EUR"],
    base: "USD",
    amount: "",
    convertTo: "EUR",
    result: "",
    date: ""
  };*/
  handleSelect = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };
  handleInput = (e) => {
    this.setState(
      {
        amount: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      getCurrencies(this.state.base).then((data) => {
        console.log(data);
        const date = data.query.timestamp;
        const result = data.data[this.state.convertTo] * this.state.amount;
        this.setState({ result, date });
      });
    }
  };

  calculate11111 = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(
        `https://freecurrencyapi.net/api/v2/latest?apikey=ccb9cf90-2c2b-11ec-8944-d7966e1a9b7b&base_currency=${this.state.base}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const date = data.query.timestamp;
          const result = data.data[this.state.convertTo] * this.state.amount;
          this.setState({ result, date });
        });
    }
  };
  handleSwap = (e) => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState({
      convertTo: base,
      base: convertTo,
      result: null
    });
  };

  render() {
    const { currencies, base, convertTo, result, date, amount } = this.props;

    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
              <h5>
                {amount} {base} is equevalent to
              </h5>
              <h2>
                {amount === ""
                  ? "0"
                  : result == null
                  ? "Calculating..."
                  : result}{" "}
                {convertTo}
              </h2>
              <p>
                {" "}
                Date : {amount === ""
                  ? "/ / /"
                  : new Date(date).toDateString()}{" "}
              </p>
              <div className="row">
                <div className="col-lg-10">
                  <form className="form-inline mb-4">
                    <input
                      value={amount}
                      type="number"
                      onChange={this.handleInput}
                      className="form-control form-control-lg mx-3"
                    />
                    <select
                      name="base"
                      value={base}
                      onChange={this.handleSelect}
                      className="form-control form-control-lg"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>

                  <form className="form-inline mb-4">
                    <input
                      disabled={true}
                      value={
                        amount === ""
                          ? "0"
                          : result == null
                          ? "Calculating..."
                          : result
                      }
                      className="form-control form-control-lg mx-3"
                    />
                    <select
                      name="convertTo"
                      value={convertTo}
                      onChange={this.handleSelect}
                      className="form-control form-control-lg"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>

                <div className="col-lg-2 align-self-center">
                  <h2 onClick={this.handleSwap} className="swap">
                    &#8595;&#8593;
                  </h2>
                  <Seotext />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
