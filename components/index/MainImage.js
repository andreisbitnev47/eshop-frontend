import { Translate } from '../Translate';
export const MainImage = ({ img, title, subTitle}) => (
    <div className="hero-wrap js-fullheight" style={{ backgroundImage: `url('${process.env.BACKEND_URL}${img.url}')`, height: '100vh' }}>
      <div className="info">
        <div className="infoComponent">
          <img src="/static/img/shipping.svg"/>
          <span className="infoText"><Translate id="info.freeShipping"/></span>
        </div>
        <div className="infoComponent mobile-hide">
          <img src="/static/img/24h.svg"/>
          <span className="infoText"><Translate id="info.24h"/></span>
        </div>
      </div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="col-md-11 text-center">
            <h1>{title}</h1>
            <h2><span>{subTitle}</span></h2>
          </div>
          <div className="mouse">
                {/* <a href="#" className="mouse-icon">
                    <div className="mouse-wheel"><span className="ion-ios-arrow-down"></span></div>
                </a> */}
            </div>
        </div>
      </div>
      <style jsx>{`
          .info {
            margin-top: 60px;
            display: flex;
            background: #fff;
            height: 70px;
            justify-content: space-around;
            align-items: center;
          }
          .slider-text {
            margin-top: -120px;
          }
          .infoComponent img {
            height: 40px;
            margin-right: 20px;
          }
          .infoText {
            font-style: italic;
            font-size: 17px;
          }
          @media only screen and (max-width: 991px) {
              .info {
                margin-top: 80px;
              }
              .slider-text {
                margin-top: -140px;
              }
          }
        `}</style>
    </div>
);