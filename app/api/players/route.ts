import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// POST /api/players - Create a new player or get existing one
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim().substring(0, 50);

    // Check if player exists
    const existing = await sql`
      SELECT id, name, created_at FROM players WHERE LOWER(name) = LOWER(${trimmedName})
    `;

    if (existing.length > 0) {
      return NextResponse.json({ player: existing[0] });
    }

    // Create new player
    const result = await sql`
      INSERT INTO players (name) VALUES (${trimmedName})
      RETURNING id, name, created_at
    `;

    return NextResponse.json({ player: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    );
  }
}

// GET /api/players - Get all players (optional, for admin)
export async function GET() {
  try {
    const players = await sql`
      SELECT id, name, created_at FROM players ORDER BY created_at DESC LIMIT 100
    `;
    return NextResponse.json({ players });
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}
