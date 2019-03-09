import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

export const productsQuery = gql`
  query products {
    products {
      id
      title(language: "en")
      descriptionLong(language: "rus"),
      descriptionShort(language: "est"),
      weight
      price
    }
  }
`

export default function PostList () {
  return (
    <Query query={productsQuery}>
      {({ loading, error, data: { products }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>

        return (
          <section>
            <ul>
              {products.map((product, index) => (
                <li key={product.id}>
                  <div>
                    <span>{index + 1}. </span>
                    <p>{product.title}</p>
                  </div>
                </li>
              ))}
            </ul>
            <style jsx>{`
              section {
                padding-bottom: 20px;
              }
              li {
                display: block;
                margin-bottom: 10px;
              }
              div {
                align-items: center;
                display: flex;
              }
              a {
                font-size: 14px;
                margin-right: 10px;
                text-decoration: none;
                padding-bottom: 0;
                border: 0;
              }
              span {
                font-size: 14px;
                margin-right: 5px;
              }
              ul {
                margin: 0;
                padding: 0;
              }
              button:before {
                align-self: center;
                border-style: solid;
                border-width: 6px 4px 0 4px;
                border-color: #ffffff transparent transparent transparent;
                content: '';
                height: 0;
                margin-right: 5px;
                width: 0;
              }
            `}</style>
          </section>
        )
      }}
    </Query>
  )
}
