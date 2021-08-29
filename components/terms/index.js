import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { Terms } from './Terms';
import constants from '../../constants';
import { MainImage } from './MainImage';

export const productContentQuery = gql`
  query productContentQuery($language: String!) {
    contnetsByGroup(group: "terms") {
      id
      handle
      group
      title(language: $language)
      paragraph(language: $language)
      subTitle(language: $language)
      img(language: $language) {
        url
      }
    }
  }
`
const InnerComponent = ({ router }) => (
    <Query query={productContentQuery} variables={{ language: router.query.language }}>
      {({ loading, error, data: { contnetsByGroup }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading terms of service.' />
        if (loading) return <div>Loading</div>
        const contentObj = contnetsByGroup.reduce((acc, contentObj) => {
            acc[contentObj.handle] = contentObj;
            return acc;
        }, {});
        const termsContent = {
            title: get(contentObj, 'terms_terms.title[0]', ''),
            subTitle: get(contentObj, 'terms_terms.subTitle', ''),
            paragraphs: get(contentObj, 'terms_terms.paragraph', ''),
        }
        const mainImageContent = {
          img: get(contentObj, 'terms_mainImage.img[0]', constants.unavailableImage),
          title: get(contentObj, 'terms_mainImage.title[0]', ''),
        }
        const breadcrumbs = [
            {url: '/', id: 'navigation.home'},
            {id: 'navigation.terms'},
        ]
        return (
            <>
                <MainImage img={mainImageContent.img} title={mainImageContent.title} breadcrumbs={breadcrumbs}/>
                <Terms title={termsContent.title} breadcrumbs={breadcrumbs} paragraphs={termsContent.paragraphs} subTitles={termsContent.subTitle} />
            </>
        )
      }}
    </Query>
);

export default compose(
  withRouter
)(InnerComponent);