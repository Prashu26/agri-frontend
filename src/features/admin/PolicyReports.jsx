import React, { useState, useEffect } from 'react';
import {
  FiFileText,
  FiDownload,
  FiFilter,
  FiSearch,
  FiRefreshCw,
  FiPrinter,
  FiShare2,
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiCalendar,
  FiUser,
  FiUsers,
  FiDollarSign,
  FiMapPin,
  FiGrid,
  FiList,
  FiFilePlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiExternalLink
} from 'react-icons/fi';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Mock data for policy reports
const mockPolicyReports = [
  {
    id: 'PR-2023-001',
    title: 'PM-KISAN Scheme Impact Analysis',
    description: 'Comprehensive analysis of PM-KISAN scheme impact on small and marginal farmers',
    category: 'SCHEME_ANALYSIS',
    status: 'PUBLISHED',
    createdBy: 'admin001',
    createdAt: '2023-10-20T10:30:00Z',
    updatedAt: '2023-10-22T15:45:00Z',
    period: {
      start: '2023-04-01',
      end: '2023-09-30'
    },
    metrics: {
      beneficiaries: 12500,
      totalDisbursed: 75000000,
      avgPayout: 6000,
      growthRate: 15.5,
      completionRate: 92.3
    },
    tags: ['pm-kisan', 'scheme', 'financial', 'impact'],
    isFeatured: true,
    downloads: 245,
    views: 567,
    fileSize: '2.5 MB',
    fileFormat: 'PDF',
    thumbnail: '/images/reports/pm-kisan-thumb.jpg',
    relatedPolicies: ['PMFBY-2023', 'KCC-2023'],
    dataSources: ['PM-KISAN Portal', 'Agriculture Census 2020'],
    methodology: 'Primary data collection from beneficiaries, secondary data analysis',
    keyFindings: [
      '15.5% increase in farmer income',
      '92% satisfaction rate among beneficiaries',
      'Improved credit access for 68% of beneficiaries'
    ],
    recommendations: [
      'Expand coverage to tenant farmers',
      'Increase awareness in low-uptake regions',
      'Integrate with other welfare schemes'
    ]
  },
  {
    id: 'PR-2023-002',
    title: 'Soil Health Card Program Evaluation',
    description: 'Evaluation of Soil Health Card program and its impact on fertilizer usage',
    category: 'PROGRAM_EVALUATION',
    status: 'DRAFT',
    createdBy: 'researcher002',
    createdAt: '2023-10-15T14:20:00Z',
    updatedAt: '2023-10-18T11:10:00Z',
    period: {
      start: '2023-01-01',
      end: '2023-06-30'
    },
    metrics: {
      cardsIssued: 8500,
      farmersCovered: 7800,
      reductionInFertilizerUse: 12.7,
      yieldIncrease: 8.2,
      costSavings: 4200000
    },
    tags: ['soil-health', 'sustainability', 'fertilizer', 'evaluation'],
    isFeatured: false,
    downloads: 87,
    views: 213,
    fileSize: '1.8 MB',
    fileFormat: 'PDF',
    thumbnail: '/images/reports/soil-health-thumb.jpg',
    relatedPolicies: ['PKVY-2023', 'NMSA-2023'],
    dataSources: ['Soil Health Card Portal', 'State Agriculture Departments'],
    methodology: 'Field surveys, soil sample analysis, farmer interviews',
    keyFindings: [
      '12.7% reduction in chemical fertilizer use',
      '8.2% average increase in crop yield',
      '72% farmer adoption rate of recommendations'
    ],
    recommendations: [
      'Increase testing frequency',
      'Enhance digital access to reports',
      'Provide customized fertilizer recommendations'
    ]
  },
  {
    id: 'PR-2023-003',
    title: 'Kisan Credit Card Scheme Performance',
    description: 'Analysis of Kisan Credit Card scheme performance and farmer credit access',
    category: 'FINANCIAL_ANALYSIS',
    status: 'PUBLISHED',
    createdBy: 'analyst001',
    createdAt: '2023-10-10T09:15:00Z',
    updatedAt: '2023-10-12T16:30:00Z',
    period: {
      start: '2022-04-01',
      end: '2023-03-31'
    },
    metrics: {
      cardsIssued: 3200,
      totalCreditDisbursed: 192000000,
      avgCreditPerFarmer: 60000,
      repaymentRate: 94.5,
      repeatBorrowers: 68.3
    },
    tags: ['kcc', 'credit', 'financial-inclusion', 'loans'],
    isFeatured: true,
    downloads: 312,
    views: 745,
    fileSize: '3.1 MB',
    fileFormat: 'PDF',
    thumbnail: '/images/reports/kcc-thumb.jpg',
    relatedPolicies: ['PMFBY-2023', 'PM-KISAN'],
    dataSources: ['NABARD', 'RBI', 'Public Sector Banks'],
    methodology: 'Bank transaction data analysis, farmer surveys, case studies',
    keyFindings: [
      '94.5% repayment rate',
      '68.3% repeat borrowers',
      'Average loan amount increased by 18% YoY'
    ],
    recommendations: [
      'Simplify application process',
      'Increase awareness in eastern states',
      'Enhance digital access to credit'
    ]
  },
  {
    id: 'PR-2023-004',
    title: 'Organic Farming Subsidy Impact',
    description: 'Impact assessment of organic farming subsidies on farmer income and sustainability',
    category: 'RESEARCH_STUDY',
    status: 'UNDER_REVIEW',
    createdBy: 'researcher003',
    createdAt: '2023-10-05T11:45:00Z',
    updatedAt: '2023-10-08T14:20:00Z',
    period: {
      start: '2022-01-01',
      end: '2022-12-31'
    },
    metrics: {
      farmersCovered: 4500,
      areaUnderOrganic: 12500,
      incomeIncrease: 22.3,
      inputCostReduction: 35.7,
      premiumPrice: 28.5
    },
    tags: ['organic-farming', 'sustainability', 'subsidy', 'income'],
    isFeatured: false,
    downloads: 0,
    views: 98,
    fileSize: '2.2 MB',
    fileFormat: 'DOCX',
    thumbnail: '/images/reports/organic-farming-thumb.jpg',
    relatedPolicies: ['PKVY-2023', 'MOVCDNER'],
    dataSources: ['APEDA', 'State Agriculture Departments', 'Farmer Surveys'],
    methodology: 'Field trials, soil testing, farmer interviews, market analysis',
    keyFindings: [
      '22.3% average income increase',
      '35.7% reduction in input costs',
      '28.5% premium price for organic produce'
    ],
    recommendations: [
      'Expand subsidy coverage',
      'Develop organic value chains',
      'Enhance market linkages'
    ]
  },
  {
    id: 'PR-2023-005',
    title: 'Pradhan Mantri Fasal Bima Yojana Review',
    description: 'Comprehensive review of PMFBY implementation and farmer benefits',
    category: 'SCHEME_EVALUATION',
    status: 'PUBLISHED',
    createdBy: 'analyst002',
    createdAt: '2023-09-28T13:20:00Z',
    updatedAt: '2023-10-02T10:15:00Z',
    period: {
      start: '2022-04-01',
      end: '2023-03-31'
    },
    metrics: {
      farmersEnrolled: 98700,
      claimsFiled: 12500,
      claimsSettled: 11875,
      claimSettlementRate: 95.0,
      totalClaimsAmount: 625000000,
      avgClaimAmount: 52632
    },
    tags: ['pmfby', 'crop-insurance', 'risk-management', 'financial-inclusion'],
    isFeatured: true,
    downloads: 421,
    views: 892,
    fileSize: '4.2 MB',
    fileFormat: 'PDF',
    thumbnail: '/images/reports/pmfby-thumb.jpg',
    relatedPolicies: ['PM-KISAN', 'KCC-2023'],
    dataSources: ['PMFBY Portal', 'Insurance Companies', 'State Governments'],
    methodology: 'Claim data analysis, farmer surveys, stakeholder interviews',
    keyFindings: [
      '95% claim settlement rate',
      'Average claim amount: ₹52,632',
      '15% increase in enrollment YoY'
    ],
    recommendations: [
      'Simplify claim process',
      'Enhance awareness in eastern states',
      'Improve grievance redressal'
    ]
  },
  {
    id: 'PR-2023-006',
    title: 'e-NAM Platform Adoption Analysis',
    description: 'Study on the adoption and impact of e-NAM platform on agricultural marketing',
    category: 'MARKET_RESEARCH',
    status: 'PUBLISHED',
    createdBy: 'researcher001',
    createdAt: '2023-09-20T10:15:00Z',
    updatedAt: '2023-09-25T14:30:00Z',
    period: {
      start: '2022-07-01',
      end: '2023-06-30'
    },
    metrics: {
      mandisIntegrated: 1263,
      farmersRegistered: 1725000,
      tradersRegistered: 156800,
      totalTransactions: 18750000000,
      priceDiscoveryImprovement: 12.8,
      transactionCostReduction: 25.3
    },
    tags: ['e-nam', 'e-commerce', 'market-linkages', 'price-discovery'],
    isFeatured: true,
    downloads: 387,
    views: 945,
    fileSize: '3.8 MB',
    fileFormat: 'PDF',
    thumbnail: '/images/reports/enam-thumb.jpg',
    relatedPolicies: ['AGRI-MARKET', 'PM-KISAN'],
    dataSources: ['e-NAM Portal', 'APMC Records', 'Trader Surveys'],
    methodology: 'Platform data analysis, stakeholder surveys, case studies',
    keyFindings: [
      '12.8% better price discovery',
      '25.3% reduction in transaction costs',
      '1.72 million farmers registered'
    ],
    recommendations: [
      'Expand to more commodities',
      'Enhance mobile app features',
      'Improve payment integration'
    ]
  },
  {
    id: 'PR-2023-007',
    title: 'Micro Irrigation Fund Impact Assessment',
    description: 'Assessment of Micro Irrigation Fund in promoting water use efficiency',
    category: 'WATER_MANAGEMENT',
    status: 'DRAFT',
    createdBy: 'researcher004',
    createdAt: '2023-09-15T11:30:00Z',
    updatedAt: '2023-09-18T16:45:00Z',
    period: {
      start: '2021-04-01',
      end: '2023-03-31'
    },
    metrics: {
      areaCovered: 125000,
      waterSavings: 42.5,
      yieldIncrease: 28.7,
      energySavings: 35.2,
      farmerIncomeIncrease: 37.8
    },
    tags: ['irrigation', 'water-conservation', 'sustainability', 'efficiency'],
    isFeatured: false,
    downloads: 0,
    views: 76,
    fileSize: '2.9 MB',
    fileFormat: 'PDF',
    thumbnail: '/images/reports/irrigation-thumb.jpg',
    relatedPolicies: ['PMKSY', 'PDMC'],
    dataSources: ['Ministry of Agriculture', 'State Agriculture Departments', 'Field Surveys'],
    methodology: 'Field measurements, farmer interviews, water use analysis',
    keyFindings: [
      '42.5% water savings',
      '28.7% increase in crop yield',
      '37.8% increase in farmer income'
    ],
    recommendations: [
      'Expand subsidy coverage',
      'Enhance technical support',
      'Promote community-based models'
    ]
  },
  {
    id: 'PR-2023-008',
    title: 'Agricultural Export Policy Review',
    description: 'Review of Agricultural Export Policy and its impact on farmer incomes',
    category: 'TRADE_ANALYSIS',
    status: 'PUBLISHED',
    createdBy: 'analyst003',
    createdAt: '2023-09-10T14:20:00Z',
    updatedAt: '2023-09-15T11:10:00Z',
    period: {
      start: '2020-04-01',
      end: '2023-03-31'
    },
    metrics: {
      exportValue: 125000000000,
      growthRate: 18.7,
      farmersBenefited: 3500000,
      topCommodities: ['Rice', 'Marine Products', 'Spices', 'Buffalo Meat'],
      newMarkets: 28
    },
    tags: ['exports', 'trade', 'income', 'market-access'],
    isFeatured: true,
    downloads: 298,
    views: 712,
    fileSize: '4.5 MB',
    fileFormat: 'PDF',
    thumbnail: '/images/reports/agri-exports-thumb.jpg',
    relatedPolicies: ['AEP-2023', 'PLI-AGRI'],
    dataSources: ['APEDA', 'DGFT', 'Customs Data', 'Exporters Association'],
    methodology: 'Export data analysis, value chain mapping, stakeholder interviews',
    keyFindings: [
      '18.7% annual export growth',
      '3.5 million farmers benefited',
      '28 new export markets opened'
    ],
    recommendations: [
      'Enhance quality standards',
      'Develop export clusters',
      'Improve logistics infrastructure'
    ]
  }
];

