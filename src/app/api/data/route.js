import { NextResponse } from 'next/server';
import newPool from '../../../dbConfig/db.js'

export async function GET(request) {
  try {
    const query = "select * from apps_list_for_ca_dashboard"
    const result = await newPool.query(query)
    return NextResponse.json(result.rows);
   
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
