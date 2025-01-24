import MSTFetch from '@/core/fetch';
import { LoginRequest, RegisterRequest } from './auth.interface';

export const AuthRequest = {
     loginRequest(body: LoginRequest) {
          return MSTFetch.post(`/auth/login`, body);
     },
     registerRequest(body: RegisterRequest) {
          return MSTFetch.post(`/auth/register`, body)
     }
};
