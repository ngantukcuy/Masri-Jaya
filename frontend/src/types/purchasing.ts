export interface POItem {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface PO {
  poNumber: string;
  supplier: string;
  total: number;
  status: 'Draft' | 'Approved' | 'Ordered' | 'In Transit' | 'Received';
  items: POItem[];
  createdDate: string;
  logisticsNote: string;
}

export interface Supplier {
  name: string;
  rating: number;
  recentPO: string;
  debt: number;
  leadTimeStability: number;
  logoLetters: string;
  phone?: string;
  npwp?: string;
  address?: string;
  salesName?: string;
  salesPhone?: string;
  additionalSales?: { name: string; phone: string }[];
  topDays?: number;
}
