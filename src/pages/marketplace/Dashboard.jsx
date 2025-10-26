import { useState } from 'react';
import { FiSearch, FiFilter, FiShoppingCart, FiStar, FiDollarSign, FiPackage, FiTruck } from 'react-icons/fi';

// Mock data for products
const products = [
  {
    id: 1,
    name: 'Organic Basmati Rice',
    price: '₹2,800',
    unit: '50kg',
    rating: 4.5,
    seller: 'Green Fields Farm',
    location: 'Punjab',
    image: 'https://via.placeholder.com/150',
    category: 'Grains',
    inStock: true,
  },
  {
    id: 2,
    name: 'Fresh Mangoes',
    price: '₹120',
    unit: 'kg',
    rating: 4.7,
    seller: 'Mango Valley',
    location: 'Maharashtra',
    image: 'https://via.placeholder.com/150',
    category: 'Fruits',
    inStock: true,
  },
  {
    id: 3,
    name: 'Premium Wheat Flour',
    price: '₹45',
    unit: 'kg',
    rating: 4.3,
    seller: 'Golden Grains',
    location: 'Madhya Pradesh',
    image: 'https://via.placeholder.com/150',
    category: 'Flour',
    inStock: true,
  },
  {
    id: 4,
    name: 'Fresh Tomatoes',
    price: '₹25',
    unit: 'kg',
    rating: 4.1,
    seller: 'Veggie Farm',
    location: 'Karnataka',
    image: 'https://via.placeholder.com/150',
    category: 'Vegetables',
    inStock: true,
  },
];

// Mock categories
const categories = [
  { id: 1, name: 'All', count: 24 },
  { id: 2, name: 'Grains', count: 8 },
  { id: 3, name: 'Fruits', count: 6 },
  { id: 4, name: 'Vegetables', count: 5 },
  { id: 5, name: 'Dairy', count: 3 },
  { id: 6, name: 'Spices', count: 2 },
];

// Mock transactions
const recentTransactions = [
  { id: 1, product: 'Organic Basmati Rice', buyer: 'FoodCorp', amount: '₹28,000', date: '2 hours ago', status: 'Completed' },
  { id: 2, product: 'Fresh Mangoes', buyer: 'FreshMart', amount: '₹12,500', date: '5 hours ago', status: 'In Transit' },
  { id: 3, product: 'Premium Wheat Flour', buyer: 'BakeWell', amount: '₹8,750', date: '1 day ago', status: 'Processing' },
];

export default function MarketplaceDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price.replace(/[^0-9]/g, '') >= priceRange[0] && 
                        product.price.replace(/[^0-9]/g, '') <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
        <p className="text-gray-600">Buy and sell agricultural products directly</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Search products, sellers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg">
            <FiFilter className="w-4 h-4 mr-2" />
            <span>Filter</span>
          </div>
          <select className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option>Sort by: Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Categories */}
        <div className="lg:col-span-1">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-md ${
                    selectedCategory === category.name
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="mb-3 text-sm font-medium text-gray-900">Price Range</h4>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="p-4 mt-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-3 border border-gray-100 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.product}</p>
                      <p className="text-sm text-gray-500">{transaction.buyer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{transaction.amount}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : transaction.status === 'In Transit' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="overflow-hidden bg-white rounded-lg shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <span className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <button className="absolute p-2 text-gray-400 bg-white rounded-full top-2 right-2 hover:text-gray-600">
                      <FiStar className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.seller} • {product.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{product.price}</p>
                        <p className="text-sm text-gray-500">per {product.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-4">
                      <button
                        className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                          !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!product.inStock}
                      >
                        <FiShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <FiPackage className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                  <FiDollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Sales</p>
                  <p className="text-2xl font-semibold text-gray-900">₹1,24,567</p>
                  <p className="text-xs text-green-600">+12.5% from last month</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                  <FiShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <p className="text-2xl font-semibold text-gray-900">248</p>
                  <p className="text-xs text-green-600">+8.2% from last month</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
                  <FiPackage className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Products</p>
                  <p className="text-2xl font-semibold text-gray-900">86</p>
                  <p className="text-xs text-green-600">+5 new this week</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 mr-4 text-purple-500 bg-purple-100 rounded-full">
                  <FiTruck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Sellers</p>
                  <p className="text-2xl font-semibold text-gray-900">42</p>
                  <p className="text-xs text-green-600">+3 new this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
