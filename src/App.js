import React, { Component, createRef } from "react";
import { BsWhatsapp } from "react-icons/bs";
import $ from "jquery";

// Style
import "./styles/index.scss";

// Pages
import GetallProducts from "./pages/GetallProducts";
import GetoneProduct from "./pages/GetoneProduct";

// Templates
import Header from "./templates/header";
import Footer from "./templates/footer";
import Sidebar from "./templates/sidebar";

// Database
import Database from "./database";
const db = new Database();

// Server image path (Github)
const imgPath =
  "https://raw.githubusercontent.com/my-store/products/main/public/products/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
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

    // Back button handler
    $(window).on("popstate", () => {
      window.history.pushState({}, "Getall Product", "/");
      const page = <GetallProducts setPage={this.setPage} imgPath={imgPath} />;
      return this.__mounted__ && this.setPage(page);
    });

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

          // Id match
          if (dataExist) {
            page = <GetoneProduct imgPath={imgPath} data={dataExist} />;
          }

          // Id not match
          else {
            page = <GetallProducts setPage={this.setPage} imgPath={imgPath} />;
          }
        }
      }
    }

    // No parameter
    else {
      page = <GetallProducts setPage={this.setPage} imgPath={imgPath} />;
    }

    // Load the page
    this.setPage(page);
  }

  refHandler = (_getref) => this.pageRef[_getref].current;

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

  setPage = (page) => this.__mounted__ && this.setState({ page });

  render() {
    return (
      <div className="page">
        {/* Header */}
        <div className="page-header">
          <Header
            // setPage={this.setPage}
            ref={this.pageRef.Header}
            refHandler={this.refHandler}
          />
        </div>

        <div className="page-content">
          <div className="content">{page}</div>
        </div>

        {/* Sidebar */}
        <div className="page-sidebar">
          <Sidebar ref={this.pageRef.Sidebar} refHandler={this.refHandler} />
        </div>

        {/* Contact button */}
        <div className="contact-btn" onClick={this.openWhatsapp}>
          <BsWhatsapp size={20} />
        </div>

        {/* Footer */}
        <div className="page-footer">
          <Footer ref={this.pageRef.Footer} refHandler={this.refHandler} />
        </div>
      </div>
    );
  }
}

export default App;
