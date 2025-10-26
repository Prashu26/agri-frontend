import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaFilePdf, 
  FaFileSignature, 
  FaUserCheck,
  FaUserTimes,
  FaFileAlt,
  FaFileContract,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaFileDownload,
  FaFileUpload,
  FaEye,
  FaEdit,
  FaTrash,
  FaSortAmountDown,
  FaSortAmountUp,
  FaCalendarAlt,
  FaUserTie,
  FaRupeeSign,
  FaClipboardCheck,
  FaFileExcel,
  FaFileCsv,
  FaPrint
} from 'react-icons/fa';
import { GiFarmer, GiWheat } from 'react-icons/gi';
import { format } from 'date-fns';

// Mock data for contracts
const mockContracts = [
  {
    id: 'CON-2024-001',
    farmer: 'Rajesh Kumar',
    farmerId: 'FARM-001',
    crop: 'Soybean',
    variety: 'JS 335',
    quantity: 25, // in quintals
    price: 4500, // per quintal
    totalValue: 112500,
    status: 'verified',
    verificationStatus: 'approved',
    contractDate: '2024-10-15',
    deliveryDate: '2024-11-15',
    documents: [
      { name: 'contract_001.pdf', type: 'contract', uploadedAt: '2024-10-15' },
      { name: 'aadhar_001.pdf', type: 'id_proof', uploadedAt: '2024-10-14' },
      { name: 'land_records_001.pdf', type: 'land_records', uploadedAt: '2024-10-14' }
    ],
    paymentStatus: 'pending',
    lastUpdated: '2024-10-20T14:30:00',
    verifiedBy: 'Admin User',
    verificationDate: '2024-10-16',
    notes: 'All documents verified and contract is valid.'
  },
  {
    id: 'CON-2024-002',
    farmer: 'Suresh Patel',
    farmerId: 'FARM-002',
    crop: 'Groundnut',
    variety: 'TG 37A',
    quantity: 18,
    price: 5800,
    totalValue: 104400,
    status: 'pending',
    verificationStatus: 'pending',
    contractDate: '2024-10-18',
    deliveryDate: '2024-11-20',
    documents: [
      { name: 'contract_002.pdf', type: 'contract', uploadedAt: '2024-10-18' },
      { name: 'aadhar_002.pdf', type: 'id_proof', uploadedAt: '2024-10-17' }
    ],
    paymentStatus: 'not_applicable',
    lastUpdated: '2024-10-18T10:15:00',
    verifiedBy: '',
    verificationDate: '',
    notes: 'Waiting for land records to be uploaded.'
  },
  {
    id: 'CON-2024-003',
    farmer: 'Vijay Singh',
    farmerId: 'FARM-003',
    crop: 'Mustard',
    variety: 'Pusa Bold',
    quantity: 30,
    price: 5200,
    totalValue: 156000,
    status: 'rejected',
    verificationStatus: 'rejected',
    contractDate: '2024-10-10',
    deliveryDate: '2024-11-10',
    documents: [
      { name: 'contract_003.pdf', type: 'contract', uploadedAt: '2024-10-10' },
      { name: 'aadhar_003.pdf', type: 'id_proof', uploadedAt: '2024-10-09' },
      { name: 'land_records_003.pdf', type: 'land_records', uploadedAt: '2024-10-09' }
    ],
    paymentStatus: 'not_applicable',
    lastUpdated: '2024-10-12T16:45:00',
    verifiedBy: 'Admin User',
    verificationDate: '2024-10-11',
    notes: 'Contract rejected due to incomplete documentation. Please upload all required documents.'
  },
  {
    id: 'CON-2024-004',
    farmer: 'Anita Devi',
    farmerId: 'FARM-004',
    crop: 'Sunflower',
    variety: 'KBSH 44',
    quantity: 15,
    price: 4900,
    totalValue: 73500,
    status: 'verified',
    verificationStatus: 'approved',
    contractDate: '2024-10-05',
    deliveryDate: '2024-11-05',
    documents: [
      { name: 'contract_004.pdf', type: 'contract', uploadedAt: '2024-10-05' },
      { name: 'aadhar_004.pdf', type: 'id_proof', uploadedAt: '2024-10-04' },
      { name: 'land_records_004.pdf', type: 'land_records', uploadedAt: '2024-10-04' }
    ],
    paymentStatus: 'completed',
    lastUpdated: '2024-10-08T11:20:00',
    verifiedBy: 'Admin User',
    verificationDate: '2024-10-07',
    notes: 'Contract verified and advance payment processed.'
  },
  {
    id: 'CON-2024-005',
    farmer: 'Rameshwar Yadav',
    farmerId: 'FARM-005',
    crop: 'Soybean',
    variety: 'JS 9560',
    quantity: 22,
    price: 4550,
    totalValue: 100100,
    status: 'draft',
    verificationStatus: 'not_submitted',
    contractDate: '2024-10-22',
    deliveryDate: '2024-11-22',
    documents: [],
    paymentStatus: 'not_applicable',
    lastUpdated: '2024-10-22T09:10:00',
    verifiedBy: '',
    verificationDate: '',
    notes: 'Draft contract, not yet submitted for verification.'
  }
];

