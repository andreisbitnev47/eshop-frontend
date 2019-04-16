import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import get from 'lodash/get';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from '../ErrorMessage'

import { Translate } from '../Translate';

export const shippingProviderQuery = gql`
  query shippingProviders {
    ShippingProviders {
      id
      name
      address
      options {
        name
        price
      }
    }
  }
`

const InnerComponent = ({ componentMounted, shippingProvider, setShippingProvider, setAddressAndPrice }) => (
    <>
        {componentMounted ? 
            <Query query={shippingProviderQuery}>
            {({ loading, error, data: { ShippingProviders }, fetchMore }) => {
                if (error) return <ErrorMessage message='Error loading items.' />
                if (loading) return <div>Loading</div>
                const shippingObject = {};
                const shippingProvidersList = ShippingProviders.map(provider => {
                    const price = get(provider, 'options[0].price', 0);
                    shippingObject[provider.id] = provider.address.map(address => ({
                        address,
                        price,
                    }));
                    return { value: provider.id, name: provider.name } 
                });
                return (
                    <>
                        <Select options={shippingProvidersList} name="shippingProvider" handleSelect={setShippingProvider}/>
                        {shippingProvider ? 
                            <Select options={shippingObject[shippingProvider].map(({ address, price }) => ({ value: JSON.stringify({ address, price }), name: address }))} name="shippingProviderAddress" handleSelect={setAddressAndPrice}/> :
                        null}
                    </>
                );
            }}
            </Query> :
            <Select options={[]} name="shippingProvider" handleSelect={setShippingProvider}/>
        }
    </>
)

const Select = ({ options, name, handleSelect }) => (
    <div class="col-md-6">
        <div class="form-group">
            <label for={name}><Translate id={`checkout.${name}`}/></label>
            <div class="select-wrap">
                <div class="icon"><span class="ion-ios-arrow-down"></span></div>
                <select required name={name} class="form-control" onChange={(e) => {
                    handleSelect(e.target.value); 
                }}>
                    <option value=""></option>
                    {options.map(option => (
                        <option value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        </div>
    </div>
);

export const ShippingProvider = compose(
    withState('componentMounted', 'setComponentMounted', false),
    withHandlers({
        setAddressAndPrice: ({ setShippingProviderAddress, setShippingPrice }) => (json) => {
            const { address, price } = JSON.parse(json);
            setShippingProviderAddress(address);
            setShippingPrice(price);
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.setComponentMounted(true);
        }
    }),
)(InnerComponent);