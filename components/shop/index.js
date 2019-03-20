import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { Products } from './Products';
import { MainImage } from './MainImage';
import constants from '../../constants';

export const shopContentQuery = gql`
  query shopContentQuery {
    contnetsByGroup(group: "shop") {
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
    <Query query={shopContentQuery}>
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
