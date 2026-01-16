'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, CameraOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransFatResult } from '@/app/page';
import { Html5Qrcode } from 'html5-qrcode';

interface Props {
  setResult: (result: TransFatResult) => void;
}

export default function BarcodeTab({ setResult }: Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState('');

  const startScanning = async () => {
    try {
      setError('');
      const scanner = new Html5Qrcode('barcode-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScannedCode(decodedText);
          stopScanning();
          processBarcode(decodedText);
        },
        () => {
          // Error callback - we can ignore individual frame errors
        }
      );

      setIsScanning(true);
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      console.error(err);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
    setIsScanning(false);
  };

  const processBarcode = (code: string) => {
    // Mock data based on barcode
    const mockResult: TransFatResult = {
      productName: `Product (Barcode: ${code})`,
      hasTransFat: Math.random() > 0.6,
      transFatTypes: ['Partially Hydrogenated Oils', 'Shortening'],
      totalTransFat: `${(Math.random() * 1.5).toFixed(1)}g`,
      ingredients: [
        'Enriched Flour',
        'Sugar',
        'Partially Hydrogenated Oil',
        'Salt',
        'Natural Flavors'
      ],
      warnings: ['Contains trans fats from hydrogenated oils']
    };

    setResult(mockResult);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        stopScanning();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" />
          Scan Barcode
        </h2>
        <p className="text-gray-600">
          Use your camera to scan a product barcode
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div
          id="barcode-reader"
          className={`w-full max-w-md rounded-lg overflow-hidden border-4 ${
            isScanning ? 'border-orange-500' : 'border-gray-200'
          }`}
          style={{ minHeight: isScanning ? '300px' : '0' }}
        />

        {!isScanning && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg flex items-center justify-center border-4 border-dashed border-orange-300"
          >
            <div className="text-center">
              <Camera className="w-24 h-24 mx-auto text-orange-400 mb-4" />
              <p className="text-gray-600 font-medium">
                Ready to scan
              </p>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 w-full">
            <p className="text-red-700 text-sm text-center">{error}</p>
          </div>
        )}

        {scannedCode && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 w-full">
            <p className="text-green-700 text-sm text-center">
              ✓ Scanned: {scannedCode}
            </p>
          </div>
        )}

        <Button
          onClick={isScanning ? stopScanning : startScanning}
          className={`w-full max-w-md py-6 text-lg font-bold ${
            isScanning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
          }`}
        >
          {isScanning ? (
            <>
              <CameraOff className="w-5 h-5 mr-2" />
              Stop Scanning
            </>
          ) : (
            <>
              <Camera className="w-5 h-5 mr-2" />
              Start Camera
            </>
          )}
        </Button>
      </div>

      <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-100">
        <p className="text-sm text-gray-700 text-center">
          📱 <strong>Tip:</strong> Hold the barcode steady in front of your camera
        </p>
      </div>
    </motion.div>
  );
}
