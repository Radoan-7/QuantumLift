import React from 'react';
import { useElevatorLogic } from '../hooks/useElevatorLogic';
import Elevator from './Elevator';
import Floor from './Floor';

const Building: React.FC = () => {
  const {
    elevatorState,
    calls,
    presenceData,
    callElevator,
    togglePresence
  } = useElevatorLogic();

  // Logical order: lowest floor is 1, highest is 5
  const floors = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-8 items-start">
      {/* Building floors */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 min-w-[400px] border border-gray-700/50">
        <h3 className="text-white text-lg font-bold mb-4 text-center flex items-center justify-center gap-2">
          🏢 Smart Building
          <span className="text-sm text-gray-400 font-normal">(VideoDB AI Enabled)</span>
        </h3>
        <div className="space-y-0">
          {/* Reverse rendering to show top floor first */}
          {floors.slice().reverse().map((floor) => (
            <Floor
              key={floor}
              floorNumber={floor}
              isElevatorHere={elevatorState.currentFloor === floor}
              doorsOpen={elevatorState.doorsOpen && elevatorState.currentFloor === floor}
              onCallElevator={callElevator}
              activeCall={calls.find(call => call.floor === floor)}
              presenceData={presenceData.find(p => p.floor === floor)}
              onTogglePresence={() => togglePresence(floor)}
            />
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-900/30 rounded border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-400 text-sm font-semibold">VideoDB AI Status</span>
          </div>
          <p className="text-xs text-gray-300">
            Real-time presence detection active. Requests auto-cancel if no person detected for 5 seconds.
          </p>
        </div>
      </div>

      {/* Elevator shaft */}
      <div className="h-96">
        <h3 className="text-white text-lg font-bold mb-4 text-center">
          🛗 Quantum Elevator
        </h3>
        <Elevator elevatorState={elevatorState} />
      </div>
    </div>
  );
};

export default Building;
