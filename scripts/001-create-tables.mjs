import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("Creating players table...");
  await sql`
    CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  console.log("Creating scores table...");
  await sql`
    CREATE TABLE IF NOT EXISTS scores (
      id SERIAL PRIMARY KEY,
      player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
      difficulty VARCHAR(10) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
      moves INTEGER NOT NULL,
      time_seconds INTEGER NOT NULL,
      pairs_found INTEGER NOT NULL,
      completed BOOLEAN DEFAULT TRUE,
      played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  console.log("Creating indexes...");
  await sql`CREATE INDEX IF NOT EXISTS idx_scores_difficulty_moves ON scores(difficulty, moves ASC, time_seconds ASC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_scores_player_id ON scores(player_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_scores_played_at ON scores(played_at DESC)`;

  console.log("All tables and indexes created successfully!");
}

migrate().catch(console.error);
