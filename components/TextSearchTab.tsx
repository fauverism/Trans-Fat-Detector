'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TransFatResult } from '@/app/page';

interface Props {
  setResult: (result: TransFatResult) => void;
}

export default function TextSearchTab({ setResult }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock data - in production, this would call an API
    const mockResult: TransFatResult = {
      productName: searchTerm,
      hasTransFat: Math.random() > 0.5,
      transFatTypes: [
        'Partially Hydrogenated Oils',
        'Shortening',
        'Margarine'
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      totalTransFat: `${(Math.random() * 2).toFixed(1)}g`,
      ingredients: [
        'Enriched Flour',
        'Sugar',
        'Partially Hydrogenated Soybean Oil',
        'High Fructose Corn Syrup',
        'Salt',
        'Artificial Flavors'
      ],
      warnings: [
        'Contains partially hydrogenated oils',
        'May increase LDL cholesterol',
        'Recommended to limit consumption'
      ]
    };

    setResult(mockResult);
    setIsSearching(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" />
          Search by Name
        </h2>
        <p className="text-gray-600">
          Type in a food brand or product name
        </p>
      </div>

      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="Try 'Oreos' or 'Doritos'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="text-lg py-6 border-2 border-orange-200 focus:border-orange-400"
        />
        <Button
          onClick={handleSearch}
          disabled={isSearching || !searchTerm.trim()}
          className="px-6 py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          {isSearching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Search className="w-5 h-5" />
            </motion.div>
          ) : (
            <Search className="w-5 h-5" />
          )}
        </Button>
      </div>

      <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-100">
        <p className="text-sm text-gray-700 text-center">
          💡 <strong>Tip:</strong> Try searching for popular snack brands or packaged foods
        </p>
      </div>
    </motion.div>
  );
}
