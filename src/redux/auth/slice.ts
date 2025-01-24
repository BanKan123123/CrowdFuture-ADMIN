import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginResponse, RegisterRequest } from './auth.interface';
import { login, register } from './thunks';
import { toast } from 'react-toastify';

const initialState: AuthState = {
     admin: {},
     status: 'idle',
     error: null,
};

const AuthSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
          logout: (state) => {
               state.admin = null;
               state.status = 'idle';
               state.error = null;
          },
     },
     extraReducers: (builder: any) => {
          builder
               .addCase(login.pending, (state: AuthState) => {
                    state.status = 'loading';
               })
               .addCase(login.fulfilled, (state: AuthState, { payload }: PayloadAction<LoginResponse>) => {
                    state.status = 'succeeded';
                    state.admin = payload;
               })
               .addCase(login.rejected, (state: AuthState, { payload }: PayloadAction<LoginResponse>) => {
                    state.status = 'failed';
                    toast.error(payload.message);
               })
               .addCase(register.pending, (state: AuthState) => {
                    state.status = 'loading';
               })
               .addCase(register.fulfilled, (state: AuthState, { payload }: PayloadAction<LoginResponse>) => {
                    state.status = 'succeeded';
                    toast.success(payload.message);
               })
               .addCase(register.rejected, (state: AuthState, { payload }: PayloadAction<LoginResponse>) => {
                    state.status = 'failed';
                    toast.error(payload.message);
               });
     },
});

const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
