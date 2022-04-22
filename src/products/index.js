import React, { Component, createRef } from "react";
import "./styles/index.scss";
import Loading from "react-loading";
import { BsWhatsapp } from "react-icons/bs";
import { Helmet } from "react-helmet";
import $ from "jquery";

// Templates
import Header from "./templates/header";
import Footer from "./templates/footer";
import Sidebar from "./templates/sidebar";

// Products
import GetoneProduct from "./pages/products/getone";
import GetAllProducts from "./pages/products/getall";

// Database
import Database from "./database";
const db = new Database();

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      database: [],
      isloading: true,

      imgPath:
        "https://raw.githubusercontent.com/my-store/products/main/public/products/",
    };
    this.pageRef = {
      Header: createRef(),
      Sidebar: createRef(),
      Page: createRef(),
      Footer: createRef(),
    };
    this.__mounted__ = false;
  }

  async componentDidMount() {
    this.__mounted__ = true;

    // Load database
    const database = await db.load();

    // Page
    let { page } = this.state;

    // Jika terdapat & maka parameter adalah array, jika tidak maka single-object
    let params = await window.location.search.substring(1);

    // Ada parameter
    if (params && params.length > 0) {
      if (params.match(/\&/gi)) {
        params = await params.split("&");
        // Convert to object
        for (let x = 0; x < params.length; x++) {
          const col = params[x].split("=")[0];
          const val = params[x].split("=").pop();
          params[x] = {};
          params[x][col] = val;
        }
      } else {
        const col = params.split("=")[0];
        const val = params.split("=").pop();
        params = {};
        params[col] = val;
      }

      // Multi parameter
      if (Array.isArray(params)) {
        // Sementara belum dipakai ...
      }

      // Single parameter
      else {
        const arg = Object.keys(params)[0];
        // Getone product
        if (arg == "id") {
          const dataExist = await db.getone(params[arg]);
          if (dataExist) {
            page = <GetoneProduct data={dataExist} />;
          }
        }
      }
    }

    // No parameter
    else {
      page = <GetAllProducts />;
    }

    // Back button handler
    $(window).on("popstate", () => this.__mounted__ && this.setPage(page));

    setTimeout(() => this.__mounted__ && this.setState({ database }), 500);
    setTimeout(() => this.__mounted__ && this.setPage(page), 1000);
    setTimeout(
      () => this.__mounted__ && this.setState({ isloading: false }),
      1500
    );
  }

  openWhatsapp = () => {
    // %20 = Spasi
    // %0a = Enter/ Linebreak
    let url = "https://wa.me/6281393552220/?text=";
    const writeLine = (length) => {
      let txt = "";
      for (let x = 0; x <= length; x++) {
        txt += "-";
        if (x == length) {
          txt += "%0a";
        }
      }
      return txt;
    };
    let msg = "";
    msg += writeLine(20);
    msg += "Halo%20RBX%20Family%20Brebes%0a"; // Header + 1 linebreak
    msg += writeLine(20);
    msg += "Nama:%20%0a";
    msg += "Alamat:%20%0a";
    msg += "Pesan%20Kamu:%20%0a";
    url += msg;
    return (window.location = url);
  };

  refHandler = (_getref) => this.pageRef[_getref].current;

  getoneProduct = async (getID) => {
    const data = await db.getone(getID);
    if (data) {
      await window.history.pushState({}, "Getone Product", "?id=" + getID);
      return this.setPage(<GetoneProduct data={data} />);
    }
  };

  setPage = (page) =>
    this.setState({
      page: {
        ...this.state.page,
        ...page,

        props: {
          ...page.props,
          getoneProduct: this.getoneProduct,
          database: this.state.database,
          setPage: this.setPage,
          imgPath: this.state.imgPath,
        },
        ref: this.pageRef.Page,
      },
    });

  render() {
    const { page, database, isloading } = this.state;

    return (
      <div className="page">
        <Helmet>
          <title>RBX FAMILY BREBES</title>
          {/* Chrome, Firefox OS and Opera */}
          <meta name="theme-color" content="#006d80" />
          {/* Windows Phone */}
          <meta name="msapplication-navbutton-color" content="#006d80" />
          {/* iOS Safari */}
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#006d80"
          />
        </Helmet>

        {isloading && (
          <div className="loading">
            <Loading type="bubbles" color="rgb(15, 54, 99)" />
          </div>
        )}

        {!isloading && (
          <div className="page-header">
            <Header
              setPage={this.setPage}
              ref={this.pageRef.Header}
              refHandler={this.refHandler}
            />
          </div>
        )}

        {!isloading && (
          <div className="page-sidebar">
            <Sidebar
              setPage={this.setPage}
              ref={this.pageRef.Sidebar}
              refHandler={this.refHandler}
              database={database}
            />
          </div>
        )}

        {/* Contact button */}
        {!isloading && (
          <div className="contact-btn" onClick={this.openWhatsapp}>
            <BsWhatsapp size={20} />
          </div>
        )}

        {!isloading && (
          <div className="page-content">
            <div className="content">{page}</div>
          </div>
        )}

        {!isloading && (
          <div className="page-footer">
            <Footer
              setPage={this.setPage}
              ref={this.pageRef.Footer}
              refHandler={this.refHandler}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Products;
