import { Query } from 'react-apollo'
import { withRouter } from 'next/router';
import compose from 'recompose/compose';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import { ProductListItem }  from './ProductListItem';

export const productsQuery = gql`
  query products($language: String!) {
    products {
      id
      handle
      title(language: $language)
      price
      imgSmall
    }
  }
`

const InnerComponent = ({ router }) => {
  return (
    <Query query={productsQuery} variables={{ language: router.query.language }}>
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

export const ProductList = compose(
  withRouter,
)(InnerComponent);