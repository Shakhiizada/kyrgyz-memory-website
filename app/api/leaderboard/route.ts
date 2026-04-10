import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET /api/leaderboard - Get top scores by difficulty
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);

    if (difficulty && !['easy', 'medium', 'hard'].includes(difficulty)) {
      return NextResponse.json(
        { error: 'Difficulty must be easy, medium, or hard' },
        { status: 400 }
      );
    }

    // Build query based on difficulty filter
    let leaderboard;
    
    if (difficulty) {
      // Get top scores for specific difficulty
      // Best scores = fewest moves, then fastest time
      leaderboard = await sql`
        SELECT 
          gs.id,
          p.name as player_name,
          gs.difficulty,
          gs.moves,
          gs.time_seconds,
          gs.pairs_found,
          gs.played_at
        FROM game_scores gs
        JOIN players p ON gs.player_id = p.id
        WHERE gs.completed = true AND gs.difficulty = ${difficulty}
        ORDER BY gs.moves ASC, gs.time_seconds ASC
        LIMIT ${limit}
      `;
    } else {
      // Get top scores across all difficulties
      leaderboard = await sql`
        SELECT 
          gs.id,
          p.name as player_name,
          gs.difficulty,
          gs.moves,
          gs.time_seconds,
          gs.pairs_found,
          gs.played_at
        FROM game_scores gs
        JOIN players p ON gs.player_id = p.id
        WHERE gs.completed = true
        ORDER BY gs.moves ASC, gs.time_seconds ASC
        LIMIT ${limit}
      `;
    }

    // Get stats summary
    const stats = await sql`
      SELECT 
        difficulty,
        COUNT(*) as total_games,
        MIN(moves) as best_moves,
        MIN(time_seconds) as best_time,
        AVG(moves)::numeric(10,1) as avg_moves,
        AVG(time_seconds)::numeric(10,1) as avg_time
      FROM game_scores
      WHERE completed = true
      GROUP BY difficulty
      ORDER BY difficulty
    `;

    return NextResponse.json({ 
      leaderboard,
      stats,
      total: leaderboard.length
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
