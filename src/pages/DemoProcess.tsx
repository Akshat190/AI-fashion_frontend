import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ImageCapture from '../components/ImageCapture';
import { Camera, Shield, Sparkles, Sun } from 'lucide-react';

const DemoProcess = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageCapture = (image: string) => {
    setIsProcessing(true);
    // Store the captured image in sessionStorage for the next step
    sessionStorage.setItem('capturedImage', image);
    // Simulate processing delay
    setTimeout(() => {
      navigate('/demo/try-on');
    }, 2000);
  };

  const features = [
    {
      icon: <Camera className="w-8 h-8 text-purple-500" />,
      title: "Easy Capture",
      description: "Take or upload a photo in seconds"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Secure Process",
      description: "Your photos are processed securely"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: "AI-Powered",
      description: "Advanced AI for accurate results"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Virtual Try-On Experience
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get ready to see yourself in a whole new way. Take a photo or upload one to begin your personalized try-on experience.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="mb-8">
              {isProcessing ? (
                <div className="text-center p-12">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
                  <p className="mt-4 text-lg text-gray-600">Processing your image...</p>
                  <p className="text-sm text-gray-500">This will only take a moment</p>
                </div>
              ) : (
                <ImageCapture onImageCapture={handleImageCapture} />
              )}
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Sun className="w-6 h-6 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Tips for the Perfect Shot
                </h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Ensure your face is well-lit</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Remove glasses or accessories</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Face the camera directly</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Keep a neutral expression</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DemoProcess;