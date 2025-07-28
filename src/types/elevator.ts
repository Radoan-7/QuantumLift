export interface FloorCall {
  floor: number;
  timestamp: number;
  timeRemaining: number;
  id: string;
  presenceDetected: boolean;
  presenceTimer: number;
}

export interface ElevatorState {
  currentFloor: number;
  isMoving: boolean;
  doorsOpen: boolean;
  direction: 'up' | 'down' | null;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'quantum' | 'videodb' | 'presence';
}

export interface PresenceData {
  floor: number;
  detected: boolean;
  confidence: number;
  lastUpdate: number;
}

export interface QuantumGate {
  type: 'H' | 'X' | 'CNOT' | 'Y' | 'Z';
  qubit: number;
  controlQubit?: number;
}

export interface QuantumState {
  amplitudes: Complex[];
  gates: QuantumGate[];
}

export interface Complex {
  real: number;
  imag: number;
}

export type OptimizationMode = 'fcfs' | 'quantum';