import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../../baseUrl';

export const fetchBrandPage = createAsyncThunk(
  'BrandPage/fetchBrandPage',
  async () => {
    const response = await fetch(`${baseUrl}/getbrandPage`);
    return response.json();
  }
);

const BrandPageSlice = createSlice({
  name: 'BrandPage',
  initialState: {
    data: [],
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
      .addCase(fetchBrandPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandPage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchBrandPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default BrandPageSlice.reducer;
export const { fetchSuccess } = BrandPageSlice.actions;
