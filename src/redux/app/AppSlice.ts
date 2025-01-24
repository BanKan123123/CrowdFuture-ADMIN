import { AppState } from '@/interface/app.interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AppState = {
     isLoading: false,
};

const AppSlice = createSlice({
     name: 'app',
     initialState,
     reducers: {
          showLoading: (state: AppState) => {
               state.isLoading = true;
          },

          hiddenLoading: (state: AppState) => {
               state.isLoading = false;
          },
     },
});

export const AppAction = AppSlice.actions

const AppReducer = AppSlice.reducer;
export default AppReducer;
