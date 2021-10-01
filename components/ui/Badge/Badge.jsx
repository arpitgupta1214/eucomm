const Badge = ({ type, name, small }) => {
  return (
    <div
      className={`uppercase mb-2 ${small ? "" : "md:mb-4"}
      rounded-full font-bold text-skin-badge${type} 
      bg-skin-badge${type} bg-opacity-10  w-min whitespace-nowrap`}
      style={{
        fontSize: small ? "10px" : "11px",
        padding: small ? "7px 6px 4px 6px" : "9px 10px 5px 10px",
      }}
    >
      {name}
    </div>
  );
};

export default Badge;
