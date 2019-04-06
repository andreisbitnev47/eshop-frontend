import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { Products } from './Products';
import { MainImage } from './MainImage';
import { About } from './About';
import constants from '../../constants';

export const indexContentQuery = gql`
  query indexContentQuery($language: String!) {
    contnetsByGroup(group: "index") {
      id
      handle
      group
      title(language: $language)
      subTitle(language: $language)
      paragraph(language: $language)
      img(language: $language) {
        alt
        url
      }
    }
  }
`
const InnerComponent = ({ router }) => (
    <Query query={indexContentQuery} variables={{ language: router.query.language }}>
      {({ loading, error, data: { contnetsByGroup }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>
        const contentObj = contnetsByGroup.reduce((acc, contentObj) => {
            acc[contentObj.handle] = contentObj;
            return acc;
        }, {});
        const mainImageContent = {
            img: get(contentObj, 'mainImage.img[0]', constants.unavailableImage),
            title: get(contentObj, 'mainImage.title[0]', ''),
            subTitle: get(contentObj, 'mainImage.subTitle[0]', ''),
        } 
        const productsContent = {
            title: get(contentObj, 'index_products.title[0]', ''),
            subTitle: get(contentObj, 'index_products.subTitle[0]', ''),
        }
        const aboutContent = {
            img: get(contentObj, 'index_about.img[0]', constants.unavailableImage),
            title: get(contentObj, 'index_about.title[0]', ''),
            mainText: get(contentObj, 'index_about.paragraph', ['']),
        }
        return (
            <>
                <MainImage img={mainImageContent.img} title={mainImageContent.title} subTitle={mainImageContent.subTitle}/>
                <Products title={productsContent.title} subTitle={productsContent.subTitle} />
                <About img={aboutContent.img} title={aboutContent.title} mainText={aboutContent.mainText} />
            </>
        )
      }}
    </Query>
);

export default compose(
  withRouter,
)(InnerComponent);