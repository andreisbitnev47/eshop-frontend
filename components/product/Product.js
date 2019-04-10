import { Query } from 'react-apollo'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import { Translate } from '../Translate';

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

const InnerComponent = ({ router }) => (
    <Query query={productQuery} variables={{ handle: router.query.handle, language: router.query.language }}>
      {({ loading, error, data: { productByHandle }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>

        return (
            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-5">
                            <a href="images/menu-2.jpg" className="image-popup">
                                <img src={`${process.env.BACKEND_URL}${productByHandle.imgBig[0]}`} className="img-fluid" alt={`${productByHandle.title} image`}/>
                            </a>
                        </div>
                        <div className="col-lg-6 product-details pl-md-5">
                            <h3>{productByHandle.title}</h3>
                            <p className="price"><span>€{productByHandle.price}</span></p>
                            <p>{productByHandle.descriptionLong}</p>
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
                                        <button type="button" className="quantity-left-minus btn">
                                            <i className="ion-ios-remove">-</i>
                                        </button>
                                    </span>
                                    <input type="text" id="quantity" name="quantity" className="form-control input-number" value="1" min="1" max="100"/>
                                    <span className="input-group-btn ml-2">
                                        <button type="button" className="quantity-right-plus btn">
                                            <i className="ion-ios-add">+</i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <p><a href="cart.html" className="btn btn-primary py-3 px-5"><Translate id="main.add_to_cart"/></a></p>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    {
                        .product-details span button {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 0;
                            width: 52px;
                        }
                        @media only screen and (max-width: 991px) {
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
    withRouter
)(InnerComponent);