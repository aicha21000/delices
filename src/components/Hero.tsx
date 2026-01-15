import WatermarkedImage from './WatermarkedImage';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.background}>
                <WatermarkedImage
                    src="/images/baklawa.jpg"
                    alt="Gateaux Orientaux"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', opacity: 0.6 }}
                    watermarkText="Les Délices Sucrés"
                />
            </div>
            <div className={styles.overlay} />
            <div className={styles.content}>
                <h1 className={styles.title}>Douceurs Traditionnelles & Gâteaux Secs</h1>
                <p className={styles.subtitle}>
                    Découvrez nos créations authentiques, faites main avec des ingrédients 100% naturels.
                </p>
                <a href="#products" className={styles.cta}>
                    Commander Maintenant
                </a>
            </div>
        </section>
    );
}
