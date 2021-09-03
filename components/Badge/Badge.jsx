const Badge = ({ type, name }) => {
  return (
    <div
      className={`uppercase p-2 mb-2 rounded-full font-bold text-xs text-skin-badge${type} bg-skin-badge${type} bg-opacity-10  w-min whitespace-nowrap`}
    >
      {name}
    </div>
  );
};

export default Badge;
