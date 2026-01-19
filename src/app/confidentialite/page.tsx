import Link from 'next/link';

export default function Confidentialite() {
    return (
        <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: '#10b981', textDecoration: 'none' }}>
                &larr; Retour à l'accueil
            </Link>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1f2937' }}>Politique de Confidentialité</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>1. Collecte de l'information</h2>
                <p>
                    Nous recueillons des informations lorsque vous passez commande sur notre site. Les informations recueillies incluent votre nom, votre adresse e-mail, votre numéro de téléphone et votre adresse de livraison.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>2. Utilisation des informations</h2>
                <p>
                    Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
                </p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <li>Traiter vos commandes et vous livrer les produits</li>
                    <li>Améliorer le service client et vos besoins de prise en charge</li>
                    <li>Vous contacter par e-mail concernant votre commande</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>3. Confidentialité du commerce en ligne</h2>
                <p>
                    Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>4. Protection des informations</h2>
                <p>
                    Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne (Stripe pour les paiements).
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>5. Consentement</h2>
                <p>
                    En utilisant notre site, vous consentez à notre politique de confidentialité.
                </p>
            </section>
        </div>
    );
}
