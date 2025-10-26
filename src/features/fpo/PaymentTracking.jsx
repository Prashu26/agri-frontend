import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaFileInvoiceDollar, 
  FaRupeeSign, 
  FaUserCheck, 
  FaUserClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaShare,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaArrowUp,
  FaArrowDown,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { format, parseISO, isAfter, isBefore, subDays, subMonths } from 'date-fns';
import { Link } from 'react-router-dom';

// Mock data for payments
const mockPayments = [
  {
    id: 'PAY-2024-001',
    farmerId: 'FARM-001',
    farmerName: 'Rajesh Kumar',
    contact: '+91 98765 43210',
    village: 'Nayagaon',
    crop: 'Soybean',
    quantity: 25, // quintals
    rate: 4500, // per quintal
    totalAmount: 112500,
    paymentDate: '2024-10-20',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN123456789',
    invoiceId: 'INV-2024-001',
    notes: 'Payment processed successfully',
    documents: [
      { name: 'invoice_001.pdf', type: 'invoice', uploadedAt: '2024-10-20' },
      { name: 'receipt_001.pdf', type: 'receipt', uploadedAt: '2024-10-20' }
    ]
  },
  {
    id: 'PAY-2024-002',
    farmerId: 'FARM-002',
    farmerName: 'Suresh Patel',
    contact: '+91 98765 43211',
    village: 'Bilaspur',
    crop: 'Wheat',
    quantity: 18,
    rate: 2200,
    totalAmount: 39600,
    paymentDate: '2024-10-18',
    status: 'pending',
    paymentMethod: 'UPI',
    transactionId: 'TXN123456790',
    invoiceId: 'INV-2024-002',
    notes: 'Waiting for payment confirmation',
    documents: [
      { name: 'invoice_002.pdf', type: 'invoice', uploadedAt: '2024-10-18' }
    ]
  },
  {
    id: 'PAY-2024-003',
    farmerId: 'FARM-003',
    farmerName: 'Vijay Singh',
    contact: '+91 98765 43212',
    village: 'Raipur',
    crop: 'Rice',
    quantity: 30,
    rate: 2100,
    totalAmount: 63000,
    paymentDate: '2024-10-15',
    status: 'failed',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN123456791',
    invoiceId: 'INV-2024-003',
    notes: 'Bank account details incorrect',
    documents: [
      { name: 'invoice_003.pdf', type: 'invoice', uploadedAt: '2024-10-15' }
    ]
  },
  {
    id: 'PAY-2024-004',
    farmerId: 'FARM-004',
    farmerName: 'Anita Devi',
    contact: '+91 98765 43213',
    village: 'Durg',
    crop: 'Maize',
    quantity: 20,
    rate: 1850,
    totalAmount: 37000,
    paymentDate: '2024-10-10',
    status: 'completed',
    paymentMethod: 'UPI',
    transactionId: 'TXN123456792',
    invoiceId: 'INV-2024-004',
    notes: 'Payment processed successfully',
    documents: [
      { name: 'invoice_004.pdf', type: 'invoice', uploadedAt: '2024-10-10' },
      { name: 'receipt_004.pdf', type: 'receipt', uploadedAt: '2024-10-10' }
    ]
  },
  {
    id: 'PAY-2024-005',
    farmerId: 'FARM-005',
    farmerName: 'Rameshwar Yadav',
    contact: '+91 98765 43214',
    village: 'Bhilai',
    crop: 'Pulses',
    quantity: 15,
    rate: 6500,
    totalAmount: 97500,
    paymentDate: '2024-10-05',
    status: 'processing',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN123456793',
    invoiceId: 'INV-2024-005',
    notes: 'Payment under process',
    documents: [
      { name: 'invoice_005.pdf', type: 'invoice', uploadedAt: '2024-10-05' }
    ]
  }
];

