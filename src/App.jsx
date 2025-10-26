import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Loader from './components/common/Loader';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));

// Farmer Components
const FarmerDashboard = lazy(() => import('./pages/farmer/Dashboard'));
const CropSimulator = lazy(() => import('./features/crops/CropSimulator'));
const ProfitabilityDashboard = lazy(() => import('./features/farmer/ProfitabilityDashboard'));
const FarmerChatbot = lazy(() => import('./features/farmer/Chatbot'));
const ContractsPortal = lazy(() => import('./features/farmer/ContractsPortal'));
const RewardsDashboard = lazy(() => import('./features/farmer/RewardsDashboard'));

// FPO/Buyer Components
const FPODashboard = lazy(() => import('./pages/fpo/Dashboard'));
const ProcurementDashboard = lazy(() => import('./features/fpo/ProcurementDashboard'));
const CommunicationPanel = lazy(() => import('./features/fpo/CommunicationPanel'));
const ContractVerification = lazy(() => import('./features/fpo/ContractVerification'));
const MarketAnalytics = lazy(() => import('./features/fpo/MarketAnalytics'));
const PaymentTracking = lazy(() => import('./features/fpo/PaymentTracking'));

// Admin Components
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdoptionHeatmap = lazy(() => import('./features/admin/AdoptionHeatmap'));
const SchemeTracker = lazy(() => import('./features/admin/SchemeTracker'));
const AnalyticsDashboard = lazy(() => import('./features/admin/AnalyticsDashboard'));
const AuditTrail = lazy(() => import('./features/admin/AuditTrail'));
const PolicyReports = lazy(() => import('./features/admin/PolicyReports2'));

// Common Components
const MarketplaceDashboard = lazy(() => import('./pages/marketplace/Dashboard'));
const AdvisoryChat = lazy(() => import('./features/chat/AdvisoryChat'));

// Error Boundary component for catching errors in the component tree
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h2>
          <p className="mb-6 text-gray-600">We're having trouble loading this page. Please try again later.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBoundary>
        <Suspense fallback={<Loader fullScreen />}>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* App Routes with Layout */}
            <Route element={<Layout />}>
              {/* ===== FARMER ROUTES ===== */}
              <Route path="farmer">
                <Route index element={<FarmerDashboard />} />
                <Route path="simulator" element={<CropSimulator />} />
                <Route path="profitability" element={<ProfitabilityDashboard />} />
                <Route path="chatbot" element={<FarmerChatbot />} />
                <Route path="contracts" element={<ContractsPortal />} />
                <Route path="rewards" element={<RewardsDashboard />} />
              </Route>
              
              {/* ===== FPO/BUYER ROUTES ===== */}
              <Route path="fpo">
                <Route index element={<FPODashboard />} />
                <Route path="procurement" element={<ProcurementDashboard />} />
                <Route path="communication" element={<CommunicationPanel />} />
                <Route path="contracts" element={<ContractVerification />} />
                <Route path="market" element={<MarketAnalytics />} />
                <Route path="payments" element={<PaymentTracking />} />
              </Route>
              
              {/* ===== ADMIN ROUTES ===== */}
              <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="heatmap" element={<AdoptionHeatmap />} />
                <Route path="schemes" element={<SchemeTracker />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
                <Route path="audit" element={<AuditTrail />} />
                <Route path="reports" element={<PolicyReports />} />
              </Route>
              
              {/* ===== COMMON ROUTES ===== */}
              <Route path="/marketplace" element={<MarketplaceDashboard />} />
              <Route path="/advisory" element={<AdvisoryChat />} />
            </Route>
            
            {/* Fallback Route - Keep only one */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
