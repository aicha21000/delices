'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './success.module.css';

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCartStore();
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        // Clear cart on success
        clearCart();

        // Send emails if we have a session ID and haven't sent yet
        if (sessionId && !emailSent) {
            // Get order data from sessionStorage (set during checkout)
            const orderDataStr = sessionStorage.getItem('orderData');
            if (orderDataStr) {
                const orderData = JSON.parse(orderDataStr);

                // Send emails
                fetch('/api/send-order-emails', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...orderData,
                        sessionId,
                    }),
                })
                    .then(() => {
                        setEmailSent(true);
                        // Clean up sessionStorage
                        sessionStorage.removeItem('orderData');
                    })
                    .catch(err => console.error('Error sending emails:', err));
            }
        }
    }, [sessionId, emailSent, clearCart]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <CheckCircle className={styles.icon} size={80} />
                </div>

                <h1 className={styles.title}>Paiement réussi !</h1>

                <p className={styles.message}>
                    Merci pour votre commande. Votre paiement a été traité avec succès.
                </p>

                <p className={styles.subMessage}>
                    Vous recevrez un e-mail de confirmation avec les détails de votre commande sous peu.
                </p>

                {sessionId && (
                    <div className={styles.sessionInfo}>
                        <p className={styles.sessionLabel}>Numéro de transaction :</p>
                        <code className={styles.sessionId}>{sessionId}</code>
                    </div>
                )}

                <div className={styles.actions}>
                    <Link href="/" className={styles.primaryBtn}>
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className={styles.container}><div className={styles.card}>Chargement...</div></div>}>
            <SuccessContent />
        </Suspense>
    );
}
