import {Breadcrumbs} from '../Breadcrumbs';
export const MainImage = ({ img, title, breadcrumbs}) => (
    <div class="hero-wrap hero-bread" style={{backgroundImage: `url('${process.env.BACKEND_URL}${img.url}`}}>
        <div class="container">
            <div class="row no-gutters slider-text align-items-center justify-content-center">
                <div class="col-md-9 text-center">
                <h1 class="mb-0 bread">{title}</h1>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
        </div>
    </div>
);