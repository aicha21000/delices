import { create } from 'zustand';
import { Product } from './data';

export type CartItem = {
    productId: string;
    quantity: number;
    type: 'unit' | 'box6' | 'box15';
    product: Product;
};

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, type: 'unit' | 'box6' | 'box15', quantity: number) => void;
    removeItem: (productId: string, type: 'unit' | 'box6' | 'box15') => void;
    toggleCart: () => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isOpen: false,
    addItem: (product, type, quantity) =>
        set((state) => {
            const existingItem = state.items.find(
                (item) => item.productId === product.id && item.type === type
            );
            if (existingItem) {
                return {
                    items: state.items.map((item) =>
                        item.productId === product.id && item.type === type
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                    isOpen: true,
                };
            }
            return { items: [...state.items, { productId: product.id, quantity, type, product }], isOpen: true };
        }),
    removeItem: (productId, type) =>
        set((state) => ({
            items: state.items.filter((item) => !(item.productId === productId && item.type === type)),
        })),
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    clearCart: () => set({ items: [] }),
    total: () => {
        const state = get();
        return state.items.reduce((acc, item) => {
            const price = item.type === 'unit' ? item.product.priceUnit :
                item.type === 'box6' ? item.product.priceBox6 :
                    item.product.priceBox15;
            return acc + price * item.quantity;
        }, 0);
    },
}));
