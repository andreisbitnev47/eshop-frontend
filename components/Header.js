import Link from './Link';
import A from './A';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import { withRouter } from 'next/router'
import classNames from 'classnames';
import { Translate } from './Translate';

const Header = ({ router, menuOpen, toggleMenuOpen }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light scrolled awake" id="ftco-navbar">
      <div className="container">
        <a className="navbar-brand" href="index.html">Modist</a>
        <button onClick={() => { toggleMenuOpen(!menuOpen) }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="oi oi-menu"></span> Menu
        </button>

        <div className={classNames('collapse', 'navbar-collapse', { show: menuOpen })} id="ftco-nav">
          <ul className="navbar-nav ml-auto">
            <Link href="/"><li className="nav-item"><A href="/" classNames={classNames('nav-link', {active: router.pathname === '/'})}><Translate id="navigation.home"/></A></li></Link>
            <Link href="/shop"><li className="nav-item"><A href="/shop" classNames={classNames('nav-link', {active: router.pathname === '/shop'})}><Translate id="navigation.shop"/></A></li></Link>
            <Link href="/about"><li className="nav-item"><A href="/about" classNames={classNames('nav-link', {active: router.pathname === '/about'})}><Translate id="navigation.about"/></A></li></Link>
            <Link href="/contact"><li className="nav-item"><A href="/contact" classNames={classNames('nav-link', {active: router.pathname === '/contact'})}><Translate id="navigation.contact"/></A></li></Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default compose(
  withRouter,
  withState('menuOpen', 'toggleMenuOpen', false)
)(Header)
