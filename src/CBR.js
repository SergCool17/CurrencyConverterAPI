import React, { Component } from "react";

import * as axios from "axios";

class CBR extends Component {
  state = {
    authors: "some"
  };
  getApiCurrencies = () => {
    var self = this;
    axios
      .get("https://www.cbr-xml-daily.ru/daily_json.js", {
        "Content-Type": "application/xml; charset=utf-8"
      })
      .then(function (response) {
        self.setState({ authors: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    var self = this;
    axios
      .get("http://www.cbr.ru/scripts/XML_daily.asp?date_req=22/11/2021", {
        "Content-Type": "application/xml; charset=utf-8"
      })
      .then(function (response) {
        self.setState({ authors: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
              <h5>
                {this.props.amount} {this.props.base} is equevalent to
              </h5>
              11111
              {this.state.authors}
              <button onClick={this.getApiCurrencies}>GET</button>
              <h2>
                {this.props.amount === ""
                  ? "0"
                  : this.props.result == null
                  ? "Calculating..."
                  : this.props.result}{" "}
                {this.props.convertTo}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CBR;
