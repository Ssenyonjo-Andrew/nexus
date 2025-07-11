
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { BiogasData } from '../../pages/Dashboard';
import { Activity, Droplet, Thermometer, Gauge, Trash2 } from 'lucide-react';

interface MetricsGridProps {
  data: BiogasData;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ data }) => {
  const { isDark } = useTheme();

  const metrics = [
    {
      title: 'pH Level',
      value: data.pH.toFixed(1),
      unit: '',
      icon: Activity,
      color: data.pH < 6.5 || data.pH > 7.5 ? 'text-red-500' : 'text-green-500',
      bgColor: data.pH < 6.5 || data.pH > 7.5 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Gas Production',
      value: data.gasProduction.toFixed(1),
      unit: 'm³/day',
      icon: Gauge,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Temperature',
      value: data.temperature.toFixed(1),
      unit: '°C',
      icon: Thermometer,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'Pressure',
      value: data.pressure.toFixed(2),
      unit: 'bar',
      icon: Droplet,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Waste Level',
      value: data.wasteLevel.toFixed(0),
      unit: '%',
      icon: Trash2,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={index}
            className={`p-6 rounded-xl border transition-colors duration-200 ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } ${metric.bgColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className={`w-8 h-8 ${metric.color}`} />
              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {metric.value}
                  <span className={`text-sm ml-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {metric.unit}
                  </span>
                </div>
              </div>
            </div>
            <h3 className={`text-sm font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {metric.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
