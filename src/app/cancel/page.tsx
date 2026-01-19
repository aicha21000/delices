import { XCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './cancel.module.css';

export default function CancelPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <XCircle className={styles.icon} size={80} />
                </div>

                <h1 className={styles.title}>Paiement annulé</h1>

                <p className={styles.message}>
                    Votre paiement a été annulé. Aucun montant n'a été débité.
                </p>

                <p className={styles.subMessage}>
                    Si vous avez rencontré un problème, n'hésitez pas à nous contacter ou à réessayer.
                </p>

                <div className={styles.actions}>
                    <Link href="/checkout" className={styles.secondaryBtn}>
                        Réessayer
                    </Link>
                    <Link href="/" className={styles.primaryBtn}>
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
