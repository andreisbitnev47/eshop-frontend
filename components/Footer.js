import { withRouter } from 'next/router'
import compose from 'recompose/compose';
import classNames from 'classnames';
import { Translate } from './Translate';
import Link from './Link';
import A from './A';

const FooterComponent = ({ router }) => (
    <footer className="ftco-footer bg-light ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md">
            <div className="ftco-footer-widget mb-3">
              <h2 className="ftco-heading-2">EcoSnack</h2>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li><a href="https://facebook.com/Südamesnack-ecosnackee-432535830893254"><span className="icon-instagram"><img style={{ height: '22px', width: '22px' }} src="/static/img/facebook.svg"/></span></a></li>
                <li><a href="https://www.instagram.com/sudamesnackid"><span className="icon-instagram"><img style={{ height: '22px', width: '22px' }} src="/static/img/instagram.svg"/></span></a></li>
                <li><a href="#"><span className="icon-instagram"><img style={{ height: '22px', width: '22px' }} src="/static/img/twitter.svg"/></span></a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-3">
              <h2 className="ftco-heading-2"><Translate id="footer.shipping"/></h2>
              <ul className="list-unstyled">
                <li style={{ marginBottom: '12px'}}><img src="/static/img/omniva_logo.png" style={{ width: '40px', marginRight: '18px'}}/><Translate id="footer.omniva"/></li>
                <li style={{ marginBottom: '12px'}}><img src="/static/img/smartpost_logo.png" style={{ width: '40px', marginRight: '18px'}}/><Translate id="footer.smartpost"/></li>
                <li style={{ marginBottom: '12px'}}><img src="/static/img/local_pickup.svg" style={{ width: '40px', marginRight: '18px'}}/><Translate id="footer.local"/></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-3">
            	<h2 className="ftco-heading-2"><Translate id="footer.questions"/></h2>
            	<div className="block-23 mb-3">
	              <ul>
                  <li><a href="#"><span className="questionIcon"><img style={{ height: '18px', width: '18px' }} src="/static/img/pin.svg"/></span><span className="text">mtü Sammud vabadusse (80372661)</span></a></li>
	                <li><a href="tel:+372 58553375"><span className="questionIcon"><img style={{ height: '18px', width: '18px' }} src="/static/img/phone.svg"/></span><span className="text">+372 58553375</span></a></li>
	                <li><a href="mailto:ecosnack.ee@gmail.com"><span className="questionIcon"><img style={{ height: '18px', width: '18px' }} src="/static/img/email.svg"/></span><span className="text">ecosnack.ee@gmail.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-3">
            	<h2 className="ftco-heading-2"><Translate id="navigation"/></h2>
            	<div className="block-23 mb-3">
	              <ul>
	                <li><Link href="/shop"><span className="text"><A href="/shop"><Translate id="navigation.shop"/></A></span></Link></li>
	                <li><span className="text"><a href={`/${router.query.language}/blog`}><Translate id="navigation.blog"/></a></span></li>
                  <li><Link href="/privacy"><span className="text"><A href="/privacy"><Translate id="navigation.privacy-short"/></A></span></Link></li>
                  <li><Link href="/terms"><span className="text"><A href="/terms"><Translate id="navigation.terms-short"/></A></span></Link></li>
                  <li><span className="text"><a href={`/${router.query.language}/sitemap`}><Translate id="navigation.sitemap"/></a></span></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
				Copyright 2021 All rights reserved | This template is made with <i className="icon-heart color-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
						  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
			</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .questionIcon {
          margin-right: 10px;
        }
        .ftco-footer-widget {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        @media only screen and (max-width: 991px) {
          .ftco-section {
            padding-top: 35px !important;
          }
        }
      `}</style>
    </footer>
);

export const Footer = compose(
  withRouter,
)(FooterComponent)