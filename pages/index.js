import App from '../components/App';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Head from 'next/head';
import IndexPage from '../components/index/Index';

export default () => (
  <App>
    <Head>
      <title>My styled page</title>
      <link href="/static/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/static/css/owl.carousel.min.css" rel="stylesheet" />
      <link href="/static/css/style.css" rel="stylesheet" />
      <link href="/static/css/animate.css" rel="stylesheet" />
    </Head>
    <Header />
    <IndexPage />
    <Footer />
  </App>
)
