import React from 'react';
import { ElevatorState } from '../types/elevator';

interface ElevatorProps {
  elevatorState: ElevatorState;
}

const Elevator: React.FC<ElevatorProps> = ({ elevatorState }) => {
  const { currentFloor, isMoving, doorsOpen, direction } = elevatorState;
  
  // ✅ Corrected offset for elevator cabin
  const elevatorTop = `${(6 - currentFloor - 1) * 20}%`;

  return (
    <div className="relative w-32 h-full bg-gray-800 border-2 border-gray-600 rounded-lg">
      {/* Floor indicators */}
      {[5, 4, 3, 2, 1].map((floor) => (
        <div
          key={floor}
          className="absolute w-full h-[20%] border-b border-gray-600 flex items-center justify-center"
          style={{ top: `${(6 - floor - 1) * 20}%` }}
        >
          <span className="text-xs text-gray-400">{floor}</span>
        </div>
      ))}
      
      {/* Elevator cabin */}
      <div
        className={`absolute w-28 h-[18%] mx-auto left-1 transition-all duration-1000 ease-in-out ${
          isMoving ? 'shadow-lg shadow-blue-500/50' : ''
        }`}
        style={{ top: elevatorTop }}
      >
        <div className={`w-full h-full rounded transition-colors ${
          doorsOpen ? 'bg-green-500' : 'bg-blue-600'
        }`}>
          {/* Elevator doors */}
          <div className="flex h-full">
            <div className={`w-1/2 bg-gray-300 transition-transform duration-300 ${
              doorsOpen ? 'transform -translate-x-full' : ''
            }`}></div>
            <div className={`w-1/2 bg-gray-300 transition-transform duration-300 ${
              doorsOpen ? 'transform translate-x-full' : ''
            }`}></div>
          </div>
          
          {/* Direction indicator */}
          {direction && (
            <div className="absolute top-1 right-1 text-white text-xs">
              {direction === 'up' ? '↑' : '↓'}
            </div>
          )}
        </div>
      </div>
      
      {/* Current floor indicator */}
      <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-gray-700 px-2 py-1 rounded">
        <div className="text-white text-sm font-bold">
          Floor {currentFloor}
        </div>
        {isMoving && (
          <div className="text-xs text-yellow-400">Moving...</div>
        )}
      </div>
    </div>
  );
};

export default Elevator;
