import { Product } from '../../../types';
import { getFirestoreCache, setFirestoreCache } from '../../../lib/firestoreCache';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPriceType: 'retail' | 'wholesale' | 'project';
  notes: string;
}

export type PersistedPOSState = {
  cart: CartItem[];
  selectedCustomerId: string | null;
  discountPercent: number;
  paymentMethod: 'Cash' | 'QRIS' | 'Split' | 'Deposit';
};

export const POS_CART_STORAGE_KEY = 'posCartState';

const emptyState = (): PersistedPOSState => ({
  cart: [],
  selectedCustomerId: null,
  discountPercent: 0,
  paymentMethod: 'Cash'
});

export const readPersistedPOSState = (): PersistedPOSState => {
  const parsed = getFirestoreCache<Partial<PersistedPOSState>>(POS_CART_STORAGE_KEY, emptyState());
  return {
    cart: Array.isArray(parsed.cart) ? parsed.cart : [],
    selectedCustomerId: typeof parsed.selectedCustomerId === 'string' ? parsed.selectedCustomerId : null,
    discountPercent: typeof parsed.discountPercent === 'number' ? parsed.discountPercent : 0,
    paymentMethod: parsed.paymentMethod === 'QRIS' || parsed.paymentMethod === 'Split' || parsed.paymentMethod === 'Deposit'
      ? parsed.paymentMethod
      : 'Cash'
  };
};

export const writePersistedPOSState = (state: PersistedPOSState) => {
  setFirestoreCache(POS_CART_STORAGE_KEY, state);
};

export const clearPersistedPOSState = () => {
  setFirestoreCache(POS_CART_STORAGE_KEY, emptyState());
};