// Report categories
const REPORT_CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'SCHEME_ANALYSIS', label: 'Scheme Analysis' },
  { id: 'PROGRAM_EVALUATION', label: 'Program Evaluation' },
  { id: 'FINANCIAL_ANALYSIS', label: 'Financial Analysis' },
  { id: 'RESEARCH_STUDY', label: 'Research Study' },
  { id: 'MARKET_RESEARCH', label: 'Market Research' },
  { id: 'WATER_MANAGEMENT', label: 'Water Management' },
  { id: 'TRADE_ANALYSIS', label: 'Trade Analysis' },
  { id: 'POLICY_REVIEW', label: 'Policy Review' },
  { id: 'IMPACT_ASSESSMENT', label: 'Impact Assessment' },
  { id: 'OTHER', label: 'Other' }
];

// Report statuses
const REPORT_STATUSES = [
  { id: 'all', label: 'All Statuses', color: 'gray' },
  { id: 'DRAFT', label: 'Draft', color: 'yellow' },
  { id: 'UNDER_REVIEW', label: 'Under Review', color: 'blue' },
  { id: 'PUBLISHED', label: 'Published', color: 'green' },
  { id: 'ARCHIVED', label: 'Archived', color: 'gray' },
  { id: 'REJECTED', label: 'Rejected', color: 'red' }
];

