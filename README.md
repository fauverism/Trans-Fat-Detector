# Trans Fat Detector 🍪🔍

A fun, playful web app inspired by neal.fun that helps you detect trans fats in food products. Search by product name, scan barcodes, or upload images of ingredient labels!

## Features

- **🔍 Text Search**: Search for food products by name or brand
- **📱 Barcode Scanner**: Scan product barcodes with your camera
- **📸 Image Upload**: Upload photos of ingredient labels for analysis
- **🎨 Playful UI**: Engaging, colorful interface with smooth animations
- **📊 Detailed Results**: View trans fat types, ingredients, and health warnings

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Modern web browser with camera support (for barcode scanning)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **html5-qrcode** - Barcode scanning
- **Lucide React** - Icons

## How It Works

### Text Search Tab
Type in a food brand or product name to search for trans fat information.

### Barcode Scanner Tab
Click "Start Camera" to scan product barcodes. The app will analyze the barcode and display trans fat information.

### Image Upload Tab
Upload or drag & drop a photo of the ingredients label. The app will analyze the image and identify trans fat content.

## Current Implementation

The app currently uses **mock data** for demonstration purposes. In a production environment, you would integrate:

1. **Product Database API**: Connect to food product databases like OpenFoodFacts, USDA FoodData Central, or Nutritionix
2. **Barcode API**: Integrate with barcode lookup services
3. **OCR Service**: Add optical character recognition for ingredient label scanning (Google Cloud Vision, AWS Textract, or Tesseract.js)
4. **Trans Fat Detection Logic**: Implement ingredient analysis to detect:
   - Partially hydrogenated oils
   - Hydrogenated vegetable oils
   - Shortening
   - Margarine (certain types)
   - Other trans fat indicators

## Deploying to Production

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with one click

### Environment Variables

For production, add these environment variables:
```
NEXT_PUBLIC_FOOD_API_KEY=your_api_key
NEXT_PUBLIC_BARCODE_API_KEY=your_api_key
NEXT_PUBLIC_OCR_API_KEY=your_api_key
```

## Health Information

Trans fats are created through hydrogenation and can:
- Increase LDL (bad) cholesterol
- Lower HDL (good) cholesterol
- Increase risk of heart disease
- Contribute to inflammation

The FDA has banned partially hydrogenated oils (the main source of artificial trans fats) from the U.S. food supply, but they may still be present in some imported or older products.

## Future Enhancements

- [ ] Real API integration for product data
- [ ] OCR for ingredient label analysis
- [ ] User accounts and saved searches
- [ ] Nutrition comparison tool
- [ ] Alternative product suggestions
- [ ] Share results on social media
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ to help you make healthier food choices
