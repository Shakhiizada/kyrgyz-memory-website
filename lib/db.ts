import { neon } from '@neondatabase/serverless';

// Create a reusable SQL client for Neon serverless PostgreSQL
export const sql = neon(process.env.DATABASE_URL!);

// Type definitions for database entities
export interface Player {
  id: number;
  name: string;
  created_at: Date;
}

export interface GameScore {
  id: number;
  player_id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  moves: number;
  time_seconds: number;
  pairs_found: number;
  completed: boolean;
  played_at: Date;
}

export interface LeaderboardEntry {
  id: number;
  player_name: string;
  difficulty: string;
  moves: number;
  time_seconds: number;
  played_at: Date;
}
