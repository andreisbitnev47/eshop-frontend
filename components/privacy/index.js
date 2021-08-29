import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { Privacy } from './Privacy';
import constants from '../../constants';
import { MainImage } from './MainImage';

export const productContentQuery = gql`
  query productContentQuery($language: String!) {
    contnetsByGroup(group: "privacy") {
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
        if (error) return <ErrorMessage message='Error loading privacy policy.' />
        if (loading) return <div>Loading</div>
        const contentObj = contnetsByGroup.reduce((acc, contentObj) => {
            acc[contentObj.handle] = contentObj;
            return acc;
        }, {});
        const privacyContent = {
            title: get(contentObj, 'privacy_privacy.title[0]', ''),
            subTitle: get(contentObj, 'privacy_privacy.subTitle', ''),
            paragraphs: get(contentObj, 'privacy_privacy.paragraph', ''),
        }
        const mainImageContent = {
          img: get(contentObj, 'privacy_mainImage.img[0]', constants.unavailableImage),
          title: get(contentObj, 'privacy_mainImage.title[0]', ''),
        }
        const breadcrumbs = [
            {url: '/', id: 'navigation.home'},
            {id: 'navigation.privacy'},
        ]
        return (
            <>
                <MainImage img={mainImageContent.img} title={mainImageContent.title} breadcrumbs={breadcrumbs}/>
                <Privacy title={privacyContent.title} breadcrumbs={breadcrumbs} paragraphs={privacyContent.paragraphs} subTitles={privacyContent.subTitle} />
            </>
        )
      }}
    </Query>
);

export default compose(
  withRouter
)(InnerComponent);