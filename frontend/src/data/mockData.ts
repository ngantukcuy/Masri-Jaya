import { Product, PO, Supplier, Customer, Expense, Activity, Branch, SalesInvoice, ReturnRecord, DigitalOrder, Banner, SkuLocation } from '../types';

export const initialProducts: Product[] = [
  {
    name: "Steel Rebar G60",
    sku: "SKU-882910",
    category: "Metals",
    unit: "Ton",
    retailPrice: 820.00,
    wholesalePrice: 780.00,
    projectPrice: 745.00,
    stock: 45.0,
    stockStatus: "Healthy",
    lastRestock: "2026-06-12",
    leadTime: "5-7 Days",
    warehouseLocation: "Section A - Row 04",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWw96IphvAQUXCWpGF_Lt6JVedw5sY0Xm-ozFgSfJqygB3gu23nDaMR4y4fvdZGuN0PIzZMkGx_6habVxfMNF4_DPGNNj1lW8Zl1gdwdFDNmW66rKxGXS54-rvcZP0UWMmCCFjlwnuV1X29EeYU7mbbZOxtLqKUrtrx2kTGJsUtXgIPfTgVbuyvWr6vX7-2TU4dW-cw2MyF9bulD_G-1EK-hJY0b-UuBO4nN3MRRfdKa3RDDKUurtf78TuaDu-1VapL1XwCUAMVK4"
  },
  {
    name: "Portland Cement Type I",
    sku: "SKU-001244",
    category: "Concrete",
    unit: "Bag (50kg)",
    retailPrice: 12.50,
    wholesalePrice: 11.20,
    projectPrice: 10.45,
    stock: 82.0,
    stockStatus: "Low Stock",
    lastRestock: "2026-07-01",
    leadTime: "3-4 Days",
    warehouseLocation: "Section B - Row 02",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-hfJbfbIDXtNCIgA2mbKJD_Cafb2hWm0kwhgWljEiZUcLgCtIkejYcuTVyUuNmRyZWyakIsEvTvpKpXP3cqkCuQnFvyS19vvHmItKxgauKyWKLDnvSkJ91hZsqtY2sKe_E3l0CBJCOvCStPoxokU6UBEHWeT6Zq1NIs4ukMFy7m-QDdkj6pZqcvIzgKxyzteKadOM11qJcPN9V-0bjuPGlbjy1uABSkqjspxwVlm4Q3P4XDaBc6olqkyzimdgfg5KCFlrz_9-2Mw"
  },
  {
    name: "Tempered Glass Panel",
    sku: "SKU-GLASS-09",
    category: "Glazing",
    unit: "Sheet",
    retailPrice: 145.00,
    wholesalePrice: 132.00,
    projectPrice: 128.00,
    stock: 0.0,
    stockStatus: "Out of Stock",
    lastRestock: "2026-05-18",
    leadTime: "10-14 Days",
    warehouseLocation: "Section D - Row 01",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2KYesPhd-wOIfKnvr9JuBPeLj2R9BWLYMNhpCgqW1Hwb4oa2gkQScC_JIXQhHiXyEbMR3SRNmWEsXG-D_0LQ3nDOhmjUPiFehHntKU-yV83s0HTUhaNV7ZZKnJO35sfW9Y50UrhTZwFAB9dsrOO4Q27KL8_S49ZFbW8rPRAT6xzf5lqp7QbdS-DWbdyhJdBGPVBDZ_rESKy8HVGoxz95V9zaWRiZgGBzSUVD6pEHXIyvOX1hF4r-JVCE0xFSOxYLB8Q5tIyi0dNQ"
  },
  {
    name: "Semen Tiga Roda 50kg",
    sku: "Code: BMT-CEM-01",
    category: "Cement & Mortar",
    unit: "Sack",
    retailPrice: 68500,
    wholesalePrice: 65000,
    projectPrice: 63000,
    stock: 84.0,
    stockStatus: "Healthy",
    lastRestock: "2026-07-10",
    leadTime: "2-3 Days",
    warehouseLocation: "Section B - Row 01",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJa9aU3Voh3pPRQ2BJwZALrQ1LBSQ--01TymlffSVbNLplUixXGjkJ5bzH9hVtKhusRwwA1xTn9G1nRZgqYnBVdOQ1JWh-kGvO7uG9GzKA3epDd0CdFtTHBy2xAxSJtJe5-AYt9-3twN48-Tby_TnUxI-3l6nwDHy8T6XFMV9rWUiTEnIn4ZUAi7n7nsLRdQbt1SfjDjxMvUfZrKc5Z9UBdZ_N95vAk6oO9gM22zzWiS2A33vHa6jfux5Gt6VUIp0lYd4_XMeBClU"
  },
  {
    name: "Besi Beton 10mm SNI",
    sku: "Code: BMT-STL-10",
    category: "Steel & Reinforcement",
    unit: "Piece",
    retailPrice: 82000,
    wholesalePrice: 79500,
    projectPrice: 77000,
    stock: 12.0,
    stockStatus: "Low Stock",
    lastRestock: "2026-07-05",
    leadTime: "4-6 Days",
    warehouseLocation: "Section A - Row 01",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7nj89aP5SltrTTmFY_Eio43_Sfot8FowPES2NlleKwA04-dgO5seoloB1VmbuuDKmTV-yOhyV80dXlGb-e-JZeFS4BhivF3ehuO6p8OTQDbKAKWpIzYDqoKz16G-17h1iALmKuXtwx9jSfZYeUzTQU_Gp63uqDWvE7HDn8J80ErS0SbuVc_swnjg61s29EQPSSqCOi_CwT9Sw8dc4yi3EgtWu_VxtzL0zo9DXXjAT6Ar-n56HFIag6WOgjIHeBVy8enVzVx0WXjY"
  },
  {
    name: "Dulux Catylac White 5kg",
    sku: "Code: BMT-PNT-W05",
    category: "Paint & Coatings",
    unit: "Gallon",
    retailPrice: 145000,
    wholesalePrice: 138000,
    projectPrice: 135000,
    stock: 140.0,
    stockStatus: "Healthy",
    lastRestock: "2026-06-25",
    leadTime: "3-5 Days",
    warehouseLocation: "Section C - Row 03",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj1BKF3ZBFr9QuN1Qmyx9KmJUSDYy-cb5eB_MaFZ2Y_8ksde6_km9LYa8f6s0mJp9PHgnT5dq1T_Kx1gIIei8thj56Zh_3FbgQkN_pUnv1irgxbjMKFYW-mdWs8-5IXTNEVaeaGzJo6CacJOmo0fHBjYS3SzI0tVW9G_Z0oluO5aC41XlXykpQF39G8eQCrIJx4vsYtk6OnPTEL8GgCXCFdiq2uckaAwUsaC2p9zd69Rvz5J4UpB-uT1cZ8Fh_IruFN6tz_Lk9PM8"
  },
  {
    name: "Eterna NYM 2x1.5mm",
    sku: "Code: BMT-ELC-CAB",
    category: "Electrical",
    unit: "Meter",
    retailPrice: 12000,
    wholesalePrice: 10800,
    projectPrice: 10200,
    stock: 2400.0,
    stockStatus: "Healthy",
    lastRestock: "2026-07-02",
    leadTime: "2-4 Days",
    warehouseLocation: "Section E - Row 02",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqEJy8_geNcFZqRtiwV2Wo_9OpzWQ_Z04fBxclxGCLj4jrkVcL7YMATFd0lfv-_jMjoNXEncaRXVMeTmpcTpXmKtXE-L1KO-eo0QGr_JqwuPFZ11QGQcKeI7BcdNM-LUfDPrmkLulUBeFiUedJNvNBUNCqIBuhqst4qKyjvyRz_Ve74wG4oqzbzJU0_n_zzX8355Csi9-S2xpGy7dENfIczcqZpxwEVKjuFerMvDYvCOjQe2k6spjRZNPtTFD6pP6biUClT3KJHiA"
  }
];

