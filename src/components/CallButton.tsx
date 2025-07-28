import React from 'react';
import { FloorCall } from '../types/elevator';
import { Phone, PhoneOff, Timer, Users } from 'lucide-react';

interface CallButtonProps {
  floor: number;
  onCall: (floor: number) => void;
  activeCall?: FloorCall;
  hasPresence: boolean;
}

const CallButton: React.FC<CallButtonProps> = ({ floor, onCall, activeCall, hasPresence }) => {
  const isActive = activeCall?.floor === floor;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onCall(floor)}
        disabled={isActive}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
          isActive
            ? hasPresence
              ? 'bg-yellow-500 text-black animate-pulse cursor-not-allowed shadow-lg shadow-yellow-500/30'
              : 'bg-red-500 text-white animate-pulse cursor-not-allowed shadow-lg shadow-red-500/30'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isActive ? (
          hasPresence ? <Phone className="w-4 h-4" /> : <PhoneOff className="w-4 h-4" />
        ) : (
          <Phone className="w-4 h-4" />
        )}
        {isActive ? 'CALLED' : 'CALL'}
      </button>
      
      {isActive && (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
            hasPresence ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <Timer className="w-3 h-3" />
            <span className="font-mono">{activeCall.timeRemaining}s</span>
          </div>
          
          {!hasPresence && activeCall.presenceTimer <= 3 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-orange-500/20 text-orange-400 animate-pulse">
              <Users className="w-3 h-3" />
              <span className="font-mono">{activeCall.presenceTimer}s</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CallButton;