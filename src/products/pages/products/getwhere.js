import React, { Component } from "react";

export default class Getwhere extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="products">
        <div className="product-item">
          <div className="product-photo"></div>
          <div className="product-detail">
            <h1 className="product-name">Name 1</h1>
            <p className="product-price">Price 1</p>
            <p className="product-info">Info 1</p>
          </div>
        </div>
      </div>
    );
  }
}
