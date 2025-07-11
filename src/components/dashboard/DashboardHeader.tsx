
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LogOut, Settings, Sun, Moon, User } from 'lucide-react';

interface DashboardHeaderProps {
  user: any;
  onSettingsClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onSettingsClick }) => {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`border-b transition-colors duration-200 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Biogas Dashboard
            </h1>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Welcome back, {user?.name}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={onSettingsClick}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <User className={`w-4 h-4 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`} />
              <span className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {user?.name}
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
