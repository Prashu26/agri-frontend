import React, { useState, useEffect } from 'react';
import { FaChartLine, FaMoneyBillWave, FaSeedling, FaTractor, FaChartPie } from 'react-icons/fa';
import { GiWheat } from 'react-icons/gi';

const ProfitabilityDashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState('soybean');
  const [timeframe, setTimeframe] = useState('season');
  
  // Mock data for crop profitability
  const cropData = {
    soybean: {
      name: 'Soybean',
      icon: <FaSeedling className="text-green-500" />,
      currentPrice: 4500, // per quintal
      costOfCultivation: 25000, // per acre
      expectedYield: 12, // quintals per acre
      marketTrend: 'increasing',
      roi: 35, // percentage
      demand: 'High',
        season: 'Kharif',
      },
      // Add more crops as needed
    };

  const [cropInfo, setCropInfo] = useState(cropData[selectedCrop]);

  useEffect(() => {
    setCropInfo(cropData[selectedCrop]);
  }, [selectedCrop]);

  const calculateProfitability = () => {
    const { currentPrice, costOfCultivation, expectedYield } = cropInfo;
    const revenue = currentPrice * expectedYield;
    const profit = revenue - costOfCultivation;
    const profitPercentage = (profit / costOfCultivation) * 100;
    
    return {
      revenue,
      profit,
      profitPercentage: profitPercentage.toFixed(2)
    };
  };

  const { revenue, profit, profitPercentage } = calculateProfitability();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Crop Profitability Analysis</h1>
        <div className="flex space-x-4">
          <select 
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="soybean">Soybean</option>
            <option value="groundnut">Groundnut</option>
            <option value="sunflower">Sunflower</option>
            <option value="mustard">Mustard</option>
          </select>
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="season">Current Season</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Expected Revenue</p>
              <p className="text-2xl font-bold">₹{revenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12% from last season</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaMoneyBillWave className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Profit Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Estimated Profit</p>
              <p className="text-2xl font-bold">₹{profit.toLocaleString()}</p>
              <p className="text-sm text-green-600">{profitPercentage}% ROI</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaChartLine className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Cost of Cultivation */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Cost of Cultivation</p>
              <p className="text-2xl font-bold">₹{cropInfo.costOfCultivation.toLocaleString()}</p>
              <p className="text-sm text-gray-500">per acre</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaTractor className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Analysis */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Market Analysis</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Market trend chart will be displayed here</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Market Demand</p>
              <p className="font-medium">{cropInfo.demand}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Growing Season</p>
              <p className="font-medium">{cropInfo.season}</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-full mt-1">
                <FaChartPie className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Optimize Input Costs</p>
                <p className="text-sm text-gray-600">Consider bulk purchasing of seeds and fertilizers to reduce costs.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-full mt-1">
                <GiWheat className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Crop Rotation</p>
                <p className="text-sm text-gray-600">Rotate with legumes to improve soil health and reduce disease risk.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 rounded-full mt-1">
                <FaChartLine className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Market Timing</p>
                <p className="text-sm text-gray-600">Consider holding your produce for 2-3 weeks for better prices.</p>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            View Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfitabilityDashboard;
