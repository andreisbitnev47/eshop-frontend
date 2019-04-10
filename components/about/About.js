export const About = ({ imgs, title, paragraphs }) => (
    <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${process.env.BACKEND_URL}${imgs[0].url})`}}>
                </div>
                <div className="col-lg-7 py-5 wrap-about pb-md-5">
                    <div className="heading-section-bold mb-5 mt-md-5">
                        <div className="ml-md-0">
                            <h2 className="mb-4">{title}</h2>
                        </div>
                    </div>
                    <div className="pb-md-5">
                        {paragraphs.map((paragpraph, cnt) => (
                            <p key={cnt} className="content_paragraph">{ paragpraph }</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);