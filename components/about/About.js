export const About = ({ imgs, title, paragraphs }) => (
    <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
        <div className="container">
            <h2 className="mb-4" style={{ textAlign: 'center', margin: '20px 0 20px 0' }}>{title}</h2>
            <div className="row">
                {paragraphs.map((paragraph, index) => (
                    <>
                        {
                            index % 2 !== 0 ?
                            (<>
                                <div className="col-lg-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${process.env.BACKEND_URL}${imgs[index].url})`}}>
                                </div>
                                <div className="col-lg-7 py-5 wrap-about pb-md-5">
                                    <div className="pb-md-5">
                                        <p className="content_paragraph">{ paragraph }</p>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </>) : (<>
                                <div className="col-lg-7 py-5 wrap-about pb-md-5 mobile-hide">
                                    <div className="pb-md-5">
                                        <p className="content_paragraph">{ paragraph }</p>
                                    </div>
                                </div>
                                <div className="col-lg-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${process.env.BACKEND_URL}${imgs[index].url})`}}>
                                </div>
                                <div className="col-lg-7 py-5 wrap-about pb-md-5 desktop-hide">
                                    <div className="pb-md-5">
                                        <p className="content_paragraph">{ paragraph }</p>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </>)
                        }
                        
                    </>
                ))}
            </div>
        </div>
    </section>
);