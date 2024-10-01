import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../../baseUrl';

export const fetchProductInnerDetails = createAsyncThunk(
  'productInnerDetails/fetchProductInnerDetails', // Corrected the typo here
  async (pId) => {
    const response = await fetch(`${baseUrl}/getProductInnerDetails?pId=${pId}`);
    return response.json();
  }
);

const productInnerDetailsSlice = createSlice({
  name: 'productInnerDetails', // Corrected the typo here
  initialState: {
    data: null, // Initialize with null to signify no data initially
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductInnerDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductInnerDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProductInnerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productInnerDetailsSlice.reducer;
export const { fetchSuccess } = productInnerDetailsSlice.actions;
