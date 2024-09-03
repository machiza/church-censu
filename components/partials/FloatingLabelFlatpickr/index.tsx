'use client'

import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import clsx from 'clsx';
import './FloatingLabelFlatpickr.css'; // Custom styles

const FloatingLabelFlatpickr = ({ label, value, onChange, id, horizontal, name, register, errors, ...props }: any) => {
  // const [isFocused, setIsFocused] = useState(false);

  // const handleFocus = () => setIsFocused(true);
//   const handleBlur = () => setIsFocused(false);
  console.log(errors.birthdate);
  
  return (
    <div className={clsx(
        ` relative ${horizontal ? "flex-1" : ""}`,
        {
          'floating-label-error': errors.birthdate,
          'floating-label-wrapper': !errors.birthdate
        }
        )}>
      <Flatpickr
        id={id}
        value={value}
        onChange={onChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        // {...register(name)}
        {...props}
      />
      {label && (
        <label
        htmlFor={id}
        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 placeholder:text-slate-50 transform -translate-y-3 scale-75 top-0 z-1 origin-[0] bg-white peer-focus:bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:text-slate-900 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto `}
        >
        {label}
        </label>
      )}
      {errors.birthdate && <div className="mt-2 text-danger-500 block text-sm">{`${errors.birthdate.message}`}</div>}
    </div>
  );
};

export default FloatingLabelFlatpickr;
