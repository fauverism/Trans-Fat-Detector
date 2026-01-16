'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransFatResult } from '@/app/page';

interface Props {
  setResult: (result: TransFatResult) => void;
}

export default function ImageUploadTab({ setResult }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);

    // Simulate image analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock OCR and analysis result
    const mockResult: TransFatResult = {
      productName: 'Detected Food Product',
      hasTransFat: Math.random() > 0.5,
      transFatTypes: ['Partially Hydrogenated Vegetable Oil', 'Shortening'],
      totalTransFat: `${(Math.random() * 2).toFixed(1)}g`,
      ingredients: [
        'Wheat Flour',
        'Sugar',
        'Partially Hydrogenated Soybean Oil',
        'Corn Syrup',
        'Salt',
        'Leavening Agents',
        'Artificial Flavors'
      ],
      warnings: [
        'Contains partially hydrogenated oils',
        'Trans fats may increase heart disease risk'
      ]
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
          Upload Image
        </h2>
        <p className="text-gray-600">
          Take a photo of the ingredients label
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-4 border-dashed rounded-lg transition-all ${
          isDragging
            ? 'border-orange-500 bg-orange-50'
            : 'border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50'
        }`}
      >
        {selectedImage ? (
          <div className="relative">
            <img
              src={selectedImage}
              alt="Uploaded food label"
              className="w-full h-auto rounded-lg"
            />
            <Button
              onClick={clearImage}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="p-12 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ImageIcon className="w-24 h-24 mx-auto text-orange-400 mb-4" />
            </motion.div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag & drop an image here
            </p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </Button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {selectedImage && (
        <Button
          onClick={analyzeImage}
          disabled={isAnalyzing}
          className="w-full py-6 text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          {isAnalyzing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="mr-2"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Analyzing Image...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Ingredients
            </>
          )}
        </Button>
      )}

      <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-100">
        <p className="text-sm text-gray-700 text-center">
          📸 <strong>Tip:</strong> Make sure the ingredients list is clear and well-lit
        </p>
      </div>
    </motion.div>
  );
}
