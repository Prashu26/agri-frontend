import React, { useState, useEffect } from 'react';
import { 
  FaFileContract, 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaEye, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaPlus,
  FaUserTie,
  FaWarehouse,
  FaMoneyBillWave,
  FaCalendarAlt
} from 'react-icons/fa';

// Mock data for contracts
const mockContracts = [
  {
    id: 'CT-2024-001',
    title: 'Soybean Procurement Contract',
    buyer: 'Green Fields FPO',
    crop: 'Soybean',
    quantity: 50, // in quintals
    price: 4500, // per quintal
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    signedOn: '2024-05-15',
    paymentTerms: '50% advance, 50% on delivery',
    deliveryTerms: 'FOB Farm Gate',
    documents: ['contract_CT-2024-001.pdf', 'quality_specs.pdf']
  },
  {
    id: 'CT-2024-002',
    title: 'Organic Mustard Supply Agreement',
    buyer: 'Organic Harvest Ltd.',
    crop: 'Mustard',
    quantity: 30,
    price: 5200,
    status: 'pending',
    startDate: '2024-07-01',
    endDate: '2024-11-30',
    signedOn: '2024-05-20',
    paymentTerms: '30% advance, 70% on delivery',
    deliveryTerms: 'CIF Buyer Warehouse',
    documents: ['contract_CT-2024-002.pdf']
  },
  {
    id: 'CT-2023-045',
    title: 'Sunflower Seeds Annual Contract',
    buyer: 'Sunshine Foods',
    crop: 'Sunflower',
    quantity: 25,
    price: 4800,
    status: 'completed',
    startDate: '2023-01-15',
    endDate: '2023-12-15',
    signedOn: '2023-01-10',
    paymentTerms: '100% on delivery',
    deliveryTerms: 'FOB Farm Gate',
    documents: ['contract_CT-2023-045.pdf']
  },
  {
    id: 'CT-2024-003',
    title: 'Groundnut Procurement Contract',
    buyer: 'Healthy Nuts Co.',
    crop: 'Groundnut',
    quantity: 40,
    price: 5800,
    status: 'draft',
    startDate: '2024-08-01',
    endDate: '2024-10-31',
    signedOn: null,
    paymentTerms: '40% advance, 60% on delivery',
    deliveryTerms: 'CIF Buyer Warehouse',
    documents: []
  }
];

