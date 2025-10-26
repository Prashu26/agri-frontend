import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaDownload, 
  FaFilePdf, 
  FaFileExcel, 
  FaFileCsv, 
  FaPrint,
  FaBoxes,
  FaTractor,
  FaCalendarAlt,
  FaUserTie,
  FaWarehouse,
  FaRupeeSign,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';
import { GiFarmer, GiWheat } from 'react-icons/gi';

// Mock data for procurement
const mockProcurements = [
  {
    id: 'PROC-2024-001',
    farmer: 'Rajesh Kumar',
    crop: 'Soybean',
    variety: 'JS 335',
    quantity: 25, // in quintals
    quality: 'Grade A',
    price: 4500, // per quintal
    status: 'completed',
    procurementDate: '2024-10-20',
    paymentStatus: 'paid',
    documents: ['quality_report.pdf', 'invoice_001.pdf']
  },
  {
    id: 'PROC-2024-002',
    farmer: 'Suresh Patel',
    crop: 'Groundnut',
    variety: 'TG 37A',
    quantity: 18,
    quality: 'Grade A',
    price: 5800,
    status: 'in-progress',
    procurementDate: '2024-10-22',
    paymentStatus: 'pending',
    documents: ['quality_report_002.pdf']
  },
  {
    id: 'PROC-2024-003',
    farmer: 'Vijay Singh',
    crop: 'Mustard',
    variety: 'Pusa Bold',
    quantity: 30,
    quality: 'Grade B',
    price: 5200,
    status: 'scheduled',
    procurementDate: '2024-10-25',
    paymentStatus: 'pending',
    documents: []
  },
  {
    id: 'PROC-2024-004',
    farmer: 'Anita Devi',
    crop: 'Sunflower',
    variety: 'KBSH 44',
    quantity: 15,
    quality: 'Grade A',
    price: 4900,
    status: 'completed',
    procurementDate: '2024-10-18',
    paymentStatus: 'paid',
    documents: ['quality_report_004.pdf', 'invoice_004.pdf']
  },
  {
    id: 'PROC-2024-005',
    farmer: 'Rameshwar Yadav',
    crop: 'Soybean',
    variety: 'JS 9560',
    quantity: 22,
    quality: 'Grade A',
    price: 4550,
    status: 'cancelled',
    procurementDate: '2024-10-15',
    paymentStatus: 'refunded',
    documents: ['cancellation_note.pdf']
  }
];

// Mock data for statistics
const mockStats = {
  totalProcurement: 98, // in quintals
  totalFarmers: 42,
  pendingPayments: 2,
  avgPrice: 4980,
  topCrop: 'Soybean',
  procurementTrend: [
    { month: 'Apr', value: 15 },
    { month: 'May', value: 22 },
    { month: 'Jun', value: 18 },
    { month: 'Jul', value: 25 },
    { month: 'Aug', value: 30 },
    { month: 'Sep', value: 28 },
    { month: 'Oct', value: 35 },
  ]
};

