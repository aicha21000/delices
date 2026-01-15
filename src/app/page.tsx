import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ProductList />
      <Footer />
      <CartDrawer />
    </main>
  );
}
