
import Link from 'next/link'

export const ProductListItem = ({ id, title, img, price, handle }) => (
    <div className="col-sm col-md-6 col-lg-3">
        <div className="product">
        <Link as={`/shop/${handle}`} href={`/product?handle=${handle}`}>
            <h3><a href="#" className="img-prod"><img className="img-fluid" src={img} alt="Colorlib Template" /></a></h3>
        </Link>
        <div className="text py-3 px-3">
            <Link as={`/shop/${handle}`} href={`/product?handle=${handle}`}>
                <h3><a href="#">{title}</a></h3>
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
                <a href="#" className="add-to-cart"><span>Add to cart <i className="ion-ios-add ml-1"></i></span></a>
                <a href="#" className="ml-auto"><span><i className="ion-ios-heart-empty"></i></span></a>
            </p>
        </div>
        </div>
    </div>
)
