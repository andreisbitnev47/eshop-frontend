import { ProductList } from '../ProductList';

export const Products = () => (
    <section className="ftco-section bg-light">
        <ProductList featured={false}/>
        <style jsx>{`
        {
            section {
                padding-top: 50px !important;
            }
        }
      `}</style>
    </section>
)