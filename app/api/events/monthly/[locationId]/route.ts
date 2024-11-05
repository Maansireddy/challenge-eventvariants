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
        DATE_TRUNC('month', e.date) as month,
        l.name as location_name,
        SUM(e.count) as total_count
      FROM events e
      JOIN locations l ON e.location_id = l.id
      WHERE e.location_id = $1
      GROUP BY DATE_TRUNC('month', e.date), l.name
      ORDER BY month ASC
    `, [locationId]);

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch monthly events:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 