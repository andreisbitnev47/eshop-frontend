import App from '../components/App';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Head from '../components/Head';
import ProductPage from '../components/product/index';

export default () => (
  <App>
    <Head title="Product"/>
    <Header />
    <ProductPage />
    <Footer />
  </App>
)
