'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

                <div className={styles.actions}>
                    {count > 0 && (
                        <button className={styles.cartButton} onClick={toggleCart} aria-label="Panier">
                            <ShoppingCart size={24} />
                            <span className={styles.badge}>{count}</span>
                        </button>
                    )}

                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.open : ''}`}>
                <button
                    className={styles.closeBtn}
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Fermer"
                >
                    <X size={32} />
                </button>

                <div className={styles.mobileLogo}>
                    <Image
                        src="/images/delices_logo.svg"
                        alt="Logo Les Délices Sucrés"
                        width={80}
                        height={80}
                        style={{ objectFit: 'contain' }}
                    />
                    <span>Les Délices Sucrés</span>
                </div>

                <nav className={styles.mobileNav}>
                    <Link href="/" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        Accueil
                    </Link>
                    <Link href="/#products" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        Nos Gâteaux
                    </Link>
                    <Link href="/contact" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
