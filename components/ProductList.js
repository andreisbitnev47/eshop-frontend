import { Query } from 'react-apollo'
import { withRouter } from 'next/router';
import compose from 'recompose/compose';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import { ProductListItem }  from './ProductListItem';

export const productsQuery = gql`
  query activeProducts($language: String!) {
    activeProducts {
      id
      handle
      title(language: $language)
      price
      imgBig
    }
  }
`

const InnerComponent = ({ router }) => {
  return (
    <Query query={productsQuery} variables={{ language: router.query.language }}>
      {({ loading, error, data: { activeProducts }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>

        return (
          <div className="container-fluid">
            <div className="row">
              {activeProducts.map(({ id, title, price, imgBig, handle }) => (
                <ProductListItem key={id} id={id} title={title} price={price} img={imgBig[0]} handle={handle}/>
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