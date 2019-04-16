import Link from './Link';
import A from './A';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import { withRouter } from 'next/router'
import classNames from 'classnames';
import { Translate } from './Translate';
import { ShoppingCart } from './ShoppingCart';

const Header = ({ router, menuOpen, toggleMenuOpen }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light scrolled awake" id="ftco-navbar">
      <div className="container">
      <Link href="/">
        <A href="/">
          <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <div id="logo" style={{
              backgroundImage: 'url(/static/img/logo.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}></div>
          </div>
        </A>
      </Link>
        <div className="buttonsCotainer">
          <div className="desktop-hide">
            <A href="/cart" classnames="nav-link">
              <ShoppingCart />
            </A>
          </div>
          <button onClick={() => { toggleMenuOpen(!menuOpen) }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <img src="/static/img/menu.svg" className="menuIcon"/>
          </button>
        </div>
        <div className={classNames('collapse', 'navbar-collapse', { show: menuOpen })} id="ftco-nav">
          <ul className="navbar-nav ml-auto">
            <Link href="/"><li className="nav-item"><A href="/" classnames={classNames('nav-link', {active: router.pathname === '/'})}><Translate id="navigation.home"/></A></li></Link>
            <Link href="/shop"><li className="nav-item"><A href="/shop" classnames={classNames('nav-link', {active: router.pathname === '/shop'})}><Translate id="navigation.shop"/></A></li></Link>
            <Link href="/about"><li className="nav-item"><A href="/about" classnames={classNames('nav-link', {active: router.pathname === '/about'})}><Translate id="navigation.about"/></A></li></Link>
            <Link href="/cart">
              <li className="nav-item mobile-hide">
                <A href="/cart" classnames="nav-link">
                  <ShoppingCart />
                </A>
              </li>
            </Link>
            {/* <Link href="/contact"><li className="nav-item"><A href="/contact" classNames={classNames('nav-link', {active: router.pathname === '/contact'})}><Translate id="navigation.contact"/></A></li></Link> */}
          </ul>
          <div className="languageBarContainer">
            <ul className="languageBar">
                <li>
                  <a href={`/en${router.route === '/index' ? '/' : router.route}`}>
                    <div style={{ backgroundImage: 'url(/static/img/en.svg)'}} className={classNames({active: router.query.language === 'en'})}></div>
                  </a>
                </li>
                <li>
                  <a href={`/est${router.route === '/index' ? '/' : router.route}`}>
                    <div style={{ backgroundImage: 'url(/static/img/est.svg)'}} className={classNames({active: router.query.language === 'est'})}></div>
                  </a>
                </li>
                <li>
                  <a href={`/rus${router.route === '/index' ? '/' : router.route}`}>
                    <div style={{ backgroundImage: 'url(/static/img/rus.svg)'}} className={classNames({active: router.query.language === 'rus'})}></div>
                  </a>
                </li>
              {/* <li><img src={`${process.env.FRONTEND_URL}/static/img/en.svg`} style={{ height: '40px', width: '40px' }}/></li> */}
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .buttonsCotainer {
          display: flex;
        }
        .menuIcon {
          width: 36px;
          height: 36px;
          margin-left: 20px;
        }
        .languageBarContainer {
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
        .languageBar {
          list-style-type: none;
          display: flex;
          margin: 0;
        }
        .languageBar li {
          display: inline;
          margin-right: 10px;
        }
        .languageBar div {
          height: 15px;
          width: 30px;
          background-size: cover;
          background-position: center;
        }
        .languageBar li a .active {
          height: 15px;
          width: 30px;
        }
        #logo {
          height: 60px;
          width: 150px;
        }
        .mobile-hide {
          display: block
        }
        .desktop-hide {
          display: none;
        }
        @media only screen and (max-width: 991px) {
          .mobile-hide {
            display: none;
          }
          .desktop-hide {
            display: block;
          }
          #logo {
            height: 90px;
            width: 225px;
          }
          .languageBarContainer {
            justify-content: flex-start;
          }
          .languageBar {
            padding-left: 0;
            padding-top: 20px;
            padding-bottom: 20px;
          }
          .languageBar div {
            height: 30px;
            width: 60px;
            background-size: cover;
            background-position: center;
          }
          .languageBar li a .active {
            height: 30px;
            width: 60px;
          }
          .languageBar li {
            margin-right: 25px;
          }
        }
      `}</style>
    </nav>
  );
}

export default compose(
  withRouter,
  withState('menuOpen', 'toggleMenuOpen', false),
)(Header)
