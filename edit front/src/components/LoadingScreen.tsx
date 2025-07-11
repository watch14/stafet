'use client';

import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
  showProgress?: boolean;
}

export default function LoadingScreen({ 
  isLoading, 
  message = "Loading...", 
  showProgress = true 
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(message);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Animate loading text
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev.endsWith('...')) {
          return message;
        }
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [isLoading, message]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      </div>

      {/* Loading Content */}
      <div className="relative flex flex-col items-center justify-center text-center max-w-md mx-auto px-6">
        
        {/* Logo Area */}
        <div className="mb-8">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            STAFET
          </div>
          <div className="h-1 w-16 bg-blue-600 rounded-full mx-auto"></div>
        </div>

        {/* Main Loading Animation */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-pulse"></div>
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          
          {/* Inner Pulsing Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {loadingText}
          </h2>
          <p className="text-sm text-gray-600">
            Preparing your experience
          </p>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full max-w-xs">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-500 h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span className="font-medium">{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute -top-8 right-8 w-1 h-1 bg-blue-300 rounded-full animate-bounce delay-200"></div>
        <div className="absolute -bottom-6 -right-2 w-3 h-3 bg-blue-200 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-4 -left-6 w-1 h-1 bg-blue-500 rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
          <span>Professional Web Solutions</span>
        </div>
      </div>
    </div>
  );
}

// Alternative minimal loading spinner component
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
  );
}

// Loading overlay for specific components
export function LoadingOverlay({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="flex flex-col items-center space-y-3">
            <LoadingSpinner size="lg" />
            <span className="text-sm text-gray-600 font-medium">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
