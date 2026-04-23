import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ user: null });
    }

    const result = await sql`
      SELECT id, username, created_at 
      FROM users 
      WHERE id = ${parseInt(userId)}
    `;

    if (result.length === 0) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: result[0].id,
        username: result[0].username,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ user: null });
  }
}