// Sort options
const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First', field: 'createdAt', order: 'desc' },
  { id: 'oldest', label: 'Oldest First', field: 'createdAt', order: 'asc' },
  { id: 'title_asc', label: 'Title (A-Z)', field: 'title', order: 'asc' },
  { id: 'title_desc', label: 'Title (Z-A)', field: 'title', order: 'desc' },
  { id: 'popular', label: 'Most Popular', field: 'views', order: 'desc' },
  { id: 'downloads', label: 'Most Downloaded', field: 'downloads', order: 'desc' }
];

// View modes
const VIEW_MODES = [
  { id: 'grid', label: 'Grid', icon: <FiGrid /> },
  { id: 'list', label: 'List', icon: <FiList /> }
];

// Helper functions
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getStatusBadge = (status) => {
  const statusConfig = {
    DRAFT: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <FiEdit2 className="mr-1" /> },
    UNDER_REVIEW: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <FiRefreshCw className="mr-1 animate-spin" /> },
    PUBLISHED: { bg: 'bg-green-100', text: 'text-green-800', icon: <FiCheckCircle className="mr-1" /> },
    ARCHIVED: { bg: 'bg-gray-100', text: 'text-gray-800', icon: <FiArchive className="mr-1" /> },
    REJECTED: { bg: 'bg-red-100', text: 'text-red-800', icon: <FiX className="mr-1" /> }
  };

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      {status.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
    </span>
  );
};

