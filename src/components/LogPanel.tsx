import React from 'react';
import { LogEntry } from '../types/elevator';
import { Activity, CheckCircle, AlertTriangle, Zap, Video, Users } from 'lucide-react';

interface LogPanelProps {
  logs: LogEntry[];
}

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'quantum': return <Zap className="w-4 h-4" />;
      case 'videodb': return <Video className="w-4 h-4" />;
      case 'presence': return <Users className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'quantum': return 'text-purple-400';
      case 'videodb': return 'text-blue-400';
      case 'presence': return 'text-pink-400';
      default: return 'text-gray-300';
    }
  };

  const getLogBg = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'bg-green-500/10 border-green-500/20';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'quantum': return 'bg-purple-500/10 border-purple-500/20';
      case 'videodb': return 'bg-blue-500/10 border-blue-500/20';
      case 'presence': return 'bg-pink-500/10 border-pink-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 h-96 overflow-y-auto border border-gray-700/50 log-panel">
      <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-green-400" />
        Live System Log
      </h3>
      <div className="space-y-2">
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">System ready - Waiting for activity...</p>
          </div>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id} 
              className={`p-2 rounded border transition-all duration-300 hover:scale-[1.02] ${getLogBg(log.type)}`}
            >
              <div className="flex items-start gap-2">
                <div className={getLogColor(log.type)}>
                  {getLogIcon(log.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 text-xs font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getLogBg(log.type)} ${getLogColor(log.type)}`}>
                      {log.type.toUpperCase()}
                    </span>
                  </div>
                  <p className={`text-sm ${getLogColor(log.type)} leading-relaxed`}>
                    {log.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogPanel;