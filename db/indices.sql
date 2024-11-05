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