const ProcurementDashboard = () => {
  const [procurements, setProcurements] = useState(mockProcurements);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cropFilter, setCropFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [showNewProcurementForm, setShowNewProcurementForm] = useState(false);
  const [newProcurement, setNewProcurement] = useState({
    farmer: '',
    crop: '',
    variety: '',
    quantity: '',
    quality: 'Grade A',
    price: '',
    procurementDate: new Date().toISOString().split('T')[0]
  });

  // Filter procurements based on search and filters
  const filteredProcurements = procurements.filter(procurement => {
    const matchesSearch = 
      procurement.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procurement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procurement.crop.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || procurement.status === statusFilter;
    const matchesCrop = cropFilter === 'all' || procurement.crop === cropFilter;
    
    const matchesDate = 
      (!dateRange.start || procurement.procurementDate >= dateRange.start) &&
      (!dateRange.end || procurement.procurementDate <= dateRange.end);
    
    return matchesSearch && matchesStatus && matchesCrop && matchesDate;
  });

  // Get unique crops for filter dropdown
  const uniqueCrops = [...new Set(procurements.map(p => p.crop))];

  // Handle new procurement form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProcurement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit new procurement
  const handleSubmitProcurement = (e) => {
    e.preventDefault();
    
    const newProcurementEntry = {
      id: `PROC-${new Date().getFullYear()}-${String(procurements.length + 1).padStart(3, '0')}`,
      ...newProcurement,
      status: 'scheduled',
      paymentStatus: 'pending',
      documents: [],
      quantity: parseFloat(newProcurement.quantity),
      price: parseFloat(newProcurement.price)
    };
    
    setProcurements([newProcurementEntry, ...procurements]);
    setShowNewProcurementForm(false);
    setNewProcurement({
      farmer: '',
      crop: '',
      variety: '',
      quantity: '',
      quality: 'Grade A',
      price: '',
      procurementDate: new Date().toISOString().split('T')[0]
    });
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status badge style
  const getPaymentBadge = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate total value
  const calculateTotalValue = (quantity, price) => {
    return (quantity * price).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Procurement Dashboard</h1>
            <p className="text-gray-600">Manage and track your procurement activities</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
              <FaDownload className="mr-2" /> Export
            </button>
            <button 
              onClick={() => setShowNewProcurementForm(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 flex items-center"
            >
              <FaPlus className="mr-2" /> New Procurement
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FaBoxes className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Procurement</p>
                <p className="text-2xl font-semibold">{mockStats.totalProcurement} <span className="text-sm font-normal">quintals</span></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <GiFarmer className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Farmers</p>
                <p className="text-2xl font-semibold">{mockStats.totalFarmers} <span className="text-sm font-normal">farmers</span></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <FaRupeeSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                <p className="text-2xl font-semibold">{mockStats.pendingPayments} <span className="text-sm font-normal">payments</span></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FaChartLine className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Price</p>
                <p className="text-2xl font-semibold">
                  ₹{mockStats.avgPrice.toLocaleString('en-IN')} <span className="text-sm font-normal">/ quintal</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  placeholder="Search procurements..."
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
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
            <div>
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  placeholder="Start Date"
                />
                <span className="flex items-center">to</span>
                <input
                  type="date"
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  placeholder="End Date"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Procurement List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Procurement ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farmer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProcurements.length > 0 ? (
                  filteredProcurements.map((procurement) => (
                    <tr key={procurement.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {procurement.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <GiFarmer className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{procurement.farmer}</div>
                            <div className="text-xs text-gray-500">Farmer ID: {procurement.id.split('-').pop()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{procurement.crop}</div>
                        <div className="text-xs text-gray-500">{procurement.variety} • {procurement.quality}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{procurement.quantity} <span className="text-gray-500">quintals</span></div>
                        <div className="text-xs text-gray-500">₹{procurement.price}/quintal</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {calculateTotalValue(procurement.quantity, procurement.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(procurement.status)}`}>
                          {procurement.status.replace('-', ' ')}
                        </span>
                        <div className="mt-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentBadge(procurement.paymentStatus)}`}>
                            {procurement.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(procurement.procurementDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                        {procurement.status !== 'completed' && procurement.status !== 'cancelled' && (
                          <button className="text-blue-600 hover:text-blue-900">Update</button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-sm text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <FaSearch className="h-12 w-12 text-gray-300 mb-2" />
                        <p>No procurements found matching your criteria.</p>
                        <button 
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('all');
                            setCropFilter('all');
                            setDateRange({ start: '', end: '' });
                          }}
                          className="mt-2 text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Procurement Modal */}
        {showNewProcurementForm && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FaPlus className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        New Procurement Entry
                      </h3>
                      <div className="mt-4">
                        <form onSubmit={handleSubmitProcurement}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="farmer" className="block text-sm font-medium text-gray-700">Farmer Name</label>
                              <input
                                type="text"
                                name="farmer"
                                id="farmer"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={newProcurement.farmer}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label htmlFor="crop" className="block text-sm font-medium text-gray-700">Crop</label>
                              <select
                                id="crop"
                                name="crop"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={newProcurement.crop}
                                onChange={handleInputChange}
                              >
                                <option value="">Select Crop</option>
                                <option value="Soybean">Soybean</option>
                                <option value="Groundnut">Groundnut</option>
                                <option value="Sunflower">Sunflower</option>
                                <option value="Mustard">Mustard</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="variety" className="block text-sm font-medium text-gray-700">Variety</label>
                              <input
                                type="text"
                                name="variety"
                                id="variety"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={newProcurement.variety}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity (quintals)</label>
                              <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                min="0.1"
                                step="0.1"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={newProcurement.quantity}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label htmlFor="quality" className="block text-sm font-medium text-gray-700">Quality</label>
                              <select
                                id="quality"
                                name="quality"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={newProcurement.quality}
                                onChange={handleInputChange}
                              >
                                <option value="Grade A">Grade A</option>
                                <option value="Grade B">Grade B</option>
                                <option value="Grade C">Grade C</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per quintal (₹)</label>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                min="0"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={newProcurement.price}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label htmlFor="procurementDate" className="block text-sm font-medium text-gray-700">Procurement Date</label>
                              <input
                                type="date"
                                name="procurementDate"
                                id="procurementDate"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={newProcurement.procurementDate}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <button
                              type="submit"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                            >
                              Create Procurement
                            </button>
                            <button
                              type="button"
                              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                              onClick={() => setShowNewProcurementForm(false)}
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
    </div>
  );
};

export default ProcurementDashboard;
