import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Mock API calls
const fetchCrops = async () => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Soybean', duration: 90, water: 'Moderate', temp: '25-35°C' },
        { id: 2, name: 'Groundnut', duration: 120, water: 'Low', temp: '25-30°C' },
        { id: 3, name: 'Sunflower', duration: 100, water: 'Low', temp: '20-30°C' },
      ]);
    }, 500);
  });
};

// Async thunks
export const getCrops = createAsyncThunk('crops/getCrops', async (_, thunkAPI) => {
  try {
    const response = await fetchCrops();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  crops: [],
  selectedCrop: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cropSlice = createSlice({
  name: 'crops',
  initialState,
  reducers: {
    selectCrop: (state, action) => {
      state.selectedCrop = action.payload;
    },
    clearSelectedCrop: (state) => {
      state.selectedCrop = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCrops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCrops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.crops = action.payload;
      })
      .addCase(getCrops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error('Failed to fetch crops');
      });
  },
});

export const { selectCrop, clearSelectedCrop } = cropSlice.actions;
export default cropSlice.reducer;

export const selectAllCrops = (state) => state.crops.crops;
export const getCropsStatus = (state) => state.crops.status;
export const getCropsError = (state) => state.crops.error;
export const getSelectedCrop = (state) => state.crops.selectedCrop;
