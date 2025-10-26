import React, { useState, useEffect } from 'react';
import {
  FiMap,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiZoomIn,
  FiZoomOut,
  FiInfo,
  FiBarChart2,
  FiCalendar,
  FiLayers,
  FiGrid
} from 'react-icons/fi';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Mock data for the heatmap
const mockCropData = [
  { id: 1, name: 'Rice', region: 'North', adoptionRate: 85, area: 12500, farmers: 245, trend: 'up', trendValue: 12 },
  { id: 2, name: 'Wheat', region: 'North', adoptionRate: 78, area: 9800, farmers: 198, trend: 'up', trendValue: 8 },
  { id: 3, name: 'Maize', region: 'Central', adoptionRate: 65, area: 7500, farmers: 156, trend: 'up', trendValue: 15 },
  { id: 4, name: 'Cotton', region: 'West', adoptionRate: 72, area: 6800, farmers: 132, trend: 'down', trendValue: 5 },
  { id: 5, name: 'Sugarcane', region: 'South', adoptionRate: 88, area: 10200, farmers: 210, trend: 'up', trendValue: 18 },
  { id: 6, name: 'Pulses', region: 'East', adoptionRate: 58, area: 5200, farmers: 98, trend: 'up', trendValue: 22 },
  { id: 7, name: 'Oilseeds', region: 'Central', adoptionRate: 62, area: 6100, farmers: 112, trend: 'down', trendValue: 3 },
  { id: 8, name: 'Vegetables', region: 'South', adoptionRate: 92, area: 8900, farmers: 201, trend: 'up', trendValue: 25 },
];

const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];
const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year', 'All time'];

const AdoptionHeatmap = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState('This year');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'chart'
  const [filteredData, setFilteredData] = useState(mockCropData);

  // Filter data based on selected region
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      const filtered = selectedRegion === 'All' 
        ? [...mockCropData] 
        : mockCropData.filter(item => item.region === selectedRegion);
      setFilteredData(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedRegion, selectedTimeRange]);

  // Calculate color based on adoption rate
  const getColorForAdoptionRate = (rate) => {
    if (rate >= 80) return 'bg-green-600';
    if (rate >= 60) return 'bg-green-400';
    if (rate >= 40) return 'bg-yellow-400';
    if (rate >= 20) return 'bg-orange-400';
    return 'bg-red-400';
  };

  // Handle zoom in/out
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.7));

  // Calculate average adoption rate
  const averageAdoptionRate = filteredData.reduce((sum, item) => sum + item.adoptionRate, 0) / (filteredData.length || 1);

  // Handle export data
  const handleExport = () => {
    // In a real app, this would trigger a download
    console.log('Exporting data...', filteredData);
    alert('Export functionality would be implemented here');
  };

  // Handle refresh data
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiMap className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Crop Adoption Heatmap</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <FiRefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FiDownload className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <div className="relative">
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <div className="relative">
              <select
                id="timeRange"
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                {timeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Grid View"
            >
              <FiGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`p-2 rounded-md ${viewMode === 'chart' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Chart View"
            >
              <FiBarChart2 className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-end space-x-1">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 0.7}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Zoom Out"
            >
              <FiZoomOut className="h-5 w-5" />
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 1.5}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Zoom In"
            >
              <FiZoomIn className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800">Average Adoption Rate</p>
                <p className="text-2xl font-bold text-green-700">{averageAdoptionRate.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">across all crops</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Total Crops Tracked</p>
                <p className="text-2xl font-bold text-blue-700">{filteredData.length}</p>
                <p className="text-xs text-blue-600 mt-1">in selected region</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Total Area</p>
                <p className="text-2xl font-bold text-purple-700">
                  {(filteredData.reduce((sum, item) => sum + item.area, 0) / 1000).toFixed(1)}K Ha
                </p>
                <p className="text-xs text-purple-600 mt-1">under cultivation</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Farmers Engaged</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {filteredData.reduce((sum, item) => sum + item.farmers, 0).toLocaleString()}
                </p>
                <p className="text-xs text-yellow-600 mt-1">in selected region</p>
              </div>
            </div>

            {/* Heatmap Grid */}
            {viewMode === 'grid' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crop
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Adoption Rate
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Area (Ha)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmers
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-gray-50 ${selectedCrop?.id === item.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedCrop(item)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <FiLayers className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.region}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                              <div 
                                className={`h-2.5 rounded-full ${getColorForAdoptionRate(item.adoptionRate)}`}
                                style={{ width: `${item.adoptionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{item.adoptionRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.area.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.farmers.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.trend === 'up' ? (
                              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L12 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12 13a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L12 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0112 13z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className="text-sm font-medium">{item.trendValue}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900 mr-3">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Chart View (simplified for this example)
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <FiBarChart2 className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Crop Adoption Trends</h3>
                </div>
                <div className="h-64 flex items-center justify-center bg-white rounded border border-gray-200">
                  <p className="text-gray-500">Interactive chart visualization would be displayed here</p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Switch to grid view for detailed tabular data</p>
                </div>
              </div>
            )}

            {/* Selected Crop Details */}
            {selectedCrop && (
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-blue-800">{selectedCrop.name} Details</h3>
                  <button 
                    onClick={() => setSelectedCrop(null)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Region</p>
                    <p className="text-lg font-semibold text-blue-900">{selectedCrop.region}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">Adoption Rate</p>
                    <p className="text-lg font-semibold text-blue-900">{selectedCrop.adoptionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">Area Under Cultivation</p>
                    <p className="text-lg font-semibold text-blue-900">{selectedCrop.area.toLocaleString()} Ha</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">Farmers Engaged</p>
                    <p className="text-lg font-semibold text-blue-900">{selectedCrop.farmers.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Trend</p>
                      <p className={`text-lg font-semibold ${selectedCrop.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedCrop.trend === 'up' ? '↑' : '↓'} {selectedCrop.trendValue}% from last period
                      </p>
                    </div>
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Adoption Rate:</span>
                <div className="flex items-center space-x-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-green-600"></span>
                  <span>80-100%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-green-400"></span>
                  <span>60-79%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-yellow-400"></span>
                  <span>40-59%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-orange-400"></span>
                  <span>20-39%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-red-400"></span>
                  <span>0-19%</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-0">
                <button 
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                  data-tooltip-id="heatmap-info"
                  data-tooltip-content="The adoption rate represents the percentage of farmers in the region who have adopted this crop compared to the total number of farmers in the region."
                >
                  <FiInfo className="mr-1" />
                  <span>What does this mean?</span>
                </button>
                <ReactTooltip id="heatmap-info" place="top" effect="solid" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Data updated: {new Date().toLocaleString()}
          </p>
          <div className="flex items-center space-x-4">
            <button className="text-xs text-blue-600 hover:text-blue-800">
              <FiCalendar className="inline mr-1" /> Schedule Report
            </button>
            <button className="text-xs text-blue-600 hover:text-blue-800">
              <FiDownload className="inline mr-1" /> Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionHeatmap;
