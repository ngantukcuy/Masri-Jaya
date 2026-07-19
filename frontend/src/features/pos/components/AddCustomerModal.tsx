import { useState, FormEvent } from 'react';
import { UserPlus, X } from 'lucide-react';
import { motion } from 'motion/react';

interface AddCustomerModalProps {
  onClose: () => void;
  onSubmit: (name: string, loyaltyTier: string) => void;
}

export default function AddCustomerModal({ onClose, onSubmit }: AddCustomerModalProps) {
  const [name, setName] = useState('');
  const [loyaltyTier, setLoyaltyTier] = useState('Pelanggan Retail');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), loyaltyTier);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
      />
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        className="bg-white rounded-2xl max-w-sm w-full border border-gray-200 p-6 shadow-2xl max-h-[85vh] overflow-y-auto relative z-10 space-y-4 font-sans text-xs"
      >
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <div className="flex items-center gap-1.5 text-blue-600">
            <UserPlus className="w-5 h-5" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-800">Tambah Pelanggan Baru</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] text-gray-400 font-bold uppercase mb-1">Nama Lengkap Pelanggan</label>
            <input
              type="text"
              required
              placeholder="Contoh: CV. Berkah Abadi, Ahmad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg p-2.5 font-bold text-xs outline-none focus:ring-2 focus:ring-blue-600/15 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-[9px] text-gray-400 font-bold uppercase mb-1">Level Loyalitas</label>
            <select
              value={loyaltyTier}
              onChange={(e) => setLoyaltyTier(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg p-2.5 font-bold text-xs outline-none focus:ring-2 focus:ring-blue-600/15 text-gray-800"
            >
              <option value="Pelanggan Retail">Pelanggan Retail Eceran</option>
              <option value="Platinum Member">Anggota Platinum (VIP)</option>
              <option value="Premium Builder">Kontraktor Utama (Premium)</option>
              <option value="Local Retail Builder">Pembangun Retail Lokal</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-2 rounded-lg cursor-pointer uppercase"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-2 rounded-lg cursor-pointer uppercase shadow-sm"
            >
              Simpan Pelanggan
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
