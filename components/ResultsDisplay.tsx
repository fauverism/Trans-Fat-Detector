'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Pill } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TransFatResult } from '@/app/page';

interface Props {
  result: TransFatResult;
}

export default function ResultsDisplay({ result }: Props) {
  const statusColor = result.hasTransFat
    ? 'from-red-500 to-pink-600'
    : 'from-green-500 to-emerald-600';

  const statusIcon = result.hasTransFat ? (
    <AlertTriangle className="w-12 h-12" />
  ) : (
    <CheckCircle className="w-12 h-12" />
  );

  const statusMessage = result.hasTransFat
    ? '⚠️ Trans Fats Detected!'
    : '✓ No Trans Fats Found!';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Status Header */}
      <Card className={`p-8 bg-gradient-to-r ${statusColor} text-white shadow-2xl`}>
        <div className="flex items-center justify-center gap-4 mb-4">
          {statusIcon}
          <h2 className="text-4xl font-black">{statusMessage}</h2>
        </div>
        <p className="text-center text-xl font-semibold opacity-90">
          {result.productName}
        </p>
        {result.hasTransFat && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 bg-white/20 backdrop-blur rounded-lg p-4"
          >
            <p className="text-center font-bold text-2xl">
              Total Trans Fat: {result.totalTransFat}
            </p>
          </motion.div>
        )}
      </Card>

      {/* Trans Fat Types */}
      {result.hasTransFat && result.transFatTypes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-red-50 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <Pill className="w-6 h-6 text-red-600" />
              <h3 className="text-2xl font-bold text-red-900">
                Types of Trans Fats Found
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.transFatTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Badge className="px-4 py-2 text-base bg-red-600 hover:bg-red-700">
                    {type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Ingredients List */}
      {result.ingredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-amber-50 border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-6 h-6 text-amber-600" />
              <h3 className="text-2xl font-bold text-amber-900">
                Ingredients
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.ingredients.map((ingredient, index) => {
                const hasTransFat = ingredient.toLowerCase().includes('hydrogenated') ||
                  ingredient.toLowerCase().includes('shortening') ||
                  ingredient.toLowerCase().includes('margarine');

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Badge
                      variant={hasTransFat ? 'destructive' : 'secondary'}
                      className={`px-3 py-1 text-sm ${
                        hasTransFat
                          ? 'bg-red-500 text-white font-bold animate-pulse'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {ingredient}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-orange-50 border-2 border-orange-300">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-orange-900">
                Health Warnings
              </h3>
            </div>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-2 text-orange-800"
                >
                  <span className="text-2xl">•</span>
                  <span className="text-base">{warning}</span>
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      {/* Educational Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-blue-50 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-3">
            📚 Did You Know?
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>Artificial trans fats</strong> are created through hydrogenation, which adds hydrogen to liquid vegetable oils to make them solid.
            </p>
            <p>
              The FDA has determined that partially hydrogenated oils (PHOs) are <strong>not Generally Recognized as Safe</strong> for use in food.
            </p>
            <p>
              Even products labeled as having "0g trans fat" may contain up to <strong>0.5g per serving</strong>.
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
