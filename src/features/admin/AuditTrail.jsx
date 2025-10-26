import React, { useState, useEffect } from 'react';
import {
  FiActivity,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiFilter,
  FiSearch,
  FiShield,
  FiTrash2,
  FiUser,
  FiX,
  FiEye,
  FiInfo,
  FiAlertTriangle,
  FiChevronDown,
  FiChevronUp,
  FiRefreshCw,
  FiCalendar,
  FiUserCheck,
  FiUserX,
  FiLock,
  FiUnlock,
  FiFileText
} from 'react-icons/fi';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: 1,
    timestamp: '2023-10-26T14:30:45Z',
    action: 'USER_LOGIN',
    status: 'SUCCESS',
    userId: 'user123',
    userRole: 'ADMIN',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    details: 'User logged in successfully',
    metadata: {
      location: 'New Delhi, IN',
      device: 'Desktop',
      os: 'Windows 10'
    }
  },
  {
    id: 2,
    timestamp: '2023-10-26T14:25:12Z',
    action: 'USER_LOGOUT',
    status: 'SUCCESS',
    userId: 'user456',
    userRole: 'FPO_MANAGER',
    ipAddress: '203.0.113.45',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    details: 'User logged out',
    metadata: {
      location: 'Mumbai, IN',
      device: 'iPhone',
      os: 'iOS 16.0'
    }
  },
  {
    id: 3,
    timestamp: '2023-10-26T14:15:33Z',
    action: 'DOCUMENT_UPLOAD',
    status: 'SUCCESS',
    userId: 'user789',
    userRole: 'FARMER',
    ipAddress: '198.51.100.22',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-A525F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
    details: 'Uploaded document: land_records_2023.pdf',
    metadata: {
      documentId: 'doc_abc123',
      documentType: 'LAND_RECORDS',
      size: '2.5 MB',
      location: 'Bangalore, IN',
      device: 'Samsung Galaxy A52',
      os: 'Android 12'
    }
  },
  {
    id: 4,
    timestamp: '2023-10-26T14:10:05Z',
    action: 'SCHEME_APPLICATION',
    status: 'PENDING',
    userId: 'user101',
    userRole: 'FARMER',
    ipAddress: '203.0.113.78',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    details: 'Applied for scheme: PM-KISAN',
    metadata: {
      schemeId: 'sch_pmkisan_2023',
      applicationId: 'app_xyz456',
      status: 'PENDING_REVIEW'
    }
  },
  {
    id: 5,
    timestamp: '2023-10-26T14:05:22Z',
    action: 'PASSWORD_RESET',
    status: 'FAILED',
    userId: 'user202',
    userRole: 'FPO_MANAGER',
    ipAddress: '198.51.100.45',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
    details: 'Failed password reset attempt - Invalid security question',
    metadata: {
      attemptCount: 2,
      location: 'Hyderabad, IN',
      device: 'MacBook Pro',
      os: 'macOS Monterey'
    }
  },
  {
    id: 6,
    timestamp: '2023-10-26T14:01:18Z',
    action: 'DATA_EXPORT',
    status: 'SUCCESS',
    userId: 'user123',
    userRole: 'ADMIN',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    details: 'Exported farmer data to CSV',
    metadata: {
      exportType: 'FARMER_DATA',
      recordCount: 1245,
      fileSize: '3.7 MB',
      format: 'CSV',
      filters: 'active=true,registered_after=2023-01-01'
    }
  },
  {
    id: 7,
    timestamp: '2023-10-26T13:45:30Z',
    action: 'USER_ACCOUNT_LOCKED',
    status: 'WARNING',
    userId: 'user456',
    userRole: 'FPO_MANAGER',
    ipAddress: '203.0.113.45',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    details: 'Account locked after multiple failed login attempts',
    metadata: {
      failedAttempts: 5,
      lockDuration: '30 minutes',
      location: 'Mumbai, IN',
      device: 'iPhone',
      os: 'iOS 16.0'
    }
  },
  {
    id: 8,
    timestamp: '2023-10-26T13:30:15Z',
    action: 'SCHEME_APPROVAL',
    status: 'SUCCESS',
    userId: 'admin001',
    userRole: 'ADMIN',
    ipAddress: '192.168.1.10',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    details: 'Approved scheme application: PM-KISAN for user789',
    metadata: {
      schemeId: 'sch_pmkisan_2023',
      applicationId: 'app_xyz123',
      approvedAmount: '₹6,000',
      approvalNotes: 'All documents verified and approved.'
    }
  },
  {
    id: 9,
    timestamp: '2023-10-26T13:25:42Z',
    action: 'PROFILE_UPDATE',
    status: 'SUCCESS',
    userId: 'user789',
    userRole: 'FARMER',
    ipAddress: '198.51.100.22',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-A525F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
    details: 'Updated profile information',
    metadata: {
      updatedFields: ['phone_number', 'address'],
      location: 'Bangalore, IN',
      device: 'Samsung Galaxy A52',
      os: 'Android 12'
    }
  },
  {
    id: 10,
    timestamp: '2023-10-26T13:20:10Z',
    action: 'ROLE_PERMISSION_UPDATE',
    status: 'SUCCESS',
    userId: 'admin001',
    userRole: 'ADMIN',
    ipAddress: '192.168.1.10',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    details: 'Updated permissions for role: FPO_MANAGER',
    metadata: {
      addedPermissions: ['SCHEME_APPROVAL', 'FARMER_VERIFICATION'],
      removedPermissions: ['PAYMENT_APPROVAL'],
      updatedBy: 'admin001'
    }
  }
];

