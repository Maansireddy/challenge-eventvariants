'use client';

import { useState } from 'react';
import LocationSelector from '@/components/ui/location-selector';
import MonthlyChart from '@/components/ui/monthly-chart';
import RecentEvents from '@/components/ui/recent-events';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.08]" 
                 style={{
                   backgroundImage: `
                     linear-gradient(0deg, transparent 24%, #4169E1 25%, #4169E1 26%, transparent 27%, transparent 74%, #4169E1 75%, #4169E1 76%, transparent 77%, transparent),
                     linear-gradient(90deg, transparent 24%, #4169E1 25%, #4169E1 26%, transparent 27%, transparent 74%, #4169E1 75%, #4169E1 76%, transparent 77%, transparent)
                   `,
                   backgroundSize: '40px 40px',
                   backgroundPosition: '-20px -20px'
                 }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/90"></div>
          </div>
          
          {/* Content */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-[1px]">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-blue-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-blue-600">
                Event Analysis Dashboard
              </h1>
            </div>
            
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Select Location
              </label>
              <LocationSelector onLocationChange={(id) => setSelectedLocation(id)} />
            </div>
          </div>
        </div>

        {selectedLocation && selectedLocation > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Monthly Event Analysis</h2>
              <MonthlyChart locationId={selectedLocation} />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <RecentEvents locationId={selectedLocation} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
