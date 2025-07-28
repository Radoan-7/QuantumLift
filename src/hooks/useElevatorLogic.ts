import { useState, useEffect, useCallback, useRef } from 'react';
import { FloorCall, ElevatorState, LogEntry, OptimizationMode, PresenceData } from '../types/elevator';
import { fcfsAlgorithm, quantumOptimization } from '../utils/elevatorAlgorithms';
import { VideoDBSimulator } from '../utils/videodbSimulator';

export const useElevatorLogic = () => {
  const [elevatorState, setElevatorState] = useState<ElevatorState>({
    currentFloor: 1,
    isMoving: false,
    doorsOpen: false,
    direction: null
  });
  
  const [calls, setCalls] = useState<FloorCall[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [optimizationMode, setOptimizationMode] = useState<OptimizationMode>('fcfs');
  const [presenceData, setPresenceData] = useState<PresenceData[]>([]);
  
  const videodbRef = useRef<VideoDBSimulator | null>(null);
  const presenceMapRef = useRef<Map<number, number>>(new Map());
  
  useEffect(() => {
    videodbRef.current = new VideoDBSimulator();
    
    return () => {
      if (videodbRef.current) {
        videodbRef.current.destroy();
      }
    };
  }, []);
  
  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      message,
      type
    };
    setLogs(prev => [newLog, ...prev].slice(0, 25));
  }, []);
  
  const callElevator = useCallback((floor: number) => {
    if (calls.some(call => call.floor === floor)) {
      addLog(`Floor ${floor} already has an active call`, 'warning');
      return;
    }
    
    // Trigger enhanced detection when button is pressed
    if (videodbRef.current) {
      videodbRef.current.triggerDetection(floor);
    }
    
    const newCall: FloorCall = {
      floor,
      timestamp: Date.now(),
      timeRemaining: 10,
      presenceDetected: true,
      presenceTimer: 5,
      id: `${floor}-${Date.now()}`
    };
    
    setCalls(prev => [...prev, newCall]);
    addLog(`Call received from Floor ${floor}`, 'info');
    addLog(`VideoDB: Enhanced detection triggered at Floor ${floor}`, 'videodb');
  }, [calls, addLog]);
  
  const removeCall = useCallback((callId: string) => {
    setCalls(prev => prev.filter(call => call.id !== callId));
  }, []);
  
  const moveElevator = useCallback(async (targetFloor: number) => {
    if (elevatorState.isMoving || elevatorState.currentFloor === targetFloor) return;
    
    setElevatorState(prev => ({
      ...prev,
      isMoving: true,
      direction: targetFloor > prev.currentFloor ? 'up' : 'down'
    }));
    
    const strategy = optimizationMode === 'quantum' ? 'Quantum-optimized' : 'FCFS';
    addLog(`${strategy} routing: Moving to Floor ${targetFloor}`, 'quantum');
    
    const distance = Math.abs(elevatorState.currentFloor - targetFloor);
    const direction = targetFloor > elevatorState.currentFloor ? 1 : -1;
    let currentFloor = elevatorState.currentFloor;
    
    while (currentFloor !== targetFloor) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      currentFloor += direction;
      setElevatorState(prev => ({ ...prev, currentFloor }));
    }
    
    setElevatorState(prev => ({
      ...prev,
      isMoving: false,
      doorsOpen: true,
      direction: null
    }));
    
    addLog(`Arrived at Floor ${targetFloor} - Doors opening`, 'success');
    
    setTimeout(() => {
      setElevatorState(prev => ({ ...prev, doorsOpen: false }));
      addLog(`Floor ${targetFloor} service complete - Doors closed`, 'info');
    }, 2500);
  }, [elevatorState, addLog, optimizationMode]);
  
  // Update presence data from VideoDB
  useEffect(() => {
    const interval = setInterval(() => {
      if (videodbRef.current) {
        const newPresenceData = videodbRef.current.getAllPresenceData();
        setPresenceData(newPresenceData);
        
        // Update presence confidence map
        const newMap = new Map<number, number>();
        newPresenceData.forEach(data => {
          newMap.set(data.floor, data.confidence);
        });
        presenceMapRef.current = newMap;
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Timer countdown and presence monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setCalls(prev => {
        const updated = prev.map(call => {
          const presenceInfo = presenceData.find(p => p.floor === call.floor);
          const stillPresent = presenceInfo?.detected || false;
          
          let newCall = {
            ...call,
            timeRemaining: call.timeRemaining - 1,
            presenceDetected: stillPresent
          };
          
          // Update presence timer
          if (!stillPresent) {
            newCall.presenceTimer = Math.max(0, call.presenceTimer - 1);
          } else {
            newCall.presenceTimer = 5; // Reset timer when presence detected
          }
          
          return newCall;
        });
        
        // Remove expired calls or calls without presence
        const expired = updated.filter(call => 
          call.timeRemaining <= 0 || call.presenceTimer <= 0
        );
        
        expired.forEach(call => {
          if (call.timeRemaining <= 0) {
            addLog(`Request at Floor ${call.floor} timed out (quantum collapse)`, 'quantum');
          } else if (call.presenceTimer <= 0) {
            addLog(`Request at Floor ${call.floor} collapsed (no person detected)`, 'presence');
          }
        });
        
        return updated.filter(call => 
          call.timeRemaining > 0 && call.presenceTimer > 0
        );
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [addLog, presenceData]);
  
  // Elevator decision logic
  useEffect(() => {
    if (elevatorState.isMoving || calls.length === 0) return;
    
    const nextCall = optimizationMode === 'quantum' 
      ? quantumOptimization(calls, elevatorState, presenceMapRef.current)
      : fcfsAlgorithm(calls, elevatorState);
    
    if (nextCall) {
      const strategy = optimizationMode === 'quantum' ? 'quantum optimization' : 'FCFS';
      addLog(`Next destination: Floor ${nextCall.floor} (${strategy})`, 'quantum');
      
      removeCall(nextCall.id);
      moveElevator(nextCall.floor);
    }
  }, [calls, elevatorState, optimizationMode, removeCall, moveElevator, addLog]);
  
  const reset = useCallback(() => {
    setElevatorState({
      currentFloor: 1,
      isMoving: false,
      doorsOpen: false,
      direction: null
    });
    setCalls([]);
    setLogs([]);
    
    if (videodbRef.current) {
      videodbRef.current.destroy();
      videodbRef.current = new VideoDBSimulator();
    }
    
    addLog('Simulation reset - All systems reinitialized', 'info');
  }, [addLog]);
  
  const togglePresence = useCallback((floor: number) => {
    if (videodbRef.current) {
      const current = presenceData.find(p => p.floor === floor);
      videodbRef.current.setPresence(floor, !current?.detected);
      addLog(`Manual override: Presence ${!current?.detected ? 'enabled' : 'disabled'} at Floor ${floor}`, 'videodb');
    }
  }, [presenceData, addLog]);
  
  return {
    elevatorState,
    calls,
    logs,
    optimizationMode,
    presenceData,
    setOptimizationMode,
    callElevator,
    togglePresence,
    reset
  };
};