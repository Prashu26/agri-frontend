import React, { useState, useEffect } from 'react';
import { 
  FaTrophy, 
  FaGift, 
  FaHistory, 
  FaArrowUp, 
  FaArrowDown, 
  FaRegStar, 
  FaStar, 
  FaCoins,
  FaLeaf,
  FaChartLine,
  FaExchangeAlt,
  FaAward
} from 'react-icons/fa';

// Mock data for rewards and transactions
const mockRewardsData = {
  points: 1250,
  level: 'Gold',
  progress: 68, // percentage to next level
  nextLevel: 'Platinum',
  pointsToNextLevel: 300,
  badges: [
    { id: 1, name: 'Early Adopter', icon: <FaLeaf />, earned: true, date: '2024-01-15' },
    { id: 2, name: 'Crop Master', icon: <FaSeedling />, earned: true, date: '2024-03-22' },
    { id: 3, name: 'Contract Champion', icon: <FaFileContract />, earned: false },
    { id: 4, name: 'Market Expert', icon: <FaChartLine />, earned: false },
  ],
  recentTransactions: [
    { id: 1, type: 'earned', amount: 100, description: 'Contract Completion Bonus', date: '2024-10-20', icon: <FaCoins className="text-yellow-500" /> },
    { id: 2, type: 'earned', amount: 50, description: 'Monthly Activity Bonus', date: '2024-10-15', icon: <FaGift className="text-purple-500" /> },
    { id: 3, type: 'spent', amount: -200, description: 'Redeemed: Farm Supplies Voucher', date: '2024-10-10', icon: <FaExchangeAlt className="text-blue-500" /> },
    { id: 4, type: 'earned', amount: 150, description: 'Crop Quality Bonus', date: '2024-10-05', icon: <FaAward className="text-green-500" /> },
  ],
  availableRewards: [
    { id: 1, name: 'Fertilizer Discount', cost: 200, description: '20% off on next purchase', icon: <FaLeaf className="text-green-600" /> },
    { id: 2, name: 'Seed Pack', cost: 500, description: 'Free seed pack of your choice', icon: <FaSeedling className="text-green-600" /> },
    { id: 3, name: 'Farm Equipment', cost: 1000, description: '10% off on farm tools', icon: <FaTractor className="text-green-600" /> },
  ]
};

