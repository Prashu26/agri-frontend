import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
import { store } from './app/store';

// Error boundary for the entire app
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
            <p className="mt-2 text-gray-700">
              We're sorry, but the application encountered an error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create root and render the app
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found. Make sure you have an element with id="root" in your HTML.');
} else {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
