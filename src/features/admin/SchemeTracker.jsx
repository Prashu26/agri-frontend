import React, { useState, useEffect } from 'react';
import {
  FiClipboard,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiUserCheck,
  FiDollarSign,
  FiUsers,
  FiMapPin,
  FiInfo
} from 'react-icons/fi';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Mock data for schemes
const mockSchemes = [
  {
    id: 'SCHEME-001',
    name: 'PM-KISAN',
    description: 'Income support to all farmer families across the country',
    category: 'Income Support',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    budget: 600000000000, // 60,000 crores
    beneficiaries: 120000000, // 12 crore farmers
    status: 'active',
    progress: 75,
    lastUpdated: '2023-10-20T14:30:00Z',
    documents: ['Guidelines.pdf', 'Eligibility.pdf'],
    regions: ['All India'],
    implementingAgency: 'Ministry of Agriculture'
  },
  {
    id: 'SCHEME-002',
    name: 'Soil Health Card',
    description: 'Issue Soil Health Cards to farmers to improve soil fertility',
    category: 'Soil Health',
    startDate: '2022-04-01',
    endDate: '2023-03-31',
    budget: 3250000000, // 325 crores
    beneficiaries: 22000000, // 2.2 crore farmers
    status: 'completed',
    progress: 100,
    lastUpdated: '2023-09-15T10:20:00Z',
    documents: ['Implementation.pdf', 'Guidelines.pdf'],
    regions: ['All India'],
    implementingAgency: 'Department of Agriculture'
  },
  {
    id: 'SCHEME-003',
    name: 'Kisan Credit Card',
    description: 'Provide farmers with timely access to credit',
    category: 'Credit',
    startDate: '2023-04-01',
    endDate: '2024-03-31',
    budget: 20000000000, // 20,000 crores
    beneficiaries: 5000000, // 50 lakh farmers
    status: 'active',
    progress: 45,
    lastUpdated: '2023-10-22T09:15:00Z',
    documents: ['Application_Form.pdf', 'Terms.pdf'],
    regions: ['North', 'South', 'East', 'West'],
    implementingAgency: 'NABARD'
  },
  {
    id: 'SCHEME-004',
    name: 'Micro Irrigation Fund',
    description: 'Promote micro-irrigation for water use efficiency',
    category: 'Irrigation',
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    budget: 10000000000, // 10,000 crores
    beneficiaries: 1000000, // 10 lakh farmers
    status: 'active',
    progress: 30,
    lastUpdated: '2023-10-18T16:45:00Z',
    documents: ['Guidelines.pdf', 'Application_Process.pdf'],
    regions: ['North', 'West'],
    implementingAgency: 'NCDC'
  },
  {
    id: 'SCHEME-005',
    name: 'Organic Farming',
    description: 'Promote organic farming practices',
    category: 'Sustainable Agriculture',
    startDate: '2022-10-01',
    endDate: '2023-09-30',
    budget: 4600000000, // 460 crores
    beneficiaries: 1500000, // 15 lakh farmers
    status: 'completed',
    progress: 100,
    lastUpdated: '2023-09-30T18:20:00Z',
    documents: ['Organic_Guidelines.pdf', 'Certification_Process.pdf'],
    regions: ['Sikkim', 'Kerala', 'Uttarakhand'],
    implementingAgency: 'APEDA'
  },
  {
    id: 'SCHEME-006',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme for farmers',
    category: 'Insurance',
    startDate: '2023-04-01',
    endDate: '2024-03-31',
    budget: 15000000000, // 15,000 crores
    beneficiaries: 8000000, // 80 lakh farmers
    status: 'active',
    progress: 60,
    lastUpdated: '2023-10-21T11:30:00Z',
    documents: ['PMFBY_Guidelines.pdf', 'Claim_Process.pdf'],
    regions: ['All India'],
    implementingAgency: 'Ministry of Agriculture'
  }
];

// Mock data for scheme categories
const categories = [
  'All',
  'Income Support',
  'Credit',
  'Insurance',
  'Irrigation',
  'Soil Health',
  'Sustainable Agriculture',
  'Infrastructure',
  'Research & Development'
];

