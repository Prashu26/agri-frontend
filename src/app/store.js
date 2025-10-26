import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cropReducer from '../features/crops/cropSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

// Load initial state from localStorage if available
const preloadedState = {};
const user = localStorage.getItem('user');
if (user) {
  preloadedState.auth = {
    user: JSON.parse(user),
    isAuthenticated: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  };
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crops: cropReducer,
    dashboard: dashboardReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/register/fulfilled', 'auth/login/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
