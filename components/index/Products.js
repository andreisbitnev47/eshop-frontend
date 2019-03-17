import { ProductList } from '../ProductList';

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
        <p style={{ textAlign: 'center' }}><a href="#" className="btn btn-primary py-3 px-5">Go to Shop</a></p>
    </section>
)