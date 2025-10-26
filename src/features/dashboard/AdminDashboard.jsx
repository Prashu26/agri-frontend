import React, { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiDollarSign, 
  FiPackage, 
  FiTruck, 
  FiTrendingUp, 
  FiAlertCircle, 
  FiCalendar, 
  FiBarChart2,
  FiShoppingBag,
  FiCreditCard,
  FiUserCheck,
  FiClock,
  FiActivity,
  FiFilter,
  FiSearch,
  FiDownload,
  FiMail,
  FiMessageSquare,
  FiBell,
  FiSettings
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Mock data for the dashboard
const mockStats = {
  totalFarmers: 1245,
  totalFPOs: 32,
  totalTransactions: 2456,
  totalRevenue: 1250000,
  recentActivities: [
    { id: 1, user: 'John Doe', action: 'added a new crop listing', time: '2 mins ago', type: 'crop' },
    { id: 2, user: 'FPO Admin', action: 'updated contract #4567', time: '15 mins ago', type: 'contract' },
    { id: 3, user: 'System', action: 'scheduled maintenance', time: '1 hour ago', type: 'system' },
    { id: 4, user: 'Jane Smith', action: 'completed payment for order #7890', time: '2 hours ago', type: 'payment' },
  ],
  systemHealth: {
    status: 'operational',
    uptime: '99.9%',
    responseTime: '120ms',
    lastUpdated: '2023-05-15T10:30:00Z'
  },
  recentPayments: [
    { id: 'PAY-001', farmer: 'Rahul Sharma', amount: 12500, date: '2023-05-15', status: 'completed' },
    { id: 'PAY-002', farmer: 'Priya Patel', amount: 8500, date: '2023-05-14', status: 'pending' },
    { id: 'PAY-003', farmer: 'Amit Singh', amount: 15600, date: '2023-05-14', status: 'completed' },
    { id: 'PAY-004', farmer: 'Neha Gupta', amount: 9200, date: '2023-05-13', status: 'failed' },
  ],
  fpoPerformance: [
    { id: 1, name: 'Green Fields FPO', members: 125, revenue: 1250000, growth: 12.5 },
    {id: 2, name: 'Organic Farmers Coop', members: 89, revenue: 987000, growth: 8.2 },
    { id: 3, name: 'Harvest Plus', members: 67, revenue: 756000, growth: 15.3 },
  ]
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registration: John Doe', time: '2 mins ago', read: false, type: 'user' },
    { id: 2, message: 'System update available', time: '1 hour ago', read: false, type: 'system' },
    { id: 3, message: 'New FPO registration pending approval', time: '3 hours ago', read: true, type: 'fpo' },
  ]);

  // In a real app, this would fetch data from an API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setStats(mockStats);
      setIsLoading(false);
    };
    
    fetchData();
  }, [timeRange]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
              >
                <FiBell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">Notifications</h3>
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {notification.type === 'user' && <FiUserCheck className="h-4 w-4 text-blue-500" />}
                              {notification.type === 'system' && <FiSettings className="h-4 w-4 text-yellow-500" />}
                              {notification.type === 'fpo' && <FiUsers className="h-4 w-4 text-green-500" />}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="ml-2">
                                <span className="h-2 w-2 bg-blue-500 rounded-full inline-block"></span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No new notifications
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <Link to="/admin/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                AD
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('fpos')}
              className={`${activeTab === 'fpos' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
            >
              FPOs
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`${activeTab === 'transactions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`${activeTab === 'reports' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`${activeTab === 'settings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ml-auto`}
            >
              <FiSettings className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Farmers */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FiUsers className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Farmers</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.totalFarmers.toLocaleString()}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <FiTrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="sr-only">Increased by</span>
                        <span className="ml-1">12%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin/farmers" className="font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
            </div>
          </div>

          {/* Total FPOs */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FiPackage className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total FPOs</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.totalFPOs.toLocaleString()}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <FiTrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="sr-only">Increased by</span>
                        <span className="ml-1">8%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin/fpos" className="font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
            </div>
          </div>

          {/* Total Transactions */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <FiCreditCard className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Transactions</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.totalTransactions.toLocaleString()}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <FiTrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="sr-only">Increased by</span>
                        <span className="ml-1">24%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin/transactions" className="font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
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
                        {formatCurrency(stats.totalRevenue)}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <FiTrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="sr-only">Increased by</span>
                        <span className="ml-1">18%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin/revenue" className="font-medium text-blue-600 hover:text-blue-500">
                  View report
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activities */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activities</h3>
                  <div className="flex items-center
                  ">
                    <select
                      id="time-range"
                      name="time-range"
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiRefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {stats.recentActivities.map((activity) => (
                    <li key={activity.id} className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {activity.type === 'crop' && <FiPackage className="h-5 w-5 text-blue-600" />}
                          {activity.type === 'contract' && <FiFileText className="h-5 w-5 text-green-600" />}
                          {activity.type === 'system' && <FiSettings className="h-5 w-5 text-yellow-600" />}
                          {activity.type === 'payment' && <FiDollarSign className="h-5 w-5 text-purple-600" />}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                          </p>
                          <p className="text-sm text-gray-500">
                            <time dateTime={activity.time}>{activity.time}</time>
                          </p>
                        </div>
                        <div className="ml-auto">
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 px-6 py-3 text-right">
                  <Link to="/admin/activities" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all activities
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Payments</h3>
                  <div className="flex items-center">
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="search"
                        id="search"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search payments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiFilter className="h-4 w-4 mr-1" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-b-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Payment ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Farmer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {stats.recentPayments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {payment.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {payment.farmer}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatCurrency(payment.amount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {payment.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
                      <span className="font-medium">24</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <FiChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        aria-current="page"
                        className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        1
                      </button>
                      <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        2
                      </button>
                      <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                        3
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                      <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                        8
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <FiChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* FPO Performance */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">FPO Performance</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Top performing FPOs by revenue</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <ul className="divide-y divide-gray-200">
                  {stats.fpoPerformance.map((fpo) => (
                    <li key={fpo.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <FiTrendingUp className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{fpo.name}</p>
                          <p className="text-sm text-gray-500">{fpo.members} members</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(fpo.revenue)}</p>
                          <p className="text-xs text-green-600">+{fpo.growth}% <span className="text-gray-500">growth</span></p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-center">
                  <Link to="/admin/fpos/performance" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all FPOs
                  </Link>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">System Health</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Status</p>
                    <div className="flex items-center mt-1">
                      <div className={`h-2.5 w-2.5 rounded-full ${stats.systemHealth.status === 'operational' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                      <span className="text-sm font-medium text-gray-900 capitalize">{stats.systemHealth.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Uptime</p>
                    <p className="text-sm text-gray-500">{stats.systemHealth.uptime}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Response Time</span>
                    <span className="font-medium">{stats.systemHealth.responseTime}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-gray-500 text-right">
                    Last updated: {new Date(stats.systemHealth.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <Link
                  to="/admin/users/new"
                  className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUserPlus className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">Add User</p>
                </Link>
                <Link
                  to="/admin/fpos/new"
                  className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <FiUsers className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">Add FPO</p>
                </Link>
                <Link
                  to="/admin/payments/record"
                  className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FiDollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">Record Payment</p>
                </Link>
                <Link
                  to="/admin/reports/generate"
                  className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <FiBarChart2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">Generate Report</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2023 Agriculture System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