// Action types for filtering
const ACTION_TYPES = [
  { id: 'all', label: 'All Actions', icon: <FiActivity /> },
  { id: 'AUTHENTICATION', label: 'Authentication', icon: <FiShield /> },
  { id: 'USER_MANAGEMENT', label: 'User Management', icon: <FiUser /> },
  { id: 'DOCUMENT', label: 'Documents', icon: <FiFileText /> },
  { id: 'SCHEME', label: 'Schemes', icon: <FiCheckCircle /> },
  { id: 'DATA', label: 'Data Operations', icon: <FiDownload /> },
  { id: 'SECURITY', label: 'Security', icon: <FiLock /> },
  { id: 'OTHER', label: 'Other', icon: <FiInfo /> }
];

// Status types for filtering
const STATUS_TYPES = [
  { id: 'all', label: 'All Statuses', color: 'gray' },
  { id: 'SUCCESS', label: 'Success', color: 'green' },
  { id: 'FAILED', label: 'Failed', color: 'red' },
  { id: 'PENDING', label: 'Pending', icon: <FiClock />, color: 'yellow' },
  { id: 'WARNING', label: 'Warning', icon: <FiAlertTriangle />, color: 'orange' }
];

// User roles for filtering
const USER_ROLES = [
  { id: 'all', label: 'All Roles' },
  { id: 'ADMIN', label: 'Administrator' },
  { id: 'FPO_MANAGER', label: 'FPO Manager' },
  { id: 'FARMER', label: 'Farmer' },
  { id: 'GUEST', label: 'Guest' }
];

// Helper functions
const formatDateTime = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return new Date(dateString).toLocaleString('en-IN', options);
};

const getStatusBadge = (status) => {
  const statusConfig = {
    SUCCESS: { bg: 'bg-green-100', text: 'text-green-800', icon: <FiCheckCircle className="mr-1" /> },
    FAILED: { bg: 'bg-red-100', text: 'text-red-800', icon: <FiX className="mr-1" /> },
    PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <FiClock className="mr-1" /> },
    WARNING: { bg: 'bg-orange-100', text: 'text-orange-800', icon: <FiAlertTriangle className="mr-1" /> }
  };

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

const getActionIcon = (action) => {
  if (action.includes('LOGIN') || action.includes('LOGOUT') || action.includes('AUTH')) {
    return <FiShield className="h-4 w-4 text-blue-500" />;
  } else if (action.includes('USER') || action.includes('ACCOUNT')) {
    return <FiUser className="h-4 w-4 text-purple-500" />;
  } else if (action.includes('DOCUMENT') || action.includes('FILE')) {
    return <FiFileText className="h-4 w-4 text-green-500" />;
  } else if (action.includes('SCHEME') || action.includes('PAYMENT')) {
    return <FiCheckCircle className="h-4 w-4 text-yellow-500" />;
  } else if (action.includes('DATA') || action.includes('EXPORT') || action.includes('IMPORT')) {
    return <FiDownload className="h-4 w-4 text-indigo-500" />;
  } else if (action.includes('LOCK') || action.includes('SECURITY')) {
    return <FiLock className="h-4 w-4 text-red-500" />;
  } else if (action.includes('ROLE') || action.includes('PERMISSION')) {
    return <FiUserCheck className="h-4 w-4 text-teal-500" />;
  } else {
    return <FiActivity className="h-4 w-4 text-gray-500" />;
  }
};

