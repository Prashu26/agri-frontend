import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUsers, FaChartPie, FaClipboardCheck, FaTractor, FaBoxOpen, FaMoneyBillWave } from 'react-icons/fa';

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - in a real app, this would come from an API
  const stats = {
    totalUsers: 1542,
    activeSessions: 87,
    pendingApprovals: 12,
    totalRevenue: '₹12,45,789',
  };

  const recentActivities = [
    { id: 1, type: 'user', details: 'New FPO registration from Green Farms', time: '10 mins ago' },
    { id: 2, type: 'order', details: 'Large order placed by AgroCorp', time: '25 mins ago' },
    { id: 3, type: 'system', details: 'Scheduled maintenance completed', time: '1 hour ago' },
    { id: 4, type: 'alert', details: 'Unusual login attempt detected', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back, {user?.name || 'Administrator'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <FaClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Sessions</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeSessions}</p>
              <p className="text-xs text-green-600">+5 from yesterday</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
              <FaTractor className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingApprovals}</p>
              <p className="text-xs text-red-600">Action required</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-purple-500 bg-purple-100 rounded-full">
              <FaMoneyBillWave className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalRevenue}</p>
              <p className="text-xs text-green-600">+8.2% from last month</p>
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
              <Link to="/admin/activities" className="text-sm font-medium text-green-600 hover:text-green-500">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'user' && (
                      <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full">
                        <FaUsers className="w-4 h-4" />
                      </div>
                    )}
                    {activity.type === 'order' && (
                      <div className="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full">
                        <FaBoxOpen className="w-4 h-4" />
                      </div>
                    )}
                    {activity.type === 'system' && (
                      <div className="flex items-center justify-center w-8 h-8 text-white bg-gray-500 rounded-full">
                        <FaChartPie className="w-4 h-4" />
                      </div>
                    )}
                    {activity.type === 'alert' && (
                      <div className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
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
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/admin/users"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Manage Users</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </Link>
              <Link
                to="/admin/approvals"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Review Approvals</span>
                <div className="relative">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="absolute top-0 right-0 flex w-2 h-2 -mt-1 -mr-1">
                    <span className="absolute inline-flex w-full h-full bg-yellow-400 rounded-full opacity-75 animate-ping"></span>
                    <span className="relative inline-flex w-2 h-2 bg-yellow-500 rounded-full"></span>
                  </span>
                </div>
              </Link>
              <Link
                to="/admin/reports"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Generate Reports</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>System Settings</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-medium text-gray-900">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Server Load</span>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500">32%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Database</span>
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Storage</span>
                <span className="text-xs text-gray-500">1.2 GB / 10 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Last Backup</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
