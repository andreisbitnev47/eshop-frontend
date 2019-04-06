import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { Products } from './Products';
import { MainImage } from './MainImage';
import constants from '../../constants';

export const shopContentQuery = gql`
  query shopContentQuery($language: String!) {
    contnetsByGroup(group: "shop") {
      id
      handle
      group
      title(language: $language)
      img(language: $language) {
        url
      }
    }
  }
`
const InnerComponent = ({ router }) => (
    <Query query={shopContentQuery} variables={{ language: router.query.language }}>
      {({ loading, error, data: { contnetsByGroup }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>
        const contentObj = contnetsByGroup.reduce((acc, contentObj) => {
            acc[contentObj.handle] = contentObj;
            return acc;
        }, {});
        const mainImageContent = {
            img: get(contentObj, 'shop_mainImage.img[0]', constants.unavailableImage),
            title: get(contentObj, 'shop_mainImage.title[0]', ''),
        } 
        const breadcrumbs = [
            {url: '/', title: 'Home'},
            {title: 'Shop'},
        ]
        return (
            <>
                <MainImage img={mainImageContent.img} title={mainImageContent.title} breadcrumbs={breadcrumbs}/>
                <Products/>
            </>
        )
      }}
    </Query>
);

export default compose(
  withRouter,
)(InnerComponent);