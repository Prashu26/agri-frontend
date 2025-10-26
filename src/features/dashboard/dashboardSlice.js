import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API calls
const fetchDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          totalFarms: 24,
          totalCrops: 5,
          upcomingTasks: 3,
          alerts: 2,
        },
        recentActivities: [
          { id: 1, type: 'planting', crop: 'Soybean', date: '2023-11-15' },
          { id: 2, type: 'irrigation', crop: 'Groundnut', date: '2023-11-10' },
        ],
      });
    }, 500);
  });
};

// Async thunks
export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, thunkAPI) => {
    try {
      const response = await fetchDashboardData();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  stats: {
    totalFarms: 0,
    totalCrops: 0,
    upcomingTasks: 0,
    alerts: 0,
  },
  recentActivities: [],
  status: 'idle',
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload.stats;
        state.recentActivities = action.payload.recentActivities;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;

// Selectors
export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectRecentActivities = (state) => state.dashboard.recentActivities;
export const selectDashboardStatus = (state) => state.dashboard.status;
