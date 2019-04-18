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
      title(language: $language)
      paragraph(language: $language)
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
        const checkoutContent = {
          title: get(contentObj, 'checkout_checkout.title', ['']),
          paragraph: get(contentObj, 'checkout_checkout.paragraph', ['']),
        }
        const breadcrumbs = [
            {url: '/', id: 'navigation.home'},
            {id: 'navigation.checkout'},
        ]
        return (
            <>
                <MainImage img={mainImageContent.img} breadcrumbs={breadcrumbs}/>
                <Checkout title={checkoutContent.title} paragraph={checkoutContent.paragraph}/>
            </>
        )
      }}
    </Query>
);

export default compose(
  withRouter
)(InnerComponent);