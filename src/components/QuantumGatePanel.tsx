import React, { useState, useEffect } from 'react';
import { QuantumGate, Complex } from '../types/elevator';
import { QuantumSimulator } from '../utils/quantumSimulator';
import { Zap, RotateCcw, Play } from 'lucide-react';

const QuantumGatePanel: React.FC = () => {
  const [simulator] = useState(() => new QuantumSimulator(3));
  const [state, setState] = useState<Complex[]>([]);
  const [gates, setGates] = useState<QuantumGate[]>([]);
  const [selectedQubit, setSelectedQubit] = useState(0);

  useEffect(() => {
    setState(simulator.getState());
  }, [simulator]);

  const applyGate = (gateType: QuantumGate['type'], controlQubit?: number) => {
    const gate: QuantumGate = {
      type: gateType,
      qubit: selectedQubit,
      controlQubit
    };
    
    simulator.applyGate(gate);
    setGates(prev => [...prev, gate]);
    setState(simulator.getState());
  };

  const resetCircuit = () => {
    simulator.reset();
    setGates([]);
    setState(simulator.getState());
  };

  const measureState = () => {
    const result = simulator.measure();
    setState(simulator.getState());
    return result;
  };

  const probabilities = simulator.getProbabilities();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-purple-400" />
        <h3 className="text-white text-lg font-bold">Quantum Circuit Simulator</h3>
      </div>
      
      {/* Qubit Selection */}
      <div className="mb-4">
        <label className="text-white text-sm font-semibold mb-2 block">
          Select Qubit (0-2)
        </label>
        <div className="flex gap-2">
          {[0, 1, 2].map(qubit => (
            <button
              key={qubit}
              onClick={() => setSelectedQubit(qubit)}
              className={`px-3 py-1 rounded transition-colors ${
                selectedQubit === qubit
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Q{qubit}
            </button>
          ))}
        </div>
      </div>

      {/* Gate Buttons */}
      <div className="mb-4">
        <label className="text-white text-sm font-semibold mb-2 block">
          Quantum Gates
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => applyGate('H')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            H (Hadamard)
          </button>
          <button
            onClick={() => applyGate('X')}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            X (Pauli-X)
          </button>
          <button
            onClick={() => applyGate('Y')}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            Y (Pauli-Y)
          </button>
          <button
            onClick={() => applyGate('Z')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            Z (Pauli-Z)
          </button>
        </div>
        
        <button
          onClick={() => applyGate('CNOT', selectedQubit === 0 ? 1 : 0)}
          className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          CNOT (Control: Q{selectedQubit === 0 ? 1 : 0}, Target: Q{selectedQubit})
        </button>
      </div>

      {/* State Visualization */}
      <div className="mb-4">
        <label className="text-white text-sm font-semibold mb-2 block">
          Quantum State Probabilities
        </label>
        <div className="space-y-1">
          {probabilities.map((prob, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-gray-300 text-xs w-8">
                |{index.toString(2).padStart(3, '0')}⟩
              </span>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${prob * 100}%` }}
                />
              </div>
              <span className="text-gray-300 text-xs w-12">
                {(prob * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Applied Gates */}
      <div className="mb-4">
        <label className="text-white text-sm font-semibold mb-2 block">
          Applied Gates ({gates.length})
        </label>
        <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
          {gates.map((gate, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
            >
              {gate.type}(Q{gate.qubit}{gate.controlQubit !== undefined ? `,Q${gate.controlQubit}` : ''})
            </span>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <button
          onClick={measureState}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <Play className="w-4 h-4" />
          Measure
        </button>
        <button
          onClick={resetCircuit}
          className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        <p>Apply quantum gates to see how they affect the elevator's decision-making quantum state.</p>
      </div>
    </div>
  );
};

export default QuantumGatePanel;