// Mock data for verification queue
const mockVerificationQueue = [
  {
    id: 'VQ-001',
    contractId: 'CON-2024-002',
    farmer: 'Suresh Patel',
    crop: 'Groundnut',
    submittedDate: '2024-10-18',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Verification Team',
    daysInQueue: 2
  },
  {
    id: 'VQ-002',
    contractId: 'CON-2024-006',
    farmer: 'Manoj Sharma',
    crop: 'Wheat',
    submittedDate: '2024-10-20',
    status: 'in_review',
    priority: 'medium',
    assignedTo: 'John Doe',
    daysInQueue: 1
  },
  {
    id: 'VQ-003',
    contractId: 'CON-2024-007',
    farmer: 'Sunita Devi',
    crop: 'Paddy',
    submittedDate: '2024-10-21',
    status: 'pending',
    priority: 'low',
    assignedTo: 'Verification Team',
    daysInQueue: 0
  }
];

const ContractVerification = () => {
  const [contracts, setContracts] = useState(mockContracts);
  const [verificationQueue, setVerificationQueue] = useState(mockVerificationQueue);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cropFilter, setCropFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedContract, setSelectedContract] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'contractDate', direction: 'desc' });
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [verificationData, setVerificationData] = useState({
    status: 'approved',
    verifiedBy: 'Admin User',
    verificationDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Get unique crops for filter dropdown
  const uniqueCrops = [...new Set(contracts.map(contract => contract.crop))];

  // Filter contracts based on search and filters
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.crop.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesCrop = cropFilter === 'all' || contract.crop === cropFilter;
    
    const matchesDate = 
      (!dateRange.start || contract.contractDate >= dateRange.start) &&
      (!dateRange.end || contract.contractDate <= dateRange.end);
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'pending' && contract.status === 'pending') ||
      (activeTab === 'verified' && contract.status === 'verified') ||
      (activeTab === 'rejected' && contract.status === 'rejected') ||
      (activeTab === 'draft' && contract.status === 'draft');
    
    return matchesSearch && matchesStatus && matchesCrop && matchesDate && matchesTab;
  });

  // Sort contracts
  const sortedContracts = [...filteredContracts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get verification status badge style
  const getVerificationBadge = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'not_submitted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status badge style
  const getPaymentBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'not_applicable':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle verification form input changes
  const handleVerificationInputChange = (e) => {
    const { name, value } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit verification
  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    
    const updatedContracts = contracts.map(contract => {
      if (contract.id === selectedContract.id) {
        return {
          ...contract,
          status: verificationData.status === 'approved' ? 'verified' : 'rejected',
          verificationStatus: verificationData.status,
          verifiedBy: verificationData.verifiedBy,
          verificationDate: verificationData.verificationDate,
          notes: verificationData.notes,
          lastUpdated: new Date().toISOString()
        };
      }
      return contract;
    });
    
    setContracts(updatedContracts);
    setShowVerificationForm(false);
    setSelectedContract({
      ...selectedContract,
      status: verificationData.status === 'approved' ? 'verified' : 'rejected',
      verificationStatus: verificationData.status,
      verifiedBy: verificationData.verifiedBy,
      verificationDate: verificationData.verificationDate,
      notes: verificationData.notes,
      lastUpdated: new Date().toISOString()
    });
    
    // Also update the verification queue
    if (verificationData.status !== 'pending') {
      const updatedQueue = verificationQueue.filter(item => 
        item.contractId !== selectedContract.id
      );
      setVerificationQueue(updatedQueue);
    }
  };

  // Open verification form with contract data
  const openVerificationForm = (contract) => {
    setSelectedContract(contract);
    setVerificationData({
      status: contract.verificationStatus === 'not_submitted' ? 'pending' : contract.verificationStatus,
      verifiedBy: contract.verifiedBy || 'Admin User',
      verificationDate: contract.verificationDate || new Date().toISOString().split('T')[0],
      notes: contract.notes || ''
    });
    setShowVerificationForm(true);
  };

  // Get document icon based on type
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'contract':
        return <FaFileContract className="text-blue-500" />;
      case 'id_proof':
        return <FaUserTie className="text-green-500" />;
      case 'land_records':
        return <FaFileAlt className="text-yellow-500" />;
      case 'invoice':
        return <FaFileInvoiceDollar className="text-purple-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contract Verification</h1>
            <p className="text-gray-600">Manage and verify farmer contracts</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
              <FaFileDownload className="mr-2" /> Export
            </button>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 flex items-center">
              <FaFileSignature className="mr-2" /> New Contract
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FaFileContract className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Contracts</p>
                <p className="text-2xl font-semibold">{contracts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <FaClipboardCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Verification</p>
                <p className="text-2xl font-semibold">
                  {contracts.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FaUserCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Verified</p>
                <p className="text-2xl font-semibold">
                  {contracts.filter(c => c.status === 'verified').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                <FaUserTimes className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold">
                  {contracts.filter(c => c.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'all' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All Contracts
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'pending' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'verified' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('verified')}
          >
            Verified
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'rejected' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'draft' ? 'border-b-2 border-gray-500 text-gray-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('draft')}
          >
            Drafts
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Search contracts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    id="status"
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                  <select
                    id="crop"
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    value={cropFilter}
                    onChange={(e) => setCropFilter(e.target.value)}
                  >
                    <option value="all">All Crops</option>
                    {uniqueCrops.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      placeholder="End Date"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setCropFilter('all');
                      setDateRange({ start: '', end: '' });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Contracts Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('id')}
                      >
                        <div className="flex items-center">
                          Contract ID
                          {sortConfig.key === 'id' && (
                            sortConfig.direction === 'asc' ? 
                              <FaSortAmountUp className="ml-1" /> : 
                              <FaSortAmountDown className="ml-1" />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crop
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('contractDate')}
                      >
                        <div className="flex items-center">
                          Date
                          {sortConfig.key === 'contractDate' && (
                            sortConfig.direction === 'asc' ? 
                              <FaSortAmountUp className="ml-1" /> : 
                              <FaSortAmountDown className="ml-1" />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedContracts.length > 0 ? (
                      sortedContracts.map((contract) => (
                        <tr 
                          key={contract.id} 
                          className={`hover:bg-gray-50 ${selectedContract?.id === contract.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setSelectedContract(contract)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {contract.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contract.farmer}</div>
                            <div className="text-xs text-gray-500">{contract.farmerId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contract.crop}</div>
                            <div className="text-xs text-gray-500">{contract.variety}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(contract.contractDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(contract.status)}`}>
                              {contract.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-green-600 hover:text-green-900 mr-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                openVerificationForm(contract);
                              }}
                            >
                              {contract.status === 'pending' ? 'Verify' : 'View'}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <FaSearch className="h-12 w-12 text-gray-300 mb-2" />
                            <p>No contracts found matching your criteria.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar - Contract Details or Verification Form */}
          <div className="lg:col-span-1">
            {showVerificationForm ? (
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedContract.status === 'pending' ? 'Verify Contract' : 'Update Verification'}
                  </h3>
                  <button 
                    onClick={() => setShowVerificationForm(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FaTimesCircle className="h-5 w-5" />
                  </button>
                </div>
                
                <form onSubmit={handleVerificationSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Verification Status
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="status-approved"
                            name="status"
                            type="radio"
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            value="approved"
                            checked={verificationData.status === 'approved'}
                            onChange={handleVerificationInputChange}
                          />
                          <label htmlFor="status-approved" className="ml-2 block text-sm text-gray-900">
                            Approve
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="status-rejected"
                            name="status"
                            type="radio"
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                            value="rejected"
                            checked={verificationData.status === 'rejected'}
                            onChange={handleVerificationInputChange}
                          />
                          <label htmlFor="status-rejected" className="ml-2 block text-sm text-gray-900">
                            Reject
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="status-pending"
                            name="status"
                            type="radio"
                            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                            value="pending"
                            checked={verificationData.status === 'pending'}
                            onChange={handleVerificationInputChange}
                          />
                          <label htmlFor="status-pending" className="ml-2 block text-sm text-gray-900">
                            Keep Pending
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="verifiedBy" className="block text-sm font-medium text-gray-700 mb-1">
                        Verified By
                      </label>
                      <input
                        type="text"
                        name="verifiedBy"
                        id="verifiedBy"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={verificationData.verifiedBy}
                        onChange={handleVerificationInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="verificationDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Verification Date
                      </label>
                      <input
                        type="date"
                        name="verificationDate"
                        id="verificationDate"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={verificationData.verificationDate}
                        onChange={handleVerificationInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows="3"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={verificationData.notes}
                        onChange={handleVerificationInputChange}
                        placeholder="Add any notes or comments..."
                      />
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        {selectedContract.status === 'pending' ? 'Submit Verification' : 'Update Verification'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : selectedContract ? (
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Contract Details</h3>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-500">
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contract ID</h4>
                    <p className="mt-1 text-sm text-gray-900">{selectedContract.id}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Farmer</h4>
                    <p className="mt-1 text-sm text-gray-900">{selectedContract.farmer}</p>
                    <p className="text-xs text-gray-500">{selectedContract.farmerId}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Crop Details</h4>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Crop</p>
                        <p className="text-sm text-gray-900">{selectedContract.crop}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Variety</p>
                        <p className="text-sm text-gray-900">{selectedContract.variety}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="text-sm text-gray-900">{selectedContract.quantity} quintals</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm text-gray-900">₹{selectedContract.price}/quintal</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contract Value</h4>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {formatCurrency(selectedContract.totalValue)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Dates</h4>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Contract Date</p>
                        <p className="text-sm text-gray-900">{formatDate(selectedContract.contractDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Delivery Date</p>
                        <p className="text-sm text-gray-900">{formatDate(selectedContract.deliveryDate)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Contract Status</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedContract.status)}`}>
                          {selectedContract.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Verification</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVerificationBadge(selectedContract.verificationStatus)}`}>
                          {selectedContract.verificationStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentBadge(selectedContract.paymentStatus)}`}>
                          {selectedContract.paymentStatus.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedContract.verifiedBy && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Verification Details</h4>
                      <div className="mt-1">
                        <p className="text-xs text-gray-500">Verified By</p>
                        <p className="text-sm text-gray-900">{selectedContract.verifiedBy}</p>
                        <p className="text-xs text-gray-500 mt-1">Verification Date</p>
                        <p className="text-sm text-gray-900">{formatDate(selectedContract.verificationDate)}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedContract.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract.notes}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Documents</h4>
                    <div className="mt-2 space-y-2">
                      {selectedContract.documents.length > 0 ? (
                        selectedContract.documents.map((doc, index) => (
                          <div key={index} className="flex items-center p-2 border border-gray-200 rounded-md">
                            <div className="flex-shrink-0 mr-3">
                              {getDocumentIcon(doc.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                              <p className="text-xs text-gray-500">Uploaded on {formatDate(doc.uploadedAt)}</p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <button className="text-blue-600 hover:text-blue-800">
                                <FaEye className="h-4 w-4" />
                              </button>
                              <button className="ml-2 text-gray-500 hover:text-gray-700">
                                <FaDownload className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No documents attached</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => openVerificationForm(selectedContract)}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {selectedContract.status === 'pending' ? 'Verify Contract' : 'Update Verification'}
                    </button>
                    <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Download Contract
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <FaFileContract className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No contract selected</h3>
                <p className="mt-1 text-sm text-gray-500">Select a contract to view details or verify</p>
              </div>
            )}
            
            {/* Verification Queue */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Verification Queue</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {verificationQueue.length} Pending
                </span>
              </div>
              
              <div className="space-y-3">
                {verificationQueue.length > 0 ? (
                  verificationQueue.map((item) => {
                    const contract = contracts.find(c => c.id === item.contractId);
                    return (
                      <div 
                        key={item.id} 
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          if (contract) {
                            setSelectedContract(contract);
                            openVerificationForm(contract);
                          }
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.farmer}</p>
                            <p className="text-xs text-gray-500">Contract: {item.contractId}</p>
                            <p className="text-xs text-gray-500">Crop: {item.crop}</p>
                          </div>
                          <span 
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.priority === 'high' ? 'bg-red-100 text-red-800' :
                              item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {item.priority}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                          <span>Submitted: {formatDate(item.submittedDate)}</span>
                          <span>{item.daysInQueue} day{item.daysInQueue !== 1 ? 's' : ''} in queue</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No contracts in verification queue</p>
                )}
              </div>
              
              <div className="mt-4">
                <button className="w-full text-sm text-green-600 hover:text-green-800 font-medium">
                  View all in queue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractVerification;
