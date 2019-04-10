import {Breadcrumbs} from '../Breadcrumbs';
export const MainImage = ({ img, title, breadcrumbs}) => (
    <div className="hero-wrap hero-bread" style={{backgroundImage: `url('${process.env.BACKEND_URL}${img.url}`}}>
        <div className="container">
            <div className="row no-gutters slider-text align-items-center justify-content-center">
                <div className="col-md-9 text-center">
                <h1 className="mb-0 bread">{title}</h1>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
        </div>
        <style jsx>{`
            @media only screen and (max-width: 991px) {
                .hero-wrap .slider-text .bread {
                    font-size: 52px;
                }
            }
        `}</style>
    </div>
);