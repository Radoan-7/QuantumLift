import { QuantumGate, QuantumState, Complex } from '../types/elevator';

export class QuantumSimulator {
  private numQubits: number;
  private state: Complex[];

  constructor(numQubits: number = 3) {
    this.numQubits = numQubits;
    this.state = this.initializeState();
  }

  private initializeState(): Complex[] {
    const size = Math.pow(2, this.numQubits);
    const state = Array(size).fill(null).map(() => ({ real: 0, imag: 0 }));
    state[0] = { real: 1, imag: 0 }; // |000⟩ state
    return state;
  }

  applyGate(gate: QuantumGate): void {
    switch (gate.type) {
      case 'H':
        this.applyHadamard(gate.qubit);
        break;
      case 'X':
        this.applyPauliX(gate.qubit);
        break;
      case 'Y':
        this.applyPauliY(gate.qubit);
        break;
      case 'Z':
        this.applyPauliZ(gate.qubit);
        break;
      case 'CNOT':
        if (gate.controlQubit !== undefined) {
          this.applyCNOT(gate.controlQubit, gate.qubit);
        }
        break;
    }
  }

  private applyHadamard(qubit: number): void {
    const newState = [...this.state];
    const size = Math.pow(2, this.numQubits);
    
    for (let i = 0; i < size; i++) {
      const bit = (i >> qubit) & 1;
      const flippedIndex = i ^ (1 << qubit);
      
      if (bit === 0) {
        const temp = { ...this.state[i] };
        newState[i] = this.complexAdd(
          this.complexMultiply(temp, { real: 1/Math.sqrt(2), imag: 0 }),
          this.complexMultiply(this.state[flippedIndex], { real: 1/Math.sqrt(2), imag: 0 })
        );
        newState[flippedIndex] = this.complexAdd(
          this.complexMultiply(temp, { real: 1/Math.sqrt(2), imag: 0 }),
          this.complexMultiply(this.state[flippedIndex], { real: -1/Math.sqrt(2), imag: 0 })
        );
      }
    }
    
    this.state = newState;
  }

  private applyPauliX(qubit: number): void {
    const size = Math.pow(2, this.numQubits);
    const newState = [...this.state];
    
    for (let i = 0; i < size; i++) {
      const flippedIndex = i ^ (1 << qubit);
      newState[i] = this.state[flippedIndex];
    }
    
    this.state = newState;
  }

  private applyPauliY(qubit: number): void {
    const size = Math.pow(2, this.numQubits);
    const newState = [...this.state];
    
    for (let i = 0; i < size; i++) {
      const bit = (i >> qubit) & 1;
      const flippedIndex = i ^ (1 << qubit);
      
      if (bit === 0) {
        newState[i] = this.complexMultiply(this.state[flippedIndex], { real: 0, imag: -1 });
      } else {
        newState[i] = this.complexMultiply(this.state[flippedIndex], { real: 0, imag: 1 });
      }
    }
    
    this.state = newState;
  }

  private applyPauliZ(qubit: number): void {
    const size = Math.pow(2, this.numQubits);
    
    for (let i = 0; i < size; i++) {
      const bit = (i >> qubit) & 1;
      if (bit === 1) {
        this.state[i] = this.complexMultiply(this.state[i], { real: -1, imag: 0 });
      }
    }
  }

  private applyCNOT(control: number, target: number): void {
    const size = Math.pow(2, this.numQubits);
    const newState = [...this.state];
    
    for (let i = 0; i < size; i++) {
      const controlBit = (i >> control) & 1;
      if (controlBit === 1) {
        const flippedIndex = i ^ (1 << target);
        newState[i] = this.state[flippedIndex];
      }
    }
    
    this.state = newState;
  }

  private complexAdd(a: Complex, b: Complex): Complex {
    return {
      real: a.real + b.real,
      imag: a.imag + b.imag
    };
  }

  private complexMultiply(a: Complex, b: Complex): Complex {
    return {
      real: a.real * b.real - a.imag * b.imag,
      imag: a.real * b.imag + a.imag * b.real
    };
  }

  getState(): Complex[] {
    return [...this.state];
  }

  getProbabilities(): number[] {
    return this.state.map(amplitude => 
      amplitude.real * amplitude.real + amplitude.imag * amplitude.imag
    );
  }

  measure(): number {
    const probabilities = this.getProbabilities();
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < probabilities.length; i++) {
      cumulative += probabilities[i];
      if (random <= cumulative) {
        // Collapse to measured state
        this.state = this.state.map(() => ({ real: 0, imag: 0 }));
        this.state[i] = { real: 1, imag: 0 };
        return i;
      }
    }
    
    return 0;
  }

  reset(): void {
    this.state = this.initializeState();
  }
}