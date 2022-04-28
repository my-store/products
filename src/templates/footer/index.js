import React, { Component } from "react";
import $ from "jquery";
import {
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsInstagram,
  BsYoutube,
  BsSuitHeartFill,
  BsTelephoneFill,
} from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import "../../styles/templates/footer/index.scss";

class Footer extends Component {
  render() {
    const isPC = $(window).width() > 800 ? true : false;

    return (
      <div className="footer">
        {/* Social Media */}
        <div className="footer-social">
          <p className="footer-social-head">Ikuti Kami</p>
          <div className="footer-social-content">
            <BsFacebook
              color="#eee"
              title="Facebook"
              size={isPC ? 20 : 15}
              style={{
                marginLeft: isPC ? 5 : 3,
                marginRight: isPC ? 5 : 3,
                cursor: isPC ? "pointer" : "default",
              }}
            />
            <BsTwitter
              color="#eee"
              title="Twitter"
              size={isPC ? 20 : 15}
              style={{
                marginLeft: isPC ? 5 : 3,
                marginRight: isPC ? 5 : 3,
                cursor: isPC ? "pointer" : "default",
              }}
            />
            <BsGithub
              color="#eee"
              title="Github"
              size={isPC ? 20 : 15}
              style={{
                marginLeft: isPC ? 5 : 3,
                marginRight: isPC ? 5 : 3,
                cursor: isPC ? "pointer" : "default",
              }}
            />
            <BsYoutube
              color="#eee"
              title="Youtube"
              size={isPC ? 20 : 15}
              style={{
                marginLeft: isPC ? 5 : 3,
                marginRight: isPC ? 5 : 3,
                cursor: isPC ? "pointer" : "default",
              }}
            />
            <BsInstagram
              color="#eee"
              title="Instagram"
              size={isPC ? 20 : 15}
              style={{
                marginLeft: isPC ? 5 : 3,
                marginRight: isPC ? 5 : 3,
                cursor: isPC ? "pointer" : "default",
              }}
            />
            <FaTiktok
              color="#eee"
              title="Instagram"
              size={isPC ? 20 : 15}
              style={{
                marginLeft: isPC ? 5 : 3,
                marginRight: isPC ? 5 : 3,
                cursor: isPC ? "pointer" : "default",
              }}
            />
          </div>
        </div>

        {/* Pendukung */}
        <div className="footer-supporter">
          <p className="footer-supporter-head">Pendukung</p>
          <div className="footer-supporter-content">
            {/* Lembaga Kerja Sosial Brebes */}
            <div className="pendukung lks-brebes">
              <div className="footer-supporter-img supporter-lks"></div>
            </div>
            {/* UPK DAPM */}
            <div className="pendukung upk-dapm">
              <div className="footer-supporter-img supporter-upk"></div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="footer-disclaimer">
          <p>
            &copy; 2022 RBX Family Brebes
            <BsSuitHeartFill
              size={12}
              style={{ marginRight: 5, marginLeft: 5, marginTop: 2 }}
            />{" "}
            Indonesia
          </p>
          <p>
            <BsTelephoneFill
              size={12}
              style={{ marginRight: 5, marginTop: 2 }}
            />{" "}
            (+62) 813-935-2220
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
