import { products } from '@/lib/data';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

export default function ProductList() {
    const gateaux = products.filter(p => p.category === 'gateaux');
    const biscuits = products.filter(p => p.category === 'biscuits');

    return (
        <div id="products">
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.heading}>
                        <h2 className={styles.title}>Nos Gâteaux Traditionnels</h2>
                        <p className={styles.subtitle}>Des douceurs raffinées pour vos événements</p>
                    </div>
                    <div className={styles.grid}>
                        {gateaux.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section} style={{ background: '#FFF' }}>
                <div className="container">
                    <div className={styles.heading}>
                        <h2 className={styles.title}>Nos Biscuits Secs</h2>
                        <p className={styles.subtitle}>Le compagnon idéal de votre pause café</p>
                    </div>
                    <div className={styles.grid}>
                        {biscuits.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
