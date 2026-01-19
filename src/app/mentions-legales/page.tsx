import Link from 'next/link';

export default function MentionsLegales() {
    return (
        <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: '#10b981', textDecoration: 'none' }}>
                &larr; Retour à l'accueil
            </Link>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1f2937' }}>Mentions Légales</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>1. Éditeur du site</h2>
                <p>
                    Le site <strong>Les Délices Sucrés</strong> est édité par :<br />
                    <strong>Nom de l'entreprise :</strong> Les Délices Sucrés<br />
                    <strong>Responsable de la publication :</strong> Aicha<br />
                    <strong>Adresse :</strong> 4b avenue Champollion, 21000 Dijon<br />
                    <strong>Email :</strong> contact@lesdelicessucres.com<br />
                    <strong>Téléphone :</strong> +33 6 62 08 11 95<br />
                    <strong>SIRET :</strong> 84215474200014
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>2. Hébergement</h2>
                <p>
                    Le site est hébergé par :<br />
                    <strong>Vercel Inc.</strong><br />
                    440 N Barranca Ave #4133<br />
                    Covina, CA 91723<br />
                    États-Unis<br />
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981' }}>https://vercel.com</a>
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>3. Propriété intellectuelle</h2>
                <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>4. Données personnelles</h2>
                <p>
                    Les informations recueillies sur le site sont utilisées uniquement dans le cadre légal prévu en France pour le respect de la vie privée. L'utilisateur dispose d'un droit d'accès, de modification, de rectification et de suppression des données qui le concernent.
                    Pour l'exercer, l'utilisateur peut envoyer un email à l'adresse suivante : contact@lesdelicessucres.com.
                </p>
            </section>
        </div>
    );
}
