import React, { Component } from "react";
import "../../styles/templates/sidebar/index.scss";
// import GetWhereProducts from "../../pages/products/getwhere";
import $ from "jquery";

// Database
import Database from "../../database";
const db = new Database();

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: {
        marketPlace: [],
        aplikasi: [],
        game: [],
        tutorial: [],
        berita: [],
        giveaway: [],
        topup: [],
        article: [],
      },

      // Mobile
      sidebarOpened: false,
    };
    this.__mounted__ = false;
  }

  async componentDidMount() {
    this.__mounted__ = true;

    // const winSize = $(window).width();
    // if (winSize > 800) {
    //   this.loadIklan(); // Sementara non-aktif
    // }
    $("a").click((e) => e.preventDefault());

    // Marketplace
    const marketPlace = await db.load();

    // Aplikasi
    const aplikasi = ["Android", "Desktop", "Symbian", "Web"];

    // Game
    const game = ["Android", "Desktop", "Symbian"];

    // Turorial
    const tutorial = [];

    // Berita
    const berita = [];

    // Giveaway
    const giveaway = ["Pulsa", "Kuota", "Diamond", "Token Listrik"];

    // Topup
    const topup = ["Free Fire", "PUBG", "Mobile Legends", "AOV"];

    // Article
    const article = ["Teknologi", "Quotes", "Kuliner", "Traveling"];

    return (
      this.__mounted__ &&
      this.setState({
        links: {
          ...this.state.links,
          marketPlace,
          aplikasi,
          game,
          tutorial,
          berita,
          giveaway,
          topup,
          article,
        },
      })
    );
  }

  loadIklan = () => {
    let iklan = [];
    for (let x = 1; x < 10; x++) {
      iklan.push(`/background/wp-${x}.jpg`);
    }
    let counter = 0;
    const changeBG = () => {
      if (counter > 10) {
        counter = 0;
      }
      const target = $(".iklan-content");
      // target.html(`
      // <img src="${iklan[counter]}" />
      // `);
      target.css({ backgroundImage: `url("${iklan[counter]}")` });
      counter++;
    };
    setInterval(changeBG, 3000);
  };

  toggleSidebar = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  openLink = (link) => {
    // Remove sidebar-close-btn
    const { refHandler } = this.props;
    setTimeout(() => refHandler("Header").toggleSidebar(), 100);

    // Pending ...
    setTimeout(() => alert("[Admin] Akses sementara kami tutup!"), 500);
  };

  render() {
    // const { setPage } = this.props;
    const { sidebarOpened, links } = this.state;
    const {
      marketPlace,
      aplikasi,
      game,
      berita,
      tutorial,
      giveaway,
      topup,
      article,
    } = links;
    const market = Object.keys(marketPlace) || [];

    return (
      <div className={sidebarOpened ? "sidebar sidebar-active" : "sidebar"}>
        <div className="sidebar-content">
          {market && market.length > 0 && <h2>Marketplace</h2>}
          {market &&
            market.map((mkt, mkt_idx) => {
              // const url = "";
              return (
                <a
                  key={mkt_idx}
                  onClick={() => this.openLink(null)}
                  // onClick={() => setPage(<GetWhereProducts />)}
                >
                  {mkt[0].toUpperCase() + mkt.slice(1)}
                </a>
              );
            })}

          {aplikasi && aplikasi.length > 0 && <h2>Aplikasi</h2>}
          {aplikasi &&
            aplikasi.map((apk, apk_idx) => {
              // const url = "";
              return (
                <a key={apk_idx} onClick={() => this.openLink(null)}>
                  {apk}
                </a>
              );
            })}

          {game && game.length > 0 && <h2>Game</h2>}
          {game &&
            game.map((gme, gme_idx) => {
              // const url = "";
              return (
                <a key={gme_idx} onClick={() => this.openLink(null)}>
                  {gme}
                </a>
              );
            })}

          {tutorial && tutorial.length > 0 && <h2>Tutorial</h2>}
          {tutorial &&
            tutorial.map((ttr, ttr_idx) => {
              // const url = "";
              return (
                <a key={ttr_idx} onClick={() => this.openLink(null)}>
                  {ttr}
                </a>
              );
            })}

          {berita && berita.length > 0 && <h2>Berita</h2>}
          {berita &&
            berita.map((brt, brt_idx) => {
              // const url = "";
              return (
                <a key={brt_idx} onClick={() => this.openLink(null)}>
                  {brt}
                </a>
              );
            })}

          {giveaway && giveaway.length > 0 && <h2>Giveaway</h2>}
          {giveaway &&
            giveaway.map((gaw, gaw_idx) => {
              // const url = "";
              return (
                <a key={gaw_idx} onClick={() => this.openLink(null)}>
                  {gaw}
                </a>
              );
            })}

          {topup && topup.length > 0 && <h2>TopUp</h2>}
          {topup &&
            topup.map((tpup, tpup_idx) => {
              // const url = "";
              return (
                <a key={tpup_idx} onClick={() => this.openLink(null)}>
                  {tpup}
                </a>
              );
            })}

          {article && article.length > 0 && <h2>Artikel</h2>}
          {article &&
            article.map((artc, artc_idx) => {
              // const url = "";
              return (
                <a key={artc_idx} onClick={() => this.openLink(null)}>
                  {artc}
                </a>
              );
            })}
        </div>
        <div className="iklan">
          <div className="iklan-content">
            <h2>Sponsor</h2>
            <p>Disini akan ditampilkan slideshow sponsor/ banner utama.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
