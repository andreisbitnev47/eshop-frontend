import Link from './Link';
import A from './A';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import { withRouter } from 'next/router'
import classNames from 'classnames';
import { Translate } from './Translate';

const Header = ({ router, menuOpen, toggleMenuOpen }) => {
  console.log(JSON.stringify(router));
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
        <button onClick={() => { toggleMenuOpen(!menuOpen) }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="oi oi-menu"></span> Menu
        </button>

        <div className={classNames('collapse', 'navbar-collapse', { show: menuOpen })} id="ftco-nav">
          <ul className="navbar-nav ml-auto">
            <Link href="/"><li className="nav-item"><A href="/" classNames={classNames('nav-link', {active: router.pathname === '/'})}><Translate id="navigation.home"/></A></li></Link>
            <Link href="/shop"><li className="nav-item"><A href="/shop" classNames={classNames('nav-link', {active: router.pathname === '/shop'})}><Translate id="navigation.shop"/></A></li></Link>
            <Link href="/about"><li className="nav-item"><A href="/about" classNames={classNames('nav-link', {active: router.pathname === '/about'})}><Translate id="navigation.about"/></A></li></Link>
            {/* <Link href="/contact"><li className="nav-item"><A href="/contact" classNames={classNames('nav-link', {active: router.pathname === '/contact'})}><Translate id="navigation.contact"/></A></li></Link> */}
          </ul>
          <div className="languageBarContainer">
            <ul className="languageBar">
                <li>
                  <a href={`/en${router.route === '/index' ? '/' : router.route}`}>
                    <div style={{ backgroundImage: 'url(/static/img/en.svg)'}} classNames={classNames({active: router.query.language === 'en'})}></div>
                  </a>
                </li>
                <li>
                  <a href={`/est${router.route === '/index' ? '/' : router.route}`}>
                    <div style={{ backgroundImage: 'url(/static/img/est.svg)'}} classNames={classNames({active: router.query.language === 'est'})}></div>
                  </a>
                </li>
                <li>
                  <a href={`/rus${router.route === '/index' ? '/' : router.route}`}>
                    <div style={{ backgroundImage: 'url(/static/img/rus.svg)'}} classNames={classNames({active: router.query.language === 'rus'})}></div>
                  </a>
                </li>
              {/* <li><img src={`${process.env.FRONTEND_URL}/static/img/en.svg`} style={{ height: '40px', width: '40px' }}/></li> */}
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
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
          height: 17px;
          width: 34px;
        }
        #logo {
          height: 60px;
          width: 150px;
        }
        @media only screen and (max-width: 991px) {
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
  withState('menuOpen', 'toggleMenuOpen', false)
)(Header)