const ContractsPortal = () => {
  const [contracts, setContracts] = useState(mockContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContract, setSelectedContract] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Filter contracts based on search and filter
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'completed':
        return <FaCheckCircle className="text-blue-500" />;
      case 'draft':
        return <FaFileContract className="text-gray-500" />;
      case 'cancelled':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaFileContract className="text-gray-500" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate contract value
  const calculateContractValue = (contract) => {
    return (contract.quantity * contract.price).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
  };

  // Handle contract signing
  const handleSignContract = (contractId) => {
    setContracts(contracts.map(contract => 
      contract.id === contractId 
        ? { ...contract, status: 'pending', signedOn: new Date().toISOString().split('T')[0] }
        : contract
    ));
    setSelectedContract(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contracts Portal</h1>
            <p className="text-gray-600">Manage your agricultural contracts and agreements</p>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <FaPlus className="mr-2" /> New Contract
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100'}`}
                title="List view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100'}`}
                title="Grid view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        {viewMode === 'list' ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredContracts.length > 0 ? (
                filteredContracts.map((contract) => (
                  <li key={contract.id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="p-2 bg-green-100 rounded-full">
                              <FaFileContract className="w-5 h-5 text-green-600" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-medium text-gray-900">{contract.title}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(contract.status)}`}>
                                {getStatusIcon(contract.status)}
                                <span className="ml-1">{contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}</span>
                              </span>
                            </div>
                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <FaUserTie className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {contract.buyer}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <FaSeedling className="flex-shrink-0 mr-1.5 h-4 w-4 text-green-500" />
                                {contract.quantity} quintals of {contract.crop}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <FaMoneyBillWave className="flex-shrink-0 mr-1.5 h-4 w-4 text-green-600" />
                                {calculateContractValue(contract)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                          <button
                            onClick={() => setSelectedContract(contract)}
                            className="mr-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <FaEye className="mr-1.5 h-4 w-4" /> View
                          </button>
                          {contract.status === 'draft' && (
                            <button
                              onClick={() => handleSignContract(contract.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Sign Contract
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <FaCalendarAlt className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <FaFileContract className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {contract.documents.length} {contract.documents.length === 1 ? 'document' : 'documents'}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-12 text-center">
                  <FaFileContract className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No contracts found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter to find what you\'re looking for.'
                      : 'Get started by creating a new contract.'}
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                      New Contract
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContracts.length > 0 ? (
              filteredContracts.map((contract) => (
                <div key={contract.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-full">
                          <FaFileContract className="w-5 h-5 text-green-600" />
                        </div>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(contract.status)}`}>
                          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {contract.id}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900">{contract.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        <FaUserTie className="inline mr-1" /> {contract.buyer}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        <FaSeedling className="inline mr-1 text-green-500" /> 
                        {contract.quantity} quintals of {contract.crop}
                      </p>
                      <p className="mt-1 text-sm font-medium text-green-600">
                        {calculateContractValue(contract)}
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Start Date</span>
                          <span className="font-medium">{formatDate(contract.startDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>End Date</span>
                          <span className="font-medium">{formatDate(contract.endDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3 flex justify-between">
                    <button
                      onClick={() => setSelectedContract(contract)}
                      className="text-sm font-medium text-green-600 hover:text-green-500"
                    >
                      View details
                    </button>
                    {contract.status === 'draft' ? (
                      <button
                        onClick={() => handleSignContract(contract.id)}
                        className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md"
                      >
                        Sign
                      </button>
                    ) : (
                      <div className="text-sm text-gray-500">
                        {contract.documents.length} {contract.documents.length === 1 ? 'doc' : 'docs'}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <FaFileContract className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No contracts found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter to find what you\'re looking for.'
                    : 'Get started by creating a new contract.'}
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                    New Contract
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contract Detail Modal */}
        {selectedContract && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FaFileContract className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {selectedContract.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedContract.status)}`}>
                          {getStatusIcon(selectedContract.status)}
                          <span className="ml-1">{selectedContract.status.charAt(0).toUpperCase() + selectedContract.status.slice(1)}</span>
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Contract ID: {selectedContract.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Buyer</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract.buyer}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Crop</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract.crop}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract.quantity} quintals</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Price per Quintal</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        ₹{selectedContract.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Total Value</h4>
                      <p className="mt-1 text-sm font-medium text-green-600">
                        {calculateContractValue(selectedContract)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Contract Period</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDate(selectedContract.startDate)} - {formatDate(selectedContract.endDate)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Payment Terms</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract.paymentTerms}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Delivery Terms</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract.deliveryTerms}</p>
                    </div>
                    {selectedContract.signedOn && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Signed On</h4>
                        <p className="mt-1 text-sm text-gray-900">{formatDate(selectedContract.signedOn)}</p>
                      </div>
                    )}
                    {selectedContract.documents.length > 0 && (
                      <div className="sm:col-span-2">
                        <h4 className="text-sm font-medium text-gray-500">Documents</h4>
                        <div className="mt-2 space-y-2">
                          {selectedContract.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                              <span className="text-sm text-gray-900 truncate">{doc}</span>
                              <button
                                type="button"
                                className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                <FaDownload className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setSelectedContract(null)}
                  >
                    Close
                  </button>
                  {selectedContract.status === 'draft' && (
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        handleSignContract(selectedContract.id);
                        setSelectedContract(null);
                      }}
                    >
                      Sign Contract
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractsPortal;
