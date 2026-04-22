export interface Player {
  id: number;
  name: string;
  position: string;
  team: string;
  age: number;
}

export interface PlayerStats {
  player_id: number;
  match_id: number;
  carries: number;
  meters_gained: number;
  tackles_made: number;
  turnovers_won: number;
  turnovers_lost: number;
  minutes: number;
  dominant_tackles?: number;
  offloads?: number;
  handling_errors?: number;
  lineout_steals?: number;
  metersPerCarry?: number;
  name?: string;
  team?: string;
  position?: string;
}

export interface QueryResult {
  columns: string[];
  values: any[][];
}