// Mock data for regions
const regions = [
  'All',
  'North',
  'South',
  'East',
  'West',
  'Central',
  'North East',
  'Andhra Pradesh',
  'Karnataka',
  'Kerala',
  'Tamil Nadu',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh',
  'Punjab',
  'Haryana',
  'Bihar',
  'West Bengal',
  'Odisha',
  'Assam',
  'All India'
];

// Mock data for implementing agencies
const implementingAgencies = [
  'All',
  'Ministry of Agriculture',
  'NABARD',
  'NCDC',
  'APEDA',
  'State Agriculture Departments',
  'ICAR',
  'KVKs',
  'Other'
];

const SchemeTracker = () => {
  const [schemes, setSchemes] = useState(mockSchemes);
  const [filteredSchemes, setFilteredSchemes] = useState(mockSchemes);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    status: 'all',
    region: 'All',
    agency: 'All',
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showNewSchemeForm, setShowNewSchemeForm] = useState(false);
  const [newScheme, setNewScheme] = useState({
    name: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    budget: '',
    beneficiaries: '',
    status: 'draft',
    regions: [],
    implementingAgency: '',
    documents: []
  });

  // Apply filters
  useEffect(() => {
    setIsLoading(true);
    
    let result = [...schemes];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(scheme => 
        scheme.name.toLowerCase().includes(query) || 
        scheme.description.toLowerCase().includes(query) ||
        scheme.id.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.category !== 'All') {
      result = result.filter(scheme => scheme.category === filters.category);
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(scheme => scheme.status === filters.status);
    }
    
    // Apply region filter
    if (filters.region !== 'All') {
      result = result.filter(scheme => 
        scheme.regions.includes(filters.region) || 
        scheme.regions.includes('All India')
      );
    }
    
    // Apply agency filter
    if (filters.agency !== 'All') {
      result = result.filter(scheme => scheme.implementingAgency === filters.agency);
    }
    
    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      
      if (filters.dateRange === 'upcoming') {
        result = result.filter(scheme => new Date(scheme.startDate) > today);
      } else if (filters.dateRange === 'ongoing') {
        result = result.filter(scheme => 
          new Date(scheme.startDate) <= today && 
          new Date(scheme.endDate) >= today
        );
      } else if (filters.dateRange === 'recent') {
        result = result.filter(scheme => new Date(scheme.lastUpdated) >= thirtyDaysAgo);
      }
    }
    
    setFilteredSchemes(result);
    setIsLoading(false);
  }, [searchQuery, filters, schemes]);

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle new scheme input change
  const handleNewSchemeChange = (e) => {
    const { name, value } = e.target;
    setNewScheme(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle region selection for new scheme
  const handleRegionToggle = (region) => {
    setNewScheme(prev => {
      const regions = [...prev.regions];
      const index = regions.indexOf(region);
      
      if (index === -1) {
        regions.push(region);
      } else {
        regions.splice(index, 1);
      }
      
      return {
        ...prev,
        regions
      };
    });
  };

  // Handle form submission for new scheme
  const handleNewSchemeSubmit = (e) => {
    e.preventDefault();
    
    const scheme = {
      ...newScheme,
      id: `SCHEME-${Math.floor(1000 + Math.random() * 9000)}`,
      progress: 0,
      lastUpdated: new Date().toISOString(),
      documents: []
    };
    
    setSchemes(prev => [...prev, scheme]);
    setNewScheme({
      name: '',
      description: '',
      category: '',
      startDate: '',
      endDate: '',
      budget: '',
      beneficiaries: '',
      status: 'draft',
      regions: [],
      implementingAgency: '',
      documents: []
    });
    setShowNewSchemeForm(false);
  };

  // Format currency
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

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Ended';
    if (diffDays === 0) return 'Ends today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center">
            <FiCheckCircle className="mr-1" /> Active
          </span>
        );
      case 'draft':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 flex items-center">
            <FiEdit2 className="mr-1" /> Draft
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 flex items-center">
            <FiCheckCircle className="mr-1" /> Completed
          </span>
        );
      case 'paused':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 flex items-center">
            <FiPause className="mr-1" /> Paused
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Get progress bar color based on percentage
  const getProgressBarColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <FiClipboard className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Scheme Tracker</h2>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FiFilter className="h-4 w-4 mr-1" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button
              onClick={() => setShowNewSchemeForm(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FiPlus className="h-4 w-4 mr-1" />
              New Scheme
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                id="dateRange"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="recent">Recently Updated</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                id="region"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="agency" className="block text-sm font-medium text-gray-700 mb-1">
                Implementing Agency
              </label>
              <select
                id="agency"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={filters.agency}
                onChange={(e) => handleFilterChange('agency', e.target.value)}
              >
                {implementingAgencies.map(agency => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({
                    category: 'All',
                    status: 'all',
                    region: 'All',
                    agency: 'All',
                    dateRange: 'all'
                  });
                  setSearchQuery('');
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FiRefreshCw className="h-4 w-4 mr-1" />
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Total Schemes</p>
                    <p className="text-2xl font-bold text-green-700">{filteredSchemes.length}</p>
                  </div>
                  <FiClipboard className="h-8 w-8 text-green-400" />
                </div>
                <div className="mt-2">
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Active Schemes</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {filteredSchemes.filter(s => s.status === 'active').length}
                    </p>
                  </div>
                  <FiActivity className="h-8 w-8 text-blue-400" />
                </div>
                <div className="mt-2">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ 
                        width: `${(filteredSchemes.filter(s => s.status === 'active').length / Math.max(1, filteredSchemes.length)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-800">Total Budget</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {formatCurrency(filteredSchemes.reduce((sum, scheme) => sum + (parseInt(scheme.budget) || 0), 0))}
                    </p>
                  </div>
                  <FiDollarSign className="h-8 w-8 text-purple-400" />
                </div>
                <div className="mt-2">
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ 
                        width: '100%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Total Beneficiaries</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      {filteredSchemes.reduce((sum, scheme) => sum + (parseInt(scheme.beneficiaries) || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <FiUsers className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="mt-2">
                  <div className="w-full bg-yellow-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ 
                        width: '100%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schemes List */}
            <div className="overflow-hidden">
              {filteredSchemes.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No schemes found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setFilters({
                          category: 'All',
                          status: 'all',
                          region: 'All',
                          agency: 'All',
                          dateRange: 'all'
                        });
                        setSearchQuery('');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiRefreshCw className="-ml-1 mr-2 h-5 w-5" />
                      Reset all filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSchemes.map((scheme) => (
                    <div 
                      key={scheme.id}
                      className={`border rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md ${
                        selectedScheme?.id === scheme.id ? 'ring-2 ring-green-500' : 'border-gray-200'
                      }`}
                    >
                      <div 
                        className="p-4 cursor-pointer"
                        onClick={() => setSelectedScheme(selectedScheme?.id === scheme.id ? null : scheme)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-gray-900 truncate">
                                {scheme.name}
                              </h3>
                              <span className="ml-2">
                                {getStatusBadge(scheme.status)}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {scheme.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {scheme.category}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {scheme.implementingAgency}
                              </span>
                              {scheme.regions.map(region => (
                                <span key={region} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <FiMapPin className="mr-1 h-3 w-3" />
                                  {region}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0 flex flex-col items-end">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(scheme.budget)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {scheme.beneficiaries.toLocaleString()} beneficiaries
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              {new Date(scheme.startDate).toLocaleDateString()} - {new Date(scheme.endDate).toLocaleDateString()}
                            </div>
                            <div className="mt-1 text-xs font-medium text-gray-500">
                              {getDaysRemaining(scheme.endDate)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">Progress</span>
                            <span className="font-medium text-gray-700">{scheme.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressBarColor(scheme.progress)}`}
                              style={{ width: `${scheme.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      {selectedScheme?.id === scheme.id && (
                        <div className="border-t border-gray-200 bg-gray-50 p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Scheme Details</h4>
                              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm">
                                <div className="flex">
                                  <dt className="w-32 text-gray-500">ID:</dt>
                                  <dd className="text-gray-900">{scheme.id}</dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-32 text-gray-500">Status:</dt>
                                  <dd className="text-gray-900 capitalize">{scheme.status}</dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-32 text-gray-500">Start Date:</dt>
                                  <dd className="text-gray-900">{new Date(scheme.startDate).toLocaleDateString()}</dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-32 text-gray-500">End Date:</dt>
                                  <dd className="text-gray-900">{new Date(scheme.endDate).toLocaleDateString()}</dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-32 text-gray-500">Budget:</dt>
                                  <dd className="text-gray-900">{formatCurrency(scheme.budget)}</dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-32 text-gray-500">Beneficiaries:</dt>
                                  <dd className="text-gray-900">{scheme.beneficiaries.toLocaleString()}</dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-32 text-gray-500">Regions:</dt>
                                  <dd className="text-gray-900">{scheme.regions.join(', ')}</dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-32 text-gray-500">Agency:</dt>
                                  <dd className="text-gray-900">{scheme.implementingAgency}</dd>
                                </div>
                              </dl>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-sm font-medium text-gray-900">Documents</h4>
                                <button
                                  type="button"
                                  className="inline-flex items-center px-2.5 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  <FiPlus className="h-3 w-3 mr-1" />
                                  Add Document
                                </button>
                              </div>
                              
                              {scheme.documents.length > 0 ? (
                                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                  {scheme.documents.map((doc, index) => (
                                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                      <div className="w-0 flex-1 flex items-center">
                                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a2.5 2.5 0 11-5 0V7a.5.5 0 011 0v4a1.5 1.5 0 003 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-2 flex-1 w-0 truncate">
                                          {doc}
                                        </span>
                                      </div>
                                      <div className="ml-4 flex-shrink-0">
                                        <button className="font-medium text-green-600 hover:text-green-500">
                                          Download
                                        </button>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-md">
                                  <p className="text-sm text-gray-500">No documents available</p>
                                </div>
                              )}
                              
                              <div className="mt-6">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Actions</h4>
                                <div className="flex space-x-3">
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    <FiEdit2 className="h-4 w-4 mr-1" />
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    <FiBarChart2 className="h-4 w-4 mr-1" />
                                    View Analytics
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    <FiUsers className="h-4 w-4 mr-1" />
                                    Manage Beneficiaries
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* New Scheme Modal */}
      {showNewSchemeForm && (
        <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowNewSchemeForm(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add New Scheme
                  </h3>
                  <div className="mt-6">
                    <form onSubmit={handleNewSchemeSubmit}>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Scheme Name <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              required
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={newScheme.name}
                              onChange={handleNewSchemeChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={newScheme.description}
                              onChange={handleNewSchemeChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <select
                              id="category"
                              name="category"
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={newScheme.category}
                              onChange={handleNewSchemeChange}
                              required
                            >
                              <option value="">Select a category</option>
                              {categories.filter(cat => cat !== 'All').map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="implementingAgency" className="block text-sm font-medium text-gray-700">
                            Implementing Agency <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <select
                              id="implementingAgency"
                              name="implementingAgency"
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={newScheme.implementingAgency}
                              onChange={handleNewSchemeChange}
                              required
                            >
                              <option value="">Select an agency</option>
                              {implementingAgencies.filter(agency => agency !== 'All').map(agency => (
                                <option key={agency} value={agency}>{agency}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              name="startDate"
                              id="startDate"
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={newScheme.startDate}
                              onChange={handleNewSchemeChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            End Date <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              name="endDate"
                              id="endDate"
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={newScheme.endDate}
                              onChange={handleNewSchemeChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                            Budget (in INR) <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">₹</span>
                            </div>
                            <input
                              type="number"
                              name="budget"
                              id="budget"
                              className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              value={newScheme.budget}
                              onChange={handleNewSchemeChange}
                              required
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm" id="price-currency">
                                INR
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="beneficiaries" className="block text-sm font-medium text-gray-700">
                            Expected Beneficiaries
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="beneficiaries"
                              id="beneficiaries"
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={newScheme.beneficiaries}
                              onChange={handleNewSchemeChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Regions <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-300 rounded-md">
                            {regions.filter(region => !['All', 'All India'].includes(region)).map(region => (
                              <div key={region} className="flex items-center">
                                <input
                                  id={`region-${region}`}
                                  name="regions"
                                  type="checkbox"
                                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                  checked={newScheme.regions.includes(region)}
                                  onChange={() => handleRegionToggle(region)}
                                />
                                <label htmlFor={`region-${region}`} className="ml-2 block text-sm text-gray-700">
                                  {region}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end space-x-3">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          onClick={() => setShowNewSchemeForm(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Create Scheme
                        </button>
                      </div>
                    </form>
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

export default SchemeTracker;
