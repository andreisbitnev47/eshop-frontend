
import Link from './Link';
import A from './A';
import { Translate } from './Translate';

export const ProductListItem = ({ id, title, img, price, handle }) => (
    <div className="col-sm col-md-6 col-lg-3">
        <div className="product">
        <Link as={`/shop/${handle}`} href={`/product?handle=${handle}`}>
            <h3><A href={`/shop/${handle}`} classNames="img-prod"><img className="img-fluid" src={`${process.env.BACKEND_URL}${img}`} alt="Colorlib Template" /></A></h3>
        </Link>
        <div className="text py-3 px-3">
            <Link as={`/shop/${handle}`} href={`/product?handle=${handle}`}>
                <h3><A href={`/shop/${handle}`}>{title}</A></h3>
            </Link>
            <div className="d-flex">
            <div className="pricing">
                <p className="price"><span className="price-sale">€{price}</span></p>
            </div>
            <div className="rating">
                <p className="text-right">
                <span className="ion-ios-star-outline"></span>
                <span className="ion-ios-star-outline"></span>
                <span className="ion-ios-star-outline"></span>
                <span className="ion-ios-star-outline"></span>
                <span className="ion-ios-star-outline"></span>
                </p>
            </div>
            </div>
            <hr/>
            <p className="bottom-area d-flex">
                <a href="#" className="add-to-cart"><span><Translate id="main.add_to_cart"/> <i className="ion-ios-add ml-1"></i></span></a>
                <a href="#" className="ml-auto"><span><i className="ion-ios-heart-empty"></i></span></a>
            </p>
        </div>
        </div>
    </div>
)
