import { forwardRef } from "react";

const TextAreaInputField = (props, ref) => {
    const {
        type = "text",
        label,
        className = "",
        inputClassName = "",
        register,
        error,
        icon,
        iconClassName = "",
        value,
        ...rest
    } = props;
    return (
        <label
            className={`flex flex-col ${className || ""} ${
                error ? "text-danger" : ""
            }`}
        >
            {label ? <span className="text-sm mb-2">{label}</span> : ""}
            <div className="w-full relative">
                {icon ? (
                    <div
                        className={`absolute h-full left-0 flex items-center justify-center p-4 text-dark ${iconClassName}`}
                    >
                        {icon}
                    </div>
                ) : (
                    ""
                )}
                <textarea
                    type={type}
                    ref={ref || register}
                    {...rest}
                    className={`border py-3 border-transparent text-sm text-dark sm:text-sm rounded-lg focus:ring-1 focus:shadow-lg duration-100 shadow-blue-300 focus:ring-blue-500 block w-full p-2.5 outline-none ${
                        error ? "border-danger text-danger" : ""
                    }  ${icon ? "!pl-10" : ""} ${
                        inputClassName ? inputClassName : ""
                    }`}
                >
                    {value}
                </textarea>
            </div>
            {error ? <span className="text-danger text-sm">{error}</span> : ""}
        </label>
    );
};

export default forwardRef(TextAreaInputField);
