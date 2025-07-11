'use client';

import React from 'react';
import { useLoadingContext } from '../../contexts/LoadingContext';
import { LoadingSpinner, LoadingOverlay } from '../../components/LoadingScreen';

export default function LoadingDemo() {
  const { showLoading, hideLoading } = useLoadingContext();
  const [componentLoading, setComponentLoading] = React.useState(false);

  const handleGlobalLoading = (message: string, duration: number) => {
    showLoading(message);
    setTimeout(() => {
      hideLoading();
    }, duration);
  };

  const handleComponentLoading = () => {
    setComponentLoading(true);
    setTimeout(() => {
      setComponentLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Loading Screen Demo
          </h1>
          <p className="text-lg text-gray-600">
            Test different loading states and animations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Global Loading Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Global Loading Screen
            </h2>
            <p className="text-gray-600 mb-6">
              These buttons trigger the full-screen loading overlay with different messages and durations.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleGlobalLoading('Loading...', 2000)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Basic Loading (2s)
              </button>
              
              <button
                onClick={() => handleGlobalLoading('Preparing your experience...', 3000)}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Custom Message (3s)
              </button>
              
              <button
                onClick={() => handleGlobalLoading('Processing your request...', 4000)}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Long Loading (4s)
              </button>
              
              <button
                onClick={() => handleGlobalLoading('Sending your message...', 2500)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Email Simulation (2.5s)
              </button>
            </div>
          </div>

          {/* Component Loading Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Component Loading
            </h2>
            <p className="text-gray-600 mb-6">
              These examples show local loading states for specific components.
            </p>

            {/* Loading Overlay Example */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Loading Overlay</h3>
              <LoadingOverlay isLoading={componentLoading}>
                <div className="bg-gray-100 rounded-lg p-6 min-h-[120px] flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Content Area</h4>
                    <p className="text-gray-600">This content will be overlaid with a loading screen</p>
                  </div>
                </div>
              </LoadingOverlay>
              
              <button
                onClick={handleComponentLoading}
                className="mt-3 w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Test Component Loading
              </button>
            </div>

            {/* Spinner Examples */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Loading Spinners</h3>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-xs text-gray-500 mt-2">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="text-xs text-gray-500 mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="text-xs text-gray-500 mt-2">Large</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How to Use
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Global Loading</h3>
              <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`import { useLoadingContext } from '../contexts/LoadingContext';

function MyComponent() {
  const { showLoading, hideLoading } = useLoadingContext();
  
  const handleAction = async () => {
    showLoading('Processing...');
    try {
      await someAsyncAction();
    } finally {
      hideLoading();
    }
  };
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Component Loading</h3>
              <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`import { LoadingOverlay, LoadingSpinner } from '../components/LoadingScreen';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  
  return (
    <LoadingOverlay isLoading={loading}>
      <div>Your content here</div>
    </LoadingOverlay>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
