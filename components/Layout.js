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
            h1 {
                font-size: 46px !important;
            }
            .hero-wrap .slider-text h1 {
                font-size: 70px;
            }
            .desktop-hide, .desktop-hide-flex {
                display: none !important;
            }
            @media only screen and (max-width: 991px) {
                .mobile-hide {
                    display: none !important;
                }
                .desktop-hide {
                    display: block !important;
                }
                .desktop-hide-flex {
                    display: flex !important;
                }
                .ftco-navbar-light.scrolled .navbar-toggler {
                }
                .navbar-toggler {
                    padding-bottom: 4px;
                }
                .ftco-navbar-light .navbar-nav > .nav-item > .nav-link {
                    
                }
                .hero-wrap .slider-text h1 {
                    
                }
                .hero-wrap .slider-text h2 {
                    
                }
                .heading-section h2 {
                    
                }
                .product .text h3 {
                    
                }
                .pricing .price .price-sale {
                    
                }
                .product .text .bottom-area a.add-to-cart {
                    
                }
                .btn.btn-primary {
                    
                }
                .content_paragraph {
                    
                }
                .hero-wrap.hero-bread {
                    
                }
            }
        `}</style>
    </>
)

export default Layout