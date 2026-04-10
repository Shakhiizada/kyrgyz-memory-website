import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function createTables() {
  console.log('Creating database tables...');

  // Create players table
  await sql`
    CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  console.log('Created players table');

  // Create game_scores table
  await sql`
    CREATE TABLE IF NOT EXISTS game_scores (
      id SERIAL PRIMARY KEY,
      player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
      difficulty VARCHAR(10) NOT NULL,
      moves INTEGER NOT NULL,
      time_seconds INTEGER NOT NULL,
      pairs_found INTEGER NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      played_at TIMESTAMP DEFAULT NOW()
    )
  `;
  console.log('Created game_scores table');

  // Create index for leaderboard queries
  await sql`
    CREATE INDEX IF NOT EXISTS idx_scores_leaderboard 
    ON game_scores(difficulty, completed, moves, time_seconds)
  `;
  console.log('Created leaderboard index');

  console.log('All tables created successfully!');
}

createTables().catch(console.error);
