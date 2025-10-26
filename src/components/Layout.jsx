import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaChartLine, FaSeedling, FaShoppingCart, FaUserTie, FaCog, FaSignOutAlt, FaUsers, FaStore, FaUserShield } from 'react-icons/fa';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // Determine the current section (farmer, fpo, admin, etc.)
  const currentSection = path.split('/')[1];

  // Navigation items based on the current section
  const getNavItems = () => {
    const commonItems = [
      { to: '/marketplace', icon: <FaStore />, label: 'Marketplace' },
      { to: '/advisory', icon: <FaChartLine />, label: 'Advisory Chat' },
    ];

    switch(currentSection) {
      case 'farmer':
        return [
          { to: '/farmer', icon: <FaHome />, label: 'Dashboard' },
          { to: '/farmer/crops', icon: <FaSeedling />, label: 'My Crops' },
          { to: '/farmer/simulator', icon: <FaChartLine />, label: 'Crop Simulator' },
          ...commonItems
        ];
      case 'fpo':
        return [
          { to: '/fpo', icon: <FaHome />, label: 'Dashboard' },
          { to: '/fpo/market', icon: <FaShoppingCart />, label: 'Market Insights' },
          { to: '/fpo/members', icon: <FaUsers />, label: 'Members' },
          ...commonItems
        ];
      case 'admin':
        return [
          { to: '/admin', icon: <FaHome />, label: 'Dashboard' },
          { to: '/admin/users', icon: <FaUserTie />, label: 'Users' },
          { to: '/admin/analytics', icon: <FaChartLine />, label: 'Analytics' },
          ...commonItems
        ];
      default:
        return [
          { to: '/marketplace', icon: <FaStore />, label: 'Marketplace' },
          { to: '/advisory', icon: <FaChartLine />, label: 'Advisory Chat' },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-green-800 text-white">
          <div className="flex items-center justify-center h-16 bg-green-900">
            <h1 className="text-xl font-bold">AgriAdvisory</h1>
          </div>
          <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const isActive = path === item.to || (item.to !== '/' && path.startsWith(item.to));
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md group ${
                      isActive 
                        ? 'bg-green-700 text-white' 
                        : 'text-gray-200 hover:bg-green-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto">
              <div className="p-4 mt-4 bg-green-700 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaUserTie className="w-8 h-8 text-gray-300" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {currentSection ? currentSection.charAt(0).toUpperCase() + currentSection.slice(1) : 'User'} Dashboard
                    </p>
                    <div className="mt-1">
                      <Link 
                        to="/" 
                        className="text-xs font-medium text-green-200 hover:text-white"
                      >
                        ← Back to Home
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/"
                    className="flex items-center w-full px-4 py-2 text-sm text-left text-red-200 rounded-md hover:bg-green-600"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Switch Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between h-16 px-4 bg-green-800 text-white">
          <div className="flex items-center">
            <Link to="/" className="text-white hover:text-white">
              <h1 className="text-xl font-bold">AgriAdvisory</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/marketplace"
              className="p-2 text-white rounded-full hover:bg-green-700"
              title="Marketplace"
            >
              <FaStore className="w-5 h-5" />
            </Link>
            <Link
              to="/"
              className="p-2 text-white rounded-full hover:bg-green-700"
              title="Switch Dashboard"
            >
              <FaHome className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex overflow-x-auto bg-green-700 text-white">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center p-2 text-xs whitespace-nowrap ${
                path === item.to ? 'text-white bg-green-800' : 'text-gray-200 hover:bg-green-600'
              }`}
              style={{ minWidth: '80px' }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-4 bg-white">
          <Outlet />
        </div>
        
        {/* Mobile bottom navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-1">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center p-2 text-xs ${
                path === item.to ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="mt-1 text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
