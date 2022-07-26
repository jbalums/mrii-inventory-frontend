const CheckBoxField = (props) => {
  const {
    label,
    className = "",
    inputClassName = "",
    ref,
    register,
    ...rest
  } = props;
  return (
    <div className={`flex flex-col  hover:text-blue-900 ${className || ""}`}>
      <label className="hover:cursor-pointer">
        <input type="checkbox" class="form-checkbox rounded text-blue-500" />
        <span className="ml-2 text-sm">{label || ""}</span>
      </label>
    </div>
  );
};

export default CheckBoxField;
