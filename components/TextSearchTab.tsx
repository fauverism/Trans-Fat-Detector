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

    try {
      const response = await fetch('/api/analyze-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productText: searchTerm }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const errorText = await response.text().catch(() => '');
        const errorMessage =
          errorBody?.details ||
          errorBody?.error ||
          errorText ||
          `Request failed (${response.status})`;
        throw new Error(errorMessage);
      }

      const analysis = await response.json();

      // Transform AI analysis to TransFatResult format
      const result: TransFatResult = {
        productName: searchTerm,
        hasTransFat: analysis.hasTransFat,
        transFatTypes: analysis.ingredients || [],
        totalTransFat: analysis.hasTransFat ? 'Present' : '0g',
        ingredients: analysis.ingredients || [],
        warnings: analysis.reasons || [],
      };

      setResult(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to analyze product';
      console.error('Error analyzing product:', error);
      // Show error result
      const errorResult: TransFatResult = {
        productName: searchTerm,
        hasTransFat: false,
        transFatTypes: [],
        totalTransFat: 'Unknown',
        ingredients: [],
        warnings: [errorMessage],
        isError: true,
      };
      setResult(errorResult);
    } finally {
      setIsSearching(false);
    }
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
          Type a product name or paste an ingredient list
        </p>
      </div>

      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="e.g., 'Oreos' or paste ingredients..."
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
          💡 <strong>Tip:</strong> Try product names like &quot;Oreos&quot; or paste ingredient lists for AI analysis
        </p>
      </div>
    </motion.div>
  );
}
