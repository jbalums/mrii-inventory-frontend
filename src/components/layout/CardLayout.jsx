const CardLayout = (props) => {
  const { className, children } = props;
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl shadow-gray-300 p-8 ${
        className || ""
      } `}
    >
      {children}
    </div>
  );
};

export default CardLayout;
