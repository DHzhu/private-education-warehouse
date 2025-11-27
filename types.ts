export interface CelestialBody {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon';
  color: string;
  radius: number; // Visual radius in pixels
  orbitRadius: number; // Distance from center in visual units
  period: number; // Orbital period relative to Earth (Earth = 1)
  description: string;
  moons?: CelestialBody[];
  
  // Physical Data
  mass: string;
  realRadius: string;
  rotationPeriod: string;

  // Visuals
  textureUrl?: string;
  rings?: {
    innerRadius: number;
    outerRadius: number;
    color: string;
    opacity: number;
  };
}

export interface SimulationState {
  time: number;
  speed: number;
  isPlaying: boolean;
  selectedBodyId: string | null;
  zoom: number;
}