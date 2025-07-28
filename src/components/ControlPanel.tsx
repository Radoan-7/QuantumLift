import React from 'react';
import { OptimizationMode } from '../types/elevator';
import { RefreshCw, Zap, Clock, Brain, Video } from 'lucide-react';

interface ControlPanelProps {
  optimizationMode: OptimizationMode;
  onOptimizationModeChange: (mode: OptimizationMode) => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  optimizationMode,
  onOptimizationModeChange,
  onReset
}) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
      <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-cyan-400" />
        AI Control Center
      </h3>
      
      <div className="space-y-4">
        {/* Optimization Mode Toggle */}
        <div>
          <label className="text-white text-sm font-semibold mb-3 block flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            Optimization Algorithm
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onOptimizationModeChange('fcfs')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                optimizationMode === 'fcfs'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Clock className="w-4 h-4" />
              <div className="text-left">
                <div className="font-semibold">FCFS</div>
                <div className="text-xs opacity-80">Classical</div>
              </div>
            </button>
            <button
              onClick={() => onOptimizationModeChange('quantum')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                optimizationMode === 'quantum'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Zap className="w-4 h-4" />
              <div className="text-left">
                <div className="font-semibold">Quantum</div>
                <div className="text-xs opacity-80">QAOA-inspired</div>
              </div>
            </button>
          </div>
          <div className="mt-2 p-2 bg-gray-700/50 rounded text-xs text-gray-400">
            {optimizationMode === 'quantum' ? (
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-purple-400" />
                Using quantum-inspired optimization with VideoDB presence weighting
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-blue-400" />
                Using First-Come-First-Serve with VideoDB presence validation
              </div>
            )}
          </div>
        </div>
        
        {/* System Status */}
        <div className="bg-gray-700/30 rounded p-3">
          <div className="flex items-center gap-2 mb-2">
            <Video className="w-4 h-4 text-blue-400" />
            <span className="text-white text-sm font-semibold">System Status</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">VideoDB AI: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-400">Quantum Engine: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-400">Presence Detection: Running</span>
            </div>
          </div>
        </div>
        
        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Simulation
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;