'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import WatermarkedImage from './WatermarkedImage';
import styles from './ProductCard.module.css';
import { ShoppingBag } from 'lucide-react';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [type, setType] = useState<'unit' | 'box'>('box');
    const addItem = useCartStore((state) => state.addItem);

    const price = type === 'unit' ? product.priceUnit : product.priceBox;

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <WatermarkedImage
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.controls}>
                    <div className={styles.priceSelector}>
                        <div
                            className={`${styles.option} ${type === 'unit' ? styles.active : ''}`}
                            onClick={() => setType('unit')}
                        >
                            Pièce ({product.priceUnit.toFixed(2)}€)
                        </div>
                        <div
                            className={`${styles.option} ${type === 'box' ? styles.active : ''}`}
                            onClick={() => setType('box')}
                        >
                            Boîte ({product.priceBox.toFixed(2)}€)
                        </div>
                    </div>

                    <span className={styles.price}>{price.toFixed(2)} €</span>

                    <button
                        className={styles.addButton}
                        onClick={() => addItem(product, type, 1)}
                    >
                        <ShoppingBag size={18} />
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
}
