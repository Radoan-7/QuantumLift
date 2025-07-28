import React from 'react';
import { PresenceData } from '../types/elevator';
import { Eye, EyeOff, Wifi } from 'lucide-react';

interface PresenceIndicatorProps {
  presenceData: PresenceData;
  onToggle: () => void;
}

const PresenceIndicator: React.FC<PresenceIndicatorProps> = ({ presenceData, onToggle }) => {
  const { detected, confidence } = presenceData;
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-300 ${
          detected
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}
        title="Click to toggle presence (demo mode)"
      >
        {detected ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
        <span className="font-mono">
          {detected ? 'PRESENT' : 'ABSENT'}
        </span>
      </button>
      
      {detected && (
        <div className="flex items-center gap-1">
          <Wifi className="w-3 h-3 text-blue-400" />
          <span className="text-xs text-blue-400 font-mono">
            {(confidence * 100).toFixed(0)}%
          </span>
        </div>
      )}
      
      {detected && (
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default PresenceIndicator;