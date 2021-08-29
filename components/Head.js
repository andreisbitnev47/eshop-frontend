import gql from 'graphql-tag'
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import renderComposnent from 'recompose/renderComponent';
import { withtranslations } from '../shared/context/TranslationContext';
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import Head from 'next/head';

export const productQuery = gql`
  query productQuery($handle: String!, $language: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title(language: $language)
      price
      imgBig
      descriptionLong(language: $language)
    }
  }
`;

const InnerComponent = ({ title, translations }) => (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      <title>{translations.get(title) || title}</title>
      <link href={`/static/css/bootstrap.min.css`} rel="stylesheet" />
      <link href={`/static/css/owl.carousel.min.css`} rel="stylesheet" />
      <link href={`/static/css/style1.css`} rel="stylesheet" />
      <link href={`/static/css/animate.css`} rel="stylesheet" />
    </Head>
)

const ProductInnerComponent = ({ title, translations, router }) => (
  <Query query={productQuery} variables={{ handle: router.query.handle, language: router.query.language }}>
    {({ loading, error, data: { productByHandle }, fetchMore }) => {
      if (error) return <ErrorMessage message='Error loading posts.' />
      if (loading) return <div>Loading</div>
      const translation = translations.get(title);
      const productTitle = translation ? translation.split('{{title}}').join(productByHandle.title) : title;
      return (
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
          <title>{productTitle}</title>
          <link href={`/static/css/bootstrap.min.css`} rel="stylesheet" />
          <link href={`/static/css/owl.carousel.min.css`} rel="stylesheet" />
          <link href={`/static/css/style1.css`} rel="stylesheet" />
          <link href={`/static/css/animate.css`} rel="stylesheet" />
        </Head>
      );
  }}
  </Query>
)

export default compose(
    withRouter,
    withtranslations,
    branch(({ router }) => !!router.query.handle, renderComposnent(ProductInnerComponent)),
)(InnerComponent)