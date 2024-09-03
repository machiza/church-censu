import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";

type TextinputProps = {
  type?: string;
  label?: string;
  placeholder?: string;
  classLabel?: string;
  className?: string;
  classGroup?: string;
  register?: any; // You might want to be more specific with the type here, depending on your form library
  name?: string;
  readonly?: boolean;
  value?: string;
  error?: any; // This should be typed based on your validation library
  icon?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  horizontal?: boolean;
  validate?: any; // Same as above, based on your validation
  isMask?: boolean;
  msgTooltip?: boolean;
  description?: string;
  hasicon?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: any; // You might need to specify this based on Cleave options
  onFocus?: () => void;
  defaultValue?: string;
  [key: string]: any; // To capture any additional props
};

const Textinput: React.FC<TextinputProps> = ({
  type,
  label,
  placeholder = "Add placeholder",
  classLabel = "form-label",
  className = "",
  classGroup = "",
  register,
  name,
  readonly,
  value,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  isMask,
  msgTooltip,
  description,
  hasicon,
  onChange,
  options,
  onFocus,
  defaultValue,

  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`relative fromGroup  ${error ? "has-error" : ""}  ${
        horizontal ? "flex" : ""
      }  ${validate ? "is-valid" : ""} `}
    >
      <div className={`relative ${horizontal ? "flex-1" : ""}`}>
        {name && !isMask && (
          <input
            type={type === "password" && open === true ? "text" : type}
            {...register(name)}
            {...rest}
            className={`${
              error ? " has-error" : " "
            } peer form-control py-2 ${className} placeholder:text-transparent focus:placeholder:text-gray-500`}
            placeholder={placeholder}
            readOnly={readonly}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            onChange={onChange}
          />
        )}
        {!name && !isMask && (
          <input
            type={type === "password" && open === true ? "text" : type}
            className={`peer form-control py-2 ${className} placeholder:text-transparent`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            id={id}
          />
        )}
        {label && (
          <label
            htmlFor={id}
            className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 placeholder:text-slate-50 transform -translate-y-3 scale-75 top-0 truncate z-1 origin-[0] bg-white peer-focus:bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:text-slate-900 peer-focus:top-0.5 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto `}
          >
            {label}
          </label>
        )}
        {name && isMask && (
          <Cleave
            {...register(name)}
            {...rest}
            placeholder={placeholder}
            options={options}
            className={`${
              error ? " has-error" : " "
            } form-control py-2 ${className}  `}
            onFocus={onFocus}
            id={id}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
          />
        )}
        {!name && isMask && (
          <Cleave
            placeholder={placeholder}
            options={options}
            className={`${
              error ? " has-error" : " "
            } form-control py-2 ${className}  `}
            onFocus={onFocus}
            id={id}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange}
          />
        )}
        {/* icon */}
        <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
          {hasicon && (
            <span
              className="cursor-pointer text-secondary-500"
              onClick={handleOpen}
            >
              {open && type === "password" && (
                <Icon icon="heroicons-outline:eye" />
              )}
              {!open && type === "password" && (
                <Icon icon="heroicons-outline:eye-off" />
              )}
            </span>
          )}

          {error && (
            <span className="text-danger-500">
              <Icon icon="heroicons-outline:information-circle" />
            </span>
          )}
          {validate && (
            <span className="text-success-500">
              <Icon icon="bi:check-lg" />
            </span>
          )}
        </div>
      </div>
      {/* error and success message*/}
      {error && (
        <div
          className={` mt-2 ${
            msgTooltip
              ? " inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded"
              : " text-danger-500 block text-sm"
          }`}
        >
          {error.message}
        </div>
      )}
      {/* validated and success message*/}
      {validate && (
        <div
          className={` mt-2 ${
            msgTooltip
              ? " inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded"
              : " text-success-500 block text-sm"
          }`}
        >
          {validate}
        </div>
      )}
      {/* only description */}
      {description && <span className="input-description">{description}</span>}
    </div>
  );
};

export default Textinput;
