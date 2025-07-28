import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Atom, Video, Brain, Zap } from 'lucide-react';

const ExplanationPanels: React.FC = () => {
  const [quantumExpanded, setQuantumExpanded] = useState(false);
  const [videodbExpanded, setVideodbExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Quantum Computing Explanation */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
        <button
          onClick={() => setQuantumExpanded(!quantumExpanded)}
          className="flex items-center gap-2 text-white font-bold text-lg mb-4 hover:text-purple-400 transition-colors w-full"
        >
          <Atom className="w-6 h-6 text-purple-400" />
          Quantum Computing Integration
          {quantumExpanded ? (
            <ChevronDown className="w-5 h-5 ml-auto" />
          ) : (
            <ChevronRight className="w-5 h-5 ml-auto" />
          )}
        </button>
        
        {quantumExpanded && (
          <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
            <div className="bg-purple-900/30 p-3 rounded border-l-4 border-purple-400">
              <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                QAOA-Inspired Optimization
              </h4>
              <p>
                Our quantum mode uses optimization principles inspired by the Quantum Approximate 
                Optimization Algorithm (QAOA). Instead of simple first-come-first-serve, it calculates 
                the "energy cost" of each route considering distance, wait time, and presence confidence.
              </p>
            </div>
            
            <div className="bg-blue-900/30 p-3 rounded border-l-4 border-blue-400">
              <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Quantum Superposition & Collapse
              </h4>
              <p>
                When you press a call button, the request enters a "quantum state" - it exists 
                until the user leaves (timeout) or the elevator arrives. This mimics how quantum 
                particles exist in multiple states simultaneously until measured.
              </p>
            </div>
            
            <div className="bg-pink-900/30 p-3 rounded border-l-4 border-pink-400">
              <h4 className="text-pink-400 font-semibold mb-2">🔬 Interactive Quantum Gates</h4>
              <p>
                The quantum circuit simulator lets you apply real quantum gates (H, X, Y, Z, CNOT) 
                and observe how they affect quantum states. This demonstrates the principles that 
                could power future quantum-enhanced elevator systems.
              </p>
            </div>
            
            <div className="text-xs text-gray-400 italic">
              <strong>Real-world Impact:</strong> Quantum computing could revolutionize elevator 
              systems in skyscrapers by processing thousands of requests simultaneously and 
              finding optimal routes that classical computers couldn't calculate in real-time.
            </div>
          </div>
        )}
      </div>

      {/* VideoDB AI Explanation */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
        <button
          onClick={() => setVideodbExpanded(!videodbExpanded)}
          className="flex items-center gap-2 text-white font-bold text-lg mb-4 hover:text-blue-400 transition-colors w-full"
        >
          <Video className="w-6 h-6 text-blue-400" />
          VideoDB AI Integration
          {videodbExpanded ? (
            <ChevronDown className="w-5 h-5 ml-auto" />
          ) : (
            <ChevronRight className="w-5 h-5 ml-auto" />
          )}
        </button>
        
        {videodbExpanded && (
          <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
            <div className="bg-blue-900/30 p-3 rounded border-l-4 border-blue-400">
              <h4 className="text-blue-400 font-semibold mb-2">🎥 Smart Presence Detection</h4>
              <p>
                VideoDB's AI continuously monitors camera feeds near each floor's call panel. 
                It detects human presence with confidence scoring and tracks whether someone 
                is actually waiting for the elevator.
              </p>
            </div>
            
            <div className="bg-green-900/30 p-3 rounded border-l-4 border-green-400">
              <h4 className="text-green-400 font-semibold mb-2">⚡ Ghost Request Prevention</h4>
              <p>
                When no person is detected for 5 seconds after a call, the system automatically 
                cancels the request. This prevents "ghost calls" from accidental button presses, 
                pets, or maintenance equipment, saving energy and improving efficiency.
              </p>
            </div>
            
            <div className="bg-yellow-900/30 p-3 rounded border-l-4 border-yellow-400">
              <h4 className="text-yellow-400 font-semibold mb-2">🧠 Enhanced Optimization</h4>
              <p>
                VideoDB's presence confidence scores are integrated into the quantum optimization 
                algorithm. Higher confidence presence gets priority, while low-confidence requests 
                are deprioritized to optimize overall system performance.
              </p>
            </div>
            
            <div className="text-xs text-gray-400 italic">
              <strong>Demo Mode:</strong> Click the presence indicators to simulate different 
              scenarios and see how VideoDB AI affects elevator routing decisions in real-time.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationPanels;