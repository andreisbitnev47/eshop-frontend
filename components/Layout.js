import Head from './Head';
import Header from './Header';
import { Footer } from './Footer';

const Layout = (props) => (
    <>
        <Head title={props.title}/>
        <Header />
            {props.children}
        <Footer />
        <style jsx global>{`
            .hero-wrap .slider-text h1 {
                font-size: 70px;
            }
            @media only screen and (max-width: 991px) {
                .ftco-navbar-light.scrolled .navbar-toggler {
                    font-size: 36px !important;
                }
                .navbar-toggler {
                    padding-top: 8px;
                    padding-bottom: 4px;
                }
                .ftco-navbar-light .navbar-nav > .nav-item > .nav-link {
                    font-size: 24px;
                }
                .hero-wrap .slider-text h1 {
                    font-size: 78px;
                }
                .hero-wrap .slider-text h2 {
                    font-size: 36px;
                }
                .heading-section h2 {
                    font-size: 48px;
                }
                .product .text h3 {
                    font-size: 32px;
                }
                .pricing .price .price-sale {
                    font-size: 30px;
                }
                .product .text .bottom-area a.add-to-cart {
                    font-size: 24px;
                }
                .btn.btn-primary {
                    font-size: 26px;
                }
                .content_paragraph {
                    font-size: 26px;
                }
                .hero-wrap.hero-bread {
                    padding-top: 175px;
                }
            }
        `}</style>
    </>
)

export default Layout