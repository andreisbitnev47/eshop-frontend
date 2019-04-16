import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import get from 'lodash/get';
import { withRouter } from 'next/router'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Big from 'big.js';
import cart from '../../utils/shoppingCart';
import { ShippingProvider } from './ShippingProvider';

import { Translate } from '../Translate';

const productsQuery = gql`
  query products($ids: [ID]!) {
    products(ids: $ids) {
      id
      price
    }
  }
`

const orderMutation = gql`
    mutation addOrder($shippingProviderId: ID!, $shippingProviderAddress: String!, $email: String!, $phone: String!, $orderProducts: [orderProductsInput]!, $language: String!) {
        addOrder (shippingProviderId: $shippingProviderId, shippingProviderAddress: $shippingProviderAddress, email: $email, phone: $phone, orderProducts: $orderProducts, language: $language) {
            order {
                id
            }
        }
    }
`

export const orderContentQuery = gql`
  query orderContentQuery($language: String!) {
    contnetsByGroup(group: "order") {
      id
      handle
      group
      title(language: $language)
      paragraph(language: $language)
    }
  }
`

const InnerComponent = ({ 
    cartItems,
    shippingProvider,
    setShippingProvider,
    setShippingProviderAddress,
    setShippingPrice,
    shippingPrice,
    shippingProviderAddress,
    email,
    setEmail,
    phone,
    setPhone,
    setOrderId,
    router,
    orderId }) => (
    <>
        {orderId ?
            <OrderComplete router={router} orderId={orderId} email={email} /> :
        cartItems.length ? 
            <Query query={productsQuery} variables={{ ids: cartItems.map(({ id }) => id) }}>
            {({ loading, error, data: { products }, fetchMore }) => {
                if (error) return <ErrorMessage message='Error loading items.' />
                if (loading) return <div>Loading</div>
                const itemPrices = {};
                const itemIds = [];
                products.forEach(product => { itemPrices[product.id] = product.price; itemIds.push(product.id) });
                const updatedCart = cart.updateItems(itemIds);
                const amount = updatedCart.reduce((acc, item) => acc.plus(Big(item.amount || 0)), Big('0'));
                const price = updatedCart.reduce((acc, item) => Big(item.amount || 0).times(itemPrices[item.id]).plus(acc), Big('0'));

                return <CheckoutForm 
                    amount={amount.toFixed(0)}
                    price={price.toFixed(2)}
                    shippingProvider={shippingProvider}
                    setShippingProvider={setShippingProvider}
                    setShippingProviderAddress={setShippingProviderAddress}
                    setShippingPrice={setShippingPrice}
                    shippingPrice={shippingPrice}
                    shippingProviderAddress={shippingProviderAddress}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                    cartItems={cartItems}
                    setOrderId={setOrderId}
                    language={router.query.language}
                />;
            }}
            </Query> :
            <EmptyCheckout />
        }
    </>
)

const OrderComplete = ({ router, orderId, email }) => (
    <Query query={orderContentQuery} variables={{ language: router.query.language }}>
      {({ loading, error, data: { contnetsByGroup }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>
        const contentObj = contnetsByGroup.reduce((acc, contentObj) => {
            acc[contentObj.handle] = contentObj;
            return acc;
        }, {});
        const content = {
            title: get(contentObj, 'order_complete.title[0]', ''),
            paragraph: get(contentObj, 'order_complete.paragraph[0]', ''),
        }
        cart.clearCart();
        return (
            <section className="ftco-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>{content.title}</h2>
                        <p>{content.paragraph.split('{{email}}').join(email).split('{{orderId}}').join(orderId)}</p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                h2, p {
                    text-align: center;
                }
                @media only screen and (max-width: 991px) {
                    h2 {
                        font-size: 46px;
                    }
                    p {
                        font-size: 26px
                    }
                }
            `}</style>
        </section>
        );
      }}
    </Query>
);

const EmptyCheckout = () => (
    <section className="ftco-section ftco-cart">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2><Translate id="cart.empty_cart"/></h2>
                </div>
            </div>
        </div>
        <style jsx>{`
            h2, p {
                text-align: center;
            }
            @media only screen and (max-width: 991px) {
                h2 {
                    font-size: 46px;
                }
                p {
                    font-size: 26px
                }
            }
        `}</style>
    </section>
);

const CheckoutForm = ({ 
    price,
    shippingProvider,
    setShippingProvider,
    setShippingProviderAddress,
    setShippingPrice,
    shippingPrice,
    shippingProviderAddress,
    email,
    setEmail,
    phone,
    setPhone,
    cartItems,
    setOrderId,
    language, }) => {
    return (<Mutation mutation={orderMutation}>
        {(addOrder, { data }) => (
          <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <form onSubmit={e => {
                            e.preventDefault();
                            addOrder({ variables: {
                                phone,
                                email,
                                language: 'en',
                                shippingProviderAddress,
                                shippingProviderId: shippingProvider,
                                orderProducts: cartItems,
                            } })
                            .then((data) => {
                                const orderId = get(data, 'data.addOrder.order.id', '');
                                setOrderId(orderId)
                            })
                            }} className="billing-form bg-light p-3 p-md-5">
                            <h3 className="mb-4 billing-heading"><Translate id="checkout.billing_details" /></h3>
                            <div className="row align-items-end">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="email"><Translate id="checkout.email" /></label>
                                        <input name="email" type="email" className="form-control" placeholder="" required value={email} onChange={(e) => { setEmail(e.target.value) }}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="phone"><Translate id="checkout.phone" /></label>
                                        <input name="phone" type="text" className="form-control" placeholder="" required value={phone} onChange={(e) => { setPhone(e.target.value) }}/>
                                    </div>
                                </div>
                                <ShippingProvider 
                                    shippingProvider={shippingProvider}
                                    setShippingProvider={setShippingProvider}
                                    setShippingProviderAddress={setShippingProviderAddress}
                                    setShippingPrice={setShippingPrice}
                                />
                                <div className="col-md-12">
                                    <div className="cart-detail cart-total bg-light p-3 p-md-4">
                                        <h3 className="billing-heading mb-4"><Translate id="checkout.cart_total" /></h3>
                                        <p className="d-flex">
                                            <span><Translate id="checkout.subtotal" /></span>
                                            <span>€{price}</span>
                                        </p>
                                        <p className="d-flex">
                                            <span><Translate id="checkout.delivery" /></span>
                                            <span>€{Big(shippingPrice || 0).toFixed(2)}</span>
                                        </p>
                                        <hr/>
                                        <p className="d-flex total-price">
                                            <span><Translate id="checkout.total" /></span>
                                            <span>€{Big(price).plus(Big(shippingPrice || 0)).toFixed(2)}</span>
                                        </p>
                                        <br/>
                                        <p><button type="submit" className="btn btn-primary py-3 px-4"><Translate id="checkout.place_order" /></button></p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        )}
      </Mutation>);
};

export const Checkout = compose(
    withRouter,
    withState('cartItems', 'setCartItems', []),
    withState('shippingProvider', 'setShippingProvider', ''),
    withState('shippingProviderAddress', 'setShippingProviderAddress', ''),
    withState('shippingPrice', 'setShippingPrice', 0),
    withState('email', 'setEmail', ''),
    withState('phone', 'setPhone', ''),
    withState('orderId', 'setOrderId', ''),
    lifecycle({
        componentDidMount() {
            const cartItems = cart.getAllClean();
            if (cartItems.length) {
                this.props.setCartItems(cartItems);
            }
        }
    }),
)(InnerComponent);