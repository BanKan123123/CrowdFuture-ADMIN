//Đăng nhập

export interface AuthState {
     admin: any;
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: any;
}

export interface LoginRequest {
     email: string;
     password: string;
}

export interface Admin {
     user: {
          id: string;
          email: string;
          role: string;
     };
     accessToken: string;
}

export interface LoginResponse {
     statusCode: boolean;
     message: string;
     data: Admin;
}

//Đăng ký
export interface RegisterRequest {
     email: string;
     password: string;
     username: string;
}

export interface RegisterResponse {

}