const getCategoryIcon = (category) => {
  const categoryIcons = {
    SCHEME_ANALYSIS: <FiFileText className="h-4 w-4 text-blue-500" />,
    PROGRAM_EVALUATION: <FiClipboard className="h-4 w-4 text-purple-500" />,
    FINANCIAL_ANALYSIS: <FiDollarSign className="h-4 w-4 text-green-500" />,
    RESEARCH_STUDY: <FiBookOpen className="h-4 w-4 text-yellow-500" />,
    MARKET_RESEARCH: <FiBarChart2 className="h-4 w-4 text-indigo-500" />,
    WATER_MANAGEMENT: <FiDroplet className="h-4 w-4 text-cyan-500" />,
    TRADE_ANALYSIS: <FiGlobe className="h-4 w-4 text-teal-500" />,
    POLICY_REVIEW: <FiFileText className="h-4 w-4 text-orange-500" />,
    IMPACT_ASSESSMENT: <FiTrendingUp className="h-4 w-4 text-pink-500" />,
    OTHER: <FiFile className="h-4 w-4 text-gray-500" />
  };
  
  return categoryIcons[category] || <FiFile className="h-4 w-4 text-gray-400" />;
};

const PolicyReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [expandedReport, setExpandedReport] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  // Load mock data
  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Extract unique tags
      const tags = new Set();
      mockPolicyReports.forEach(report => {
        report.tags.forEach(tag => tags.add(tag));
      });
      
      setAvailableTags(Array.from(tags).sort());
      setReports(mockPolicyReports);
      setFilteredReports(mockPolicyReports);
      setIsLoading(false);
    };

    fetchReports();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...reports];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(report => 
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.tags.some(tag => tag.toLowerCase().includes(query)) ||
        report.id.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(report => report.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(report => report.status === selectedStatus);
    }

    // Filter by date range
    if (dateRange.start) {
      const startDate = new Date(dateRange.start);
      result = result.filter(report => new Date(report.createdAt) >= startDate);
    }

    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // End of the day
      result = result.filter(report => new Date(report.createdAt) <= endDate);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(report => 
        selectedTags.some(tag => report.tags.includes(tag))
      );
    }

    // Apply sorting
    const sortOption = SORT_OPTIONS.find(opt => opt.id === selectedSort) || SORT_OPTIONS[0];
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortOption.field === 'createdAt' || sortOption.field === 'views' || sortOption.field === 'downloads') {
        comparison = new Date(a[sortOption.field]) - new Date(b[sortOption.field]);
      } else {
        const aValue = String(a[sortOption.field] || '').toLowerCase();
        const bValue = String(b[sortOption.field] || '').toLowerCase();
        comparison = aValue.localeCompare(bValue);
      }
      
      return sortOption.order === 'asc' ? comparison : -comparison;
    });

    setFilteredReports(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [reports, searchQuery, selectedCategory, selectedStatus, selectedSort, dateRange, selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedTags([]);
    setDateRange({ start: '', end: '' });
    setSelectedSort('newest');
  };

  // Toggle report details
  const toggleReportDetails = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Check if any filter is active
  const isFilterActive = 
    searchQuery || 
    selectedCategory !== 'all' || 
    selectedStatus !== 'all' || 
    selectedTags.length > 0 || 
    dateRange.start || 
    dateRange.end;

  // Get featured reports (for the top section)
  const featuredReports = filteredReports.filter(report => report.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Policy Reports
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Access and analyze comprehensive reports on agricultural policies and schemes.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiFilePlus className="h-4 w-4 mr-2" />
              New Report
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg mb-6 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="sr-only">Search reports</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search reports..."
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
            
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <label htmlFor="sort" className="text-sm text-gray-500 mr-2">Sort by:</label>
                <select
                  id="sort"
                  className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">View:</span>
                  <div className="flex rounded-md shadow-sm">
                    {VIEW_MODES.map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium ${
                          viewMode === mode.id
                            ? 'bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        } ${mode.id === 'grid' ? 'rounded-l-md' : 'rounded-r-md -ml-px'}`}
                        onClick={() => setViewMode(mode.id)}
                      >
                        {mode.icon}
                        <span className="ml-1.5 hidden sm:inline">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {REPORT_CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
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
                    {REPORT_STATUSES.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-2">
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

                {/* Tags Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <div className="relative">
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                            onClick={() => toggleTag(tag)}
                          >
                            <span className="sr-only">Remove {tag} tag</span>
                            <FiX className="h-2.5 w-2.5" />
                          </button>
                        </span>
                      ))}
                      {selectedTags.length === 0 && (
                        <span className="text-sm text-gray-500">No tags selected</span>
                      )}
                    </div>
                    
                    {selectedTags.length < 3 && (
                      <div className="mt-2">
                        <label htmlFor="tag-select" className="sr-only">Add a tag</label>
                        <select
                          id="tag-select"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value=""
                          onChange={(e) => {
                            if (e.target.value && !selectedTags.includes(e.target.value)) {
                              setSelectedTags([...selectedTags, e.target.value]);
                            }
                          }}
                        >
                          <option value="">Add a tag...</option>
                          {availableTags
                            .filter(tag => !selectedTags.includes(tag))
                            .map(tag => (
                              <option key={tag} value={tag}>
                                {tag}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {isFilterActive && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
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
                    
                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Category: {REPORT_CATEGORIES.find(c => c.id === selectedCategory)?.label}
                        <button
                          type="button"
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:outline-none"
                          onClick={() => setSelectedCategory('all')}
                        >
                          <span className="sr-only">Remove category filter</span>
                          <FiX className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    )}
                    
                    {selectedStatus !== 'all' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Status: {REPORT_STATUSES.find(s => s.id === selectedStatus)?.label}
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
                    
                    {selectedTags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                      >
                        Tag: {tag}
                        <button
                          type="button"
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:outline-none"
                          onClick={() => toggleTag(tag)}
                        >
                          <span className="sr-only">Remove {tag} tag</span>
                          <FiX className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                    
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
                    
                    <button
                      type="button"
                      className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                      onClick={clearFilters}
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Featured Reports */}
        {featuredReports.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Featured Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredReports.map((report) => (
                <div key={report.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-40 bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="flex items-center">
                        {getCategoryIcon(report.category)}
                        <span className="ml-2 text-sm font-medium text-white">
                          {REPORT_CATEGORIES.find(c => c.id === report.category)?.label || 'Report'}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-white">{report.title}</h3>
                    </div>
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(report.status)}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{report.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Published on {formatDate(report.createdAt)}</span>
                      <div className="flex items-center">
                        <FiDownload className="h-3.5 w-3.5 mr-1" />
                        <span>{report.downloads}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {report.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {tag}
                          </span>
                        ))}
                        {report.tags.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            +{report.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => toggleReportDetails(report.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Reports */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {isFilterActive ? 'Filtered Reports' : 'All Reports'}
              <span className="ml-2 text-sm text-gray-500">
                ({filteredReports.length} {filteredReports.length === 1 ? 'result' : 'results'})
              </span>
            </h2>
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredReports.length > 0 ? indexOfFirstItem + 1 : 0}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredReports.length)}
              </span>{' '}
              of <span className="font-medium">{filteredReports.length}</span> reports
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {isFilterActive
                  ? 'Try adjusting your search or filter criteria'
                  : 'No reports available at the moment'}
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
          ) : viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((report) => (
                <div key={report.id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col h-full">
                  <div className="h-32 bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
                    <div className="absolute bottom-0 left-0 p-3">
                      <div className="flex items-center">
                        {getCategoryIcon(report.category)}
                        <span className="ml-1.5 text-xs font-medium text-white">
                          {REPORT_CATEGORIES.find(c => c.id === report.category)?.label || 'Report'}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(report.status)}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">{report.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Updated {formatDate(report.updatedAt)}</span>
                      <div className="flex items-center">
                        <FiDownload className="h-3.5 w-3.5 mr-1" />
                        <span>{report.downloads}</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {report.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {tag}
                          </span>
                        ))}
                        {report.tags.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            +{report.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{report.fileSize} • {report.fileFormat}</span>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            title="Download"
                          >
                            <FiDownload className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            title="View details"
                            onClick={() => toggleReportDetails(report.id)}
                          >
                            <FiEye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {currentItems.map((report) => (
                  <li key={report.id} className="hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {getCategoryIcon(report.category)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-blue-600 truncate">
                              {report.title}
                            </div>
                            <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500">
                              <span>{REPORT_CATEGORIES.find(c => c.id === report.category)?.label || 'Report'}</span>
                              <span className="mx-2">•</span>
                              <span>Updated {formatDate(report.updatedAt)}</span>
                              <span className="mx-2">•</span>
                              <span>{report.fileSize}</span>
                              <span className="mx-2">•</span>
                              <span>{report.fileFormat}</span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {report.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {tag}
                                </span>
                              ))}
                              {report.tags.length > 3 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  +{report.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                          <div className="mr-4 flex items-center text-sm text-gray-500">
                            <FiDownload className="h-4 w-4 mr-1" />
                            <span>{report.downloads}</span>
                          </div>
                          <div className="mr-4">
                            {getStatusBadge(report.status)}
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => toggleReportDetails(report.id)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                      {expandedReport === report.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Key Findings</h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {report.keyFindings.map((finding, index) => (
                                  <li key={index} className="text-gray-600">{finding}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {report.recommendations.map((recommendation, index) => (
                                  <li key={index} className="text-gray-600">{recommendation}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-3">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <FiDownload className="-ml-0.5 mr-2 h-4 w-4" />
                              Download
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <FiExternalLink className="-ml-0.5 mr-2 h-4 w-4" />
                              View Full Report
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
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
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
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
                      {Math.min(indexOfLastItem, filteredReports.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredReports.length}</span> results
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
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
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
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
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
      </div>
      
      {/* Tooltip */}
      <ReactTooltip id="policy-tooltip" place="top" effect="solid" />
    </div>
  );
};

export default PolicyReports;
