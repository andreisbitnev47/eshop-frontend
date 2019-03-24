import App from '../components/App';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Head from '../components/Head';
import IndexPage from '../components/shop/index';

export default () => (
  <App>
    <Head title="Shop"/>
    <Header />
    <IndexPage />
    <Footer />
  </App>
)
