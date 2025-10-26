import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPackage, FiMapPin } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MarketInsights() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in a real app, this would come from an API
  const cropData = {
    rice: {
      prices: [45, 48, 52, 50, 55, 58, 60, 62, 65, 63, 67, 70],
      demand: [120, 125, 130, 128, 135, 140, 142, 145, 150, 148, 155, 160],
      production: [100, 105, 110, 108, 115, 120, 118, 122, 125, 128, 130, 132],
    },
    wheat: {
      prices: [30, 32, 34, 33, 35, 37, 38, 40, 42, 41, 43, 45],
      demand: [90, 92, 95, 93, 98, 100, 102, 105, 108, 110, 112, 115],
      production: [85, 88, 90, 89, 92, 95, 93, 97, 100, 102, 105, 108],
    },
    cotton: {
      prices: [120, 125, 122, 128, 130, 132, 135, 138, 140, 142, 145, 150],
      demand: [75, 78, 80, 82, 85, 88, 90, 92, 95, 98, 100, 105],
      production: [70, 72, 75, 73, 78, 80, 82, 85, 88, 90, 92, 95],
    },
  };

  const cropNames = {
    rice: 'Rice',
    wheat: 'Wheat',
    cotton: 'Cotton',
  };

  const timeRanges = [
    { id: 'week', name: 'Last 7 Days' },
    { id: 'month', name: 'Last 30 Days' },
    { id: 'year', name: 'Last 12 Months' },
  ];

  const crops = [
    { id: 'rice', name: 'Rice' },
    { id: 'wheat', name: 'Wheat' },
    { id: 'cotton', name: 'Cotton' },
  ];

  // Generate labels based on time range
  const getLabels = () => {
    if (timeRange === 'week') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if (timeRange === 'month') return Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  };

  // Process data based on selected time range
  const processData = (data) => {
    if (timeRange === 'week') return data.slice(0, 7);
    if (timeRange === 'month') return data.slice(0, 12);
    return data; // year
  };

  // Chart data for price trend
  const priceChartData = {
    labels: getLabels(),
    datasets: [
      {
        label: 'Price (₹/kg)',
        data: processData(cropData[selectedCrop].prices),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Chart data for demand vs production
  const comparisonChartData = {
    labels: getLabels(),
    datasets: [
      {
        label: 'Demand (tonnes)',
        data: processData(cropData[selectedCrop].demand),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
      {
        label: 'Production (tonnes)',
        data: processData(cropData[selectedCrop].production),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Market summary
  const marketSummary = {
    currentPrice: cropData[selectedCrop].prices[cropData[selectedCrop].prices.length - 1],
    priceChange: ((cropData[selectedCrop].prices[cropData[selectedCrop].prices.length - 1] - 
                  cropData[selectedCrop].prices[0]) / cropData[selectedCrop].prices[0] * 100).toFixed(2),
    demand: cropData[selectedCrop].demand.reduce((a, b) => a + b, 0),
    production: cropData[selectedCrop].production.reduce((a, b) => a + b, 0),
    supplyGap: (() => {
      const totalDemand = cropData[selectedCrop].demand.reduce((a, b) => a + b, 0);
      const totalProduction = cropData[selectedCrop].production.reduce((a, b) => a + b, 0);
      return totalDemand - totalProduction;
    })(),
  };

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedCrop, timeRange]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between md:items-center md:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Market Insights</h1>
          <p className="text-gray-600">Track real-time market trends and prices</p>
        </div>
        <div className="flex flex-col mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {crops.map((crop) => (
              <option key={crop.id} value={crop.id}>
                {crop.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current Price</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ₹{marketSummary.currentPrice}/kg
              </p>
              <div className={`inline-flex items-center mt-1 text-sm ${marketSummary.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {marketSummary.priceChange >= 0 ? (
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <FiTrendingDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(marketSummary.priceChange)}% {marketSummary.priceChange >= 0 ? 'increase' : 'decrease'} from last {timeRange}
              </div>
            </div>
            <div className="p-3 text-blue-500 bg-blue-100 rounded-full">
              <FiDollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Demand</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {marketSummary.demand.toLocaleString()} kg
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {Math.round((marketSummary.demand / (marketSummary.demand + marketSummary.production)) * 100)}% of total market
              </p>
            </div>
            <div className="p-3 text-green-500 bg-green-100 rounded-full">
              <FiTrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Production</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {marketSummary.production.toLocaleString()} kg
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {Math.round((marketSummary.production / (marketSummary.demand + marketSummary.production)) * 100)}% of total market
              </p>
            </div>
            <div className="p-3 text-yellow-500 bg-yellow-100 rounded-full">
              <FiPackage className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Supply Gap</p>
              <p className={`mt-1 text-2xl font-semibold ${
                marketSummary.supplyGap > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {Math.abs(marketSummary.supplyGap).toLocaleString()} kg
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {marketSummary.supplyGap > 0 ? 'Demand exceeds supply' : 'Supply meets demand'}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              marketSummary.supplyGap > 0 ? 'text-red-500 bg-red-100' : 'text-green-500 bg-green-100'
            }`}>
              <FiMapPin className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Price Trend</h2>
          <div className="h-80">
            <Line data={priceChartData} options={chartOptions} />
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Demand vs Production</h2>
          <div className="h-80">
            <Bar data={comparisonChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Market News & Updates */}
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Latest Market News</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500">View All</button>
        </div>
        <div className="space-y-4">
          {[
            {
              id: 1,
              title: `${cropNames[selectedCrop]} prices expected to rise in coming weeks`,
              source: 'AgriMarket Watch',
              time: '2 hours ago',
              isPositive: true,
            },
            {
              id: 2,
              title: 'Government announces new subsidy for farmers',
              source: 'Ministry of Agriculture',
              time: '5 hours ago',
              isPositive: true,
            },
            {
              id: 3,
              title: 'Heavy rainfall affects crop yields in northern regions',
              source: 'Weather Analytics',
              time: '1 day ago',
              isPositive: false,
            },
          ].map((news) => (
            <div key={news.id} className="flex items-start p-4 border border-gray-100 rounded-lg">
              <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                news.isPositive ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">{news.title}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>{news.source}</span>
                  <span className="mx-2">•</span>
                  <span>{news.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