const RewardsDashboard = () => {
  const [rewardsData, setRewardsData] = useState(mockRewardsData);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setRewardsData(mockRewardsData);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRedeemReward = (reward) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const confirmRedeem = () => {
    if (!selectedReward) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the backend
      setRewardsData(prev => ({
        ...prev,
        points: prev.points - selectedReward.cost,
        recentTransactions: [
          {
            id: Date.now(),
            type: 'spent',
            amount: -selectedReward.cost,
            description: `Redeemed: ${selectedReward.name}`,
            date: new Date().toISOString().split('T')[0],
            icon: <FaExchangeAlt className="text-blue-500" />
          },
          ...prev.recentTransactions
        ]
      }));
      
      setShowRedeemModal(false);
      setSelectedReward(null);
      setIsProcessing(false);
      
      // Show success message
      alert(`Successfully redeemed ${selectedReward.name}!`);
    }, 1000);
  };

  const renderStars = (level) => {
    const stars = [];
    const starCount = level === 'Bronze' ? 1 : level === 'Silver' ? 2 : level === 'Gold' ? 3 : 4;
    
    for (let i = 0; i < 4; i++) {
      stars.push(
        i < starCount 
          ? <FaStar key={i} className="text-yellow-400" /> 
          : <FaRegStar key={i} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Rewards</h1>
          <p className="text-gray-600">Track your points, badges, and redeem rewards</p>
        </div>

        {/* Points Summary Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm font-medium text-green-100">Your Points Balance</p>
              <div className="flex items-end mt-1">
                <span className="text-4xl font-bold">{rewardsData.points}</span>
                <span className="ml-2 text-green-200 mb-1">points</span>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {renderStars(rewardsData.level)}
                </div>
                <span className="ml-2 text-sm font-medium">{rewardsData.level} Member</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm font-medium">Progress to {rewardsData.nextLevel}</p>
              <div className="w-48 bg-white bg-opacity-30 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-yellow-400 h-2.5 rounded-full" 
                  style={{ width: `${rewardsData.progress}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 text-green-100">
                {rewardsData.pointsToNextLevel} more points to {rewardsData.nextLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rewards'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Available Rewards
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transaction History
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'badges'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Badges & Achievements
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Your Rewards Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <FaHistory className="mr-2 text-gray-500" /> Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {rewardsData.recentTransactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div className="p-2 bg-gray-100 rounded-lg mr-3">
                          {tx.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{tx.description}</p>
                          <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`font-semibold ${tx.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.type === 'earned' ? '+' : ''}{tx.amount} pts
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className="mt-4 text-sm text-green-600 hover:text-green-800 font-medium"
                  >
                    View all transactions →
                  </button>
                </div>

                {/* Available Rewards */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <FaGift className="mr-2 text-green-500" /> Available Rewards
                  </h3>
                  <div className="space-y-4">
                    {rewardsData.availableRewards.slice(0, 2).map((reward) => (
                      <div key={reward.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="p-2 bg-green-100 rounded-lg mr-3">
                              {reward.icon}
                            </div>
                            <div>
                              <h4 className="font-medium">{reward.name}</h4>
                              <p className="text-sm text-gray-600">{reward.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRedeemReward(reward)}
                            disabled={rewardsData.points < reward.cost}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              rewardsData.points >= reward.cost
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {rewardsData.points >= reward.cost 
                              ? `${reward.cost} pts` 
                              : 'Not enough points'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('rewards')}
                    className="mt-4 text-sm text-green-600 hover:text-green-800 font-medium"
                  >
                    View all rewards →
                  </button>
                </div>
              </div>

              {/* Badges Preview */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <FaTrophy className="mr-2 text-yellow-500" /> Your Badges
                  </h3>
                  <button 
                    onClick={() => setActiveTab('badges')}
                    className="text-sm text-green-600 hover:text-green-800 font-medium"
                  >
                    View all badges →
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {rewardsData.badges.slice(0, 4).map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`p-4 rounded-lg text-center ${badge.earned ? 'bg-white border border-gray-200' : 'bg-gray-50 opacity-60'}`}
                    >
                      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 ${
                        badge.earned ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {badge.icon}
                      </div>
                      <h4 className="text-sm font-medium">{badge.name}</h4>
                      {badge.earned && (
                        <p className="text-xs text-gray-500 mt-1">Earned on {new Date(badge.date).toLocaleDateString()}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Available Rewards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewardsData.availableRewards.map((reward) => (
                  <div key={reward.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl text-green-600 mb-4">
                        {reward.icon}
                      </div>
                      <h3 className="text-lg font-medium mb-1">{reward.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                      <div className="text-2xl font-bold text-green-600 mb-4">
                        {reward.cost} pts
                      </div>
                      <button
                        onClick={() => handleRedeemReward(reward)}
                        disabled={rewardsData.points < reward.cost}
                        className={`w-full py-2 px-4 rounded-md font-medium ${
                          rewardsData.points >= reward.cost
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {rewardsData.points >= reward.cost 
                          ? 'Redeem Now' 
                          : 'Not enough points'}
                      </button>
                      {rewardsData.points < reward.cost && (
                        <p className="text-xs text-gray-500 mt-2">
                          You need {reward.cost - rewardsData.points} more points
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">How to earn more points?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Complete your profile: <span className="font-medium">+50 points</span></span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Sign a new contract: <span className="font-medium">+100 points</span></span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Complete a successful harvest: <span className="font-medium">+200 points</span></span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Refer a friend: <span className="font-medium">+150 points</span></span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Transaction History</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Filter:</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>All Transactions</option>
                    <option>Earned Points</option>
                    <option>Redeemed Rewards</option>
                    <option>This Month</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rewardsData.recentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg">
                              {tx.icon}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{tx.description}</div>
                              <div className="text-sm text-gray-500">{tx.type === 'earned' ? 'Points earned' : 'Points redeemed'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(tx.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                          tx.type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.type === 'earned' ? '+' : ''}{tx.amount} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{rewardsData.recentTransactions.length}</span> of{' '}
                  <span className="font-medium">{rewardsData.recentTransactions.length}</span> results
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Badges Tab */}
          {activeTab === 'badges' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Badges & Achievements</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Your Badges</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {rewardsData.badges
                    .filter(badge => badge.earned)
                    .map((badge) => (
                      <div key={badge.id} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-2xl text-green-600 mb-2">
                          {badge.icon}
                        </div>
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Earned on {new Date(badge.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Available Badges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rewardsData.badges
                    .filter(badge => !badge.earned)
                    .map((badge) => (
                      <div key={badge.id} className="bg-gray-50 rounded-lg p-4 flex items-start">
                        <div className="bg-gray-200 text-gray-400 w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4 flex-shrink-0">
                          {badge.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {badge.name === 'Contract Champion' 
                              ? 'Sign 5 or more contracts' 
                              : badge.name === 'Market Expert' 
                                ? 'Complete 10+ market transactions' 
                                : 'Earn this badge by being active on the platform'}
                          </p>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full" 
                              style={{ width: '30%' }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">30% complete</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">About Badges</h3>
                <p className="text-gray-700 mb-4">
                  Badges are awarded for your achievements and contributions to the platform. 
                  Collect them all to showcase your farming expertise and unlock special benefits!
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Earn badges by completing specific actions on the platform</li>
                  <li>Some badges have multiple levels - keep improving to reach the next level</li>
                  <li>Special badges may unlock exclusive rewards or features</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
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
                    <FaGift className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Redeem {selectedReward.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to redeem <span className="font-medium">{selectedReward.name}</span> for {selectedReward.cost} points?
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {selectedReward.description}
                      </p>
                      <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                        <p className="text-sm text-yellow-700">
                          After confirmation, {selectedReward.cost} points will be deducted from your balance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmRedeem}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Redemption'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowRedeemModal(false);
                    setSelectedReward(null);
                  }}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsDashboard;
