'use client';

import { useEffect, useState } from 'react';

interface Event {
  count: number;
  date: string;
  location_name: string;
}

interface GroupedEvent {
  date: string;
  location_name: string;
  total_count: number;
}

export default function RecentEvents({ locationId }: { locationId: number }) {
  const [events, setEvents] = useState<GroupedEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/events/recent/${locationId}`);
        const data: Event[] = await response.json();
        
        const groupedEvents = data.reduce((acc: { [key: string]: GroupedEvent }, event) => {
          const dateKey = new Date(event.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
          
          if (!acc[dateKey]) {
            acc[dateKey] = {
              date: dateKey,
              location_name: event.location_name,
              total_count: 0
            };
          }
          
          acc[dateKey].total_count += event.count;
          return acc;
        }, {});

        setEvents(Object.values(groupedEvents));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    if (locationId) {
      fetchEvents();
    }
  }, [locationId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-[1px]">
          <div className="w-full h-full rounded-lg bg-white flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-blue-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-600">Recent Events</h2>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-40 bg-gray-50/50 rounded-xl border border-gray-100">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-sm text-blue-500">Loading events...</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-gradient-to-r from-white to-blue-50 border border-blue-100
                         transition-all duration-300 hover:shadow-lg hover:translate-x-1 cursor-default
                         relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/[0.02] group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">{event.total_count}</span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-700">
                    <span className="text-gray-500">events occurred in</span>{' '}
                    <span className="font-semibold text-gray-900">{event.location_name}</span>{' '}
                    <span className="text-gray-500">on</span>{' '}
                    <span className="font-medium text-gray-900">{event.date}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {events.length === 0 && !loading && (
            <div className="text-center py-12 bg-gray-50/50 rounded-xl border border-gray-100">
              <svg 
                className="w-12 h-12 text-gray-300 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M20 12H4M8 16l-4-4 4-4"
                />
              </svg>
              <p className="text-gray-500">No recent events found for this location</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 