import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBox, FaTruck, FaChartLine, FaSearch } from 'react-icons/fa';

export default function BuyerDashboard() {
  const { user } = useSelector((state) => state.auth);
  
  // Mock data - in a real app, this would come from an API
  const stats = {
    activeOrders: 5,
    completedOrders: 24,
    pendingQuotes: 3,
    totalSpent: '₹1,24,567',
  };

  const recentPurchases = [
    { id: 1, product: 'Premium Rice', quantity: '50kg', price: '₹2,500', status: 'Delivered', date: '2023-11-15' },
    { id: 2, product: 'Organic Wheat', quantity: '100kg', price: '₹3,200', status: 'In Transit', date: '2023-11-12' },
    { id: 3, product: 'Fresh Vegetables', quantity: '20kg', price: '₹850', status: 'Processing', date: '2023-11-10' },
  ];

  const recommendedProducts = [
    { id: 1, name: 'Organic Basmati Rice', price: '₹2,800/50kg', rating: 4.5 },
    { id: 2, name: 'Fresh Mangoes', price: '₹120/kg', rating: 4.7 },
    { id: 3, name: 'Premium Wheat Flour', price: '₹45/kg', rating: 4.3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back, {user?.name || 'Valued Buyer'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
              <FaShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeOrders}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <FaBox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
              <FaSearch className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Quotes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingQuotes}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 mr-4 text-purple-500 bg-purple-100 rounded-full">
              <FaChartLine className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalSpent}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Purchases */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Purchases</h2>
              <Link to="/buyer/orders" className="text-sm font-medium text-green-600 hover:text-green-500">
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Product</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Price</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPurchases.map((purchase) => (
                    <tr key={purchase.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{purchase.product}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{purchase.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{purchase.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                          purchase.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          purchase.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {purchase.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{purchase.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recommendations */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/buyer/products"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Browse Products</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              <Link
                to="/buyer/orders/new"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Place New Order</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
              <Link
                to="/buyer/quotes"
                className="flex items-center justify-between p-4 text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span>Request Quote</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-medium text-gray-900">Recommended for You</h2>
            <div className="space-y-4">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md"></div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm font-medium text-green-600">{product.price}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
