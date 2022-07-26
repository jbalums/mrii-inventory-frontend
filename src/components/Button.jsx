const Button = (props) => {
  const { type = "primary", size = "md", className, children, ...rest } = props;

  const defaultBtnClass = `text-center duration-50 hover:scale-[1.02] hover:shadow-md hover:shadow-gray-300 transition-transform rounded-lg sm:w-auto cursor-pointer`;

  const btnBg = () => {
    switch (type) {
      case "primary":
        return `text-white bg-gradient-to-br from-blue-500 to-blue-900`;
        break;

      default:
        break;
    }
  };

  const btnSize = () => {
    switch (size) {
      case "md":
        return "py-3 px-5 w-full text-base font-medium";
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={`${defaultBtnClass} ${btnBg()} ${btnSize()} ${
        className || ""
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Button;
