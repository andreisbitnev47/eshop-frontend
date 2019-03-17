export const About = ({ img, title, mainText }) => (
    <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
        <div className="container">
            <div className="row">
                <div className="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${process.env.BACKEND_URL}${img.url})`}}>
                    <a href="#" className="icon popup-vimeo d-flex justify-content-center align-items-center">
                        <span className="icon-play"></span>
                    </a>
                </div>
                <div className="col-md-7 py-5 wrap-about pb-md-5">
                    <div className="heading-section-bold mb-5 mt-md-5">
                        <div className="ml-md-0">
                            <h2 className="mb-4">{title}</h2>
                        </div>
                    </div>
                    <div className="pb-md-5">
                        {mainText.map((paragpraph, cnt) => (
                            <p key={cnt}>{ paragpraph }</p>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center' }}><a href="#" className="btn btn-primary py-3 px-5">Read more</a></p>
                </div>
            </div>
        </div>
    </section>
);