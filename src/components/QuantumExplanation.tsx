import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Atom } from 'lucide-react';

const QuantumExplanation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-white font-bold text-lg mb-4 hover:text-purple-400 transition-colors"
      >
        <Atom className="w-6 h-6" />
        Quantum Connection
        {isExpanded ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>
      
      {isExpanded && (
        <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
          <div>
            <h4 className="text-purple-400 font-semibold mb-2">🌊 Quantum Superposition</h4>
            <p>
              When you press a call button, the request enters a "quantum state" - it exists 
              until the user leaves (timeout) or the elevator arrives. This mimics how quantum 
              particles exist in multiple states simultaneously.
            </p>
          </div>
          
          <div>
            <h4 className="text-blue-400 font-semibold mb-2">⚡ Quantum Optimization</h4>
            <p>
              Our quantum mode uses optimization principles inspired by QAOA (Quantum Approximate 
              Optimization Algorithm). Instead of simple first-come-first-serve, it calculates 
              the "energy cost" of each route considering distance and wait time.
            </p>
          </div>
          
          <div>
            <h4 className="text-pink-400 font-semibold mb-2">💥 Quantum Collapse</h4>
            <p>
              When a user's patience runs out (10-second timer), their request "collapses" - 
              just like how quantum states collapse when observed or measured. The user has 
              effectively "left" the building.
            </p>
          </div>
          
          <div className="bg-purple-900/30 p-3 rounded border-l-4 border-purple-400">
            <p className="text-xs">
              <strong>Real-world Impact:</strong> Quantum computing could revolutionize elevator 
              systems in skyscrapers by processing thousands of requests simultaneously and 
              finding optimal routes that traditional computers couldn't calculate in real-time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumExplanation;