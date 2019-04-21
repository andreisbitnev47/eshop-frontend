import App from '../components/App';
import Layout from '../components/Layout';
import ProductPage from '../components/product/index';

export default () => (
  <App>
    <Layout title="title.product">
      <ProductPage />
    </Layout>
  </App>
)
