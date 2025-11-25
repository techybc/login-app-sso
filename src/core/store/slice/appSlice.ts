import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  loader: { isLoading: boolean; count: number };
}

const initialState: AppState = {
  loader: { isLoading: false, count: 0 }
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showLoader(state: AppState) {
      state.loader.count += 1;
      state.loader.isLoading = true;
    },
  }
});

export const { showLoader } = appSlice.actions;
export default appSlice.reducer;