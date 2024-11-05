import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT * FROM locations
      ORDER BY name ASC
    `);
    
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch locations:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 