import React, { Component } from "react";
import "../../styles/pages/products/getone.scss";
import {
  BsWhatsapp,
  BsTag,
  BsFacebook,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
// import $ from "jquery";

/* ======= | NUMBER FORMATING | ======= */
const numberFormat = (_x) =>
  _x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default class GetoneProduct extends Component {
  render() {
    const { data, imgPath } = this.props;
    const { nama, warna, harga, kondisi, tlp } = data;

    // Tags
    let tags = nama.split(/\s/gi).map((tg) => tg); // Ubah string ke array
    tags = tags.sort(() => Math.random() - 0.5); // Acak array

    // Info
    const info = "";

    return (
      <div className="getone-page">
        <div
          className="product-photo"
          style={{ backgroundImage: `url("${imgPath + data.photo}")` }}
        ></div>

        {/* Info */}
        <div className="product-info">
          {/* Name */}
          <h1 className="product-name">{nama}</h1>

          {/* Price */}
          <p className="product-price">Rp {numberFormat(harga)}</p>

          {/* Condition */}
          <p className="product-condition">{kondisi}</p>

          {/* Color */}
          {warna.length > 0 && <p className="product-color">{warna}</p>}
        </div>

        {/* Line spacer */}
        <div className="product-spacer"></div>

        {/* Detail */}
        {info.length > 0 && (
          <>
            <div className="product-detail">
              <h1>Detail</h1>
              <p>{info}</p>
            </div>
            {/* Line spacer */}
            <div className="product-spacer"></div>
          </>
        )}

        {/* Tags */}
        <div className="product-tags">
          <BsTag size={18} />
          <p>{tags.toString().replace(/\,/gi, " | ")}</p>
        </div>

        {/* Contact */}
        <div className="product-contact">
          <div className="whatsapp">
            <BsWhatsapp size={16} />
            <p>{tlp}</p>
          </div>
        </div>

        {/* Line spacer */}
        <div className="product-spacer"></div>

        {/* Share */}
        <div className="product-share">
          <h1>Bagikan</h1>
          <div className="share-item">
            <BsWhatsapp size={20} style={{ marginRight: 7 }} />
            <BsInstagram size={20} style={{ marginRight: 7 }} />
            <BsFacebook size={20} style={{ marginRight: 7 }} />
            <BsTwitter size={20} />
          </div>
        </div>
      </div>
    );
  }
}
