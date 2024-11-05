# Event Analysis Dashboard - Implementation Documentation

## Overview
This is a full-stack application that visualizes event data from different locations using Next.js and PostgreSQL. It provides a user-friendly interface to analyze event patterns and recent activities across various locations.

## Core Features

### 1. Location Selection
- Interactive dropdown menu for location selection
- Real-time data loading on location change
- Integrated with PostgreSQL locations table
- Component: `LocationSelector`

### 2. Monthly Time Series Analysis
- Interactive line chart showing monthly event aggregation
- X-axis: Time periods (months)
- Y-axis: Aggregated event counts
- Dynamic data updates based on location selection
- Interactive tooltips showing total event count on hover
- Component: `MonthlyChart`

### 3. Recent Events Display
- Shows three most recent events for selected location
- Groups multiple events occurring on the same date
- Format: "X events occurred in [Location] on [Date]"
- Component: `RecentEvents`

## Technical Implementation

### Database Schema
```sql
CREATE TABLE events (
    id SERIAL,
    count INT NOT NULL,
    point geometry(Point,4326) NOT NULL,
    date TIMESTAMP NOT NULL,
    location_id INT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE locations (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    timezone VARCHAR(255) NOT NULL
);
```

### API Endpoints

1. **Monthly Event Analysis**
```typescript
// GET /api/events/monthly/[locationId]
// Returns aggregated monthly event counts for a location
{
  month: string;
  location_name: string;
  total_count: number;
}
```

2. **Recent Events**
```typescript
// GET /api/events/recent/[locationId]
// Returns three most recent events for a location
{
  count: number;
  date: string;
  location_name: string;
}
```

3. **Locations List**
```typescript
// GET /api/locations
// Returns all available locations
{
  id: number;
  name: string;
}
```

4. **Debug Endpoints**
```typescript
// GET /api/debug/events
// Returns raw events data (limited to 100 records)
{
  id: number;
  count: number;
  date: string;
  location_name: string;
  timezone: string;
}

// GET /api/debug/locations
// Returns all location data
{
  id: number;
  name: string;
  timezone: string;
}
```

These debug endpoints were implemented to:
- Verify database connectivity
- Inspect raw data structure
- Test data relationships
- Validate query results
- Aid in development and troubleshooting

### Frontend Components

1. **LocationSelector**
- Location selection dropdown

2. **MonthlyChart**
- Time series visualization

3. **RecentEvents**
- Display recent events


### Database Optimization (Bonus) -

 indices for query optimization:

```sql
-- 1.Index for location_id in events table
-- Purpose: Optimizes JOIN operations between events and locations tables
CREATE INDEX idx_events_location_id ON events(location_id);

-- 2. Compound index for location_id and date
-- Purpose: Optimizes queries that filter by location and sort by date
CREATE INDEX idx_events_location_date ON events(location_id, date DESC);

-- 3. Index on date column
-- Purpose: Optimizes time-series and date-based queries
CREATE INDEX idx_events_date ON events(date);

-- 4.Index on count column
-- Purpose: Optimizes aggregation operations
CREATE INDEX idx_events_count ON events(count);

-- 5. Index on locations name
-- Purpose: Optimizes location lookups and sorting
CREATE INDEX idx_locations_name ON locations(name);

```


## Technical Stack

### Frontend
- Next.js 
- React 18
- TypeScript
- Chart.js with react-chartjs-2
- Tailwind CSS for styling

### Backend
- Next.js API Routes
- PostgreSQL database
- Node-postgres (pg) for db connectivity

### Development Tools
- ESLint for code quality
- TypeScript for type safety
- Environment variables for configuration
