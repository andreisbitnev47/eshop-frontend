import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose';
import { withRouter } from 'next/router'
import ErrorMessage from '../ErrorMessage'
import get from 'lodash/get';
import { MainImage } from './MainImage';
import { About } from './About';
import constants from '../../constants';

export const productContentQuery = gql`
  query productContentQuery($language: String!) {
    contnetsByGroup(group: "about") {
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
            img: get(contentObj, 'about_mainImage.img[0]', constants.unavailableImage),
            title: get(contentObj, 'about_mainImage.title[0]', ''),
        }
        const aboutContent = {
            imgs: get(contentObj, 'about_about.img', [constants.unavailableImage]),
            title: get(contentObj, 'about_about.title[0]', ''),
            paragraphs: get(contentObj, 'about_about.paragraph', ''),
        } 
        const breadcrumbs = [
            {url: '/', id: 'navigation.home'},
            {id: 'navigation.about'},
        ]
        return (
            <>
                <MainImage img={mainImageContent.img} title={mainImageContent.title} breadcrumbs={breadcrumbs}/>
                <About imgs={aboutContent.imgs} title={mainImageContent.title} breadcrumbs={breadcrumbs} paragraphs={aboutContent.paragraphs}/>
            </>
        )
      }}
    </Query>
);

export default compose(
  withRouter
)(InnerComponent);