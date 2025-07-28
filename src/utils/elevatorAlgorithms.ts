import { FloorCall, ElevatorState } from '../types/elevator';

export const calculateDistance = (from: number, to: number): number => {
  return Math.abs(from - to);
};

export const calculateQuantumCost = (
  elevatorFloor: number,
  targetFloor: number,
  waitTime: number,
  presenceConfidence: number
): number => {
  const distance = calculateDistance(elevatorFloor, targetFloor);
  const timePenalty = waitTime * 0.1;
  const presencePenalty = (1 - presenceConfidence) * 2; // Higher penalty for low confidence
  
  return distance + timePenalty + presencePenalty;
};

export const fcfsAlgorithm = (
  calls: FloorCall[],
  elevatorState: ElevatorState
): FloorCall | null => {
  if (calls.length === 0) return null;
  
  // Filter out calls without presence
  const validCalls = calls.filter(call => call.presenceDetected);
  if (validCalls.length === 0) return null;
  
  // Return the oldest valid call
  return validCalls.reduce((oldest, current) => 
    current.timestamp < oldest.timestamp ? current : oldest
  );
};

export const quantumOptimization = (
  calls: FloorCall[],
  elevatorState: ElevatorState,
  presenceData: Map<number, number>
): FloorCall | null => {
  if (calls.length === 0) return null;
  
  // Filter out calls without presence
  const validCalls = calls.filter(call => call.presenceDetected);
  if (validCalls.length === 0) return null;
  
  // QAOA-inspired optimization: minimize cost function
  let optimalCall = validCalls[0];
  let minCost = calculateQuantumCost(
    elevatorState.currentFloor,
    optimalCall.floor,
    10 - optimalCall.timeRemaining,
    presenceData.get(optimalCall.floor) || 0
  );
  
  for (const call of validCalls) {
    const presenceConfidence = presenceData.get(call.floor) || 0;
    const cost = calculateQuantumCost(
      elevatorState.currentFloor,
      call.floor,
      10 - call.timeRemaining,
      presenceConfidence
    );
    
    if (cost < minCost) {
      minCost = cost;
      optimalCall = call;
    }
  }
  
  return optimalCall;
};