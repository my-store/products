import React, { Component } from "react";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import "../../styles/templates/header/index.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpened: false,
    };
  }

  toggleSidebar = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened }, () => {
      const { refHandler } = this.props;
      return refHandler("Sidebar").toggleSidebar();
    });

  render() {
    const { sidebarOpened } = this.state;

    return (
      <div className="header">
        <p className="header-brand" onClick={() => (window.location = "/")}>
          RBX FAMILY BREBES
        </p>
        <div className="header-links">
          <BsWhatsapp
            title="WhatsApp"
            className="link"
            size={17}
            color="#eee"
          />
          <BsInstagram
            title="Instagram"
            className="link"
            size={17}
            color="#eee"
          />
          <BsTwitter title="Twitter" className="link" size={17} color="#eee" />
        </div>
        <div className="header-burger" onClick={this.toggleSidebar}>
          <div className={sidebarOpened ? "bgr-1 bgr-1-active" : "bgr-1"}></div>
          <div className={sidebarOpened ? "bgr-2 bgr-2-active" : "bgr-2"}></div>
          <div className={sidebarOpened ? "bgr-3 bgr-3-active" : "bgr-3"}></div>
        </div>
      </div>
    );
  }
}

export default Header;
