import { BsWhatsapp, BsTag, BsShare } from "react-icons/bs";
import "../styles/pages/products/getone.scss";
import { Helmet } from "react-helmet-async";
import React, { Component } from "react";
import Loading from "react-loading";
import $ from "jquery";

/* ======= | NUMBER FORMATING | ======= */
const numberFormat = (_x) =>
  _x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default class GetoneProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
    };
    this.__mounted__ = false;
  }

  componentDidMount() {
    this.__mounted__ = true;

    $(window).scrollTop(0);
    setTimeout(
      () => this.__mounted__ && this.setState({ isloading: false }),
      1000
    );
  }

  // Only work on HTTPS protocol
  shareThis = ({ nama }) => {
    const data = {
      text: nama.toUpperCase(),
      url: window.location,
    };
    return navigator.share(data);
  };

  render() {
    const { isloading } = this.state;
    const { imgPath, data } = this.props;
    let { nama, warna, harga, kondisi, tlp } = data;

    // // Tags
    let tags = nama.split(/\s/gi).map((tg) => tg); // Ubah string ke array
    tags = tags.sort(() => Math.random() - 0.5); // Acak array

    // // Info
    const info = "";

    return (
      <div className="getone-page">
        <Helmet>
          <title>{nama.toUpperCase()}</title>
          <meta name="description" content={info} />

          {/* SEO | Facebook */}
          <meta property="og:title" content={nama.toUpperCase()} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={window.location} />
          <meta
            property="og:image"
            content={imgPath + data.photo}
            key="image"
          />

          {/* SEO | Twitter */}
          <meta name="twitter:title" content={nama.toUpperCase()} />
          <meta name="twitter:description" content={info} />
          <meta name="twitter:image" content={imgPath + data.photo} />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        {/* Loading */}
        {isloading && (
          <div className="loading">
            <Loading type="bubbles" color="rgb(15, 54, 99)" />
          </div>
        )}

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
        <div className="product-share" onClick={() => this.shareThis(data)}>
          <BsShare size={15} />
        </div>
      </div>
    );
  }
}
