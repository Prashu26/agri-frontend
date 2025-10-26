import { Link } from 'react-router-dom';
import { FaTractor, FaUsers, FaUserShield, FaStore, FaChartLine } from 'react-icons/fa';

const DashboardCard = ({ title, description, icon: Icon, to, color }) => (
  <Link
    to={to}
    className={`flex flex-col p-6 space-y-4 transition-all duration-200 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 ${color}`}
  >
    <div className="flex items-center">
      <div className="p-3 mr-4 rounded-full bg-opacity-20">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
    <div className="mt-2 text-sm font-medium text-blue-600">
      Go to Dashboard →
    </div>
  </Link>
);

export default function LandingPage() {
  const dashboards = [
    {
      title: 'Farmer Dashboard',
      description: 'Manage your crops, track growth, and get personalized farming advice.',
      icon: FaTractor,
      to: '/farmer',
      color: 'hover:border-green-500 border-2 border-transparent',
      iconColor: 'text-green-600 bg-green-100'
    },
    {
      title: 'FPO Dashboard',
      description: 'Connect with farmers, manage produce, and access market insights.',
      icon: FaUsers,
      to: '/fpo',
      color: 'hover:border-blue-500 border-2 border-transparent',
      iconColor: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Admin Dashboard',
      description: 'Manage users, monitor system health, and view analytics.',
      icon: FaUserShield,
      to: '/admin',
      color: 'hover:border-purple-500 border-2 border-transparent',
      iconColor: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Marketplace',
      description: 'Buy and sell agricultural products directly from farmers and suppliers.',
      icon: FaStore,
      to: '/marketplace',
      color: 'hover:border-yellow-500 border-2 border-transparent',
      iconColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      title: 'Market Insights',
      description: 'View real-time market trends, prices, and analysis.',
      icon: FaChartLine,
      to: '/fpo/market',
      color: 'hover:border-red-500 border-2 border-transparent',
      iconColor: 'text-red-600 bg-red-100'
    },
    {
      title: 'Crop Simulator',
      description: 'Simulate crop growth and estimate yields based on different conditions.',
      icon: FaTractor,
      to: '/farmer/simulator',
      color: 'hover:border-teal-500 border-2 border-transparent',
      iconColor: 'text-teal-600 bg-teal-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container px-4 py-16 mx-auto text-center md:py-24">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Agriculture System</h1>
          <p className="max-w-3xl mx-auto text-lg text-green-100 md:text-xl">
            Empowering farmers with smart tools and direct market access
          </p>
        </div>
      </div>

      {/* Dashboard Selection */}
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Select Your Dashboard</h2>
          <p className="max-w-2xl mx-auto mt-2 text-gray-600">
            Choose the dashboard that best fits your role and start exploring the platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboards.map((dashboard, index) => (
            <div key={index} className={`${dashboard.color} rounded-lg`}>
              <DashboardCard
                title={dashboard.title}
                description={dashboard.description}
                icon={dashboard.icon}
                to={dashboard.to}
                color={dashboard.iconColor}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container px-4 py-8 mx-auto">
          <div className="text-center text-gray-600">
            <p>© {new Date().getFullYear()} Agriculture System. All rights reserved.</p>
            <div className="flex justify-center mt-4 space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">About</span>
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Contact</span>
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Terms</span>
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Privacy</span>
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
