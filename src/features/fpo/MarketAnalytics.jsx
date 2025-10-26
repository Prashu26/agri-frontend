import React, { useState, useEffect, useRef } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaTable,
  FaMapMarkedAlt,
  FaRupeeSign,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaInfoCircle,
  FaExternalLinkAlt,
  FaRegBell,
  FaRegStar,
  FaStar,
  FaShare,
  FaRegClock
} from 'react-icons/fa';
import { BsThreeDotsVertical, BsGraphUp, BsGraphDown } from 'react-icons/bs';
import { GiWheat, GiFruitBowl, GiCorn, GiPlantRoots } from 'react-icons/gi';
import { format, subMonths, subDays, isAfter, isBefore, parseISO } from 'date-fns';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data for market prices
const mockPriceHistory = {
  labels: Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), 29 - i), 'dd MMM')),
  datasets: [
    {
      label: 'Soybean (₹/quintal)',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 3500),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Wheat (₹/quintal)',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 800) + 1900),
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Rice (₹/quintal)',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1200) + 1800),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.4,
      fill: true,
    }
  ]
};

// Mock data for market demand
const mockDemandData = {
  labels: ['Soybean', 'Wheat', 'Rice', 'Maize', 'Pulses', 'Vegetables'],
  datasets: [
    {
      label: 'Demand Index',
      data: [85, 70, 65, 55, 60, 75],
      backgroundColor: [
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

// Mock data for crop distribution
const mockCropDistribution = {
  labels: ['Soybean', 'Wheat', 'Rice', 'Maize', 'Pulses', 'Others'],
  datasets: [
    {
      data: [30, 25, 20, 15, 7, 3],
      backgroundColor: [
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(201, 203, 207, 0.7)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(201, 203, 207, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

// Mock data for price comparison
const mockPriceComparison = {
  labels: ['Wholesale', 'Retail', 'MSP', 'Export'],
  datasets: [
    {
      label: 'Soybean (₹/quintal)',
      data: [4500, 5200, 3950, 4800],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Wheat (₹/quintal)',
      data: [2200, 2800, 2015, 2400],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
    {
      label: 'Rice (₹/quintal)',
      data: [1800, 2400, 1940, 2200],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

// Mock data for market news
const mockMarketNews = [
  {
    id: 1,
    title: 'Soybean prices surge 15% due to increased export demand',
    source: 'AgriWatch',
    date: '2024-10-25',
    impact: 'high',
    category: 'price',
    isFavorite: true,
    summary: 'Global demand for soybean has increased significantly, leading to a sharp rise in prices. Experts predict this trend to continue for the next quarter.'
  },
  {
    id: 2,
    title: 'Government announces new MSP for Rabi crops',
    source: 'Krishi Jagran',
    date: '2024-10-22',
    impact: 'medium',
    category: 'policy',
    isFavorite: false,
    summary: 'The government has announced a 5-7% increase in Minimum Support Prices for various Rabi crops, including wheat and pulses.'
  },
  {
    id: 3,
    title: 'Heavy rainfall affects wheat crop in Punjab',
    source: 'Down To Earth',
    date: '2024-10-20',
    impact: 'high',
    category: 'weather',
    isFavorite: false,
    summary: 'Unexpected heavy rainfall in Punjab has damaged standing wheat crops, potentially affecting this season\'s yield.'
  },
  {
    id: 4,
    title: 'New export opportunities for organic produce in EU',
    source: 'The Hindu Business Line',
    date: '2024-10-18',
    impact: 'medium',
    category: 'export',
    isFavorite: true,
    summary: 'The European Union has expanded its list of approved organic products from India, opening new markets for farmers.'
  },
];

// Mock data for price alerts
const mockPriceAlerts = [
  {
    id: 1,
    crop: 'Soybean',
    condition: 'above',
    price: 4800,
    isActive: true,
    createdAt: '2024-10-20',
    triggered: true,
    triggeredAt: '2024-10-24',
    triggeredPrice: 4850
  },
  {
    id: 2,
    crop: 'Wheat',
    condition: 'below',
    price: 2000,
    isActive: true,
    createdAt: '2024-10-15',
    triggered: false,
    triggeredAt: null,
    triggeredPrice: null
  },
  {
    id: 3,
    crop: 'Rice',
    condition: 'above',
    price: 2500,
    isActive: false,
    createdAt: '2024-10-10',
    triggered: false,
    triggeredAt: null,
    triggeredPrice: null
  }
];

// Chart options
const lineChartOptions = {
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
      title: {
        display: true,
        text: 'Price (₹/quintal)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  },
  maintainAspectRatio: false
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Price (₹/quintal)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  maintainAspectRatio: false
};

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
  },
  maintainAspectRatio: false
};

const MarketAnalytics = () => {
  const [activeTab, setActiveTab] = useState('prices');
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [showNewAlert, setShowNewAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    crop: '',
    condition: 'above',
    price: '',
    isActive: true
  });
  const [priceAlerts, setPriceAlerts] = useState(mockPriceAlerts);
  const [marketNews, setMarketNews] = useState(mockMarketNews);
  const [searchTerm, setSearchTerm] = useState('');
  const [chartData, setChartData] = useState(mockPriceHistory);
  
  // Filter market news based on search term
  const filteredNews = marketNews.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle time range change
  useEffect(() => {
    const updateChartData = () => {
      let labels = [];
      let dataPoints = [];
      
      switch(timeRange) {
        case '7d':
          labels = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 6 - i), 'dd MMM'));
          dataPoints = Array.from({ length: 7 }, () => Math.floor(Math.random() * 500) + 3500);
          break;
        case '30d':
          labels = Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), 29 - i), 'dd MMM'));
          dataPoints = Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 3500);
          break;
        case '90d':
          labels = Array.from({ length: 12 }, (_, i) => format(subDays(new Date(), 89 - (i * 8)), 'dd MMM'));
          dataPoints = Array.from({ length: 12 }, () => Math.floor(Math.random() * 1500) + 3000);
          break;
        case '1y':
          labels = Array.from({ length: 12 }, (_, i) => format(subMonths(new Date(), 11 - i), 'MMM yyyy'));
          dataPoints = Array.from({ length: 12 }, () => Math.floor(Math.random() * 2000) + 2500);
          break;
        default:
          labels = Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), 29 - i), 'dd MMM'));
          dataPoints = Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 3500);
      }
      
      setChartData({
        ...chartData,
        labels,
        datasets: chartData.datasets.map(dataset => ({
          ...dataset,
          data: Array.from({ length: labels.length }, () => 
            Math.floor(Math.random() * (dataset.label.includes('Soybean') ? 1000 : 800)) + 
            (dataset.label.includes('Soybean') ? 3500 : 
             dataset.label.includes('Wheat') ? 1900 : 1800)
          )
        }))
      });
    };
    
    updateChartData();
  }, [timeRange]);

  // Toggle favorite status for news
  const toggleFavorite = (id) => {
    setMarketNews(marketNews.map(news => 
      news.id === id ? { ...news, isFavorite: !news.isFavorite } : news
    ));
  };

  // Toggle alert status
  const toggleAlertStatus = (id) => {
    setPriceAlerts(priceAlerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  // Delete alert
  const deleteAlert = (id) => {
    setPriceAlerts(priceAlerts.filter(alert => alert.id !== id));
  };

  // Handle new alert form input changes
  const handleAlertInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAlert({
      ...newAlert,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Submit new alert
  const handleAlertSubmit = (e) => {
    e.preventDefault();
    const newAlertEntry = {
      id: Math.max(...priceAlerts.map(a => a.id), 0) + 1,
      ...newAlert,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      triggered: false,
      triggeredAt: null,
      triggeredPrice: null
    };
    
    setPriceAlerts([...priceAlerts, newAlertEntry]);
    setShowNewAlert(false);
    setNewAlert({
      crop: '',
      condition: 'above',
      price: '',
      isActive: true
    });
  };

  // Get crop icon
  const getCropIcon = (crop) => {
    switch(crop.toLowerCase()) {
      case 'wheat':
        return <GiWheat className="text-amber-500" />;
      case 'rice':
        return <GiFruitBowl className="text-blue-500" />;
      case 'maize':
        return <GiCorn className="text-yellow-500" />;
      case 'vegetables':
        return <GiPlantRoots className="text-green-500" />;
      default:
        return <GiWheat className="text-gray-500" />;
    }
  };

  // Get impact badge
  const getImpactBadge = (impact) => {
    switch(impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Market Analytics</h1>
            <p className="text-gray-600">Track market trends, prices, and demand for agricultural commodities</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
              <FaDownload className="mr-2" /> Export Report
            </button>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'prices' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('prices')}
          >
            <FaRupeeSign className="mr-2" /> Price Trends
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'demand' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('demand')}
          >
            <FaChartBar className="mr-2" /> Demand Analysis
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'alerts' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('alerts')}
          >
            <FaRegBell className="mr-2" /> Price Alerts
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'news' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('news')}
          >
            <FaInfoCircle className="mr-2" /> Market News
          </button>
        </div>

        {/* Main Content */}
        {activeTab === 'prices' && (
          <div className="space-y-6">
            {/* Price Trend Charts */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Commodity Price Trends</h2>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <FaChartLine className="h-5 w-5" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <FaTable className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="h-80">
                <Line data={chartData} options={lineChartOptions} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Comparison */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-md font-medium text-gray-900 mb-4">Price Comparison (₹/quintal)</h3>
                <div className="h-64">
                  <Bar data={mockPriceComparison} options={barChartOptions} />
                </div>
              </div>

              {/* Crop Distribution */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-md font-medium text-gray-900 mb-4">Crop Distribution in Region</h3>
                <div className="h-64">
                  <Doughnut data={mockCropDistribution} options={pieChartOptions} />
                </div>
              </div>
            </div>

            {/* Market Highlights */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md font-medium text-gray-900 mb-4">Market Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { crop: 'Soybean', price: 4850, change: 5.2, isUp: true },
                  { crop: 'Wheat', price: 2240, change: -1.8, isUp: false },
                  { crop: 'Rice', price: 2150, change: 0.5, isUp: true },
                ].map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-full mr-3">
                          {getCropIcon(item.crop)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">{item.crop}</p>
                          <p className="text-lg font-semibold">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className={`flex items-center ${item.isUp ? 'text-green-600' : 'text-red-600'}`}>
                        {item.isUp ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                        <span className="font-medium">{item.change}%</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">MSP: ₹{Math.round(item.price * 0.9).toLocaleString()}</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full ${item.isUp ? 'bg-green-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(Math.abs(item.change) * 5, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demand' && (
          <div className="space-y-6">
            {/* Demand Analysis */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Commodity Demand Index</h2>
              <div className="h-96">
                <Bar data={mockDemandData} options={barChartOptions} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Demand vs Supply */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-md font-medium text-gray-900 mb-4">Demand vs Supply (Soybean)</h3>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: Array.from({ length: 12 }, (_, i) => format(subMonths(new Date(), 11 - i), 'MMM yy')),
                      datasets: [
                        {
                          label: 'Demand (MT)',
                          data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 500),
                          borderColor: 'rgba(75, 192, 192, 1)',
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          tension: 0.4,
                          fill: true,
                        },
                        {
                          label: 'Supply (MT)',
                          data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 400),
                          borderColor: 'rgba(255, 159, 64, 1)',
                          backgroundColor: 'rgba(255, 159, 64, 0.2)',
                          tension: 0.4,
                          fill: true,
                        }
                      ]
                    }} 
                    options={lineChartOptions} 
                  />
                </div>
              </div>

              {/* Regional Demand */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-md font-medium text-gray-900 mb-4">Regional Demand (Soybean)</h3>
                <div className="h-64">
                  <Doughnut 
                    data={{
                      labels: ['North', 'South', 'East', 'West'],
                      datasets: [
                        {
                          data: [35, 25, 20, 20],
                          backgroundColor: [
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 99, 132, 0.7)'
                          ],
                          borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)'
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }} 
                    options={pieChartOptions} 
                  />
                </div>
              </div>
            </div>

            {/* Demand Forecast */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md font-medium text-gray-900 mb-4">Demand Forecast (Next 6 Months)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commodity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Demand
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        1M Forecast
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        3M Forecast
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        6M Forecast
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { commodity: 'Soybean', current: 85, m1: 82, m3: 88, m6: 92, trend: 'up' },
                      { commodity: 'Wheat', current: 70, m1: 68, m3: 65, m6: 72, trend: 'down' },
                      { commodity: 'Rice', current: 65, m1: 67, m3: 70, m6: 68, trend: 'up' },
                      { commodity: 'Maize', current: 55, m1: 57, m3: 60, m6: 62, trend: 'up' },
                      { commodity: 'Pulses', current: 60, m1: 62, m3: 65, m6: 63, trend: 'up' },
                    ].map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.commodity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.current}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.m1} {item.m1 > item.current ? '↑' : item.m1 < item.current ? '↓' : '→'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.m3} {item.m3 > item.current ? '↑' : item.m3 < item.current ? '↓' : '→'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.m6} {item.m6 > item.current ? '↑' : item.m6 < item.current ? '↓' : '→'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.trend === 'up' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Increasing
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Decreasing
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Price Alerts</h2>
              <button
                onClick={() => setShowNewAlert(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                + New Alert
              </button>
            </div>

            {/* Active Alerts */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Active Alerts</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Alerts that are currently monitoring the market</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commodity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condition
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Target Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {priceAlerts.filter(alert => alert.isActive).length > 0 ? (
                      priceAlerts
                        .filter(alert => alert.isActive)
                        .map((alert) => (
                          <tr key={alert.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {alert.crop}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {alert.condition === 'above' ? 'Above' : 'Below'} ₹{alert.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ₹{alert.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {alert.triggered ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Triggered (₹{alert.triggeredPrice})
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Monitoring
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(alert.createdAt), 'dd MMM yyyy')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button 
                                  onClick={() => toggleAlertStatus(alert.id)}
                                  className="text-yellow-600 hover:text-yellow-900"
                                >
                                  <FaRegBell />
                                </button>
                                <button 
                                  onClick={() => deleteAlert(alert.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <FaTrash className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                          No active alerts. Create a new alert to monitor price changes.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inactive Alerts */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Inactive Alerts</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Alerts that are currently paused</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commodity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condition
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Target Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {priceAlerts.filter(alert => !alert.isActive).length > 0 ? (
                      priceAlerts
                        .filter(alert => !alert.isActive)
                        .map((alert) => (
                          <tr key={alert.id} className="bg-gray-50 hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              {alert.crop}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {alert.condition === 'above' ? 'Above' : 'Below'} ₹{alert.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ₹{alert.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Paused
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(alert.createdAt), 'dd MMM yyyy')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button 
                                  onClick={() => toggleAlertStatus(alert.id)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <FaRegBell />
                                </button>
                                <button 
                                  onClick={() => deleteAlert(alert.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <FaTrash className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                          No inactive alerts.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-medium text-gray-900">Market News & Updates</h2>
              <div className="mt-2 sm:mt-0 w-full sm:w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.length > 0 ? (
                filteredNews.map((news) => (
                  <div key={news.id} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactBadge(news.impact)}`}>
                          {news.impact.charAt(0).toUpperCase() + news.impact.slice(1)} Impact
                        </span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => toggleFavorite(news.id)}
                            className="text-gray-400 hover:text-yellow-500 focus:outline-none"
                          >
                            {news.isFavorite ? (
                              <FaStar className="h-5 w-5 text-yellow-400" />
                            ) : (
                              <FaRegStar className="h-5 w-5" />
                            )}
                          </button>
                          <button className="text-gray-400 hover:text-gray-500 focus:outline-none">
                            <FaShare className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">{news.title}</h3>
                        <p className="mt-3 text-base text-gray-500">
                          {news.summary}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <FaRegClock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">
                          {format(new Date(news.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{news.source}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {news.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No news found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* New Alert Modal */}
      {showNewAlert && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaRegBell className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Create Price Alert
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleAlertSubmit}>
                        <div className="grid grid-cols-1 gap-y-4">
                          <div>
                            <label htmlFor="crop" className="block text-sm font-medium text-gray-700">Commodity</label>
                            <select
                              id="crop"
                              name="crop"
                              required
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                              value={newAlert.crop}
                              onChange={handleAlertInputChange}
                            >
                              <option value="">Select Commodity</option>
                              <option value="Soybean">Soybean</option>
                              <option value="Wheat">Wheat</option>
                              <option value="Rice">Rice</option>
                              <option value="Maize">Maize</option>
                              <option value="Pulses">Pulses</option>
                              <option value="Vegetables">Vegetables</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alert When Price Is</label>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  id="condition-above"
                                  name="condition"
                                  type="radio"
                                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                  value="above"
                                  checked={newAlert.condition === 'above'}
                                  onChange={handleAlertInputChange}
                                />
                                <label htmlFor="condition-above" className="ml-2 block text-sm text-gray-900">
                                  Above
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="condition-below"
                                  name="condition"
                                  type="radio"
                                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                  value="below"
                                  checked={newAlert.condition === 'below'}
                                  onChange={handleAlertInputChange}
                                />
                                <label htmlFor="condition-below" className="ml-2 block text-sm text-gray-900">
                                  Below
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹/quintal)</label>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              required
                              min="0"
                              step="0.01"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                              value={newAlert.price}
                              onChange={handleAlertInputChange}
                              placeholder="Enter target price"
                            />
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              id="isActive"
                              name="isActive"
                              type="checkbox"
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                              checked={newAlert.isActive}
                              onChange={handleAlertInputChange}
                            />
                            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                              Active Alert
                            </label>
                          </div>
                        </div>
                        
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                          >
                            Create Alert
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                            onClick={() => setShowNewAlert(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketAnalytics;
