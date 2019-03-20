import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { ProductListItem }  from './ProductListItem';

export const productsQuery = gql`
  query products {
    products {
      id
      handle
      title(language: "en")
      price
      imgSmall
    }
  }
`

export const ProductList = () => {
  return (
    <Query query={productsQuery}>
      {({ loading, error, data: { products }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>

        return (
          <div className="container-fluid">
            <div className="row">
              {products.map(({ id, title, price, imgSmall, handle }) => (
                <ProductListItem key={id} id={id} title={title} price={price} img={imgSmall} handle={handle}/>
              ))}
            </div>
          </div>
        )
      }}
    </Query>
  )
}
