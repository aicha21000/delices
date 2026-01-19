import { Metadata } from 'next';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        return {
            title: 'Produit non trouvé - Les Délices Sucrés',
        };
    }

    return {
        title: `${product.name} - Les Délices Sucrés`,
        description: product.description,
        openGraph: {
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return <ProductDetailClient product={product} />;
}
