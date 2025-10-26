import { useState, useEffect } from 'react';
import { FaSeedling, FaTint, FaThermometerHalf, FaChartLine, FaCalculator } from 'react-icons/fa';
import { GiFertilizerBag, GiPlantWatering } from 'react-icons/gi';
import { TbPlant2 } from 'react-icons/tb';

// Mock data for crops
const CROPS = [
  { id: 1, name: 'Soybean', duration: 90, water: 'Moderate', temp: '25-35°C', yield: '20-25 quintals/acre' },
  { id: 2, name: 'Groundnut', duration: 120, water: 'Low', temp: '25-30°C', yield: '15-20 quintals/acre' },
  { id: 3, name: 'Sunflower', duration: 100, water: 'Low', temp: '20-30°C', yield: '10-15 quintals/acre' },
  { id: 4, name: 'Mustard', duration: 110, water: 'Moderate', temp: '15-25°C', yield: '12-15 quintals/acre' },
];

// Soil types
const SOIL_TYPES = [
  { id: 'clay', name: 'Clay' },
  { id: 'loam', name: 'Loam' },
  { id: 'sandy', name: 'Sandy' },
  { id: 'silt', name: 'Silt' },
];

const CropSimulator = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [soilType, setSoilType] = useState('');
  const [area, setArea] = useState('');
  const [simulationResult, setSimulationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCropData, setSelectedCropData] = useState(null);

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    const cropData = CROPS.find((c) => c.name === crop);
    setSelectedCropData(cropData);
    setCurrentStep(2);
  };

  const handleSimulate = (e) => {
    e.preventDefault();
    if (!soilType || !area) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = {
        estimatedYield: calculateYield(selectedCrop, soilType, area),
        waterRequirement: calculateWaterRequirement(selectedCrop, area),
        fertilizerRecommendation: getFertilizerRecommendation(selectedCrop, soilType),
        profitEstimate: calculateProfit(selectedCrop, area),
        growthStages: generateGrowthStages(selectedCropData.duration),
      };
      
      setSimulationResult(result);
      setIsLoading(false);
      setCurrentStep(3);
    }, 1500);
  };

  // Helper functions for simulation
  const calculateYield = (crop, soil, area) => {
    const baseYields = {
      'Soybean': 20,
      'Groundnut': 15,
      'Sunflower': 12,
      'Mustard': 13,
    };
    
    const soilMultipliers = {
      'clay': 0.9,
      'loam': 1.1,
      'sandy': 0.8,
      'silt': 1.0,
    };
    
    const baseYield = baseYields[crop] || 10;
    const multiplier = soilMultipliers[soil] || 1;
    return Math.round(baseYield * multiplier * area * 100) / 100;
  };

  const calculateWaterRequirement = (crop, area) => {
    const waterRequirements = {
      'Soybean': 5000,
      'Groundnut': 4000,
      'Sunflower': 3500,
      'Mustard': 4500,
    };
    
    return waterRequirements[crop] * area || 0;
  };

  const getFertilizerRecommendation = (crop, soil) => {
    const recommendations = {
      'Soybean': {
        'clay': 'N:P:K - 20:60:40 kg/acre',
        'loam': 'N:P:K - 25:60:40 kg/acre',
        'sandy': 'N:P:K - 30:60:50 kg/acre',
        'silt': 'N:P:K - 25:60:40 kg/acre',
      },
      'Groundnut': {
        'clay': 'N:P:K - 10:60:30 kg/acre',
        'loam': 'N:P:K - 15:60:30 kg/acre',
        'sandy': 'N:P:K - 20:60:40 kg/acre',
        'silt': 'N:P:K - 15:60:30 kg/acre',
      },
      'Sunflower': {
        'clay': 'N:P:K - 40:50:40 kg/acre',
        'loam': 'N:P:K - 50:50:40 kg/acre',
        'sandy': 'N:P:K - 60:60:50 kg/acre',
        'silt': 'N:P:K - 50:50:40 kg/acre',
      },
      'Mustard': {
        'clay': 'N:P:K - 60:30:20 kg/acre',
        'loam': 'N:P:K - 80:40:20 kg/acre',
        'sandy': 'N:P:K - 100:50:30 kg/acre',
        'silt': 'N:P:K - 80:40:20 kg/acre',
      },
    };
    
    return recommendations[crop]?.[soil] || 'Consult local agriculture expert';
  };

  const calculateProfit = (crop, area) => {
    const marketPrices = {
      'Soybean': 4500,
      'Groundnut': 5200,
      'Sunflower': 5800,
      'Mustard': 5000,
    };
    
    const costPerAcre = {
      'Soybean': 25000,
      'Groundnut': 30000,
      'Sunflower': 28000,
      'Mustard': 26000,
    };
    
    const yieldPerAcre = calculateYield(crop, soilType, 1);
    const revenue = yieldPerAcre * area * marketPrices[crop];
    const cost = costPerAcre[crop] * area;
    
    return {
      revenue: Math.round(revenue),
      cost: Math.round(cost),
      profit: Math.round(revenue - cost),
    };
  };

  const generateGrowthStages = (days) => {
    const stages = [
      { name: 'Seedling', duration: Math.round(days * 0.2), progress: 0 },
      { name: 'Vegetative', duration: Math.round(days * 0.3), progress: 20 },
      { name: 'Flowering', duration: Math.round(days * 0.2), progress: 50 },
      { name: 'Pod Formation', duration: Math.round(days * 0.2), progress: 70 },
      { name: 'Maturity', duration: Math.round(days * 0.1), progress: 90 },
    ];
    
    return stages;
  };

  const resetSimulation = () => {
    setSelectedCrop('');
    setSoilType('');
    setArea('');
    setSimulationResult(null);
    setCurrentStep(1);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crop Simulation</h1>
          <p className="mt-2 text-gray-600">
            Simulate crop growth and estimate yield based on your farm conditions
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-600">
                  {step === 1 ? 'Select Crop' : step === 2 ? 'Add Details' : 'Results'}
                </span>
              </div>
            ))}
            <div className="flex-1 h-1 -mt-5 bg-gray-200">
              <div
                className="h-1 bg-green-600 transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / 2) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Step 1: Select Crop */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CROPS.map((crop) => (
              <button
                key={crop.id}
                onClick={() => handleCropSelect(crop.name)}
                className="p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <div className="flex items-center">
                  <div className="p-3 mr-4 text-green-600 bg-green-100 rounded-full">
                    <FaSeedling className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900">{crop.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{crop.duration} days to harvest</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <FaTint className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{crop.water}</span>
                  </div>
                  <div className="flex items-center">
                    <FaThermometerHalf className="w-4 h-4 mr-2 text-red-500" />
                    <span>{crop.temp}</span>
                  </div>
                  <div className="flex items-center">
                    <TbPlant2 className="w-4 h-4 mr-2 text-green-500" />
                    <span>{crop.yield}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Add Details */}
        {currentStep === 2 && selectedCropData && (
          <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCrop} Cultivation Details
            </h2>
            <p className="mt-2 text-gray-600">
              Please provide the following details to simulate the crop growth
            </p>

            <form onSubmit={handleSimulate} className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Soil Type
                </label>
                <div className="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-4">
                  {SOIL_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSoilType(type.id)}
                      className={`p-4 text-center border rounded-lg ${
                        soilType === type.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-gray-700"
                >
                  Land Area (in acres)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    min="0.1"
                    step="0.1"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g. 2.5"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!soilType || !area || isLoading}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Simulating...' : 'Run Simulation'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && simulationResult && (
          <div className="space-y-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCrop} Simulation Results
                  </h2>
                  <p className="mt-1 text-gray-600">
                    Based on {area} acres of {soilType} soil
                  </p>
                </div>
                <button
                  onClick={resetSimulation}
                  className="px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  New Simulation
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">
                    Estimated Yield & Profit
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Estimated Yield</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {simulationResult.estimatedYield} quintals
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Estimated Revenue (₹{selectedCrop === 'Soybean' ? '4,500' : 
                                          selectedCrop === 'Groundnut' ? '5,200' : 
                                          selectedCrop === 'Sunflower' ? '5,800' : '5,000'}/quintal)
                      </p>
                      <p className="text-2xl font-semibold text-green-600">
                        ₹{simulationResult.profitEstimate.revenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Estimated Profit (after costs)
                      </p>
                      <p className="text-2xl font-semibold text-green-600">
                        ₹{simulationResult.profitEstimate.profit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">
                    Crop Requirements
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Water Requirement
                      </p>
                      <div className="flex items-center mt-1">
                        <FaTint className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-gray-900">
                          {simulationResult.waterRequirement.toLocaleString()} liters
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Fertilizer Recommendation
                      </p>
                      <div className="flex items-center mt-1">
                        <GiFertilizerBag className="w-5 h-5 mr-2 text-amber-500" />
                        <span className="text-gray-900">
                          {simulationResult.fertilizerRecommendation}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Growth Duration
                      </p>
                      <div className="flex items-center mt-1">
                        <TbPlant2 className="w-5 h-5 mr-2 text-green-500" />
                        <span className="text-gray-900">
                          {selectedCropData.duration} days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Timeline */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Growth Timeline</h3>
              <div className="mt-6">
                <div className="relative">
                  {/* Timeline track */}
                  <div className="absolute left-0 w-full h-2 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  {/* Timeline items */}
                  <div className="relative flex justify-between mt-8">
                    {simulationResult.growthStages.map((stage, index) => (
                      <div key={index} className="relative flex flex-col items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          index < simulationResult.growthStages.length - 1 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-white border-2 border-green-500 text-green-600'
                        }`}>
                          {index < simulationResult.growthStages.length - 1 ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <FaSeedling className="w-4 h-4" />
                          )}
                        </div>
                        <div className="absolute px-2 py-1 mt-8 text-xs text-center text-gray-700 bg-white rounded shadow-lg w-28">
                          <div className="font-medium">{stage.name}</div>
                          <div className="text-gray-500">{stage.duration} days</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <button
                onClick={resetSimulation}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Start New Simulation
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Save This Plan
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Get Expert Advice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropSimulator;
