import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Big from 'big.js';
import cart from '../../utils/shoppingCart';
import { ShippingProvider } from './ShippingProvider';

import { Translate } from '../Translate';

export const productsQuery = gql`
  query products($ids: [ID]!) {
    products(ids: $ids) {
      id
      price
    }
  }
`

const InnerComponent = ({ cartItems, shippingProvider, setShippingProvider, setShippingProviderAddress, setShippingPrice, shippingPrice }) => (
    <>
        {cartItems.length ? 
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
                />;
            }}
            </Query> :
            <EmptyCheckout />
        }
    </>
)

const EmptyCheckout = () => (
    <section className="ftco-section ftco-cart">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2><Translate id="cart.empty_cart"/></h2>
                </div>
            </div>
        </div>
    </section>
);

const CheckoutForm = ({ price, shippingProvider, setShippingProvider, setShippingProviderAddress, setShippingPrice, shippingPrice }) => {
    return (<section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <form action="#" className="billing-form bg-light p-3 p-md-5">
                                <h3 className="mb-4 billing-heading"><Translate id="checkout.billing_details" /></h3>
                                <div className="row align-items-end">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="email"><Translate id="checkout.email" /></label>
                                            <input type="text" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="phone"><Translate id="checkout.phone" /></label>
                                            <input type="text" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <ShippingProvider 
                                        shippingProvider={shippingProvider}
                                        setShippingProvider={setShippingProvider}
                                        setShippingProviderAddress={setShippingProviderAddress}
                                        setShippingPrice={setShippingPrice}
                                    />
                                    <div class="row mt-5 pt-3 d-flex">
                                        <div class="col-md-12 d-flex">
                                            <div class="cart-detail cart-total bg-light p-3 p-md-4">
                                                <h3 class="billing-heading mb-4"><Translate id="checkout.cart_total" /></h3>
                                                <p class="d-flex">
                                                    <span><Translate id="checkout.subtotal" /></span>
                                                    <span>€{price}</span>
                                                </p>
                                                <p class="d-flex">
                                                    <span><Translate id="checkout.delivery" /></span>
                                                    <span>€{Big(shippingPrice || 0).toFixed(2)}</span>
                                                </p>
                                                <hr/>
                                                <p class="d-flex total-price">
                                                    <span><Translate id="checkout.total" /></span>
                                                    <span>€{Big(price).plus(Big(shippingPrice || 0)).toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>);
};

export const Checkout = compose(
    withState('cartItems', 'setCartItems', []),
    withState('shippingProvider', 'setShippingProvider', ''),
    withState('shippingProviderAddress', 'setShippingProviderAddress', ''),
    withState('shippingPrice', 'setShippingPrice', 0),
    lifecycle({
        componentDidMount() {
            const cartItems = cart.getAllClean();
            if (cartItems.length) {
                this.props.setCartItems(cartItems);
            }
        }
    }),
)(InnerComponent);
