
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Zap, Users, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-green-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Nexus Guild</h1>
          </div>
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-green-600 hover:text-green-700 dark:text-green-400 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Monitor Your Biogas
          <span className="block text-green-600">Production Efficiently</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Optimize your biogas digester performance with real-time monitoring, 
          intelligent analytics, and automated alerts for rural and peri-urban Uganda.
        </p>
        <Link 
          to="/signup"
          className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          Start Monitoring <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Why Choose BiogasVision?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <Zap className="w-12 h-12 text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Real-time Monitoring
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Track pH levels, gas production, temperature, pressure, and waste levels 
              with live updates and historical data analysis.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <Users className="w-12 h-12 text-green-600 mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Smart Alerts
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Receive instant notifications when critical thresholds are reached, 
              preventing system failures and optimizing performance.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <Leaf className="w-12 h-12 text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Sustainable Impact
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Maximize your biogas output while minimizing environmental impact 
              through data-driven insights and optimization recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 dark:bg-green-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Optimize Your Biogas Production?
          </h3>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of users already benefiting from smart biogas monitoring.
          </p>
          <Link 
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Today <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="w-6 h-6 text-green-400" />
            <h4 className="text-xl font-bold">BiogasVision</h4>
          </div>
          <p className="text-gray-400">
            Empowering sustainable energy solutions across Uganda
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
