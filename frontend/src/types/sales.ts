// ---- Sales Invoice (used for lookup on Retur Penjualan) ----
export interface SalesInvoiceItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
  unit?: string;
}

export interface SalesInvoice {
  invoiceNumber: string;
  customerName: string;
  customerId?: string;
  date: string;
  items: SalesInvoiceItem[];
  total: number;
  paymentMethod: string;
}

// ---- Retur (Sales & Purchase Returns) ----
export interface ReturnItem {
  sku: string;
  name: string;
  quantity: number;
  condition: 'Baik' | 'Rusak';
  price: number;
}

export interface ReturnRecord {
  id: string;
  type: 'Penjualan' | 'Pembelian';
  refNumber: string;
  partyName: string;
  items: ReturnItem[];
  discount: number;
  totalRefund: number;
  refundMethod: 'Tunai' | 'Transfer';
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}