const getActionCategory = (action) => {
  if (action.includes('LOGIN') || action.includes('LOGOUT') || action.includes('AUTH')) {
    return 'AUTHENTICATION';
  } else if (action.includes('USER') || action.includes('ACCOUNT') || action.includes('PROFILE')) {
    return 'USER_MANAGEMENT';
  } else if (action.includes('DOCUMENT') || action.includes('FILE')) {
    return 'DOCUMENT';
  } else if (action.includes('SCHEME') || action.includes('PAYMENT')) {
    return 'SCHEME';
  } else if (action.includes('DATA') || action.includes('EXPORT') || action.includes('IMPORT')) {
    return 'DATA';
  } else if (action.includes('LOCK') || action.includes('SECURITY') || action.includes('PASSWORD')) {
    return 'SECURITY';
  } else if (action.includes('ROLE') || action.includes('PERMISSION')) {
    return 'USER_MANAGEMENT';
  } else {
    return 'OTHER';
  }
};

const AuditTrail = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [expandedLogs, setExpandedLogs] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Load mock data
  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const logsWithCategories = mockAuditLogs.map(log => ({
        ...log,
        actionCategory: getActionCategory(log.action)
      }));
      setLogs(logsWithCategories);
      setFilteredLogs(logsWithCategories);
      setIsLoading(false);
    };

    fetchLogs();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...logs];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(log => 
        log.userId.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        log.ipAddress.includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.userRole.toLowerCase().includes(query)
      );
    }

    // Filter by action type
    if (selectedAction !== 'all') {
      result = result.filter(log => log.actionCategory === selectedAction);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(log => log.status === selectedStatus);
    }

    // Filter by user role
    if (selectedRole !== 'all') {
      result = result.filter(log => log.userRole === selectedRole);
    }

    // Filter by date range
    if (dateRange.start) {
      const startDate = new Date(dateRange.start);
      result = result.filter(log => new Date(log.timestamp) >= startDate);
    }

    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // End of the day
      result = result.filter(log => new Date(log.timestamp) <= endDate);
    }

    setFilteredLogs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [logs, searchQuery, selectedAction, selectedStatus, selectedRole, dateRange]);

  // Toggle log details
  const toggleLogDetails = (logId) => {
    setExpandedLogs(prev => ({
      ...prev,
      [logId]: !prev[logId]
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedAction('all');
    setSelectedStatus('all');
    setSelectedRole('all');
    setDateRange({ start: '', end: '' });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Check if any filter is active
  const isFilterActive = 
    searchQuery || 
    selectedAction !== 'all' || 
    selectedStatus !== 'all' || 
    selectedRole !== 'all' || 
    dateRange.start || 
    dateRange.end;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Audit Trail
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and track all system activities and user actions.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4
          space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={clearFilters}
              disabled={!isFilterActive}
            >
              <FiX className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiDownload className="h-4 w-4 mr-2" />
              Export Logs
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setSearchQuery('')}
                  >
                    <FiX className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Action Type Filter */}
            <div>
              <label htmlFor="action-type" className="block text-sm font-medium text-gray-700 mb-1">
                Action Type
              </label>
              <select
                id="action-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                {ACTION_TYPES.map((action) => (
                  <option key={action.id} value={action.id}>
                    {action.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {STATUS_TYPES.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={dateRange.end}
                  min={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
            </div>

            {/* User Role Filter */}
            <div>
              <label htmlFor="user-role" className="block text-sm font-medium text-gray-700 mb-1">
                User Role
              </label>
              <select
                id="user-role"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {USER_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filters */}
            {isFilterActive && (
              <div className="col-span-full flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Search: {searchQuery}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                      onClick={() => setSearchQuery('')}
                    >
                      <span className="sr-only">Remove search</span>
                      <FiX className="h-2.5 w-2.5" />
                    </button>
                  </span>
                )}
                {selectedAction !== 'all' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Action: {ACTION_TYPES.find(a => a.id === selectedAction)?.label}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:outline-none"
                      onClick={() => setSelectedAction('all')}
                    >
                      <span className="sr-only">Remove action filter</span>
                      <FiX className="h-2.5 w-2.5" />
                    </button>
                  </span>
                )}
                {selectedStatus !== 'all' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Status: {STATUS_TYPES.find(s => s.id === selectedStatus)?.label}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none"
                      onClick={() => setSelectedStatus('all')}
                    >
                      <span className="sr-only">Remove status filter</span>
                      <FiX className="h-2.5 w-2.5" />
                    </button>
                  </span>
                )}
                {selectedRole !== 'all' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Role: {USER_ROLES.find(r => r.id === selectedRole)?.label}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:outline-none"
                      onClick={() => setSelectedRole('all')}
                    >
                      <span className="sr-only">Remove role filter</span>
                      <FiX className="h-2.5 w-2.5" />
                    </button>
                  </span>
                )}
                {(dateRange.start || dateRange.end) && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {dateRange.start && `From: ${new Date(dateRange.start).toLocaleDateString()}`}
                    {dateRange.start && dateRange.end && ' - '}
                    {dateRange.end && `To: ${new Date(dateRange.end).toLocaleDateString()}`}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                      onClick={() => setDateRange({ start: '', end: '' })}
                    >
                      <span className="sr-only">Remove date filter</span>
                      <FiX className="h-2.5 w-2.5" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Summary Stats */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredLogs.length > 0 ? indexOfFirstItem + 1 : 0}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredLogs.length)}
              </span>{' '}
              of <span className="font-medium">{filteredLogs.length}</span> logs
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Logs per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="block w-20 pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                disabled
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <FiActivity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No logs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {isFilterActive
                  ? 'Try adjusting your search or filter criteria'
                  : 'No audit logs available at the moment'}
              </p>
              {isFilterActive && (
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={clearFilters}
                  >
                    <FiRefreshCw className="-ml-1 mr-2 h-4 w-4" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {currentItems.map((log) => (
                  <li key={log.id} className="hover:bg-gray-50">
                    <div 
                      className="px-4 py-4 sm:px-6 cursor-pointer"
                      onClick={() => toggleLogDetails(log.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {getActionIcon(log.action)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {log.details}
                            </div>
                            <div className="flex flex-wrap items-center mt-1 text-xs text-gray-500 space-x-2">
                              <span>{log.action.replace(/_/g, ' ')}</span>
                              <span>•</span>
                              <span>{formatDateTime(log.timestamp)}</span>
                              <span>•</span>
                              <span className="inline-flex items-center">
                                <FiUser className="mr-1 h-3 w-3" />
                                {log.userId}
                              </span>
                              <span>•</span>
                              <span className="capitalize">{log.userRole.toLowerCase().replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {getStatusBadge(log.status)}
                          <button
                            type="button"
                            className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLogDetails(log.id);
                            }}
                          >
                            {expandedLogs[log.id] ? (
                              <FiChevronUp className="h-5 w-5" />
                            ) : (
                              <FiChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedLogs[log.id] && (
                      <div className="px-4 pb-4 sm:px-6">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Details</h4>
                              <dl className="space-y-2">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-sm font-medium text-gray-500">Action</dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {log.action}
                                  </dd>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {formatDateTime(log.timestamp)}
                                  </dd>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-sm font-medium text-gray-500">IP Address</dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {log.ipAddress}
                                  </dd>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-sm font-medium text-gray-500">User Agent</dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div className="truncate max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl" title={log.userAgent}>
                                      {log.userAgent}
                                    </div>
                                  </dd>
                                </div>
                              </dl>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Metadata</h4>
                              <div className="bg-white rounded-md p-3 border border-gray-200 overflow-auto max-h-48">
                                <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                                  {JSON.stringify(log.metadata, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(indexOfLastItem, filteredLogs.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredLogs.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => paginate(1)}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">First</span>
                          <FiChevronLeft className="h-5 w-5" />
                          <FiChevronLeft className="h-5 w-5 -ml-1" />
                        </button>
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <FiChevronLeft className="h-5 w-5" />
                        </button>
                        
                        {/* Page numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => paginate(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNum
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <FiChevronRight className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => paginate(totalPages)}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Last</span>
                          <FiChevronRight className="h-5 w-5" />
                          <FiChevronRight className="h-5 w-5 -mr-1" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Tooltip */}
      <ReactTooltip id="audit-tooltip" place="top" effect="solid" />
    </div>
  );
};

export default AuditTrail;
