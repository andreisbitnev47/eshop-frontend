import { ProductList } from '../ProductList';
import { Translate } from '../Translate';
import Link from '../Link';
import A from '../A';

export const Products = ({ title, subTitle }) => (
    <section className="ftco-section bg-light">
    	<div className="container">
			<div className="row justify-content-center mb-3 pb-3">
                <div className="col-md-12 heading-section text-center">
                    <h1 className="big">{title}</h1>
                    <h2 className="mb-4">{subTitle}</h2>
                </div>
            </div>    		
    	</div>
        <ProductList />
        <p style={{ textAlign: 'center' }}>
            <Link href="/shop">
                <A href="/shop" classNames="btn btn-primary py-3 px-5">
                    <Translate id="main.go_to_shop"/>
                </A>
            </Link>
        </p>
    </section>
)