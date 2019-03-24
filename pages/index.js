import App from '../components/App';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Head from '../components/Head';
import IndexPage from '../components/index/index';

export default () => (
  <App>
    <Head title="Head"/>
    <Header />
    <IndexPage />
    <Footer />
  </App>
)
