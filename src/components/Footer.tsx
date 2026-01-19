import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer} id="contact">
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.col}>
                        <div className={styles.logoContainer}>
                            <Image
                                src="/images/delices_logo.svg"
                                alt="Logo Les Délices Sucrés"
                                width={50}
                                height={50}
                                style={{ objectFit: 'contain' }}
                            />
                            <h3>Les Délices Sucrés</h3>
                        </div>
                        <p>
                            Gâteaux traditionnels et biscuits secs faits maison avec passion et ingrédients naturels.
                        </p>
                    </div>

                    <div className={styles.col}>
                        <h3>Contactez-nous</h3>
                        <p className="flex items-center gap-2">
                            <Phone size={18} /> +33 6 62 08 11 95
                        </p>
                        <p className="flex items-center gap-2">
                            <Mail size={18} /> contact@lesdelicessucres.com
                        </p>
                        <p>4b avenue Champollion, 21000 Dijon</p>
                    </div>

                    <div className={styles.col}>
                        <h3>Suivez-nous</h3>
                        <div className={styles.social}>
                            <Link href="https://www.facebook.com/profile.php?id=61586812550247" target="_blank">
                                <Facebook size={24} />
                            </Link>
                            <Link href="#" target="_blank">
                                <Instagram size={24} />
                            </Link>
                            <Link href="#" target="_blank">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 1 4.45 6.84 6.84 0 0 0 .03-2.06V7.74a4.83 4.83 0 0 0 3.77 4.25v-3.75a4.83 4.83 0 0 0 0-.69Z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem 0', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <Link href="/mentions-legales" style={{ color: '#ffffff', fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8 }}>Mentions Légales</Link>
                    <Link href="/cgv" style={{ color: '#ffffff', fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8 }}>CGV</Link>
                    <Link href="/confidentialite" style={{ color: '#ffffff', fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8 }}>Politique de Confidentialité</Link>
                </div>

                <div className={styles.copyright}>
                    © {new Date().getFullYear()} Les Délices Sucrés. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
