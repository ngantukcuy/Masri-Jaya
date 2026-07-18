import { Product } from '../../../types';

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

export const POS_CART_STORAGE_KEY = 'tokku_pos_cart_state';

const emptyState = (): PersistedPOSState => ({
  cart: [],
  selectedCustomerId: null,
  discountPercent: 0,
  paymentMethod: 'Cash'
});

export const readPersistedPOSState = (): PersistedPOSState => {
  if (typeof window === 'undefined') {
    return emptyState();
  }

  try {
    const raw = window.localStorage.getItem(POS_CART_STORAGE_KEY);
    if (!raw) {
      return emptyState();
    }

    const parsed = JSON.parse(raw) as Partial<PersistedPOSState>;
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      selectedCustomerId: typeof parsed.selectedCustomerId === 'string' ? parsed.selectedCustomerId : null,
      discountPercent: typeof parsed.discountPercent === 'number' ? parsed.discountPercent : 0,
      paymentMethod: parsed.paymentMethod === 'QRIS' || parsed.paymentMethod === 'Split' || parsed.paymentMethod === 'Deposit'
        ? parsed.paymentMethod
        : 'Cash'
    };
  } catch (error) {
    console.warn('Gagal membaca state POS dari penyimpanan:', error);
    return emptyState();
  }
};

export const writePersistedPOSState = (state: PersistedPOSState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(POS_CART_STORAGE_KEY, JSON.stringify(state));
};

export const clearPersistedPOSState = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(POS_CART_STORAGE_KEY);
};
