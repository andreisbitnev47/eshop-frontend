export const MainImage = ({ img, title, subTitle}) => (
    <div className="hero-wrap js-fullheight" style={{ backgroundImage: `url('${process.env.BACKEND_URL}${img.url}')`, height: '100vh' }}>
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
    </div>
);