export const initialPOs: PO[] = [
  {
    poNumber: "PO-2024-0482",
    supplier: "Steel Industries Co.",
    total: 14200.00,
    status: "Ordered",
    items: [
      { name: "Standard Rebar 12mm", sku: "ST-12-RBR", quantity: 500, price: 9.00 },
      { name: "Structural I-Beam L20", sku: "ST-IB-20", quantity: 40, price: 242.50 }
    ],
    createdDate: "2026-05-14",
    logisticsNote: "Scheduled for morning delivery on May 21st. Dock B access required for heavy lifting."
  },
  {
    poNumber: "PO-2024-0481",
    supplier: "BuildMaster Logistics",
    total: 2500.00,
    status: "Received",
    items: [
      { name: "Premium Portland Cement", sku: "CM-PORT-01", quantity: 200, price: 12.50 }
    ],
    createdDate: "2026-05-10",
    logisticsNote: "Full bulk loading at Warehouse Gate 3."
  },
  {
    poNumber: "PO-2024-0480",
    supplier: "Global Glass Ltd",
    total: 8940.00,
    status: "In Transit",
    items: [
      { name: "Tempered Glass Panel 6mm", sku: "GLS-TMP-06", quantity: 60, price: 149.00 }
    ],
    createdDate: "2026-05-08",
    logisticsNote: "Fragile load. Specialized shock-resistant carriage required."
  },
  {
    poNumber: "PO-2024-0479",
    supplier: "Steel Industries Co.",
    total: 1200.00,
    status: "Draft",
    items: [
      { name: "Galvanized Wire 2mm", sku: "ST-GW-02", quantity: 150, price: 8.00 }
    ],
    createdDate: "2026-05-05",
    logisticsNote: "Pending final commercial pricing approval from sales ops."
  }
];

