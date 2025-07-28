import React from 'react';
import { FloorCall, PresenceData } from '../types/elevator';
import CallButton from './CallButton';
import PresenceIndicator from './PresenceIndicator';

interface FloorProps {
  floorNumber: number;
  isElevatorHere: boolean;
  doorsOpen: boolean;
  onCallElevator: (floor: number) => void;
  activeCall?: FloorCall;
  presenceData?: PresenceData;
  onTogglePresence: () => void;
}

const Floor: React.FC<FloorProps> = ({
  floorNumber,
  isElevatorHere,
  doorsOpen,
  onCallElevator,
  activeCall,
  presenceData,
  onTogglePresence
}) => {
  return (
    <div className={`flex items-center justify-between p-4 border-b border-gray-700 transition-all duration-300 ${
      isElevatorHere ? 'bg-blue-900/30 border-blue-500/50' : ''
    }`}>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-white w-8">
          {floorNumber}
        </span>
        
        {isElevatorHere && (
          <div className={`text-sm px-3 py-1 rounded-full transition-all duration-300 ${
            doorsOpen 
              ? 'bg-green-500 text-white animate-pulse' 
              : 'bg-yellow-500 text-black'
          }`}>
            {doorsOpen ? '🚪 Doors Open' : '🛗 Elevator Here'}
          </div>
        )}
        
        {presenceData && (
          <PresenceIndicator 
            presenceData={presenceData} 
            onToggle={onTogglePresence}
          />
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <CallButton
          floor={floorNumber}
          onCall={onCallElevator}
          activeCall={activeCall}
          hasPresence={presenceData?.detected || false}
        />
      </div>
    </div>
  );
};

export default Floor;