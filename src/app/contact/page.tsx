'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WatermarkedImage from '@/components/WatermarkedImage';
import { Send, Phone, Mail, MapPin, Loader2 } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <main>
            <Header />

            {/* Hero Section */}
            <section style={{ position: 'relative', height: '40vh', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <WatermarkedImage
                        src="/images/baklawa.jpg"
                        alt="Contact"
                        fill
                        sizes="100vw"
                        style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-outfit)', fontWeight: 700, marginBottom: '1rem', color: '#FFFFFF', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>Contactez-nous</h1>
                    <p style={{ fontSize: '1.2rem', fontWeight: 500, color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Une question ? Une commande spéciale ? Écrivez-nous.</p>
                </div>
            </section>

            <section className="container" style={{ padding: '4rem 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    {/* Contact Info */}
                    <div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '2rem', fontFamily: 'var(--font-outfit)' }}>Nos Coordonnées</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: '#FFF6E6', padding: '12px', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Téléphone</h3>
                                    <p style={{ color: 'var(--color-text-muted)' }}>+33 6 62 08 11 95</p>
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Disponible du Lundi au Samedi</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: '#FFF6E6', padding: '12px', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Email</h3>
                                    <p style={{ color: 'var(--color-text-muted)' }}>contact@lesdelicessucres.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: '#FFF6E6', padding: '12px', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Adresse</h3>
                                    <p style={{ color: 'var(--color-text-muted)' }}>4b avenue Champollion<br />21000 Dijon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: 'var(--shadow-soft)' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-outfit)' }}>Envoyez-nous un message</h2>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nom complet</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E5E5', fontFamily: 'inherit' }}
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E5E5', fontFamily: 'inherit' }}
                                        placeholder="votre@email.com"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Téléphone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E5E5', fontFamily: 'inherit' }}
                                        placeholder="06..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E5E5', fontFamily: 'inherit', resize: 'vertical' }}
                                    placeholder="Comment pouvons-nous vous aider ?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={status === 'loading'}
                                style={{ width: '100%', marginTop: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} style={{ marginRight: '8px' }} /> Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} style={{ marginRight: '8px' }} /> Envoyer le message
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <div style={{ padding: '1rem', background: '#F0FDF4', color: '#166534', borderRadius: '8px', textAlign: 'center', marginTop: '1rem' }}>
                                    Message envoyé avec succès ! Nous vous répondrons très vite.
                                </div>
                            )}

                            {status === 'error' && (
                                <div style={{ padding: '1rem', background: '#FEF2F2', color: '#991B1B', borderRadius: '8px', textAlign: 'center', marginTop: '1rem' }}>
                                    Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