export const initialSuppliers: Supplier[] = [
  {
    name: "Steel Industries Co.",
    rating: 4.8,
    recentPO: "#PO-2940",
    debt: 12400.00,
    leadTimeStability: 92,
    logoLetters: "SI"
  },
  {
    name: "BuildMaster Logistics",
    rating: 4.2,
    recentPO: "#PO-2938",
    debt: 0.00,
    leadTimeStability: 100,
    logoLetters: "BM"
  },
  {
    name: "Global Glass Ltd",
    rating: 3.5,
    recentPO: "#PO-2921",
    debt: 42900.50,
    leadTimeStability: 65,
    logoLetters: "GG"
  }
];

export const initialCustomers: Customer[] = [
  {
    id: "CUST-84920",
    name: "Apex Construction Ltd.",
    loyaltyTier: "Platinum Member",
    points: 12400,
    currentDebt: 0.00,
    totalPurchases: 124500.00,
    debtStatus: "Cleared",
    logoLetters: "AC",
    lastTransactions: [
      { orderName: "Bulk Rebar Steel G60", date: "2026-07-05", amount: 45000.00 },
      { orderName: "Portland Cement Batch X", date: "2026-06-18", amount: 12800.00 }
    ]
  },
  {
    id: "CUST-91032",
    name: "John Smith",
    loyaltyTier: "Retail Customer",
    points: 350,
    currentDebt: 450.00,
    totalPurchases: 1250.40,
    debtStatus: "Overdue",
    overdueAmount: 450.00,
    logoLetters: "JS",
    lastTransactions: [
      { orderName: "DIY Hardware & Finishing", date: "2026-07-02", amount: 450.00 },
      { orderName: "Structural Steel Joint Blocks", date: "2026-05-11", amount: 800.40 }
    ]
  },
  {
    id: "CUST-77421",
    name: "Hardy Builders Co.",
    loyaltyTier: "Gold Member Tier",
    points: 5200,
    currentDebt: 12000.00,
    totalPurchases: 56800.00,
    debtStatus: "Pending",
    pendingAmount: 12000.00,
    logoLetters: "HB",
    lastTransactions: [
      { orderName: "Bulk Cement Order 10 Tons", date: "2026-07-12", amount: 2450.00 },
      { orderName: "Steel Rebars Grade 40", date: "2026-06-28", amount: 8900.00 },
      { orderName: "Lumber Supply Hardwood", date: "2026-06-15", amount: 1200.00 }
    ]
  },
  {
    id: "CUST-55120",
    name: "Maria Williams",
    loyaltyTier: "Retail Customer",
    points: 840,
    currentDebt: 0.00,
    totalPurchases: 3420.00,
    debtStatus: "Cleared",
    logoLetters: "MW",
    lastTransactions: [
      { orderName: "Paint & Plaster Wall Supplies", date: "2026-06-10", amount: 1420.00 },
      { orderName: "Standard Hand Drill Kits", date: "2026-05-20", amount: 2000.00 }
    ]
  }
];

