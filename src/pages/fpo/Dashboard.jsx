import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUsers, FaChartLine, FaBoxOpen, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa';

export default function FPODashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stats, recentActivities, status } = useSelector((state) => state.dashboard);

  // Mock data - in a real app, this would come from an API
  const mockStats = {
    totalFarmers: 128,
    activeOrders: 24,
    pendingRequests: 5,
    monthlyRevenue: '₹2,45,678',
  };

  const mockActivities = [
    { id: 1, type: 'order', details: 'New order from Farmer #1234', time: '2 hours ago' },
    { id: 2, type: 'request', details: 'New membership request', time: '5 hours ago' },
    { id: 3, type: 'payment', details: 'Payment received for Order #4567', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">FPO Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back, {user?.name || 'FPO Admin'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Farmers</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.totalFarmers}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <FaClipboardList className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.activeOrders}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
              <FaBoxOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.pendingRequests}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-purple-500 bg-purple-100 rounded-full">
              <FaMoneyBillWave className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.monthlyRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
              <Link to="/fpo/activities" className="text-sm font-medium text-green-600 hover:text-green-500">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'order' && (
                      <FaBoxOpen className="w-5 h-5 text-blue-500" />
                    )}
                    {activity.type === 'request' && (
                      <FaClipboardList className="w-5 h-5 text-yellow-500" />
                    )}
                    {activity.type === 'payment' && (
                      <FaMoneyBillWave className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{activity.details}</p>
                    <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-6 text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/fpo/farmers/add"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Add New Farmer</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
              <Link
                to="/fpo/orders/new"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Create New Order</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
              <Link
                to="/fpo/inventory"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Manage Inventory</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/fpo/reports"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Generate Reports</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="p-6 mt-6 bg-white rounded-lg shadow">
            <h2 className="mb-6 text-lg font-medium text-gray-900">Upcoming Events</h2>
            <div className="space-y-4">
              <div className="p-3 text-sm bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Farmers Meeting</p>
                <p className="text-blue-600">Tomorrow, 10:00 AM</p>
              </div>
              <div className="p-3 text-sm bg-green-50 rounded-lg">
                <p className="font-medium text-green-800">Crop Procurement</p>
                <p className="text-green-600">In 3 days, 9:00 AM</p>
              </div>
              <div className="p-3 text-sm bg-yellow-50 rounded-lg">
                <p className="font-medium text-yellow-800">Training Session</p>
                <p className="text-yellow-600">Next Monday, 11:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
