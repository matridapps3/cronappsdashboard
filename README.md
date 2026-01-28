# Cron Apps Manager

A Next.js dashboard for managing and monitoring cron applications. Displays applications in a tabbed interface with dynamic data loading.

## Tech Stack

- **Next.js 16** - React framework
- **PostgreSQL** - Database
- **Tailwind CSS** - Styling
- **React 19** - UI library

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Database table: `app_list_for_dashboard` with `app_name` column

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure database connection in `src/dbConfig/db.js`:
```javascript
host: 'localhost',
user: 'postgres',
password: 'your_password',
database: 'cronappsdatabase',
port: 5432
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/app/` - Next.js app router pages and API routes
- `src/components/` - React components (Sidebar, TabContainer, AppTabs)
- `src/dbConfig/` - Database connection configuration
- `src/app/api/data/` - API endpoints for fetching app data

## Features

- Dynamic app listing from database
- Tabbed interface for app management
- Real-time data fetching
- Responsive sidebar navigation

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
