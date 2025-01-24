export interface FormData {
     email: string;
     password: string;
     name?: string;
}

export interface InputFieldProps {
     type: string;
     name: string;
     placeholder: string;
     value: string;
     icon: React.ReactNode;
     isPassword?: boolean;
     isShowPassword?: boolean;
     inputChange?: any;
     showPassword?: any;
}
