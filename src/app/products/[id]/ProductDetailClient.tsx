'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import styles from './product.module.css';

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const router = useRouter();
    const { addItem, toggleCart } = useCartStore();

    // Local state for controls
    const [selectedType, setSelectedType] = useState<'unit' | 'box6' | 'box15'>('unit');
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const currentPrice = selectedType === 'unit' ? product.priceUnit :
        selectedType === 'box6' ? product.priceBox6 :
            product.priceBox15;

    const handleQuantityChange = (delta: number) => {
        const newQty = quantity + delta;
        if (newQty >= 1) setQuantity(newQty);
    };

    const handleAddToCart = () => {
        addItem(product, selectedType, quantity);
        setIsAdded(true);
        toggleCart(); // Open cart to show user

        // Reset added state after 2 seconds
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
                <ArrowLeft size={16} /> Retour à la boutique
            </Link>

            <div className={styles.productWrapper}>
                {/* Image Section */}
                <div className={styles.imageSection}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Info Section */}
                <div className={styles.infoSection}>
                    <div>
                        <h1 className={styles.title}>{product.name}</h1>
                        <p className={styles.price}>
                            {(currentPrice * quantity).toFixed(2)} €
                        </p>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    {/* Controls */}
                    <div className={styles.optionsContainer}>
                        <label className={styles.optionLabel}>Format :</label>
                        <div className={styles.typeButtons}>
                            <button
                                className={`${styles.typeButton} ${selectedType === 'unit' ? styles.activeType : ''}`}
                                onClick={() => setSelectedType('unit')}
                            >
                                <span>À l'unité</span>
                                <span className={styles.typePrice}>{product.priceUnit.toFixed(2)}€/p</span>
                            </button>
                            <button
                                className={`${styles.typeButton} ${selectedType === 'box6' ? styles.activeType : ''}`}
                                onClick={() => setSelectedType('box6')}
                            >
                                <span>Boîte de 6</span>
                                <span className={styles.typePrice}>{product.priceBox6.toFixed(2)}€</span>
                            </button>
                            <button
                                className={`${styles.typeButton} ${selectedType === 'box15' ? styles.activeType : ''}`}
                                onClick={() => setSelectedType('box15')}
                            >
                                <span>Boîte de 15</span>
                                <span className={styles.typePrice}>{product.priceBox15.toFixed(2)}€</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.optionsContainer}>
                        <label className={styles.optionLabel}>Quantité :</label>
                        <div className={styles.quantityControl}>
                            <button
                                className={styles.quantityBtn}
                                onClick={() => handleQuantityChange(-1)}
                                aria-label="Diminuer la quantité"
                            >
                                <Minus size={18} />
                            </button>
                            <span className={styles.quantityValue}>{quantity}</span>
                            <button
                                className={styles.quantityBtn}
                                onClick={() => handleQuantityChange(1)}
                                aria-label="Augmenter la quantité"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>

                    <button
                        className={styles.addToCartBtn}
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        style={isAdded ? { background: '#059669' } : {}}
                    >
                        {isAdded ? (
                            <>
                                <Check size={20} /> Ajouté !
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={20} /> Ajouter au panier
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