// Mock data for payment statistics
const mockPaymentStats = {
  totalPayments: 5,
  totalAmount: 349600,
  completedPayments: 2,
  pendingPayments: 1,
  failedPayments: 1,
  processingPayments: 1,
  recentTransactions: mockPayments.slice(0, 3)
};

// Mock data for payment methods
const mockPaymentMethods = [
  { method: 'Bank Transfer', count: 3, amount: 213100 },
  { method: 'UPI', count: 2, amount: 136500 },
  { method: 'Cash', count: 0, amount: 0 },
  { method: 'Cheque', count: 0, amount: 0 }
];

const PaymentTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'paymentDate', direction: 'desc' });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    farmerId: '',
    farmerName: '',
    amount: '',
    paymentDate: format(new Date(), 'yyyy-MM-dd'),
    paymentMethod: 'Bank Transfer',
    notes: ''
  });
  const [payments, setPayments] = useState(mockPayments);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.farmerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    const matchesDate = 
      (!dateRange.start || payment.paymentDate >= dateRange.start) &&
      (!dateRange.end || payment.paymentDate <= dateRange.end);
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'completed' && payment.status === 'completed') ||
      (activeTab === 'pending' && payment.status === 'pending') ||
      (activeTab === 'failed' && payment.status === 'failed') ||
      (activeTab === 'processing' && payment.status === 'processing');
    
    return matchesSearch && matchesStatus && matchesDate && matchesTab;
  });

  // Sort payments
  const sortedPayments = [...filteredPayments].sort((a, b) => {
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

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="ml-1 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="ml-1" /> : 
      <FaSortDown className="ml-1" />;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" /> Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaClock className="mr-1" /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="mr-1" /> Failed
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FaClock className="mr-1" /> Processing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(parseISO(dateString), 'dd MMM yyyy');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle payment form input changes
  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };

  // Submit new payment
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    const newPayment = {
      id: `PAY-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`,
      farmerId: paymentData.farmerId,
      farmerName: paymentData.farmerName,
      totalAmount: parseFloat(paymentData.amount),
      paymentDate: paymentData.paymentDate,
      status: 'pending',
      paymentMethod: paymentData.paymentMethod,
      transactionId: `TXN${Math.floor(100000000 + Math.random() * 900000000)}`,
      invoiceId: `INV-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`,
      notes: paymentData.notes,
      documents: []
    };
    
    setPayments([newPayment, ...payments]);
    setShowPaymentForm(false);
    setPaymentData({
      farmerId: '',
      farmerName: '',
      amount: '',
      paymentDate: format(new Date(), 'yyyy-MM-dd'),
      paymentMethod: 'Bank Transfer',
      notes: ''
    });
  };

  // Update payment status
  const updatePaymentStatus = (id, status) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status } : payment
    ));
    
    if (selectedPayment && selectedPayment.id === id) {
      setSelectedPayment({
        ...selectedPayment,
        status
      });
    }
  };

  // Get payment method icon
  const getPaymentMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'bank transfer':
        return <FaRupeeSign className="text-blue-500" />;
      case 'upi':
        return <FaRupeeSign className="text-green-500" />;
      case 'cash':
        return <FaRupeeSign className="text-yellow-500" />;
      case 'cheque':
        return <FaFileInvoiceDollar className="text-purple-500" />;
      default:
        return <FaRupeeSign className="text-gray-500" />;
    }
  };

  // Get document icon
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'invoice':
        return <FaFileInvoiceDollar className="text-blue-500" />;
      case 'receipt':
        return <FaFileInvoiceDollar className="text-green-500" />;
      default:
        return <FaFileInvoiceDollar className="text-gray-500" />;
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Tracking</h1>
            <p className="text-gray-600">Manage and track payments to farmers</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
              <FaDownload className="mr-2" /> Export
            </button>
            <button 
              onClick={() => setShowPaymentForm(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 flex items-center"
            >
              <FaFileInvoiceDollar className="mr-2" /> New Payment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FaFileInvoiceDollar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Payments</p>
                <p className="text-2xl font-semibold">{mockPaymentStats.totalPayments}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FaRupeeSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-2xl font-semibold">
                  {formatCurrency(mockPaymentStats.totalAmount)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <FaUserClock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold">{mockPaymentStats.pendingPayments}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                <FaTimesCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Failed</p>
                <p className="text-2xl font-semibold">{mockPaymentStats.failedPayments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'all' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All Payments
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'completed' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('completed')}
          >
            <FaCheckCircle className="mr-1" /> Completed
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'pending' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('pending')}
          >
            <FaClock className="mr-1" /> Pending
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'failed' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('failed')}
          >
            <FaTimesCircle className="mr-1" /> Failed
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'processing' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('processing')}
          >
            <FaClock className="mr-1" /> Processing
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="processing">Processing</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center"
              >
                <FaFilter className="mr-1" /> Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Methods</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setDateRange({ start: '', end: '' });
                      setStatusFilter('all');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payments List */}
          <div className="lg:col-span-2">
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
                          Payment ID
                          {getSortIndicator('id')}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('farmerName')}
                      >
                        <div className="flex items-center">
                          Farmer
                          {getSortIndicator('farmerName')}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('totalAmount')}
                      >
                        <div className="flex items-center">
                          Amount
                          {getSortIndicator('totalAmount')}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('paymentDate')}
                      >
                        <div className="flex items-center">
                          Date
                          {getSortIndicator('paymentDate')}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedPayments.length > 0 ? (
                      sortedPayments.map((payment) => (
                        <tr 
                          key={payment.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${selectedPayment?.id === payment.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setSelectedPayment(payment)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{payment.farmerName}</div>
                            <div className="text-xs text-gray-500">{payment.farmerId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {formatCurrency(payment.totalAmount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(payment.paymentDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(payment.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button 
                                className="text-blue-600 hover:text-blue-900"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPayment(payment);
                                }}
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <FaSearch className="h-12 w-12 text-gray-300 mb-2" />
                            <p>No payments found matching your criteria.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="lg:col-span-1">
            {selectedPayment ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Payment Details
                    </h3>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <FaPrint className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <FaShare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Payment ID</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedPayment.id}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Invoice ID</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedPayment.invoiceId}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Farmer</h4>
                      <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.farmerName}</p>
                      <p className="text-xs text-gray-500">{selectedPayment.farmerId}</p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <FaPhone className="mr-2 h-3 w-3" />
                        <span>{selectedPayment.contact}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-2 h-3 w-3" />
                        <span>{selectedPayment.village}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Crop Details</h4>
                      <div className="mt-1 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">Crop</p>
                          <p className="text-sm text-gray-900">{selectedPayment.crop}</p>
                        </div>
                        {selectedPayment.quantity && (
                          <div>
                            <p className="text-xs text-gray-500">Quantity</p>
                            <p className="text-sm text-gray-900">{selectedPayment.quantity} quintals</p>
                          </div>
                        )}
                        {selectedPayment.rate && (
                          <div>
                            <p className="text-xs text-gray-500">Rate</p>
                            <p className="text-sm text-gray-900">₹{selectedPayment.rate}/quintal</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-500">Amount</p>
                        <p className="text-sm text-gray-900">{formatCurrency(selectedPayment.totalAmount)}</p>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="text-sm font-medium text-gray-500">Payment Method</p>
                        <div className="flex items-center">
                          {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                          <span className="ml-1 text-sm text-gray-900">{selectedPayment.paymentMethod}</span>
                        </div>
                      </div>
                      {selectedPayment.transactionId && (
                        <div className="mt-2 flex justify-between">
                          <p className="text-sm font-medium text-gray-500">Transaction ID</p>
                          <p className="text-sm text-gray-900">{selectedPayment.transactionId}</p>
                        </div>
                      )}
                      <div className="mt-2 flex justify-between">
                        <p className="text-sm font-medium text-gray-500">Payment Date</p>
                        <p className="text-sm text-gray-900">{formatDate(selectedPayment.paymentDate)}</p>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <div>
                          {getStatusBadge(selectedPayment.status)}
                        </div>
                      </div>
                    </div>
                    
                    {selectedPayment.notes && (
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedPayment.notes}</p>
                      </div>
                    )}
                    
                    {selectedPayment.documents && selectedPayment.documents.length > 0 && (
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Documents</h4>
                        <div className="space-y-2">
                          {selectedPayment.documents.map((doc, index) => (
                            <div key={index} className="flex items-center p-2 border border-gray-200 rounded-md">
                              <div className="flex-shrink-0">
                                {getDocumentIcon(doc.type)}
                              </div>
                              <div className="ml-3 flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(doc.uploadedAt)} • {doc.type}
                                </p>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <FaDownload className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Actions</h4>
                      <div className="space-y-2">
                        {selectedPayment.status === 'pending' && (
                          <button
                            onClick={() => updatePaymentStatus(selectedPayment.id, 'processing')}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Mark as Processing
                          </button>
                        )}
                        
                        {selectedPayment.status === 'processing' && (
                          <>
                            <button
                              onClick={() => updatePaymentStatus(selectedPayment.id, 'completed')}
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Mark as Completed
                            </button>
                            <button
                              onClick={() => updatePaymentStatus(selectedPayment.id, 'failed')}
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Mark as Failed
                            </button>
                          </>
                        )}
                        
                        <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          Send Receipt
                        </button>
                        
                        <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                <FaFileInvoiceDollar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No payment selected</h3>
                <p className="mt-1 text-sm text-gray-500">Select a payment to view details</p>
              </div>
            )}
            
            {/* Payment Methods Summary */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Payment Methods</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  {mockPaymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getPaymentMethodIcon(method.method)}
                        <span className="ml-2 text-sm font-medium text-gray-900">{method.method}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(method.amount)}</p>
                        <p className="text-xs text-gray-500">{method.count} transactions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Payment Modal */}
      {showPaymentForm && (
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
                    <FaFileInvoiceDollar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      New Payment
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handlePaymentSubmit}>
                        <div className="grid grid-cols-1 gap-y-4">
                          <div>
                            <label htmlFor="farmerId" className="block text-sm font-medium text-gray-700">Farmer ID</label>
                            <input
                              type="text"
                              name="farmerId"
                              id="farmerId"
                              required
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                              value={paymentData.farmerId}
                              onChange={handlePaymentInputChange}
                              placeholder="Enter Farmer ID"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="farmerName" className="block text-sm font-medium text-gray-700">Farmer Name</label>
                            <input
                              type="text"
                              name="farmerName"
                              id="farmerName"
                              required
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                              value={paymentData.farmerName}
                              onChange={handlePaymentInputChange}
                              placeholder="Enter Farmer Name"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (₹)</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">₹</span>
                              </div>
                              <input
                                type="number"
                                name="amount"
                                id="amount"
                                required
                                min="0"
                                step="0.01"
                                className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                value={paymentData.amount}
                                onChange={handlePaymentInputChange}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">Payment Date</label>
                            <input
                              type="date"
                              name="paymentDate"
                              id="paymentDate"
                              required
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                              value={paymentData.paymentDate}
                              onChange={handlePaymentInputChange}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select
                              id="paymentMethod"
                              name="paymentMethod"
                              required
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                              value={paymentData.paymentMethod}
                              onChange={handlePaymentInputChange}
                            >
                              <option value="Bank Transfer">Bank Transfer</option>
                              <option value="UPI">UPI</option>
                              <option value="Cash">Cash</option>
                              <option value="Cheque">Cheque</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                            <textarea
                              id="notes"
                              name="notes"
                              rows="3"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                              value={paymentData.notes}
                              onChange={handlePaymentInputChange}
                              placeholder="Add any notes or reference..."
                            ></textarea>
                          </div>
                        </div>
                        
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                          >
                            Record Payment
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                            onClick={() => setShowPaymentForm(false)}
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

export default PaymentTracking;
