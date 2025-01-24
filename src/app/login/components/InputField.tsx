import React from 'react';
import { InputFieldProps } from '@/interface/auth.interface';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const InputField = ({
     type,
     name,
     placeholder,
     value,
     icon,
     isPassword,
     isShowPassword,
     inputChange,
     showPassword,
}: InputFieldProps) => {
     return (
          <div className="relative">
               <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">{icon}</span>
               <input
                    type={isPassword ? (isShowPassword ? 'text' : 'password') : type}
                    name={name}
                    value={value}
                    onChange={inputChange}
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white 
                  focus:border-[#00D1FF] focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/20"
                    placeholder={placeholder}
               />
               {isPassword && (
                    <button
                         type="button"
                         onClick={() => showPassword(!isShowPassword)}
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                    >
                         {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
               )}
          </div>
     );
};

export default InputField;
