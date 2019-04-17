import { Query } from 'react-apollo'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import gql from 'graphql-tag'
import { Translate } from '../Translate';
import cart from '../../utils/shoppingCart';
import classNames from 'classnames';

export const productQuery = gql`
  query productQuery($handle: String!, $language: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title(language: $language)
      price
      imgBig
      descriptionLong(language: $language)
    }
  }
`

const InnerComponent = ({ router, itemAmount, updateItemAmount, addToCart, activeImage, setActiveImage }) => (
    <Query query={productQuery} variables={{ handle: router.query.handle, language: router.query.language }}>
      {({ loading, error, data: { productByHandle }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>

        return (
            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <a href="images/menu-2.jpg" className="image-popup">
                                <img src={`${process.env.BACKEND_URL}${productByHandle.imgBig[activeImage]}`} className="img-fluid" alt={`${productByHandle.title} image`}/>
                            </a>
                        </div>
                        {productByHandle.imgBig && productByHandle.imgBig.length > 1 ?
                            <div className="col-lg-6 smallImagesContainer desktop-hide-flex">
                                {productByHandle.imgBig.map((url, index) => (
                                    <div className={classNames('smallImage', {active: index === activeImage})}
                                        style={{backgroundImage: `url(${process.env.BACKEND_URL}${url})`}}
                                        onClick={() => { setActiveImage(index); }}
                                    ></div>
                                ))}
                            </div> : null}
                        <div className="col-lg-6 product-details pl-md-5">
                            <h3>{productByHandle.title}</h3>
                            <p className="price"><span>€{productByHandle.price}</span></p>
                            {productByHandle.descriptionLong.split('\n').map((paragraph, index) =>
                                <p className="descriptionParagraph">{paragraph}</p>)}
                            <div className="row mt-4">
                                {/* <div className="col-md-6">
                                    <div className="form-group d-flex">
                                        <div className="select-wrap">
                                            <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                <select name="" id="" className="form-control">
                                                    <option value="">Small</option>
                                                    <option value="">Medium</option>
                                                    <option value="">Large</option>
                                                    <option value="">Extra Large</option>
                                                </select>
                                            </div>
                                        </div>
                                </div> */}
                                <div className="w-100"></div>
                                <div className="input-group col-md-6 d-flex mb-3 buttons">
                                    <span className="input-group-btn mr-2">
                                        <button type="button" className="quantity-left-minus btn" onClick={() => { updateItemAmount(parseInt(itemAmount) - 1); }}>
                                            <i className="ion-ios-remove">-</i>
                                        </button>
                                    </span>
                                    <input onChange={(e) => { updateItemAmount(e.target.value); }} type="text" id="quantity" name="quantity" className="form-control input-number" value={itemAmount} min="1" max="100"/>
                                    <span className="input-group-btn ml-2">
                                        <button type="button" className="quantity-right-plus btn" onClick={() => { updateItemAmount(parseInt(itemAmount) + 1); }}>
                                            <i className="ion-ios-add">+</i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <p><span onClick={() => { addToCart(productByHandle.id); }} className="btn btn-primary py-3 px-5"><Translate id="main.add_to_cart"/></span></p>
                        </div>
                        {productByHandle.imgBig && productByHandle.imgBig.length > 1 ?
                            <div className="col-lg-6 smallImagesContainer mobile-hide-flex">
                                {productByHandle.imgBig.map((url, index) => (
                                    <div className={classNames('smallImage', {active: index === activeImage})}
                                        style={{backgroundImage: `url(${process.env.BACKEND_URL}${url})`}}
                                        onClick={() => { setActiveImage(index); }}
                                    ></div>
                                ))}
                            </div> : null}
                    </div>
                </div>
                <style jsx>{`
                    {
                        .active {
                            opacity: 1 !important;
                        }
                        .product-details span button {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 0;
                            width: 52px;
                        }
                        .smallImagesContainer {
                            display: flex;
                            margin-top: 35px;
                        }
                        .smallImage {
                            height: 100px;
                            width: 100px;
                            background-size: cover;
                            cursor: pointer;
                            margin-left: 10px;
                            opacity: 0.5;
                        }
                        .mobile-hide-flex {
                            display: flex !important;
                        }
                        .desktop-hide-flex {
                            display: none !important;
                        }
                        .descriptionParagraph {
                            margin-bottom: 0;
                        }
                        @media only screen and (max-width: 991px) {
                            .mobile-hide-flex {
                                display: none !important;
                            }
                            .desktop-hide-flex {
                                display: flex !important;
                            }
                            .product-details {
                                margin-top: 48px;
                            }
                            .product-details span button {
                                width: 72px;
                                height: 72px !important;
                                font-size: 24px;
                            }
                            .product-details .form-control {
                                height: 72px !important;
                                font-size: 24px;
                            }
                            .buttons {
                                margin-bottom: 24px !important;
                            }
                            .mr-2 {
                                margin-right: 14px !important;
                            }
                            .ml-2 {
                                margin-left: 14px !important;
                            }
                            h3 {
                                font-size: 36px;
                            }
                            .product-details .price span {
                                font-size: 40px;
                            }
                            p {
                                font-size: 28px;
                            }
                        }
                    }
                `}</style>
            </section>
        )
      }}
    </Query>
);

export const Product = compose(
    withRouter,
    withState('itemAmount', 'setItemAmount', 1),
    withState('activeImage', 'setActiveImage', 0),
    withHandlers({
        updateItemAmount: ({ setItemAmount }) => (amount) => {
            if (amount === '') {
                setItemAmount('');
            } else if (amount < 1) {
                setItemAmount(1);
            } else if (amount > 100) {
                setItemAmount(100);
            } else {
                setItemAmount(parseInt(amount) || 1);
            }
        },
        addToCart: ({ itemAmount, setItemAmount }) => (id) => {
            cart.addItemAmount(id, itemAmount);
            setItemAmount(1);
        }
    }),
)(InnerComponent);