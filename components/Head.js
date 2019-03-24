import Head from 'next/head';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { withRouter } from 'next/router';
import get from 'lodash/get';

const InnerComponent = ({ title, language }) => (
    <Head>
      <title>{title}</title>
      <link href={`/static/css/bootstrap.min.css`} rel="stylesheet" />
      <link href={`/static/css/owl.carousel.min.css`} rel="stylesheet" />
      <link href={`/static/css/style.css`} rel="stylesheet" />
      <link href={`/static/css/animate.css`} rel="stylesheet" />
    </Head>
)

export default compose(
    withRouter,
    withProps(({ router }) => ({ language: get(router, 'query.language', 'en')}))
)(InnerComponent)