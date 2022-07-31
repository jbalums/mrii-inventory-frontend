import {forwardRef} from "react";

const TextInputField = (props, ref) => {
  const {
    type = "text",
    label,
    className = "",
    inputClassName = "",
    register,
    ...rest
  } = props;
  return (
    <div className={`flex flex-col ${className || ""}`}>
      {label ? <label className="text-base mb-2">{label}</label> : ""}
      <input
        type={type}
        ref={ref}
        defaultValue={''}
        {...rest}
        className={`border py-3 border-gray-300 text-base text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:shadow-lg duration-100 shadow-blue-300 focus:ring-blue-500 block w-full p-2.5`}
      />
    </div>
  );
};

export default forwardRef(TextInputField);
