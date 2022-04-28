import React, { Component } from "react";
import Loading from "react-loading";
import $ from "jquery";

// Style
import "../styles/pages/products/getall.scss";

// Getone page
import GetoneProduct from "./GetoneProduct";

// Database
import Database from "../database";
const db = new Database();

/* ======= | NUMBER FORMATING | ======= */
const numberFormat = (_x) =>
  _x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default class GetallProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: [],
      isloading: true,
    };
    this.__mounted__ = false;
  }

  async componentDidMount() {
    this.__mounted__ = true;

    $(window).scrollTop(0);

    // Load database
    const database = await db.load();
    this.__mounted__ &&
      this.setState({ database }, () =>
        setTimeout(
          () => this.__mounted__ && this.setState({ isloading: false }),
          1000
        )
      );
  }

  getoneProduct = async (getID) => {
    const data = await db.getone(getID);
    if (data) {
      await window.history.pushState({}, "Getone Product", "?id=" + getID);
      return this.props.setPage(
        <GetoneProduct imgPath={this.props.imgPath} data={data} />
      );
    }
  };

  render() {
    const { imgPath } = this.props;
    const { database, isloading } = this.state;

    return (
      <div className="getall-page">
        {/* Loading */}
        {isloading && (
          <div className="loading">
            <Loading type="bubbles" color="rgb(15, 54, 99)" />
          </div>
        )}

        {/* Product header */}
        <header className="products-banner">
          <h1>SELAMAT DATANG DI RUMAH KAMI</h1>
          <h2>
            Perkenalkan, kami adalah keluarga besar dari Brebes Jawa tengah,
            kami menawarkan beberapa produk (baru & bekas) secara online untuk
            dijual.
          </h2>
          <h2>
            Jika teman-teman berkenan, silahkan klik produk untuk melihat atau
            langsung menghubungi kami pada link yang kami sediakan.
          </h2>
        </header>

        {database &&
          Object.keys(database).map((dt, _x_) => {
            const category = dt.toUpperCase();
            const list = database[dt];
            return (
              <div key={_x_}>
                <div className="product-category">
                  <p className="product-category-title">{category}</p>
                </div>
                <div className="product-list">
                  {list &&
                    list.map(({ _id, nama, harga, photo, kondisi }, _y_) => {
                      return (
                        <div
                          key={_y_}
                          className="product-item"
                          onClick={() => this.getoneProduct(_id)}
                        >
                          <div
                            className="product-photo"
                            style={{
                              backgroundImage: `url("${imgPath + photo}")`,
                            }}
                          ></div>
                          <p className="product-name">{nama}</p>
                          <p className="product-info harga">
                            Rp. {numberFormat(harga)} -
                          </p>
                          <p className="product-info kondisi">{kondisi}</p>
                        </div>
                      );
                    })}
                </div>

                {/* Spacer */}
                {_x_ < database.length - 1 && (
                  <div className="product-list-spacer"></div>
                )}
              </div>
            );
          })}
      </div>
    );
  }
}
