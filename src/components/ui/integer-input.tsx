"use client";

import React, { useState } from 'react';
import { Input } from './input';  

interface IntegerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const IntegerInput: React.FC<IntegerInputProps> = (props) => {
  const [value, setValue] = useState<string>(props.value ? props.value.toString() : '');

  // Định dạng số với dấu chấm (.) mỗi 3 chữ số
  const formatNumber = (val: string) => {
    // Loại bỏ ký tự không phải số và loại bỏ số 0 ở đầu
    const onlyNumbers = val.replace(/[^\d]/g, '').replace(/^0+/, '');  
    
    // Nếu rỗng (sau khi xóa 0), trả về '0'
    if (onlyNumbers === '') return '0';

    // Thêm dấu chấm sau mỗi 3 chữ số
    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Xử lý khi nhập vào
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatNumber(rawValue);
    setValue(formattedValue);

    if (props.onChange) {
      // Chuyển đổi về dạng số và loại bỏ dấu chấm
      const numericValue = parseFloat(formattedValue.replace(/\./g, '')) || 0;
      e.target.value = numericValue.toString();
      props.onChange(e);  
    }
  };

  return (
    <Input
      {...props}  
      type="text"  // Đảm bảo là dạng text để xử lý dấu chấm
      value={value}
      onChange={handleChange}
    />
  );
};

export default IntegerInput;
