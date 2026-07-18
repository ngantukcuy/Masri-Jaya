// ---- Toko Digital (Digital Storefront) ----
export interface DigitalOrderItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
}

export interface DigitalOrder {
  id: string;
  buyerName: string;
  phone: string;
  address: string;
  items: DigitalOrderItem[];
  total: number;
  status: 'Baru' | 'Diproses' | 'Selesai';
  createdAt: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  active: boolean;
}
