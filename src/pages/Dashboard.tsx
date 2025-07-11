
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import ChartsSection from '../components/dashboard/ChartsSection';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import SettingsModal from '../components/dashboard/SettingsModal';

export interface BiogasData {
  id: number;
  pH: number;
  gasProduction: number;
  temperature: number;
  pressure: number;
  wasteLevel: number;
  timestamp: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [currentData, setCurrentData] = useState<BiogasData | null>(null);
  const [historicalData, setHistoricalData] = useState<BiogasData[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  // Generate mock data
  const generateMockData = (): BiogasData => {
    const now = new Date();
    return {
      id: Date.now(),
      pH: parseFloat((6.5 + Math.random() * 1).toFixed(1)), // 6.5-7.5
      gasProduction: parseFloat((50 + Math.random() * 50).toFixed(1)), // 50-100 m³/day
      temperature: parseFloat((35 + Math.random() * 5).toFixed(1)), // 35-40°C
      pressure: parseFloat((0.1 + Math.random() * 0.2).toFixed(2)), // 0.1-0.3 bar
      wasteLevel: parseFloat((70 + Math.random() * 20).toFixed(0)), // 70-90%
      timestamp: now.toISOString()
    };
  };

  // Initialize data
  useEffect(() => {
    // Generate initial current data
    setCurrentData(generateMockData());

    // Generate historical data (last 7 days)
    const historical: BiogasData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      historical.push({
        ...generateMockData(),
        id: Date.now() + i,
        timestamp: date.toISOString()
      });
    }
    setHistoricalData(historical);

    // Update current data every 30 seconds
    const interval = setInterval(() => {
      setCurrentData(generateMockData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <DashboardHeader 
        user={user} 
        onSettingsClick={() => setShowSettings(true)} 
      />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {currentData && (
          <>
            <MetricsGrid data={currentData} />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChartsSection 
                  currentData={currentData} 
                  historicalData={historicalData} 
                />
              </div>
              <div className="lg:col-span-1">
                <AlertsPanel data={currentData} />
              </div>
            </div>
          </>
        )}
      </div>

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default Dashboard;
