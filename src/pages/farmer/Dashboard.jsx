import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSeedling, 
  FaChartLine, 
  FaCalendarAlt, 
  FaBullhorn, 
  FaTractor, 
  FaRobot, 
  FaFileContract, 
  FaAward,
  FaBell,
  FaCloudSunRain
} from 'react-icons/fa';
import { GiFarmer, GiCorn, GiWheat } from 'react-icons/gi';
import { BsGraphUp } from 'react-icons/bs';

const FarmerDashboard = () => {
  // Farmer's current status
  const [farmerStats, setFarmerStats] = useState({
    totalLand: 5.5, // in acres
    activeCrops: 3,
    pendingTasks: 2,
    rewardPoints: 1250,
  });

  // Current weather and alerts
  const [weather, setWeather] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: '5mm',
    condition: 'Partly Cloudy',
    alert: 'Mild heatwave expected in 3 days',
  });

  // Current crop status
  const [cropStatus, setCropStatus] = useState([
    { id: 1, name: 'Soybean', stage: 'Vegetative', health: 'Good', progress: 65 },
    { id: 2, name: 'Groundnut', stage: 'Flowering', health: 'Excellent', progress: 80 },
    { id: 3, name: 'Sunflower', stage: 'Seedling', health: 'Needs Attention', progress: 30 },
  ]);

  // Quick actions for the farmer
  const quickActions = [
    {
      title: 'Crop Simulator',
      icon: <FaSeedling className="w-6 h-6" />,
      description: 'Compare oilseed vs alternate crops with AI-predicted ROI',
      link: '/farmer/simulator',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
    },
    {
      title: 'Profitability Dashboard',
      icon: <BsGraphUp className="w-6 h-6" />,
      description: 'View yield forecasts, market prices, and costs',
      link: '/farmer/profitability',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
    },
    {
      title: 'AI Chatbot',
      icon: <FaRobot className="w-6 h-6" />,
      description: 'Get personalized advisory on crops, weather, and subsidies',
      link: '/farmer/chatbot',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
    },
    {
      title: 'Contracts',
      icon: <FaFileContract className="w-6 h-6" />,
      description: 'Access verified procurement agreements with FPOs/buyers',
      link: '/farmer/contracts',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
    },
    {
      title: 'Rewards',
      icon: <FaAward className="w-6 h-6" />,
      description: 'Earn points for sustained oilseed cultivation',
      link: '/farmer/rewards',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
    },
  ];

  // Recent activities/notifications
  const recentActivities = [
    {
      id: 1,
      type: 'alert',
      message: 'Irrigation needed for Sunflower crop',
      time: '2 hours ago',
      icon: <FaBullhorn className="text-yellow-500" />,
    },
    {
      id: 2,
      type: 'market',
      message: 'Soybean prices increased by 3.2%',
      time: '5 hours ago',
      icon: <FaChartLine className="text-green-500" />,
    },
    {
      id: 3,
      type: 'weather',
      message: 'Rain expected in your area tomorrow',
      time: '1 day ago',
      icon: <FaCloudSunRain className="text-blue-500" />,
    },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Banner with Stats */}
      <div className="p-6 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Farmer!</h1>
            <p className="text-green-100">Here's what's happening with your farm today</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
            <div className="text-center px-4">
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm">{weather.condition}</p>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="text-center px-4">
              <p className="text-sm">Humidity</p>
              <p className="text-lg font-semibold">{weather.humidity}%</p>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="text-center px-4">
              <p className="text-sm">Rainfall</p>
              <p className="text-lg font-semibold">{weather.rainfall}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <GiCorn className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Crops</p>
              <p className="text-2xl font-bold">{farmerStats.activeCrops}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaChartLine className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Land</p>
              <p className="text-2xl font-bold">{farmerStats.totalLand} <span className="text-sm">acres</span></p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <FaBell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Tasks</p>
              <p className="text-2xl font-bold">{farmerStats.pendingTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FaAward className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Reward Points</p>
              <p className="text-2xl font-bold">{farmerStats.rewardPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {quickActions.map((action, index) => (
            <Link 
              key={index} 
              to={action.link}
              className={`p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow ${action.bgColor} ${action.textColor}`}
            >
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-full ${action.bgColor.replace('bg-', 'bg-opacity-20 ')} mr-3`}>
                  {action.icon}
                </div>
                <h3 className="font-medium">{action.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crops Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Crops */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Crops</h2>
              <Link to="/farmer/crops" className="text-sm text-green-600 hover:underline">View All</Link>
            </div>
            
            <div className="space-y-4">
              {cropStatus.map((crop) => (
                <div key={crop.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full ${
                        crop.name === 'Soybean' ? 'bg-yellow-100 text-yellow-600' :
                        crop.name === 'Groundnut' ? 'bg-amber-100 text-amber-600' :
                        'bg-orange-100 text-orange-600'
                      } mr-4`}>
                        {crop.name === 'Soybean' ? <GiCorn className="w-6 h-6" /> :
                         crop.name === 'Groundnut' ? <GiWheat className="w-6 h-6" /> :
                         <GiWheat className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{crop.name}</h3>
                        <p className="text-sm text-gray-500">{crop.stage} Stage</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      crop.health === 'Excellent' ? 'bg-green-100 text-green-800' :
                      crop.health === 'Good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {crop.health}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Growth Progress</span>
                      <span>{crop.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          crop.health === 'Excellent' ? 'bg-green-500' :
                          crop.health === 'Good' ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`} 
                        style={{ width: `${crop.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <span className="text-gray-500">Planted: 15 days ago</span>
                    <div className="space-x-2">
                      <Link to={`/farmer/crops/${crop.id}`} className="px-3 py-1 border rounded-md hover:bg-gray-50">
                        Details
                      </Link>
                      <Link to={`/farmer/crops/${crop.id}/care`} className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Care Guide
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Weather Forecast */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((day) => (
                <div key={day} className="text-center p-3 border rounded-lg">
                  <p className="font-medium">Day {day}</p>
                  <div className="text-4xl my-2">
                    {day % 3 === 0 ? '🌧️' : day % 2 === 0 ? '⛅' : '☀️'}
                  </div>
                  <p className="text-sm text-gray-600">
                    {day % 3 === 0 ? 'Rainy' : day % 2 === 0 ? 'Cloudy' : 'Sunny'}
                  </p>
                  <p className="text-sm font-medium">
                    {28 + day * 2}° / {22 + day}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
              <Link to="/farmer/activities" className="text-sm text-green-600 hover:underline">View All</Link>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="p-2 bg-gray-100 rounded-full mr-3">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Weather Alert */}
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Weather Alert</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{weather.alert} <Link to="/farmer/weather" className="font-medium text-yellow-700 underline">View details</Link></p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Tips */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Tip</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Consider planting drought-resistant crops like pearl millet or sorghum in the upcoming season to mitigate climate risks.
                </p>
                <Link to="/farmer/tips" className="mt-2 inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-600">
                  More tips <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Market Prices */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Market Prices</h2>
            <div className="space-y-4">
              {[
                { crop: 'Soybean', price: 4500, change: 2.5 },
                { crop: 'Groundnut', price: 5200, change: -1.2 },
                { crop: 'Sunflower', price: 5800, change: 3.1 },
                { crop: 'Mustard', price: 5100, change: 1.8 },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.crop}</p>
                    <p className="text-sm text-gray-500">Per quintal</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                    <p className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                    </p>
                  </div>
                </div>
              ))}
              <Link to="/marketplace" className="block mt-4 text-center text-green-600 hover:underline">
                View all market prices →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <FaSeedling className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Crops</p>
              <p className="text-2xl font-semibold text-gray-900">{farmerStats.activeCrops}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
              <FaChartLine className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Land</p>
              <p className="text-2xl font-semibold text-gray-900">{farmerStats.totalLand} <span className="text-sm">acres</span></p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
              <FaAward className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Reward Points</p>
              <p className="text-2xl font-semibold text-gray-900">{farmerStats.rewardPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="p-6 transition-all bg-white rounded-lg shadow hover:shadow-md"
            >
              <div className="flex items-center">
                <div className="mr-4">{action.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Weather and Market Info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Weather Card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Weather Update</h2>
          <div className="flex items-center justify-between">
            <div className="text-5xl font-bold">{weather.temperature}°C</div>
            <div className="text-right">
              <p className="text-lg font-medium">{weather.condition}</p>
              <p className="text-sm text-gray-500">Humidity: {weather.humidity}%</p>
              <p className="text-sm text-gray-500">Rain: {weather.rainfall}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Next 24 hours: {weather.condition} with a high of {weather.temperature + 2}°C
            </p>
          </div>
        </div>

        {/* Market Prices */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Crops</h2>
            <Link to="/farmer/crops" className="text-sm text-green-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {cropStatus.map((crop) => (
              <div key={crop.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${
                      crop.name === 'Soybean' ? 'bg-yellow-100 text-yellow-600' :
                      crop.name === 'Groundnut' ? 'bg-amber-100 text-amber-600' :
                      'bg-orange-100 text-orange-600'
                    } mr-4`}>
                      {crop.name === 'Soybean' ? <GiCorn className="w-6 h-6" /> :
                       crop.name === 'Groundnut' ? <GiWheat className="w-6 h-6" /> :
                       <GiWheat className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{crop.name}</h3>
                      <p className="text-sm text-gray-500">{crop.stage} Stage</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
