'use client';

import { useState, useEffect } from 'react';

interface Location {
  id: number;
  name: string;
}

export default function LocationSelector({ onLocationChange }: { onLocationChange: (locationId: number) => void }) {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="relative">
      <select
        className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   appearance-none cursor-pointer hover:border-blue-300 transition-all duration-200"
        onChange={(e) => onLocationChange(Number(e.target.value))}
      >
        <option value="">Choose a location...</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
          <svg 
            className="w-3 h-3 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
} 