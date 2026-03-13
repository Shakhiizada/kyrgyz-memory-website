-- Kyrgyz Memory - Database Setup
-- Creates tables for players, scores, and leaderboard

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game scores table
CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  difficulty VARCHAR(10) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  moves INTEGER NOT NULL,
  time_seconds INTEGER NOT NULL,
  pairs_found INTEGER NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast leaderboard queries
CREATE INDEX IF NOT EXISTS idx_scores_difficulty_moves ON scores(difficulty, moves ASC, time_seconds ASC);
CREATE INDEX IF NOT EXISTS idx_scores_player_id ON scores(player_id);
CREATE INDEX IF NOT EXISTS idx_scores_played_at ON scores(played_at DESC);
