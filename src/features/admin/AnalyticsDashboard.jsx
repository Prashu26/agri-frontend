import React, { useState, useEffect } from 'react';
import {
  FiBarChart2,
  FiDollarSign,
  FiUsers,
  FiMapPin,
  FiTrendingUp,
  FiTrendingDown,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiCalendar,
  FiPieChart,
  FiGrid,
  FiList,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDroplet,
  FiSun,
  FiCloudRain,
  FiBookOpen,
  FiInfo,
  FiClipboard,
  FiWind,
  FiThermometer,
  FiCompass,
  FiMap
} from 'react-icons/fi';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Mock data for analytics
const mockAnalyticsData = {
  // Key metrics
  metrics: {
    totalFarmers: 12450,
    totalFPOs: 245,
    totalTransactions: 12560,
    totalRevenue: 1250000000,
    activeSchemes: 18,
    cropCoverage: 1250000, // in hectares
    avgYield: 2.8, // tons per hectare
    farmerSatisfaction: 87, // percentage
  },
  
  // Revenue trends (last 12 months)
  revenueTrend: [
    { month: 'Jan', revenue: 85000000, transactions: 850 },
    { month: 'Feb', revenue: 92000000, transactions: 920 },
    { month: 'Mar', revenue: 78000000, transactions: 780 },
    { month: 'Apr', revenue: 102000000, transactions: 1020 },
    { month: 'May', revenue: 118000000, transactions: 1180 },
    { month: 'Jun', revenue: 95000000, transactions: 950 },
    { month: 'Jul', revenue: 110000000, transactions: 1100 },
    { month: 'Aug', revenue: 125000000, transactions: 1250 },
    { month: 'Sep', revenue: 135000000, transactions: 1350 },
    { month: 'Oct', revenue: 128000000, transactions: 1280 },
    { month: 'Nov', revenue: 142000000, transactions: 1420 },
    { month: 'Dec', revenue: 158000000, transactions: 1580 },
  ],
  
  // Top performing FPOs
  topFPOs: [
    { id: 1, name: 'Green Fields FPO', members: 1250, revenue: 125000000, growth: 12.5, region: 'North' },
    { id: 2, name: 'Organic Farmers Coop', members: 980, revenue: 98750000, growth: 8.2, region: 'South' },
    { id: 3, name: 'Harvest Plus', members: 1560, revenue: 87650000, growth: 15.3, region: 'West' },
    { id: 4, name: 'Kisan Vikas', members: 1120, revenue: 76540000, growth: 5.7, region: 'East' },
    { id: 5, name: 'Krishi Utpadak Sangh', members: 890, revenue: 65430000, growth: 9.8, region: 'Central' },
  ],
  
  // Crop distribution
  cropDistribution: [
    { name: 'Rice', value: 35, area: 437500, farmers: 4350 },
    { name: 'Wheat', value: 25, area: 312500, farmers: 3100 },
    { name: 'Maize', value: 15, area: 187500, farmers: 1850 },
    { name: 'Pulses', value: 10, area: 125000, farmers: 1240 },
    { name: 'Oilseeds', value: 8, area: 100000, farmers: 980 },
    { name: 'Vegetables', value: 7, area: 87500, farmers: 870 },
  ],
  
  // Region-wise performance
  regionPerformance: [
    { name: 'North', revenue: 350000000, farmers: 4500, fpos: 65, growth: 12.5 },
    { name: 'South', revenue: 280000000, farmers: 3800, fpos: 58, growth: 8.2 },
    { name: 'East', revenue: 220000000, farmers: 2500, fpos: 42, growth: 6.8 },
    { name: 'West', revenue: 260000000, farmers: 3200, fpos: 55, growth: 10.1 },
    { name: 'Central', revenue: 140000000, farmers: 1800, fpos: 25, growth: 5.4 },
  ],
  
  // Recent activities
  recentActivities: [
    { id: 1, type: 'scheme', title: 'PM-KISAN disbursed', amount: 120000000, date: '2023-10-26T10:30:00Z', status: 'completed' },
    { id: 2, type: 'transaction', title: 'Bulk purchase order', amount: 8500000, date: '2023-10-25T14:15:00Z', status: 'completed' },
    { id: 3, type: 'alert', title: 'Low rainfall alert', amount: null, date: '2023-10-24T09:45:00Z', status: 'pending' },
    { id: 4, type: 'fpo', title: 'New FPO registered', amount: null, date: '2023-10-23T16:20:00Z', status: 'completed' },
    { id: 5, type: 'training', title: 'Organic farming workshop', amount: 150000, date: '2023-10-22T11:00:00Z', status: 'upcoming' },
  ],
  
  // Weather data
  weather: {
    temperature: 28.5, // in Celsius
    humidity: 65, // percentage
    rainfall: 15.2, // mm
    windSpeed: 12.5, // km/h
    windDirection: 'NE',
    condition: 'Partly Cloudy',
    forecast: [
      { day: 'Mon', temp: 29, condition: 'sunny' },
      { day: 'Tue', temp: 28, condition: 'partly-cloudy' },
      { day: 'Wed', temp: 27, condition: 'cloudy' },
      { day: 'Thu', temp: 26, condition: 'rain' },
      { day: 'Fri', temp: 27, condition: 'partly-cloudy' },
    ]
  }
};

