'use client';

import { X, CreditCard } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import styles from './CartDrawer.module.css';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function CartDrawer() {
    const { isOpen, items, toggleCart, removeItem, total } = useCartStore();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const handleCheckout = async () => {
        router.push('/checkout');
    };

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
                onClick={toggleCart}
            />
            <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Votre Panier</h2>
                    <button onClick={toggleCart} className={styles.closeParam}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.body}>
                    {items.length === 0 ? (
                        <p className={styles.empty}>Votre panier est vide.</p>
                    ) : (
                        items.map((item) => {
                            const price = item.type === 'unit' ? item.product.priceUnit :
                                item.type === 'box6' ? item.product.priceBox6 :
                                    item.product.priceBox15;
                            const typeLabel = item.type === 'unit' ? 'À l\'unité' :
                                item.type === 'box6' ? 'Boîte de 6' :
                                    'Boîte de 15';
                            return (
                                <div key={`${item.productId}-${item.type}`} className={styles.item}>
                                    <div className={styles.itemImage}>
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            sizes="80px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemName}>{item.product.name}</div>
                                        <div className={styles.itemType}>
                                            {typeLabel} x {item.quantity}
                                        </div>
                                        <div className={styles.itemPrice}>{(price * item.quantity).toFixed(2)} €</div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.productId, item.type)}
                                        style={{ color: '#ff4d4f', padding: 4 }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {items.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>{total().toFixed(2)} €</span>
                        </div>
                        <button className={styles.checkoutBtn} onClick={handleCheckout}>
                            <CreditCard size={20} />
                            Payer maintenant
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
