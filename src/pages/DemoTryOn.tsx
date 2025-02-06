import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import ColorPicker from '../components/ColorPicker';
import { Wand2, ShoppingBag, AlertCircle, Palette, Wand, Camera, Sparkles, Crown, Heart } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  colors: string[];
  icon: React.ReactNode;
  description: string;
}

const categories: Category[] = [
  {
    id: 'lipstick',
    name: 'Lipstick',
    icon: <Palette className="w-5 h-5" />,
    colors: ['#FF0000', '#FF69B4', '#FF1493', '#C71585', '#DB7093'],
    description: 'Perfect your pout with vibrant colors'
  },
  {
    id: 'eyeshadow',
    name: 'Eye Shadow',
    icon: <Wand className="w-5 h-5" />,
    colors: ['#B8860B', '#CD853F', '#DEB887', '#D2691E', '#8B4513'],
    description: 'Create stunning eye looks'
  },
  {
    id: 'foundation',
    name: 'Foundation',
    icon: <Sparkles className="w-5 h-5" />,
    colors: ['#FFE4C4', '#DEB887', '#D2B48C', '#BC8F8F', '#F4A460'],
    description: 'Flawless base for your look'
  },
  {
    id: 'blush',
    name: 'Blush',
    icon: <Heart className="w-5 h-5" />,
    colors: ['#FFB6C1', '#FF69B4', '#DB7093', '#DC143C', '#C71585'],
    description: 'Add a natural flush'
  },
  {
    id: 'eyeliner',
    name: 'Eyeliner',
    icon: <Wand className="w-5 h-5" />,
    colors: ['#000000', '#4B0082', '#800080', '#8B4513', '#696969'],
    description: 'Define your eyes'
  },
];

const DemoTryOn = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('lipstick');
  const [selectedColor, setSelectedColor] = useState<string>();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  useEffect(() => {
    const image = sessionStorage.getItem('capturedImage');
    if (!image) {
      navigate('/demo/process');
    } else {
      setCapturedImage(image);
    }
  }, [navigate]);

  if (!capturedImage) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          <div className="text-center bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto border border-purple-100">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4 animate-bounce" />
            <p className="text-gray-600 text-lg mb-4">No image found. Please capture or upload an image first.</p>
            <Button variant="primary" icon={Camera} onClick={() => navigate('/demo/process')}>
              Take Photo
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-4">
              <Crown className="w-5 h-5 text-purple-500" />
              <span className="text-purple-700 font-medium">Virtual Beauty Studio</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Transform Your Look</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Product Categories */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90 border border-purple-100">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                  <Palette className="w-6 h-6 text-purple-500" />
                  Makeup Categories
                </h2>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex flex-col gap-2 p-4 rounded-2xl transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'hover:bg-purple-50 text-gray-700 border border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={selectedCategory === category.id ? 'text-white' : 'text-purple-500'}>
                          {category.icon}
                        </span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <p className={`text-sm ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {category.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Preview */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90 border border-purple-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-2xl transform -rotate-1"></div>
                  <div className="relative bg-white rounded-2xl p-2 shadow-lg">
                    <img
                      src={capturedImage}
                      alt="Your photo"
                      className="w-full rounded-xl object-contain"
                    />
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Wand className="w-5 h-5 text-purple-500" />
                      Select Your Shade
                    </h3>
                    <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {currentCategory?.name}
                    </span>
                  </div>
                  {currentCategory && (
                    <ColorPicker
                      colors={currentCategory.colors}
                      selectedColor={selectedColor}
                      onChange={setSelectedColor}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
                  <Button
                    variant="primary"
                    icon={Wand2}
                    onClick={() => navigate('/demo/process')}
                    className="transform hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                  >
                    Try Different Photo
                  </Button>
                  <Button
                    variant="secondary"
                    icon={ShoppingBag}
                    onClick={() => navigate('/demo/recommendations')}
                    className="transform hover:scale-105 transition-transform shadow-md hover:shadow-lg"
                  >
                    View Products
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DemoTryOn;