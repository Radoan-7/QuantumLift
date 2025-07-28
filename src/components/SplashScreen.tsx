import React, { useState, useEffect } from 'react';
import ParticleSystem from './ParticleSystem';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <ParticleSystem />
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl px-8">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              QuantumLift
            </h1>
            <p className="text-xl md:text-2xl text-white/80 animate-fade-in-up mb-6">
              "Elevate Smarter, Inspired by Quantum."
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                <span>VideoDB AI Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                <span>Quantum Computing</span>
              </div>
            </div>
          </div>
          
          {/* Loading Progress */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Initializing Systems</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 text-xs text-gray-500">
              {progress < 30 && "Loading VideoDB AI engine..."}
              {progress >= 30 && progress < 60 && "Initializing quantum circuits..."}
              {progress >= 60 && progress < 90 && "Calibrating presence detection..."}
              {progress >= 90 && "System ready!"}
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;