
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { BiogasData } from '../../pages/Dashboard';
import { AlertTriangle, CheckCircle, Info, Bell } from 'lucide-react';
import { toast } from 'sonner';

interface AlertsPanelProps {
  data: BiogasData;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ data }) => {
  const { isDark } = useTheme();

  // Generate alerts based on current data
  const generateAlerts = () => {
    const alerts = [];

    // pH alerts
    if (data.pH < 6.5) {
      alerts.push({
        type: 'critical',
        icon: AlertTriangle,
        title: 'Low pH Alert',
        message: `pH level is ${data.pH}, below optimal range (6.5-7.5)`,
        time: 'Just now'
      });
    } else if (data.pH > 7.5) {
      alerts.push({
        type: 'critical',
        icon: AlertTriangle,
        title: 'High pH Alert',
        message: `pH level is ${data.pH}, above optimal range (6.5-7.5)`,
        time: 'Just now'
      });
    }

    // Gas production alerts
    if (data.gasProduction < 60) {
      alerts.push({
        type: 'warning',
        icon: Info,
        title: 'Low Gas Production',
        message: `Current production: ${data.gasProduction} m³/day`,
        time: '2 min ago'
      });
    }

    // Temperature alerts
    if (data.temperature < 35 || data.temperature > 40) {
      alerts.push({
        type: 'warning',
        icon: Info,
        title: 'Temperature Alert',
        message: `Temperature is ${data.temperature}°C, outside optimal range`,
        time: '5 min ago'
      });
    }

    // Waste level alerts
    if (data.wasteLevel > 85) {
      alerts.push({
        type: 'info',
        icon: Bell,
        title: 'High Waste Level',
        message: `Waste level at ${data.wasteLevel}% - consider maintenance`,
        time: '10 min ago'
      });
    }

    // If all is good
    if (alerts.length === 0) {
      alerts.push({
        type: 'success',
        icon: CheckCircle,
        title: 'All Systems Normal',
        message: 'All parameters are within optimal ranges',
        time: 'Now'
      });
    }

    return alerts;
  };

  const alerts = generateAlerts();

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20';
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      case 'success':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // Show notification for critical alerts
  React.useEffect(() => {
    const criticalAlerts = alerts.filter(alert => alert.type === 'critical');
    criticalAlerts.forEach(alert => {
      toast.error(alert.message, {
        duration: 5000,
      });
    });
  }, [data.pH, data.gasProduction]);

  return (
    <div className={`p-6 rounded-xl border transition-colors duration-200 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        System Alerts
      </h3>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getAlertStyle(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`w-5 h-5 mt-0.5 ${getIconColor(alert.type)}`} />
                <div className="flex-1">
                  <h4 className={`font-medium text-sm ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {alert.title}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {alert.message}
                  </p>
                  <p className={`text-xs mt-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {alert.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analysis Summary */}
      <div className={`mt-6 p-4 rounded-lg border ${
        isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <h4 className={`font-medium text-sm mb-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Quick Analysis
        </h4>
        <p className={`text-sm ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {data.pH >= 6.5 && data.pH <= 7.5 
            ? `pH optimal at ${data.pH}. ` 
            : `pH needs attention at ${data.pH}. `}
          {data.gasProduction >= 75 
            ? `Good gas production at ${data.gasProduction} m³/day.`
            : `Gas production could be improved (${data.gasProduction} m³/day).`}
        </p>
      </div>
    </div>
  );
};

export default AlertsPanel;
