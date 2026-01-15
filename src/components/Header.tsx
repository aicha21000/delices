'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import styles from './Header.module.css';

export default function Header() {
    const toggleCart = useCartStore((state) => state.toggleCart);
    const items = useCartStore((state) => state.items);
    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/images/delices_logo.svg"
                        alt="Logo Les Délices Sucrés"
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                    />
                    Les Délices Sucrés
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.links}>
                    <Link href="/" className={styles.link}>Accueil</Link>
                    <Link href="/#products" className={styles.link}>Nos Gâteaux</Link>
                    <Link href="/contact" className={styles.link}>Contact</Link>
                </nav>

                <button className={styles.cartButton} onClick={toggleCart}>
                    <ShoppingCart size={24} />
                    {count > 0 && <span className={styles.badge}>{count}</span>}
                </button>
            </div>
        </header>
    );
}
