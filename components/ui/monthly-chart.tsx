'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyData {
  month: string;
  total_count: number;
  location_name: string;
}

export default function MonthlyChart({ locationId }: { locationId: number }) {
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/events/monthly/${locationId}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (locationId) {
      fetchData();
    }
  }, [locationId]);

  const chartData = {
    labels: data.map(d => new Date(d.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
    datasets: [
      {
        label: 'Event Count',
        data: data.map(d => d.total_count),
        borderColor: '#4169E1',
        backgroundColor: 'rgba(65, 105, 225, 0.1)',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4169E1',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#64748b',
          font: {
            size: 12
          },
          boxWidth: 12,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1e293b',
        bodyColor: '#4169E1',
        bodyFont: {
          weight: 'bold'
        },
        padding: 12,
        borderColor: 'rgba(65, 105, 225, 0.1)',
        borderWidth: 1,
        displayColors: false,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12
          }
        },
        border: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12
          }
        },
        border: {
          display: false
        }
      }
    }
  };

  return (
    <div className="w-full h-[400px]">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse flex space-x-2">
            <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
} 