import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// POST /api/scores - Save a game score
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { player_id, difficulty, moves, time_seconds, pairs_found, completed } = body;

    // Validate required fields
    if (!player_id || !difficulty || moves === undefined || time_seconds === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: player_id, difficulty, moves, time_seconds' },
        { status: 400 }
      );
    }

    // Validate difficulty
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return NextResponse.json(
        { error: 'Difficulty must be easy, medium, or hard' },
        { status: 400 }
      );
    }

    // Validate player exists
    const player = await sql`SELECT id FROM players WHERE id = ${player_id}`;
    if (player.length === 0) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    // Insert the score
    const result = await sql`
      INSERT INTO game_scores (player_id, difficulty, moves, time_seconds, pairs_found, completed)
      VALUES (${player_id}, ${difficulty}, ${moves}, ${time_seconds}, ${pairs_found || 0}, ${completed || false})
      RETURNING id, player_id, difficulty, moves, time_seconds, pairs_found, completed, played_at
    `;

    return NextResponse.json({ score: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error saving score:', error);
    return NextResponse.json(
      { error: 'Failed to save score' },
      { status: 500 }
    );
  }
}

// GET /api/scores - Get scores for a player
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get('player_id');
    const username = searchParams.get('username');

    // Get by username (for logged-in users)
    if (username) {
      const scores = await sql`
        SELECT gs.id, gs.difficulty, gs.moves, gs.time_seconds, gs.pairs_found, gs.completed, gs.played_at
        FROM game_scores gs
        JOIN players p ON gs.player_id = p.id
        WHERE LOWER(p.name) = LOWER(${username})
        ORDER BY gs.played_at DESC
        LIMIT 50
      `;
      return NextResponse.json({ scores });
    }

    if (playerId) {
      const scores = await sql`
        SELECT id, difficulty, moves, time_seconds, pairs_found, completed, played_at
        FROM game_scores
        WHERE player_id = ${playerId}
        ORDER BY played_at DESC
        LIMIT 50
      `;
      return NextResponse.json({ scores });
    }

    // Return recent scores if no player_id
    const scores = await sql`
      SELECT gs.id, p.name as player_name, gs.difficulty, gs.moves, gs.time_seconds, gs.completed, gs.played_at
      FROM game_scores gs
      JOIN players p ON gs.player_id = p.id
      WHERE gs.completed = true
      ORDER BY gs.played_at DESC
      LIMIT 50
    `;
    return NextResponse.json({ scores });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scores' },
      { status: 500 }
    );
  }
}
