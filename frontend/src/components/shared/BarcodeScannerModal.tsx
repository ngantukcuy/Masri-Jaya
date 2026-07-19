import { useEffect, useRef, useState } from 'react';
import { Camera, X, ScanLine } from 'lucide-react';
import { motion } from 'motion/react';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';

interface BarcodeScannerModalProps {
  onClose: () => void;
  onDetected: (code: string) => void;
  title?: string;
}

/**
 * Real (non-simulated) camera barcode/QR scanner. Uses the device camera
 * via getUserMedia + ZXing to decode EAN/UPC/Code128/QR codes live, and
 * reports the first successful read back to the caller.
 */
export default function BarcodeScannerModal({ onClose, onDetected, title }: BarcodeScannerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Mengaktifkan kamera...');
  const detectedRef = useRef(false);

  useEffect(() => {
    detectedRef.current = false;
    const reader = new BrowserMultiFormatReader();
    let cancelled = false;

    reader
      .decodeFromConstraints(
        { video: { facingMode: { ideal: 'environment' } } },
        videoRef.current!,
        (result, err, controls) => {
          if (cancelled) return;
          controlsRef.current = controls;
          if (result && !detectedRef.current) {
            detectedRef.current = true;
            setStatus(`Barcode terbaca: ${result.getText()}`);
            onDetected(result.getText());
            controls.stop();
          } else if (err && status !== 'Mengarahkan ke barcode...') {
            setStatus('Mengarahkan ke barcode...');
          }
        }
      )
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error('[barcode-scanner] Gagal mengakses kamera:', err);
        setError(
          err instanceof Error
            ? `Tidak bisa mengakses kamera: ${err.message}`
            : 'Tidak bisa mengakses kamera. Pastikan izin kamera diaktifkan.'
        );
      });

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-[200] p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl relative overflow-hidden"
      >
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            <span className="font-extrabold text-xs uppercase tracking-widest text-blue-600">
              {title || 'Scan Barcode'}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full h-56 bg-zinc-950 rounded-2xl relative flex items-center justify-center mt-4 border border-zinc-800 overflow-hidden">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          {!error && (
            <motion.div
              animate={{ y: [0, 200, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
              className="absolute left-0 right-0 h-[3px] bg-red-600 shadow-lg shadow-red-500 z-20"
            />
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="text-center space-y-2">
                <ScanLine className="w-10 h-10 text-white/40 mx-auto" />
                <p className="text-[10px] text-red-300 font-bold">{error}</p>
              </div>
            </div>
          )}
        </div>

        <p className="text-[10px] text-gray-400 text-center px-4 leading-relaxed mt-3">
          {error || status}
        </p>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 font-bold text-[10px] uppercase tracking-wider cursor-pointer"
        >
          Tutup
        </button>
      </motion.div>
    </div>
  );
}
