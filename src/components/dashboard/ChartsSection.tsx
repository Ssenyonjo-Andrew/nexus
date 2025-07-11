
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { BiogasData } from '../../pages/Dashboard';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '../ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  ResponsiveContainer 
} from 'recharts';

interface ChartsSectionProps {
  currentData: BiogasData;
  historicalData: BiogasData[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ currentData, historicalData }) => {
  const { isDark } = useTheme();

  const chartData = historicalData.map(data => ({
    date: new Date(data.timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    gasProduction: data.gasProduction,
    pH: data.pH,
    temperature: data.temperature,
    pressure: data.pressure * 100, // Convert to easier scale for visualization
    wasteLevel: data.wasteLevel
  }));

  const chartConfig = {
    gasProduction: {
      label: "Gas Production (m³/day)",
      color: "#3b82f6",
    },
    pH: {
      label: "pH Level",
      color: "#10b981",
    },
    temperature: {
      label: "Temperature (°C)",
      color: "#f59e0b",
    },
    pressure: {
      label: "Pressure (bar × 100)",
      color: "#8b5cf6",
    }
  };

  return (
    <div className="space-y-6">
      {/* Gas Production Trend */}
      <div className={`p-6 rounded-xl border transition-colors duration-200 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Gas Production Trend (7 Days)
        </h3>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: 'm³/day', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="gasProduction" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Multi-Parameter Chart */}
      <div className={`p-6 rounded-xl border transition-colors duration-200 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          pH Levels Trend
        </h3>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              domain={[6, 8]}
              label={{ value: 'pH', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="pH" 
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
