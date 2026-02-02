'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { CreditCard } from 'lucide-react';
import styles from './CustomerInfoForm.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CustomerInfoForm() {
    const [loading, setLoading] = useState(false);
    const { items, total } = useCartStore();
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'FR',
        comments: '',
    });

    // State for validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (items.length === 0) {
            router.push('/');
        }
    }, [items, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: Record<string, string> = {};
        if (!form.name.trim()) newErrors.name = 'Le nom est requis';
        if (!form.email.trim()) newErrors.email = 'L\'adresse e-mail est requise';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Adresse e-mail invalide';
        if (!form.phone.trim()) newErrors.phone = 'Le téléphone est requis';
        if (!form.addressLine1.trim()) newErrors.addressLine1 = 'L\'adresse est requise';
        if (!form.city.trim()) newErrors.city = 'La ville est requise';
        if (!form.postalCode.trim()) newErrors.postalCode = 'Le code postal est requis';
        if (!form.country.trim()) newErrors.country = 'Le pays est requis';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Scroll to top of form to see errors
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map(item => ({
                        productId: item.productId,
                        productName: item.product.name,
                        type: item.type,
                        quantity: item.quantity,
                        price: item.type === 'unit' ? item.product.priceUnit :
                            item.type === 'box6' ? item.product.priceBox6 :
                                item.product.priceBox15,
                    })),
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    address: {
                        line1: form.addressLine1,
                        line2: form.addressLine2,
                        city: form.city,
                        state: form.state,
                        postal_code: form.postalCode,
                        country: form.country,
                    },
                    comments: form.comments,
                }),
            });

            const data = await response.json();

            if (data.url) {
                // Store order data in sessionStorage for email sending after payment
                const orderData = {
                    items: items.map(item => ({
                        productId: item.productId,
                        productName: item.product.name,
                        type: item.type,
                        quantity: item.quantity,
                        price: item.type === 'unit' ? item.product.priceUnit :
                            item.type === 'box6' ? item.product.priceBox6 :
                                item.product.priceBox15,
                    })),
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    address: {
                        line1: form.addressLine1,
                        line2: form.addressLine2,
                        city: form.city,
                        state: form.state,
                        postal_code: form.postalCode,
                        country: form.country,
                    },
                    comments: form.comments,
                    orderId: data.orderId,
                };
                sessionStorage.setItem('orderData', JSON.stringify(orderData));

                // Redirect to Stripe Checkout using the URL
                window.location.href = data.url;
            } else if (data.error) {
                console.error('Checkout error:', data.error);
                alert('Une erreur est survenue lors du paiement. Veuillez réessayer.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Finaliser la commande</h1>
            <p className={styles.subtitle}>Veuillez remplir vos informations pour procéder au paiement</p>

            {/* Cart Summary */}
            <div className={styles.cartSummary}>
                <h2 className={styles.cartTitle}>Récapitulatif de votre commande</h2>
                {items.map((item) => {
                    const price = item.type === 'unit' ? item.product.priceUnit :
                        item.type === 'box6' ? item.product.priceBox6 :
                            item.product.priceBox15;
                    const typeLabel = item.type === 'unit' ? 'À l\'unité' :
                        item.type === 'box6' ? 'Boîte de 6' :
                            'Boîte de 15';
                    return (
                        <div key={`${item.productId}-${item.type}`} className={styles.cartItem}>
                            <div>
                                <div className={styles.itemName}>{item.product.name}</div>
                                <div className={styles.itemDetails}>{typeLabel} × {item.quantity}</div>
                            </div>
                            <div className={styles.itemPrice}>{(price * item.quantity).toFixed(2)} €</div>
                        </div>
                    );
                })}
                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total</span>
                    <span className={styles.totalAmount}>{total().toFixed(2)} €</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Nom complet<span className={styles.required} aria-label="requis">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        placeholder="Jean Dupont"
                        aria-required="true"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Adresse e-mail<span className={styles.required} aria-label="requis">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="jean.dupont@exemple.fr"
                        aria-required="true"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                        Téléphone<span className={styles.required} aria-label="requis">*</span>
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                        placeholder="+33 6 12 34 56 78"
                        aria-required="true"
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <p className={styles.errorMessage}>{errors.phone}</p>}
                </div>

                {/* Address Line 1 */}
                <div className={styles.formGroup}>
                    <label htmlFor="addressLine1" className={styles.label}>
                        Adresse<span className={styles.required} aria-label="requis">*</span>
                    </label>
                    <input
                        id="addressLine1"
                        name="addressLine1"
                        type="text"
                        required
                        value={form.addressLine1}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.addressLine1 ? styles.inputError : ''}`}
                        placeholder="123 Rue de la Paix"
                        aria-required="true"
                        autoComplete="address-line1"
                        aria-invalid={!!errors.addressLine1}
                    />
                    {errors.addressLine1 && <p className={styles.errorMessage}>{errors.addressLine1}</p>}
                </div>

                {/* Address Line 2 */}
                <div className={styles.formGroup}>
                    <label htmlFor="addressLine2" className={styles.label}>
                        Complément d'adresse <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optionnel)</span>
                    </label>
                    <input
                        id="addressLine2"
                        name="addressLine2"
                        type="text"
                        value={form.addressLine2}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Appartement, étage, etc."
                        autoComplete="address-line2"
                    />
                </div>

                {/* City */}
                <div className={styles.formGroup}>
                    <label htmlFor="city" className={styles.label}>
                        Ville<span className={styles.required} aria-label="requis">*</span>
                    </label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={form.city}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                        placeholder="Paris"
                        aria-required="true"
                        autoComplete="address-level2"
                        aria-invalid={!!errors.city}
                    />
                    {errors.city && <p className={styles.errorMessage}>{errors.city}</p>}
                </div>

                {/* Postal Code and Country */}
                <div className={styles.rowEqual}>
                    <div className={styles.formGroup}>
                        <label htmlFor="postalCode" className={styles.label}>
                            Code postal<span className={styles.required} aria-label="requis">*</span>
                        </label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            required
                            value={form.postalCode}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.postalCode ? styles.inputError : ''}`}
                            placeholder="75001"
                            aria-required="true"
                            autoComplete="postal-code"
                            aria-invalid={!!errors.postalCode}
                        />
                        {errors.postalCode && <p className={styles.errorMessage}>{errors.postalCode}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="country" className={styles.label}>
                            Pays<span className={styles.required} aria-label="requis">*</span>
                        </label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            required
                            value={form.country}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.country ? styles.inputError : ''}`}
                            placeholder="FR"
                            aria-required="true"
                            aria-describedby="country-help"
                            autoComplete="country"
                            aria-invalid={!!errors.country}
                        />
                        {errors.country && <p className={styles.errorMessage}>{errors.country}</p>}
                        {!errors.country && <p id="country-help" className={styles.helpText}>Code pays ISO (FR, US, CA, etc.)</p>}
                    </div>
                </div>

                {/* Comments */}
                <div className={styles.formGroup}>
                    <label htmlFor="comments" className={styles.label}>
                        Commentaires <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optionnel)</span>
                    </label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={form.comments}
                        onChange={handleChange}
                        className={styles.textarea}
                        placeholder="Ajoutez des instructions de livraison ou des remarques..."
                        rows={4}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitBtn}
                    aria-busy={loading}
                >
                    {loading ? (
                        <>
                            <span className={styles.spinner} aria-hidden="true"></span>
                            Traitement en cours...
                        </>
                    ) : (
                        <>
                            <CreditCard size={20} aria-hidden="true" />
                            Procéder au paiement
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
