import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    const locationId = params.locationId;

    const result = await query(`
      SELECT 
        SUM(e.count) as count,
        DATE_TRUNC('day', e.date) as date,
        l.name as location_name
      FROM events e
      JOIN locations l ON e.location_id = l.id
      WHERE e.location_id = $1
      GROUP BY DATE_TRUNC('day', e.date), l.name
      ORDER BY date DESC
      LIMIT 3
    `, [locationId]);

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch recent events:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 