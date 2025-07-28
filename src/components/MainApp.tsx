import React from 'react';
import { useElevatorLogic } from '../hooks/useElevatorLogic';
import Building from './Building';
import LogPanel from './LogPanel';
import ControlPanel from './ControlPanel';
import ExplanationPanels from './ExplanationPanels';
import QuantumGatePanel from './QuantumGatePanel';
import ParticleSystem from './ParticleSystem';

const MainApp: React.FC = () => {
  const {
    elevatorState,
    calls,
    logs,
    optimizationMode,
    setOptimizationMode,
    callElevator,
    reset
  } = useElevatorLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-x-auto">
      <ParticleSystem />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            QuantumLift
          </h1>
          <p className="text-lg text-gray-300 mb-2">
            "Elevate Smarter, Inspired by Quantum."
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>VideoDB AI Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Quantum Computing Ready</span>
            </div>
          </div>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column - Building and Elevator */}
          <div className="xl:col-span-2">
            <div className="flex justify-center">
              <Building />
            </div>
          </div>
          
          {/* Right Column - Controls and Info */}
          <div className="xl:col-span-2 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ControlPanel
                optimizationMode={optimizationMode}
                onOptimizationModeChange={setOptimizationMode}
                onReset={reset}
              />
              
              <QuantumGatePanel />
            </div>
            
            <LogPanel logs={logs} />
            
            <ExplanationPanels />
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center gap-6 mb-2">
            <span>🏆 Made By </span>
            <span>- Radoan</span>
          </div>
          <p>Fully functional demo - All features working in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default MainApp;