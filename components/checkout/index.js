import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { MainImage } from './MainImage';
import { Checkout } from './Checkout';
import constants from '../../constants';

export const checkoutContentQuery = gql`
  query checkoutContentQuery($language: String!) {
    contnetsByGroup(group: "checkout") {
      id
      handle
      group
      img(language: $language) {
        url
      }
    }
  }
`
const InnerComponent = ({ router }) => (
    <Query query={checkoutContentQuery} variables={{ language: router.query.language }}>
      {({ loading, error, data: { contnetsByGroup }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>
        const contentObj = contnetsByGroup.reduce((acc, contentObj) => {
            acc[contentObj.handle] = contentObj;
            return acc;
        }, {});
        const mainImageContent = {
            img: get(contentObj, 'checkout_mainImage.img[0]', constants.unavailableImage),
        }
        const breadcrumbs = [
            {url: '/', id: 'navigation.home'},
            {id: 'navigation.checkout'},
        ]
        return (
            <>
                <MainImage img={mainImageContent.img} breadcrumbs={breadcrumbs}/>
                <Checkout />
            </>
        )
      }}
    </Query>
);

export default compose(
  withRouter
)(InnerComponent);