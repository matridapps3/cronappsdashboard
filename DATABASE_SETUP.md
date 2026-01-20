# Database Setup Guide

This application dynamically creates tabs based on database columns. Follow these steps to connect your database:

## API Routes to Update

### 1. `/api/columns/route.js`
This route should return all column names from your database table.

**Example for SQL databases (MySQL/PostgreSQL):**
```javascript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Your database connection

export async function GET() {
  try {
    const columns = await db.query(`
      SELECT COLUMN_NAME as name
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'your_table_name'
        AND COLUMN_NAME NOT IN ('id', 'created_at', 'updated_at') -- Exclude system columns
      ORDER BY ORDINAL_POSITION
    `);
    
    const formattedColumns = columns.map(col => ({
      name: col.name,
      displayName: col.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
    
    return NextResponse.json({ columns: formattedColumns });
  } catch (error) {
    console.error('Error fetching columns:', error);
    return NextResponse.json({ error: 'Failed to fetch columns' }, { status: 500 });
  }
}
```

**Example for MongoDB:**
```javascript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Your MongoDB connection

export async function GET() {
  try {
    const sampleDoc = await db.collection('your_collection').findOne({});
    const columns = Object.keys(sampleDoc || {})
      .filter(key => !['_id', 'id'].includes(key))
      .map(name => ({
        name,
        displayName: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      }));
    
    return NextResponse.json({ columns });
  } catch (error) {
    console.error('Error fetching columns:', error);
    return NextResponse.json({ error: 'Failed to fetch columns' }, { status: 500 });
  }
}
```

### 2. `/api/data/route.js`
This route should return data for a specific column.

**Example for SQL databases:**
```javascript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const columnName = searchParams.get('column');
    
    if (!columnName) {
      return NextResponse.json({ error: 'Column name is required' }, { status: 400 });
    }
    
    // Fetch all rows where this column has data
    const data = await db.query(`
      SELECT id, ${columnName}, created_at, updated_at
      FROM your_table_name 
      WHERE ${columnName} IS NOT NULL
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({ data, columnName });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
```

**Example for MongoDB:**
```javascript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const columnName = searchParams.get('column');
    
    if (!columnName) {
      return NextResponse.json({ error: 'Column name is required' }, { status: 400 });
    }
    
    const data = await db.collection('your_collection')
      .find({ [columnName]: { $exists: true, $ne: null } })
      .toArray();
    
    return NextResponse.json({ data, columnName });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
```

## How It Works

1. **Dynamic Column Detection**: The app fetches all columns from your database table
2. **Automatic Tab Creation**: Each column becomes a tab in the sidebar
3. **Data Display**: When a tab is clicked, it fetches and displays all data for that column
4. **Auto-Refresh**: The app checks for new columns every 30 seconds

## Security Notes

- Always sanitize column names to prevent SQL injection
- Use parameterized queries
- Validate column names against a whitelist if possible
- Consider adding authentication/authorization to API routes
