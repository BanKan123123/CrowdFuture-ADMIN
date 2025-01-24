import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthRequest } from './request';
import { LoginRequest, LoginResponse } from './auth.interface';
import { toast } from 'react-toastify';

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
     'login',
     async (credentials, { rejectWithValue }) => {
          try {
               const response = await AuthRequest.loginRequest(credentials);
               return response.data;
          } catch (error: any) {
               toast.error(error.response.data.message);
               return rejectWithValue(error.response.data.message);
          }
     },
);

export const register = createAsyncThunk<any, any>('register', async (credentials, { rejectWithValue }) => {
     try {
          const response = await AuthRequest.registerRequest(credentials);
          return response.data;
     } catch (error: any) {
          toast.error(error.response.data.message);
          return rejectWithValue(error.response.data.message);
     }
});
