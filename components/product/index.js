import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { MainImage } from './MainImage';
import { Product } from './Product';
import constants from '../../constants';

export const productContentQuery = gql`
  query productContentQuery {
    contnetsByGroup(group: "product") {
      id
      handle
      group
      title(language: "en")
      img(language: "en") {
        url
      }
    }
  }
`
export default () => (
    <Query query={productContentQuery}>
      {({ loading, error, data: { contnetsByGroup }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>
        const contentObj = contnetsByGroup.reduce((acc, contentObj) => {
            acc[contentObj.handle] = contentObj;
            return acc;
        }, {});
        const mainImageContent = {
            img: get(contentObj, 'product_mainImage.img[0]', constants.unavailableImage),
            title: get(contentObj, 'product_mainImage.title[0]', ''),
        } 
        const breadcrumbs = [
            {url: '/', title: 'Home'},
            {url: '/shop', title: 'Shop'},
            {title: 'Product'},
        ]
        return (
            <>
                <MainImage img={mainImageContent.img} title={mainImageContent.title} breadcrumbs={breadcrumbs}/>
                <Product />
            </>
        )
      }}
    </Query>
);
