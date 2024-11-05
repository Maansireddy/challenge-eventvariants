import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        e.id,
        e.count,
        e.date,
        l.name as location_name,
        l.timezone
      FROM events e
      JOIN locations l ON e.location_id = l.id
      ORDER BY e.date DESC
      LIMIT 100
    `);
    
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch events:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 