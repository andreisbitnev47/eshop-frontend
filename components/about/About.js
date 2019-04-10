export const About = ({ imgs, title, paragraphs }) => (
    <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="heading-section-bold mb-5 mt-md-5">
                        <div className="ml-md-0">
                            <h2 className="mb-4">{title}</h2>
                        </div>
                    </div>
                </div>
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
                                <div className="col-lg-7 py-5 wrap-about pb-md-5">
                                    <div className="pb-md-5">
                                        <p className="content_paragraph">{ paragraph }</p>
                                    </div>
                                </div>
                                <div className="col-lg-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${process.env.BACKEND_URL}${imgs[index].url})`}}>
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