import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { MainImage } from './MainImage';
import { Products } from './Products';
import constants from '../../constants';

export const productContentQuery = gql`
  query productContentQuery($language: String!) {
    contnetsByGroup(group: "cart") {
      id
      handle
      group
      title(language: $language)
      paragraph(language: $language)
      img(language: $language) {
        url
      }
    }
  }
`
const InnerComponent = ({ router }) => (
    <Query query={productContentQuery} variables={{ language: router.query.language }}>
      {({ loading, error, data: { contnetsByGroup }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>
        const contentObj = contnetsByGroup.reduce((acc, contentObj) => {
            acc[contentObj.handle] = contentObj;
            return acc;
        }, {});
        const mainImageContent = {
            img: get(contentObj, 'cart_mainImage.img[0]', constants.unavailableImage),
            title: get(contentObj, 'cart_mainImage.title[0]', ''),
        }
        const breadcrumbs = [
            {url: '/', id: 'navigation.home'},
            {id: 'navigation.cart'},
        ]
        return (
            <>
                <MainImage img={mainImageContent.img} breadcrumbs={breadcrumbs}/>
                <Products />
            </>
        )
      }}
    </Query>
);

export default compose(
  withRouter
)(InnerComponent);