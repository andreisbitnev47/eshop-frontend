import { Query } from 'react-apollo'
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import cart from '../utils/shoppingCart';
import Big from 'big.js';

export const productsQuery = gql`
  query products($ids: [ID]!) {
    products(ids: $ids) {
      id
      price
    }
  }
`

const InnerComponent = ({ cartItems }) => (
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
                
                return <Cart amount={amount.toFixed(0)} price={price.toFixed(2)} />;
            }}
            </Query> :
            <Cart />
        }
    </>
)

const Cart = ({ amount, price }) => (
    <div className="cartContainer">
        <img className="cartIcon" src="/static/img/shopping-cart.svg" />
        <span className="cartAmount">[{amount || 0}]</span>
        {!!price ? <span className="cartPrice">€{price}</span> : null}
        <style jsx>{`
        {
            .cartContainer {
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }
            .cartIcon {
                width: 16px;
                height: 16px;
                margin-right: 5px;
            }
            .cartPrice {
                margin-left: 5px;
            }
        }
      `}</style>
    </div>
);

export const ShoppingCart = compose(
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