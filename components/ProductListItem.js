
import Link from './Link';
import A from './A';
import { Translate } from './Translate';
import cart from '../utils/shoppingCart';

export const ProductListItem = ({ id, title, description, img, price, handle }) => (
    <div className="col-sm col-md-6 col-lg-3">
        <div className="product">
        <Link as={`/shop/${handle}`} href={`/product?handle=${handle}`}>
            <h3>
                <A href={`/shop/${handle}`} classnames="img-prod">
                    <div className="itemImg" style={{backgroundImage: `url(${process.env.BACKEND_URL}${img})`}}></div>
                </A>
            </h3>
        </Link>
        <div className="text py-3 px-3">
            <Link as={`/shop/${handle}`} href={`/product?handle=${handle}`}>
                <h3><A href={`/shop/${handle}`}>{title}</A></h3>
            </Link>
            <p className="productDescription">{description}</p>
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
                <a href="#" className="add-to-cart" onClick={(e) => {e.preventDefault(); cart.addItemAmount(id, 1)}}>
                    <Translate id="main.add_to_cart"/>
                    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>+</span>
                </a>
            </p>
        </div>
        </div>
        <style jsx>{`
        {
            .itemImg{
                width: 100%;
                background-position: center;
                background-size: cover;
            }
            .itemImg:before{
                content: "";
                display: block;
                padding-top: 100%;
            }
            @media only screen and (max-width: 991px) {
                .productDescription {
                    font-size: 28px;
                }
            }
        }
      `}</style>
    </div>
)
