import Link from 'next/link';

export default function CGV() {
    return (
        <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: '#10b981', textDecoration: 'none' }}>
                &larr; Retour à l'accueil
            </Link>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1f2937' }}>Conditions Générales de Vente (CGV)</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>1. Objet</h2>
                <p>
                    Les présentes conditions de vente visent à définir les relations contractuelles entre <strong>Les Délices Sucrés</strong> et l'acheteur et les conditions applicables à tout achat effectué par le biais du site internet.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>2. Produits</h2>
                <p>
                    Les produits proposés sont ceux qui figurent dans le catalogue publié sur le site, dans la limite des stocks disponibles. Chaque produit est accompagné d'un descriptif. Les photographies du catalogue sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite avec le produit offert, notamment en ce qui concerne les couleurs ou la disposition exacte des gâteaux faits main.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>3. Tarifs</h2>
                <p>
                    Les prix figurant dans le catalogue sont des prix TTC en euro. Les Délices Sucrés se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à l'acheteur.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>4. Commandes</h2>
                <p>
                    L'acheteur, qui souhaite acheter un produit ou un service doit obligatoirement :
                </p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <li>Remplir la fiche d'identification sur laquelle il indiquera toutes les coordonnées demandées;</li>
                    <li>Valider sa commande après l'avoir vérifiée;</li>
                    <li>Effectuer le paiement dans les conditions prévues;</li>
                    <li>Confirmer sa commande et son règlement.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>5. Paiement</h2>
                <p>
                    Le prix est exigible à la commande. Les paiements seront effectués par carte bancaire via le système sécurisé Stripe.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>6. Rétractation</h2>
                <p>
                    Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de biens susceptibles de se détériorer ou de se périmer rapidement (produits alimentaires frais).
                </p>
            </section>
        </div>
    );
}
