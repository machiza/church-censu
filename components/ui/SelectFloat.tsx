import React, { Fragment } from "react";
import Icon from "@/components/ui/Icon";
const Select: React.FC<any> = ({
  label,
  placeholder = "Select Option",
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
  msgTooltip,
  description,
  onChange,
  options,
  defaultValue,

  size,
  ...rest
}) => {
  options = options || Array(3).fill("option");
  return (
    <div
      className={`relative fromGroup  ${error ? "has-error" : ""}  ${
        horizontal ? "flex" : ""
      }  ${validate ? "is-valid" : ""} `}
    >
      <div className={`relative ${horizontal ? "flex-1" : ""}`}>
        {name && (
          <select
            onChange={onChange}
            {...register(name)}
            {...rest}
            className={`${
              error ? " has-error" : " "
            } peer form-control py-2  appearance-none ${className}  `}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            id={id}
            value={value}
            size={size}
            defaultValue={defaultValue}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option: any, i: any) => (
              <Fragment key={i}>
                {option.value && option.label ? (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ) : (
                  <option key={i} value={option}>
                    {option}
                  </option>
                )}
              </Fragment>
            ))}
          </select>
        )}
        {!name && (
          <select
            onChange={onChange}
            className={`${
              error ? " has-error" : " "
            } peer form-control py-2 appearance-none ${className}  `}
            disabled={disabled}
            id={id}
            value={value}
            size={size}
            defaultValue={defaultValue}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option: any, i: any) => (
              <Fragment key={i}>
                {option.value && option.label ? (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ) : (
                  <option key={i} value={option}>
                    {option}
                  </option>
                )}
              </Fragment>
            ))}
          </select>
        )}
        {label && (
          <label
            htmlFor={id}
            className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 placeholder:text-slate-50 transform -translate-y-3 scale-75 top-0 truncate z-1 origin-[0] bg-white peer-focus:bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:text-slate-900 peer-focus:top-0.5 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto `}
          >
            {label}
          </label>
        )}
        {/* icon */}
        <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
          <span className=" relative -right-2 inline-block text-slate-900 dark:text-slate-300 pointer-events-none">
            <Icon icon="heroicons:chevron-down" />
          </span>
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

export default Select;
