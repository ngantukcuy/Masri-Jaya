import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  DollarSign, 
  FileText, 
  Activity as ActivityIcon, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle,
  Forklift
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Activity } from '../../types';

interface DashboardViewProps {
  products: Product[];
  activities: Activity[];
  totalSales: number;
  totalOrdersCount: number;
  onTabChange: (tab: string) => void;
  onQuickRestock: () => void;
}

export default function DashboardView({ 
  products, 
  activities, 
  totalSales, 
  totalOrdersCount, 
  onTabChange, 
  onQuickRestock 
}: DashboardViewProps) {
  const [activeChartTab, setActiveChartTab] = useState<'sales' | 'profit'>('sales');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [showIntelligenceReport, setShowIntelligenceReport] = useState(false);

  // Month mock data for sales and profit trends (Translated names)
  const monthlyData = [
    { name: 'JAN', sales: 450000000, profit: 120000000 },
    { name: 'FEB', sales: 620000000, profit: 180000000 },
    { name: 'MAR', sales: 380000000, profit: 110000000 },
    { name: 'APR', sales: 850000000, profit: 240000000 },
    { name: 'MEI', sales: 1245000000, profit: 382100000 },
    { name: 'JUN', sales: 740000000, profit: 220000000 },
    { name: 'JUL', sales: 550000000, profit: 150000000 },
    { name: 'AGU', sales: 1150000000, profit: 340000000 },
    { name: 'SEP', sales: 820000000, profit: 240000000 },
    { name: 'OKT', sales: 960000000, profit: 290000000 },
    { name: 'NOV', sales: 680000000, profit: 190000000 },
    { name: 'DES', sales: 1040000000, profit: 310000000 },
  ];

  // Convert conversions to local IDR currency references
  const liveTodaySales = 124500000 + (totalSales * 1.0);
  const liveNetProfit = 38210000 + (totalSales * 0.35); // assume 35% margin
  const liveDailyOrders = 42 + totalOrdersCount;

  // Render bento KPI card helper with glassmorphic style
  const renderKpiCard = (
    title: string, 
    value: string, 
    trend: string, 
    trendType: 'up' | 'down' | 'neutral', 
    icon: React.ReactNode, 
    bgColor: string, 
    iconColor: string
  ) => {
    return (
      <motion.div 
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{title}</span>
          <div className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center ${iconColor}`}>
            {icon}
          </div>
        </div>
        <div className="mt-2 z-10">
          <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{value}</h3>
          <p className="mt-0.5 text-[10px] flex items-center font-bold">
            {trendType === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500 mr-1 shrink-0" />}
            {trendType === 'down' && <TrendingDown className="w-3 h-3 text-red-500 mr-1 shrink-0" />}
            <span className={trendType === 'up' ? 'text-emerald-500' : trendType === 'down' ? 'text-red-500' : 'text-slate-500'}>
              {trend}
            </span>
          </p>
        </div>
      </motion.div>
    );
  };

  // SVG Line Chart coordinates calculation
  const maxVal = activeChartTab === 'sales' ? 1300000000 : 400000000;
  const points = monthlyData.map((d, i) => {
    const val = activeChartTab === 'sales' ? d.sales : d.profit;
    const x = 30 + (i * 54);
    const y = 170 - (val / maxVal) * 130;
    return { x, y };
  });

  const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;

  return (
    <div className="space-y-6">
      
      {/* Upper Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Ringkasan Dasbor</h2>
          <p className="text-slate-500 text-xs md:text-sm">Pemantauan real-time penjualan kasir, logistik semen, dan analisis profitabilitas cabang.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => onTabChange('pos')}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/15 cursor-pointer flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buka Kasir POS (F12)</span>
          </button>
        </div>
      </div>

      {/* Bento Grid 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {renderKpiCard(
          "Pendapatan Hari Ini",
          `Rp ${liveTodaySales.toLocaleString('id-ID')}`,
          "+14.2% dari kemarin",
          "up",
          <DollarSign className="w-4.5 h-4.5" />,
          "bg-emerald-500/10",
          "text-emerald-600"
        )}
        {renderKpiCard(
          "Estimasi Untung Bersih",
          `Rp ${liveNetProfit.toLocaleString('id-ID')}`,
          "+8.4% bulan ini",
          "up",
          <TrendingUp className="w-4.5 h-4.5" />,
          "bg-blue-500/10",
          "text-blue-600"
        )}
        {renderKpiCard(
          "Transaksi Kasir Selesai",
          `${liveDailyOrders} Transaksi`,
          "+3 transaksi baru",
          "up",
          <ShoppingBag className="w-4.5 h-4.5" />,
          "bg-indigo-500/10",
          "text-indigo-600"
        )}
        {renderKpiCard(
          "Tagihan Piutang Jatuh Tempo",
          "Rp 15.000.000",
          "3 pembeli terlambat bayar",
          "down",
          <FileText className="w-4.5 h-4.5" />,
          "bg-amber-500/10",
          "text-amber-600"
        )}
      </div>

      {/* Middle Grid: Main charts + AI Insight Section - Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Chart Panel (Stripe-style Glass Card) */}
        <div className="glass-card lg:col-span-8 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-slate-100/60">
            <div>
              <h4 className="text-sm font-black text-slate-800 tracking-tight">Tren Kinerja Penjualan</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Statistik finansial pendapatan dan laba bersih sepanjang tahun 2026</p>
            </div>
            
            {/* Chart toggle buttons (Moderated Neumorphism) */}
            <div className="flex bg-slate-100/70 p-1 rounded-xl self-start sm:self-auto border border-slate-200/40">
              <button
                onClick={() => setActiveChartTab('sales')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeChartTab === 'sales' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/30' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Pendapatan
              </button>
              <button
                onClick={() => setActiveChartTab('profit')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeChartTab === 'profit' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/30' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Keuntungan
              </button>
            </div>
          </div>

          {/* SVG Line Canvas (Highly Responsive) */}
          <div className="relative w-full h-48 mt-4 overflow-x-auto overflow-y-hidden">
            <div className="min-w-[640px] h-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 680 180" preserveAspectRatio="none">
                {/* Reference Grid lines */}
                <line x1="30" y1="40" x2="640" y2="40" stroke="#E2E8F0" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="30" y1="105" x2="640" y2="105" stroke="#E2E8F0" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="30" y1="170" x2="640" y2="170" stroke="#E2E8F0" strokeOpacity="0.8" strokeWidth="1" />

                {/* Smooth Gradient Fill path */}
                <path 
                  d={`${pathD} L ${points[points.length-1].x} 170 L 30 170 Z`}
                  fill={activeChartTab === 'sales' ? 'url(#salesGrad)' : 'url(#profitGrad)'}
                  className="opacity-15"
                />

                {/* Define Gradients */}
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Core Line path */}
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  d={pathD}
                  fill="none"
                  stroke={activeChartTab === 'sales' ? '#2563EB' : '#10B981'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Monthly Interactive Bars/Circles */}
                {points.map((pt, i) => {
                  const isHovered = hoveredMonth === i;
                  const barHeight = 170 - pt.y;
                  return (
                    <g key={i}>
                      {/* Glowing point on line */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isHovered ? 6 : 3.5} 
                        fill={activeChartTab === 'sales' ? '#2563EB' : '#10B981'}
                        stroke="white"
                        strokeWidth={isHovered ? 2.5 : 1}
                        className="transition-all"
                      />
                      {/* Interactive background bar */}
                      <rect 
                        x={pt.x - 4}
                        y={pt.y}
                        width="8"
                        height={barHeight}
                        rx="1.5"
                        fill={activeChartTab === 'sales' ? '#60A5FA' : '#34D399'}
                        className={`transition-all duration-300 ${
                          hoveredMonth === i 
                            ? 'opacity-100 filter brightness-110' 
                            : 'opacity-15'
                        }`}
                      />
                      {/* Tooltip trigger hotspot */}
                      <rect
                        x={pt.x - 25}
                        y="10"
                        width="50"
                        height="170"
                        fill="transparent"
                        onMouseEnter={() => setHoveredMonth(i)}
                        onMouseLeave={() => setHoveredMonth(null)}
                        className="cursor-pointer"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Float Tooltip */}
              <AnimatePresence>
                {hoveredMonth !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{ 
                      left: `${(hoveredMonth / 11) * 80 + 3}%`,
                      top: '20px'
                    }}
                    className="absolute bg-slate-900 text-white rounded-xl p-3 shadow-xl z-20 pointer-events-none text-[10px] w-44 border border-slate-800"
                  >
                    <p className="font-extrabold mb-1 tracking-wider text-slate-400">{monthlyData[hoveredMonth].name}</p>
                    <div className="flex justify-between items-center gap-2 mt-1">
                      <span className="text-slate-400">Pendapatan:</span>
                      <span className="font-bold text-white">Rp {monthlyData[hoveredMonth].sales.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2 mt-1 border-t border-slate-800 pt-1">
                      <span className="text-emerald-400">Untung:</span>
                      <span className="font-bold text-emerald-300">Rp {monthlyData[hoveredMonth].profit.toLocaleString('id-ID')}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-between mt-3 text-slate-400 text-[9px] font-bold tracking-wider px-4">
            {monthlyData.map((d) => <span key={d.name}>{d.name}</span>)}
          </div>
        </div>

        {/* AI Insight Column Panel - Bento Piece */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* AI Insights Card (Glossy Futuristic Dark Card) */}
          <div className="bg-slate-900/95 text-white border border-slate-800/80 p-5 relative overflow-hidden rounded-2xl shadow-xl flex flex-col justify-between h-full min-h-[300px]">
            {/* Design Watermark */}
            <div className="absolute top-4 right-4 text-[20px] font-black italic uppercase text-white/5 select-none pointer-events-none">AETHER/01</div>
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-[#052c16] border border-emerald-500/20 p-1.5 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-emerald-400 fill-emerald-400/15" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Analisis AI</h4>
                </div>

                {/* Tech Coordinates Accent */}
                <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-2 text-[9px] font-mono text-slate-500">
                  <span>SYSTEM ACTIVE • OPTIMAL</span>
                  <span className="text-emerald-400">✓ ACCURACY 98%</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-black/35 p-2.5 border border-slate-800/80 rounded-xl">
                    <div className="flex gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-300 uppercase tracking-wide leading-normal">
                        Pendapatan naik <span className="font-bold text-emerald-400">12%</span>. Pembelian semen tertinggi pada jam 10:00 - 14:00.
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/35 p-2.5 border border-slate-800/80 rounded-xl">
                    <div className="flex gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-300 uppercase tracking-wide leading-normal">
                        <span className="font-bold text-red-400">Stok Kritis:</span> Semen abu-abu Portland tipe I tersisa hanya untuk 3 hari persediaan.
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/35 p-2.5 border border-slate-800/80 rounded-xl">
                    <div className="flex gap-2 items-center justify-between w-full">
                      <div className="flex gap-1.5 items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <p className="text-[10px] text-white uppercase tracking-wider font-extrabold">Stok Rendah</p>
                      </div>
                      <button 
                        onClick={onQuickRestock}
                        className="text-[9px] bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-black uppercase tracking-widest px-2.5 py-1.5 transition-all cursor-pointer rounded-lg active:scale-95"
                      >
                        Restock Cepat
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowIntelligenceReport(true)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer active:scale-[0.98]"
              >
                Lihat Laporan Prediksi AI
              </button>
            </div>
          </div>

          {/* Revenue by Category (Small Card) - Bento Piece */}
          <div className="glass-card p-5 rounded-2xl flex-1 flex flex-col justify-between">
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Penjualan Kategori</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Bahan Pondasi &amp; Semen</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Cat &amp; Finishing Dinding</span>
                  <span>22%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Kelistrikan &amp; Alat Kerja</span>
                  <span>13%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '13%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Top Products Section - Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Activity List */}
        <div className="glass-card lg:col-span-7 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-slate-100/60 flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <ActivityIcon className="w-4 h-4 text-blue-600" /> Log Riwayat Aktivitas
            </h4>
            <button 
              onClick={() => onTabChange('finance')}
              className="text-blue-600 hover:underline text-xs font-bold cursor-pointer"
            >
              Lihat Log Jurnal
            </button>
          </div>
          <div className="divide-y divide-slate-100/60 max-h-80 overflow-y-auto">
            {activities.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs uppercase font-bold">Belum ada aktivitas baru</div>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="p-4 hover:bg-slate-50/40 transition-colors flex items-center gap-3 md:gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    act.type === 'sale' ? 'bg-emerald-500/10 text-emerald-600' :
                    act.type === 'arrival' ? 'bg-blue-500/10 text-blue-600' :
                    act.type === 'overdue' ? 'bg-red-500/10 text-red-600' :
                    'bg-amber-500/10 text-amber-600'
                  }`}>
                    {act.type === 'sale' && <ShoppingBag className="w-4 h-4" />}
                    {act.type === 'arrival' && <Forklift className="w-4 h-4" />}
                    {act.type === 'overdue' && <AlertTriangle className="w-4 h-4" />}
                    {act.type === 'quote' && <FileText className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{act.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{act.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {act.amount > 0 && (
                      <p className={`text-xs font-black ${act.type === 'overdue' ? 'text-red-600' : 'text-emerald-600'}`}>
                        {act.type === 'overdue' ? '-' : '+'}Rp {act.amount.toLocaleString('id-ID')}
                      </p>
                    )}
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{act.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Performing Products */}
        <div className="glass-card lg:col-span-5 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-slate-100/60 flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-800">Bahan Bangunan Paling Laris</h4>
            <span className="text-[10px] bg-blue-100/80 text-blue-800 font-bold px-2 py-0.5 rounded-lg">Minggu Ini</span>
          </div>
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {products.slice(0, 4).map((prod, index) => (
              <div key={prod.sku} className="flex items-center gap-4 group">
                <div className="relative shrink-0">
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100 group-hover:scale-105 transition-transform duration-350"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-xs text-slate-800 truncate group-hover:text-blue-600 transition-colors">{prod.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded uppercase tracking-wider ${
                      prod.stockStatus === 'Healthy' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {prod.stockStatus === 'Healthy' ? 'STOK AMAN' : 'STOK RENDAH'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold">Tersedia {prod.stock} {prod.unit}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-xs text-slate-900">Rp {prod.retailPrice.toLocaleString('id-ID')}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">per {prod.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Intelligence Report Modal */}
      <AnimatePresence>
        {showIntelligenceReport && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[100] p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <Lightbulb className="w-5 h-5" />
                  <h3 className="font-black text-sm uppercase tracking-widest">Laporan Kecerdasan Prediktif AI</h3>
                </div>
                <button 
                  onClick={() => setShowIntelligenceReport(false)}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4 text-xs text-slate-600 max-h-96 overflow-y-auto pr-1 leading-relaxed">
                <p className="font-bold text-slate-800">Analisis Prospek Pasar:</p>
                <p>
                  Sistem AI memprediksi adanya kenaikan musiman sebesar 25% dalam permintaan material struktural pondasi (seperti Semen Portland, Pasir Beton, dan Besi Ulir) untuk 10-14 hari ke depan. Hal ini disebabkan oleh peluncuran proyek infrastruktur perumahan sipil di wilayah kota terdekat.
                </p>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 space-y-2">
                  <p className="font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 shrink-0" /> Peringatan Kritis Stok Rendah</p>
                  <p>
                    Pasokan semen curah saat ini berada di bawah batas aman minimum (hanya tersisa 82 zak). Jika dirata-rata dengan penjualan kasir harian, semen ini diprediksi akan habis total pada hari Kamis sore mendatang.
                  </p>
                </div>
                <p className="font-bold text-slate-800">Rekomendasi Tindakan Strategis:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Segera lakukan restock atau buat PO (Purchase Order) baru ke supplier <span className="font-bold">PT Semen Tiga Roda Utama</span> sebanyak 500 zak semen untuk mengamankan stok pengiriman.</li>
                  <li>Tawarkan diskon harga grosir otomatis bagi kontraktor proyek yang bertransaksi antara jam 10 pagi hingga jam 2 siang guna mengoptimalkan operasional angkut armada toko.</li>
                  <li>Kirim tagihan invoice piutang kepada PT Bangun Mandiri untuk menyelesaikan saldo jatuh tempo sebesar <span className="font-bold text-red-600">Rp 12.000.000</span> guna memperlancar arus kas cair (liquid cash-flow).</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button 
                  onClick={() => setShowIntelligenceReport(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Tutup Laporan
                </button>
                <button 
                  onClick={() => {
                    setShowIntelligenceReport(false);
                    onQuickRestock();
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 cursor-pointer transition-all"
                >
                  Eksekusi Restock Cepat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
