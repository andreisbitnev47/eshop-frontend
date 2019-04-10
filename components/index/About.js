import { Translate } from '../Translate';
import Link from '../Link';
import A from '../A';

export const About = ({ img, title, mainText }) => (
    <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${process.env.BACKEND_URL}${img.url})`, minHeight: '300px'}}>
                </div>
                <div className="col-lg-7 py-5 wrap-about pb-md-5">
                    <div className="heading-section-bold mb-5 mt-md-5">
                        <div className="ml-md-0">
                            <h2 className="mb-4">{title}</h2>
                        </div>
                    </div>
                    <div className="pb-md-5">
                        {mainText.map((paragpraph, cnt) => (
                            <p key={cnt} className="content_paragraph">{ paragpraph }</p>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center' }}>
                        <Link href="/about">
                            <A href="/about" classNames="btn btn-primary py-3 px-5">
                                <Translate id="main.read_more"/>
                            </A>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </section>
);