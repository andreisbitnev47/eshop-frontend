import { Translate } from './Translate';
import Link from './Link';
import A from './A';

export const Footer = () => (
    <footer className="ftco-footer bg-light ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">EcoSnack</h2>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li><a href="#"><span className="icon-instagram"><img style={{ height: '22px', width: '22px' }} src="/static/img/twitter.svg"/></span></a></li>
                <li><a href="#"><span className="icon-instagram"><img style={{ height: '22px', width: '22px' }} src="/static/img/facebook.svg"/></span></a></li>
                <li><a href="#"><span className="icon-instagram"><img style={{ height: '22px', width: '22px' }} src="/static/img/instagram.svg"/></span></a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-5">
              <h2 className="ftco-heading-2"><Translate id="footer.menu"/></h2>
              <ul className="list-unstyled">
                <Link href="/"><li><A href="/" classnames="py-2 d-block"><Translate id="navigation.home"/></A></li></Link>
                <Link href="/"><li><A href="/" classnames="py-2 d-block"><Translate id="navigation.shop"/></A></li></Link>
                <Link href="/"><li><A href="/" classnames="py-2 d-block"><Translate id="navigation.about"/></A></li></Link>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
            	<h2 className="ftco-heading-2"><Translate id="footer.questions"/></h2>
            	<div className="block-23 mb-3">
	              <ul>
                  <li><a href="#"><span className="questionIcon"><img style={{ height: '18px', width: '18px' }} src="/static/img/pin.svg"/></span><span className="text"><Translate id="footer.address"/></span></a></li>
	                <li><a href={`tel:${<Translate id="footer.phone"/>}`}><span className="questionIcon"><img style={{ height: '18px', width: '18px' }} src="/static/img/phone.svg"/></span><span className="text"><Translate id="footer.phone"/></span></a></li>
	                <li><a href={`mailto:${<Translate id="footer.email"/>}`}><span className="questionIcon"><img style={{ height: '18px', width: '18px' }} src="/static/img/email.svg"/></span><span className="text"><Translate id="footer.email"/></span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">

            <p>
                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
				Copyright 2019 All rights reserved | This template is made with <i className="icon-heart color-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
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