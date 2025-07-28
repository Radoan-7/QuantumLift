import { PresenceData } from '../types/elevator';

export class VideoDBSimulator {
  private presenceData: Map<number, PresenceData> = new Map();
  private simulationInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeFloors();
    this.startSimulation();
  }

  private initializeFloors(): void {
    for (let floor = 1; floor <= 5; floor++) {
      this.presenceData.set(floor, {
        floor,
        detected: false,
        confidence: 0,
        lastUpdate: Date.now()
      });
    }
  }

  private startSimulation(): void {
    // Simulate realistic human presence patterns
    this.simulationInterval = setInterval(() => {
      for (let floor = 1; floor <= 5; floor++) {
        const currentData = this.presenceData.get(floor)!;
        
        // Simulate presence detection with realistic patterns
        const random = Math.random();
        let detected = false;
        let confidence = 0;
        
        // Higher chance of presence on ground floor and top floor
        const baseChance = floor === 1 || floor === 5 ? 0.3 : 0.15;
        
        // If someone was detected recently, higher chance they're still there
        if (currentData.detected && Date.now() - currentData.lastUpdate < 5000) {
          detected = random < 0.7; // 70% chance to stay
          confidence = detected ? 0.8 + Math.random() * 0.2 : 0;
        } else {
          detected = random < baseChance;
          confidence = detected ? 0.6 + Math.random() * 0.4 : Math.random() * 0.3;
        }

        this.presenceData.set(floor, {
          floor,
          detected,
          confidence,
          lastUpdate: Date.now()
        });
      }
    }, 1000); // Update every second
  }

  getPresenceData(floor: number): PresenceData | null {
    return this.presenceData.get(floor) || null;
  }

  getAllPresenceData(): PresenceData[] {
    return Array.from(this.presenceData.values());
  }

  // Simulate button press triggering enhanced detection
  triggerDetection(floor: number): void {
    const currentData = this.presenceData.get(floor);
    if (currentData) {
      this.presenceData.set(floor, {
        ...currentData,
        detected: true,
        confidence: 0.95,
        lastUpdate: Date.now()
      });
    }
  }

  // Force presence for demo purposes
  setPresence(floor: number, detected: boolean): void {
    const currentData = this.presenceData.get(floor);
    if (currentData) {
      this.presenceData.set(floor, {
        ...currentData,
        detected,
        confidence: detected ? 0.9 : 0.1,
        lastUpdate: Date.now()
      });
    }
  }

  destroy(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }
}