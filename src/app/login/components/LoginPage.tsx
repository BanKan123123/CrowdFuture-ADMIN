'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { FormData } from '@/interface/auth.interface';
import InputField from './InputField';
import { useAppDispatch, useAppSelector } from '@/core/hook';
import { login, register } from '@/redux/auth/thunks';
import { AuthSeletor } from '@/redux/auth/selector';
import { AppAction } from '@/redux/app/AppSlice';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'register' | 'forgot';

const LoginPage = () => {
     const dispatch = useAppDispatch();
     const route = useRouter();

     const status = useAppSelector(AuthSeletor.status);
     const admin = useAppSelector(AuthSeletor.admin);

     const [mode, setMode] = useState<AuthMode>('login');
     const [showPassword, setShowPassword] = useState<boolean>(false);
     const [formData, setFormData] = useState<FormData>({
          email: 'uyen@gmail.com',
          password: '12345678',
          name: '',
     });

     useEffect(() => {
          switch (status) {
               case 'loading':
                    dispatch(AppAction.showLoading());
                    break;

               case 'succeeded':
                    if (mode === 'login') {
                         localStorage.setItem('accessToken', admin?.accessToken);
                         setTimeout(() => {
                              dispatch(AppAction.hiddenLoading());
                              route.push('/dashboard');
                         }, 2000);
                    } else if (mode === 'register') {
                         setMode('login');
                         setFormData({
                              email: '',
                              password: '',
                              name: '',
                         })
                         setTimeout(() => {
                              dispatch(AppAction.hiddenLoading());
                         }, 2000);
                    }
                    break;

               case 'failed':
                    dispatch(AppAction.hiddenLoading());
               default:
                    dispatch(AppAction.hiddenLoading());
                    break;
          }
     }, [status, admin]);

     // Form title and welcome text based on mode
     const titles: Record<AuthMode, string> = {
          login: 'Đăng nhập',
          register: 'Đăng ký',
          forgot: 'Quên mật khẩu',
     };

     const welcomeTexts: Record<AuthMode, string> = {
          login: 'Chào mừng trở lại!',
          register: 'Tạo tài khoản mới',
          forgot: 'Đặt lại mật khẩu của bạn',
     };

     // Event handlers
     const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
          const { name, value } = e.target;
          setFormData((prev) => ({
               ...prev,
               [name]: value,
          }));
     };

     const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
          e.preventDefault();
          // Handle form submission based on mode
          try {
               switch (mode) {
                    case 'login':
                         console.log('Login:', {
                              email: formData.email,
                              password: formData.password,
                         });
                         dispatch(
                              login({
                                   email: formData.email,
                                   password: formData.password,
                              }),
                         );
                         break;
                    case 'register':
                         console.log('Register:', formData);
                         dispatch(
                              register({
                                   email: formData.email,
                                   password: formData.password,
                                   username: formData.name,
                              }),
                         );
                         break;
                    case 'forgot':
                         console.log('Forgot password:', { email: formData.email });
                         break;
               }
          } catch (error) {
               console.error('Error:', error);
          }
     };

     return (
          <div className="flex items-center justify-center min-h-screen p-4">
               <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                         <h2 className="text-3xl font-bold text-blue-400">{titles[mode]}</h2>
                         <p className="mt-2 text-gray-400">{welcomeTexts[mode]}</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                         {mode === 'register' && (
                              <div>
                                   <label className="block text-sm font-medium text-gray-300 mb-1">Họ và tên</label>
                                   <InputField
                                        type="text"
                                        name="name"
                                        placeholder="Nhập họ và tên của bạn"
                                        value={formData.name || ''}
                                        icon={<FaUser />}
                                        inputChange={handleInputChange}
                                   />
                              </div>
                         )}

                         <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                              <InputField
                                   type="email"
                                   name="email"
                                   placeholder="mail@example.com"
                                   value={formData.email}
                                   icon={<FaEnvelope />}
                                   inputChange={handleInputChange}
                              />
                         </div>

                         {mode !== 'forgot' && (
                              <div>
                                   <label className="block text-sm font-medium text-gray-300 mb-1">Mật khẩu</label>
                                   <InputField
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        icon={<FaLock />}
                                        isPassword
                                        inputChange={handleInputChange}
                                        isShowPassword={showPassword}
                                        showPassword={setShowPassword}
                                   />
                              </div>
                         )}

                         {mode === 'login' && (
                              <div className="flex items-center justify-end">
                                   <button
                                        type="button"
                                        onClick={() => setMode('forgot')}
                                        className="text-sm text-blue-400 hover:text-blue-300"
                                   >
                                        Quên mật khẩu?
                                   </button>
                              </div>
                         )}

                         <button
                              type="submit"
                              className="w-full py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#7000FF]"
                         >
                              {mode === 'forgot' ? 'Gửi link đặt lại mật khẩu' : titles[mode]}
                         </button>
                    </form>

                    {mode !== 'forgot' && (
                         <p className="mt-8 text-center text-sm text-gray-400">
                              {mode === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                              <button
                                   className="font-medium text-blue-400 hover:text-blue-300"
                                   onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                              >
                                   {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
                              </button>
                         </p>
                    )}
               </div>

               <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    rel="stylesheet"
               />
          </div>
     );
};

export default LoginPage;
