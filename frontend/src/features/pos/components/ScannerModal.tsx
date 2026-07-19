import { RefObject } from 'react';
import { Camera, Barcode, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../../types';

interface ScannerModalProps {
  onClose: () => void;
  cameraReady: boolean;
  cameraError: string | null;
  scanningLineActive: boolean;
  scannerStatus: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  products: Product[];
  onSelectProduct: (sku: string) => void;
  onStartCamera: () => void;
  onStopCamera: () => void;
}

export default function ScannerModal({
  onClose,
  cameraReady,
  cameraError,
  scanningLineActive,
  scannerStatus,
  videoRef,
  products,
  onSelectProduct,
  onStartCamera,
  onStopCamera
}: ScannerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-[150] p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl relative overflow-hidden"
      >
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            <span className="font-extrabold text-xs uppercase tracking-widest text-blue-600">Simulasi Pemindai Barcode Laser</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer">✕</button>
        </div>

        <div className="w-full h-48 bg-zinc-950 rounded-2xl relative flex items-center justify-center mt-4 border border-zinc-800 overflow-hidden">
          {cameraReady ? (
            <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          ) : (
            <div className="text-center space-y-2 z-10">
              <Barcode className="w-14 h-14 text-white/40 mx-auto" />
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Menunggu kamera siap...</p>
            </div>
          )}

          {scanningLineActive && (
            <motion.div
              animate={{ y: [0, 160, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              className="absolute left-0 right-0 h-[3px] bg-red-600 shadow-lg shadow-red-500 z-20"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent" />
          {cameraError && (
            <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-2 text-center">
              {cameraError}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={onStartCamera}
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer"
          >
            Aktifkan Kamera
          </button>
          <button
            onClick={onStopCamera}
            className="flex-1 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 font-bold text-[10px] uppercase tracking-wider cursor-pointer"
          >
            Hentikan
          </button>
        </div>

        <div className="py-3 text-center">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Pilih Produk Manual (opsional)</span>
          <div className="grid grid-cols-2 gap-2 mt-2.5 max-h-48 overflow-y-auto pr-1">
            {products.map((prod) => (
              <button
                key={prod.sku}
                onClick={() => onSelectProduct(prod.sku)}
                className="p-2.5 rounded-xl border border-gray-150 bg-gray-50 text-left hover:border-blue-600 hover:bg-blue-50/40 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex justify-between items-start w-full gap-2">
                  <span className="font-bold text-[10px] text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{prod.name}</span>
                  <span className="text-[8px] bg-zinc-200 text-zinc-600 font-mono px-1 rounded">{prod.unit}</span>
                </div>
                <div className="flex items-center justify-between w-full mt-2 border-t border-dashed border-gray-200 pt-1.5">
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">{prod.sku}</span>
                  <Play className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-gray-400 text-center px-4 leading-relaxed">
          {scannerStatus}
        </p>
      </motion.div>
    </div>
  );
}
