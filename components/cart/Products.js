import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import { Query } from 'react-apollo'
import ErrorMessage from '../ErrorMessage'
import { withRouter } from 'next/router'
import classNames from 'classnames';
import gql from 'graphql-tag'
import Big from 'big.js';
import cart from '../../utils/shoppingCart';
import Link from '../Link';
import A from '../A';

import { Translate } from '../Translate';

export const productsQuery = gql`
  query products($ids: [ID]!, $language: String!) {
    products(ids: $ids) {
      id
      price
      title(language: $language)
      handle
      price
      imgBig
      descriptionLong(language: $language)
    }
  }
`

const InnerComponent = ({ cartItems, router }) => (
    <>
        {cartItems.length ? 
            <Query query={productsQuery} variables={{ ids: cartItems.map(({ id }) => id), language: router.query.language }}>
            {({ loading, error, data: { products }, fetchMore }) => {
                if (error) return <ErrorMessage message='Error loading items.' />
                if (loading) return <div>Loading</div>
                const productsObj = {};
                const itemIds = [];
                products.forEach(product => { productsObj[product.id] = product; itemIds.push(product.id) });
                const updatedCart = cart.updateItems(itemIds);
                // const amount = updatedCart.reduce((acc, item) => acc + item.amount, 0);
                // const price = updatedCart.reduce((acc, item) => acc + item.amount * itemPrices[item.id], 0);
                return <Cart products={productsObj} items={updatedCart}/>;
            }}
            </Query> :
            <EmptyCart />
        }
    </>
)

const EmptyCart = () => (
    <section className="ftco-section ftco-cart">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2><Translate id="cart.empty_cart"/></h2>
                </div>
            </div>
        </div>
        <style jsx>{`
            section {
                padding-top: 50px !important;
            }
            h2, p {
                text-align: center;
            }
            @media only screen and (max-width: 991px) {
            }
        `}</style>
    </section>
);

const Cart = ({ products, items }) => {
    return (<section className="ftco-section ftco-cart">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="header">
                        <div className="remove"></div>
                        <div className="product"><Translate id="cart.product"/></div>
                        <div className="price"><Translate id="cart.price"/></div>
                        <div className="quantity"><Translate id="cart.quantity"/></div>
                        <div className="total"><Translate id="cart.total"/></div>
                    </div>
                    {items.map(item => (
                        <div key={item.id} className="productContainer">
                            <div className="remove">
                                <div className="removeBtn" onClick={() => { cart.removeItem(item.id); }}>x</div>
                            </div>
                            <div className="product">
                                <Link as={`/shop/${products[item.id].handle}`} href={`/product?handle=${products[item.id].handle}`}>
                                    <A href={`/shop/${products[item.id].handle}`} styles={{ display: 'block', minWidth: '40%', maxWidth: '40%', width: '40%', margin: '20px'}}>
                                        <div className="img" style={{ backgroundImage: `url(${process.env.BACKEND_URL}${products[item.id].imgBig[0]})` }}></div>
                                    </A>
                                </Link>
                                <div className="text">
                                    <Link as={`/shop/${products[item.id].handle}`} href={`/product?handle=${products[item.id].handle}`}>
                                        <h3 className="title">
                                            <A href={`/shop/${products[item.id].handle}`}>
                                                {products[item.id].title}
                                            </A>
                                        </h3>
                                    </Link>
                                    <p>{products[item.id].descriptionLong.length > 100 ?
                                        `${products[item.id].descriptionLong.slice(0, 97)} ...` :
                                        products[item.id].descriptionLong}</p>
                                </div>
                            </div>
                            <div className="price">€{Big(products[item.id].price).toFixed(2)}</div>
                            <div className="quantity">
                                <input onInput={(e) => { 
                                    cart.updateItemAmount(item.id, e.target.value) 
                                }} className="quantity form-control input-number" value={item.amount}/>
                            </div>
                            <div className="total">€{Big(cart.checkAmount(item.amount)).times(Big(products[item.id].price)).toFixed(2) || 0}</div>
                            <div className="mobileHeader">
                                <div className="price"><Translate id="cart.price"/></div>
                                <div className="quantity"><Translate id="cart.quantity"/></div>
                                <div className="total"><Translate id="cart.total"/></div>
                                <div className="remove"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col col-lg-5 mt-5 cart-wrap">
                    <div className="cart-total mb-3">
                        <p className="d-flex total-price">
                            <span><Translate id="cart.total"/></span>
                            <span>€{(items.reduce((acc, item) => Big(cart.checkAmount(item.amount)).times(Big(products[item.id].price)).plus(acc), Big('0'))).toFixed(2)}</span>
                        </p>
                    </div>
                    <p className="text-center">
                        <Link href="/checkout"><A href="/checkout" classnames="btn btn-primary py-3 px-4"><Translate id="cart.proceed_to_checkout"/></A></Link>
                    </p>
                </div>
            </div>
        </div>
        <style jsx>{`
            section {
                padding-top: 50px !important;
            }
            .product, .remove, .price, .quantity, .total {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                min-height: 68px;
                order: 0;
            }
            .mobileHeader {
                display: none;
                background: rgba(0, 0, 0, 0.03);
                margin-bottom: 10px;
            }
            .header, .productContainer {
                display: flex;
            }
            .header {
                background: rgba(0, 0, 0, 0.03);
            }
            .product {
                width: 350px;
                position: relative;
                justify-content: flex-start;
            }
            .header .product {
                justify-content: center;
                color: black;
            }
            .productContainer .product {
                align-items: flex-start;
            }
            .product .img {
                width: 100%;
                background-position: center;
                background-size: cover;
                height: auto;
                margin: 0;
            }
            .product .img:before{
                content: "";
                display: block;
                padding-top: 100%;
            }
            .product .text {
                margin-top: 20px;
            }
            .remove {
                width: 60px;
            }
            .price, .quantity, .total {
                flex-grow: 1;
                flex-basis: 0;
                flex-shrink: 1;
                color: black;
                font-size: 15px;
            }
            .remove .removeBtn {
                padding: 10px 10px 11px 10px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                line-height: 8px;
                cursor: pointer;
            }
            .remove .removeBtn:hover {
                color: white;
                background: rgb(241, 184, 196);
            }
            @media only screen and (max-width: 991px) {
                .product, .remove, .price, .quantity, .total {

                }
                .header {
                    display: none;
                }
                .mobileHeader {
                    display: flex;
                    width: 100%;
                }
                .productContainer {
                    flex-wrap: wrap;
                    padding-bottom: 30px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    margin-bottom: 30px;
                }
                .product {
                    width: 100%;
                    order: 1;
                    justify-content: flex-start;
                }
                .product .text {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                }
                .mobileHeader {
                    order: 2;
                }
                .price {
                    order: 3;
                }
                .quantity {
                    order: 4;
                }
                .quantity input {
                    max-width: 100%;
                }
                .total {
                    order: 5;
                }
                .remove {
                    order: 6;
                }
                .remove .removeBtn {
                    padding: 15px 15px 17px 15px;
                    line-height: 13px;
                }
                .total-price {
                }
                .cart-wrap {
                    margin-top: 10px !important;
                }
            }
        `}</style>
    </section>);
};

export const Products = compose(
    withRouter,
    withState('cartItems', 'setCartItems', []),
    lifecycle({
        componentDidMount() {
            const cartItems = cart.getAllClean();
            const setCartItems = this.props.setCartItems;
            if (cartItems.length) {
                setCartItems(cartItems);
            }
            cart.emitter.on('storageUpdated', (updatedItems) => {
                setCartItems(updatedItems);
            })
        }
    }),
)(InnerComponent);
