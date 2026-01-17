'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Search, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import TextSearchTab from '@/components/TextSearchTab';
import BarcodeTab from '@/components/BarcodeTab';
import ImageUploadTab from '@/components/ImageUploadTab';
import ResultsDisplay from '@/components/ResultsDisplay';

export interface TransFatResult {
  productName: string;
  hasTransFat: boolean;
  transFatTypes: string[];
  totalTransFat: string;
  ingredients: string[];
  warnings: string[];
  isError?: boolean;
}

export default function Home() {
  const [result, setResult] = useState<TransFatResult | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent font-[family-name:var(--font-bagel-fat-one)]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Trans Fat Detector
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Is your snack hiding something? 🍪🔍
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-6 md:p-8 shadow-2xl border-2 border-orange-200 bg-white/80 backdrop-blur">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-orange-100">
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </TabsTrigger>
                <TabsTrigger value="barcode" className="flex items-center gap-2">
                  <ScanLine className="w-4 h-4" />
                  <span className="hidden sm:inline">Scan</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search">
                <TextSearchTab setResult={setResult} />
              </TabsContent>

              <TabsContent value="barcode">
                <BarcodeTab setResult={setResult} />
              </TabsContent>

              <TabsContent value="upload">
                <ImageUploadTab setResult={setResult} />
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <ResultsDisplay result={result} />
          </motion.div>
        )}

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-600"
        >
          <p className="text-sm">
            Made with ❤️ to help you make healthier choices
          </p>
          <p className="text-xs mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Consumption of trans fats is associated with increased risk for cardiovascular diseases. Artificial trans fats are highly regulated or banned in many countries. However, they are still widely consumed in developing nations where they are associated with increased risk of diabetes, cardiovascular diseases, and death.
          </p>
          <p className="text-sm mt-3">
            <a
              href="https://en.wikipedia.org/wiki/Trans_fat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 underline font-medium"
            >
              Learn more about Trans Fats and why they&apos;re not awesome
            </a>
          </p>
          <p className="text-xs mt-3">
            Version 0.1.2 - Powered by Anthropic
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
