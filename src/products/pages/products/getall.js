import React, { Component } from "react";
import "../../styles/pages/products/getall.scss";

/* ======= | NUMBER FORMATING | ======= */
const numberFormat = (_x) =>
  _x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default class GetAllProducts extends Component {
  render() {
    const { database, getoneProduct } = this.props;
    return (
      <div className="getall-page">
        <div className="products-banner">
          <h1>SELAMAT DATANG DI RUMAH KAMI</h1>
          <p>
            Perkenalkan, kami adalah keluarga besar dari Brebes Jawa tengah,
            kami menawarkan beberapa produk (baru & bekas) secara online untuk
            dijual.
          </p>
          <p>
            Jika teman-teman berkenan, silahkan klik produk untuk melihat atau
            langsung menghubungi kami pada link yang kami sediakan.
          </p>
        </div>
        {database &&
          Object.keys(database).map((dt, _x_) => {
            const category = dt.toUpperCase();
            const list = database[dt];
            return (
              <div key={_x_}>
                <div className="product-category">
                  <h1 className="product-category-title">{category}</h1>
                </div>
                <div className="product-list">
                  {list &&
                    list.map(({ _id, nama, harga, photo, kondisi }, _y_) => {
                      return (
                        <div
                          key={_y_}
                          className="product-item"
                          onClick={() => getoneProduct(_id)}
                        >
                          <div
                            className="product-photo"
                            style={{
                              backgroundImage: `url("${photo}")`,
                            }}
                          ></div>
                          <h1 className="product-name">{nama}</h1>
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
