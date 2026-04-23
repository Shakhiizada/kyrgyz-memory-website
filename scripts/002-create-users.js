const { neon } = require("@neondatabase/serverless");

async function createUsersTable() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("Creating users table for authentication...");

  // Create users table with password hash
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Create index for username lookup
  await sql`
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)
  `;

  console.log("Users table created successfully!");
}

createUsersTable()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
