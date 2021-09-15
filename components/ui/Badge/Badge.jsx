const Badge = ({ type, name }) => {
  return (
    <div
      className={`uppercase p-2 mb-2 md:mb-4
      rounded-full font-bold text-skin-badge${type} 
      bg-skin-badge${type} bg-opacity-10  w-min whitespace-nowrap`}
      style={{ fontSize: "11px", padding: "9px 10px 5px 10px" }}
    >
      {name}
    </div>
  );
};

export default Badge;