export const initialExpenses: Expense[] = [
  {
    id: "EXP-01",
    date: "2026-07-14",
    category: "Logistics",
    description: "Fleet Maintenance - Unit 42",
    submittedBy: "Sarah Miller",
    amount: 842.00,
    receiptName: "receipt.pdf",
    status: "Pending"
  },
  {
    id: "EXP-02",
    date: "2026-07-14",
    category: "Supplies",
    description: "Office Stationery Bulk",
    submittedBy: "James Wilson",
    amount: 125.50,
    receiptName: "IMG_892.jpg",
    status: "Approved"
  },
  {
    id: "EXP-03",
    date: "2026-07-13",
    category: "Travel",
    description: "Supplier Visit - NY Region",
    submittedBy: "Robert Chen",
    amount: 2140.00,
    receiptName: "No Attachment",
    status: "Rejected"
  },
  {
    id: "EXP-04",
    date: "2026-07-13",
    category: "Utility",
    description: "Main Warehouse Electricity",
    submittedBy: "Finance Dept",
    amount: 4210.00,
    receiptName: "BILL-OCT.pdf",
    status: "Approved"
  }
];

export const initialActivities: Activity[] = [
  {
    id: "ACT-01",
    title: "POS Sale: INV-2024-0891",
    subtitle: "Completed by Cashier John • 5 items",
    amount: 1450.00,
    time: "2 mins ago",
    type: "sale"
  },
  {
    id: "ACT-02",
    title: "Warehouse Arrival: PO-4552",
    subtitle: "2,000kg Cement from Supplier X",
    amount: 0,
    time: "15 mins ago",
    type: "arrival"
  },
  {
    id: "ACT-03",
    title: "Overdue Payment Alert",
    subtitle: "Customer: BuildCorp Ltd • 15 days late",
    amount: 8200.00,
    time: "1 hour ago",
    type: "overdue"
  },
  {
    id: "ACT-04",
    title: "New Quotation: Q-8821",
    subtitle: "Prepared for Riverside Project",
    amount: 45000.00,
    time: "3 hours ago",
    type: "quote"
  }
];

export const initialSalesInvoices: SalesInvoice[] = [];

export const initialReturns: ReturnRecord[] = [];

export const initialDigitalOrders: DigitalOrder[] = [];

export const initialBanners: Banner[] = [];

export const initialSkuLocations: SkuLocation[] = [
  { id: "LOC-01", name: "Gudang Utama", city: "Pekanbaru" },
  { id: "LOC-02", name: "Toko / Etalase Depan", city: "Pekanbaru" }
];

export const initialBranches: Branch[] = [
  {
    name: "Main Warehouse",
    location: "Downtown, District 4",
    manager: "John Anderson",
    managerInitials: "JA",
    hwOk: 2,
    hwError: 1
  },
  {
    name: "North Retail Hub",
    location: "Business Zone A, North",
    manager: "Sarah Lewis",
    managerInitials: "SL",
    hwOk: 4,
    hwError: 0
  }
];
