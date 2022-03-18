import React, { Component } from "react";
import { connect } from "react-redux";

import {
  currencySelect,
  getBaseCurrency,
  setAmount,
  swapCurrency
} from "./redux/currency-reducer";

import { TextDelails } from "./TextDelails";

class ReactReduxConverter extends Component {
  onCurrencySelect = (e) => {
    return this.props.onCurrencySelect({ [e.target.name]: e.target.value });
    this.props.ongetBaseCurrency(this.props.base);
  };
  onSetAmount = (e) => {
    return this.props.onSetAmount(e.target.value);
  };
  onhandleSwap = (e) => {
    const base = this.props.base;
    const convertTo = this.props.convertTo;
    e.preventDefault();
    this.props.onhandleSwap(base, convertTo);
  };

  componentDidMount() {
    this.props.ongetBaseCurrency(this.props.base);
    console.log(this.props.base + " to " + this.props.convertTo);
  }
  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div>
              <span> RU </span>
              <span> EN </span>
            </div>
            <div className="card card-body">
              <h5>
                {this.props.amount} {this.props.base} is equevalent to
              </h5>
              <h2>
                {this.props.amount === ""
                  ? "0"
                  : this.props.result == null
                  ? "Calculating..."
                  : this.props.result}{" "}
                {this.props.convertTo}
              </h2>
              <p>
                {" "}
                Date :{" "}
                {this.props.amount === ""
                  ? "/ / /"
                  : new Date(this.props.date * 1000).toDateString(2)}{" "}
              </p>
              <div className="row">
                <div className="col-lg-10">
                  <form className="form-inline mb-4">
                    <input
                      type="number"
                      className="form-control form-control-lg mx-3"
                      onChange={this.onSetAmount}
                    />
                    <select
                      name="base"
                      className="form-control form-control-lg"
                      value={this.props.base}
                      onChange={this.onCurrencySelect}
                    >
                      {Object.entries(this.props.currencies)
                        .sort()
                        .map((currency) => (
                          <option
                            key={currency}
                            defaultValue={currency[this.props.base]}
                          >
                            {currency[0]}
                          </option>
                        ))}
                    </select>
                  </form>

                  <form className="form-inline mb-4">
                    <input
                      disabled={true}
                      value={
                        this.props.amount === ""
                          ? "0"
                          : this.props.result == null
                          ? "Calculating..."
                          : this.props.result
                      }
                      className="form-control form-control-lg mx-3"
                    />
                    <select
                      name="convertTo"
                      className="form-control form-control-lg"
                      value={this.props.convertTo}
                      onChange={this.onCurrencySelect}
                    >
                      {Object.entries(this.props.currencies)
                        .sort()
                        .map((currency) => (
                          <option
                            key={currency}
                            defaultValue={currency[this.props.convertTo]}
                          >
                            {currency[0]}
                          </option>
                        ))}
                    </select>
                  </form>
                </div>

                <div className="col-lg-2 align-self-center">
                  <h2 onClick={this.onhandleSwap} className="swap">
                    &#8595;&#8593;
                  </h2>
                </div>
                <TextDelails />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    base: state.currenciesData.base,
    currencies: state.currenciesData.currencies,
    convertTo: state.currenciesData.convertTo,
    result: state.currenciesData.result,
    date: state.currenciesData.date,
    amount: state.currenciesData.amount
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ongetBaseCurrency: (somebase) => {
      dispatch(getBaseCurrency(somebase));
    },
    onCurrencySelect: (event) => {
      dispatch(currencySelect(event));
    },
    onSetAmount: (amount) => {
      dispatch(setAmount(amount));
    },
    onhandleSwap: (base, to) => {
      dispatch(swapCurrency(base, to));
    }
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ReactReduxConverter);
