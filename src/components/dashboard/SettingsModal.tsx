
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { X, Sun, Moon, Globe } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme, language, setLanguage } = useTheme();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'lg', name: 'Luganda', flag: '🇺🇬' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md rounded-xl border transition-colors duration-200 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Theme Settings */}
          <div>
            <h3 className={`text-sm font-medium mb-3 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Appearance
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => !isDark && toggleTheme()}
                className={`p-4 rounded-lg border-2 transition-all ${
                  !isDark
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : isDark 
                      ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Sun className={`w-6 h-6 mx-auto mb-2 ${
                  !isDark ? 'text-green-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  !isDark ? 'text-green-700' : isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Light
                </span>
              </button>

              <button
                onClick={() => isDark && toggleTheme()}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isDark
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Moon className={`w-6 h-6 mx-auto mb-2 ${
                  isDark ? 'text-green-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  isDark ? 'text-green-700' : 'text-gray-600'
                }`}>
                  Dark
                </span>
              </button>
            </div>
          </div>

          {/* Language Settings */}
          <div>
            <h3 className={`text-sm font-medium mb-3 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Language
            </h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    language === lang.code
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : isDark
                        ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className={`font-medium ${
                      language === lang.code 
                        ? 'text-green-700 dark:text-green-400' 
                        : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {lang.name}
                    </span>
                    {language === lang.code && (
                      <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className={`text-sm font-medium mb-3 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Notifications
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Critical Alerts
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Daily Reports
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