// Helper functions
const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)} K`;
  }
  return `₹${amount}`;
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

const getWeatherIcon = (condition) => {
  switch(condition) {
    case 'sunny':
      return <FiSun className="text-yellow-500" />;
    case 'partly-cloudy':
      return <FiCloudRain className="text-blue-400" />;
    case 'cloudy':
      return <FiCloudRain className="text-gray-400" />;
    case 'rain':
      return <FiDroplet className="text-blue-500" />;
    default:
      return <FiSun className="text-yellow-500" />;
  }
};

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('12m');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(mockAnalyticsData);
  const [selectedMetric, setSelectedMetric] = useState(null);
  
  // Simulate data loading
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(mockAnalyticsData);
      setIsLoading(false);
    };
    
    fetchData();
  }, [timeRange]);
  
  // Calculate growth percentage
  const calculateGrowth = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };
  
  // Get growth indicator
  const getGrowthIndicator = (value) => {
    if (value > 0) {
      return (
        <span className="flex items-center text-green-600">
          <FiTrendingUp className="mr-1" />
          {value.toFixed(1)}%
        </span>
      );
    } else if (value < 0) {
      return (
        <span className="flex items-center text-red-600">
          <FiTrendingDown className="mr-1" />
          {Math.abs(value).toFixed(1)}%
        </span>
      );
    } else {
      return <span className="text-gray-500">0%</span>;
    }
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" /> Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            <FiCalendar className="mr-1" /> Upcoming
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };
  
  // Get activity icon
  const getActivityIcon = (type) => {
    switch(type) {
      case 'scheme':
        return <FiDollarSign className="h-5 w-5 text-green-500" />;
      case 'transaction':
        return <FiDollarSign className="h-5 w-5 text-blue-500" />;
      case 'alert':
        return <FiAlertCircle className="h-5 w-5 text-red-500" />;
      case 'fpo':
        return <FiUsers className="h-5 w-5 text-purple-500" />;
      case 'training':
        return <FiBookOpen className="h-5 w-5 text-yellow-500" />;
      default:
        return <FiInfo className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <FiBarChart2 className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <div className="flex items-center">
                <label htmlFor="time-range" className="mr-2 text-sm font-medium text-gray-700">
                  Time Range:
                </label>
                <select
                  id="time-range"
                  className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="3m">Last 3 months</option>
                  <option value="6m">Last 6 months</option>
                  <option value="12m">Last 12 months</option>
                  <option value="all">All time</option>
                </select>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => setIsLoading(true)}
              >
                <FiRefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FiDownload className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>
          
          {/* View Toggle */}
          <div className="mt-4 flex justify-end">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-3 py-1.5 text-sm font-medium rounded-l-md border ${
                  viewMode === 'grid' 
                    ? 'bg-green-100 text-green-700 border-green-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 text-sm font-medium rounded-r-md border ${
                  viewMode === 'list' 
                    ? 'bg-green-100 text-green-700 border-green-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('list')}
              >
                <FiList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Farmers */}
              <div 
                className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMetric === 'farmers' ? 'ring-2 ring-green-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedMetric(selectedMetric === 'farmers' ? null : 'farmers')}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <FiUsers className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Farmers</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {formatNumber(data.metrics.totalFarmers)}
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            <span className="ml-1">12.5%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-green-600 hover:text-green-500">
                      View all farmers
                    </a>
                  </div>
                </div>
              </div>

              {/* Total FPOs */}
              <div 
                className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMetric === 'fpos' ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedMetric(selectedMetric === 'fpos' ? null : 'fpos')}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <FiUsers className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total FPOs</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {formatNumber(data.metrics.totalFPOs)}
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            <span className="ml-1">8.2%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      View all FPOs
                    </a>
                  </div>
                </div>
              </div>

              {/* Total Revenue */}
              <div 
                className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMetric === 'revenue' ? 'ring-2 ring-purple-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedMetric(selectedMetric === 'revenue' ? null : 'revenue')}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <FiDollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {formatCurrency(data.metrics.totalRevenue)}
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            <span className="ml-1">15.3%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                      View revenue report
                    </a>
                  </div>
                </div>
              </div>

              {/* Active Schemes */}
              <div 
                className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMetric === 'schemes' ? 'ring-2 ring-yellow-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedMetric(selectedMetric === 'schemes' ? null : 'schemes')}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <FiClipboard className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Schemes</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {data.metrics.activeSchemes}
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            <span className="ml-1">5.6%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
                      View all schemes
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Trend */}
              <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Revenue Trend</h2>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FiTrendingUp className="mr-1" /> 15.3% increase
                    </span>
                    <button
                      type="button"
                      className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <FiDownload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Revenue trend chart would be displayed here</p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Showing revenue data for the last 12 months</p>
                </div>
              </div>

              {/* Weather and Crop Health */}
              <div className="space-y-6">
                {/* Weather Card */}
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Weather Update</h2>
                    <FiMapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-4xl font-bold text-gray-900">
                        {data.weather.temperature}°C
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">{data.weather.condition}</p>
                        <p className="text-xs text-gray-400">Humidity: {data.weather.humidity}%</p>
                        <p className="text-xs text-gray-400">Rain: {data.weather.rainfall}mm</p>
                      </div>
                    </div>
                    <div className="text-4xl">
                      {getWeatherIcon('partly-cloudy')}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-center">
                      {data.weather.forecast.map((day, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <span className="text-xs text-gray-500">{day.day}</span>
                          <span className="mt-1 text-lg">{getWeatherIcon(day.condition)}</span>
                          <span className="text-sm font-medium">{day.temp}°</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Crop Health */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Crop Health</h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Rice</span>
                        <span className="text-green-600">Good</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Wheat</span>
                        <span className="text-yellow-600">Moderate</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Maize</span>
                        <span className="text-green-600">Good</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500">
                      View detailed report
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Performing FPOs */}
              <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Top Performing FPOs</h2>
                  <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500">
                    View all
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          FPO Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Region
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Members
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Growth
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.topFPOs.map((fpo) => (
                        <tr key={fpo.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{fpo.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{fpo.region}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatNumber(fpo.members)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">{formatCurrency(fpo.revenue)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-green-600">
                              <FiTrendingUp className="inline mr-1" />
                              {fpo.growth}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
                  <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500">
                    View all
                  </a>
                </div>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {data.recentActivities.map((activity, activityIdx) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {activityIdx !== data.recentActivities.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                                {getActivityIcon(activity.type)}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-800">
                                  {activity.title}
                                  {activity.amount && (
                                    <span className="font-medium text-gray-900"> {formatCurrency(activity.amount)}</span>
                                  )}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(activity.date).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap">
                                {getStatusBadge(activity.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Crop Distribution */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Crop Distribution</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Total Area: {formatNumber(data.metrics.cropCoverage)} hectares
                  </span>
                  <button
                    type="button"
                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <FiDownload className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="h-80 bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Crop distribution chart would be displayed here</p>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {data.cropDistribution.map((crop, index) => (
                  <div key={index} className="text-center">
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          index % 3 === 0 ? 'bg-green-500' : 
                          index % 3 === 1 ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${crop.value}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-900">{crop.name}</p>
                    <p className="text-xs text-gray-500">{crop.value}% • {formatNumber(crop.area)} ha</p>
                    <p className="text-xs text-gray-400">{formatNumber(crop.farmers)} farmers</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </footer>
      
      {/* Tooltip */}
      <ReactTooltip id="analytics-tooltip" place="top" effect="solid" />
    </div>
  );
};

export default AnalyticsDashboard;
