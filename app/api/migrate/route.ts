import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create users table with password hash for authentication
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

    return NextResponse.json({ success: true, message: "Users table created" });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
