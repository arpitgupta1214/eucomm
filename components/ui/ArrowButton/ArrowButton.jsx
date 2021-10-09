import CustomIcon from "components/CustomIcon";
const ArrowButton = ({ direction, onClick }) => {
  return (
    <button
      className="w-full h-full border border-skin-highlight text-skin-highlight text-2xl flex justify-center items-center"
      onClick={onClick}
    >
      {direction === "forward" && <CustomIcon name="BsArrowRight" />}
      {direction === "backward" && <CustomIcon name="BsArrowLeft" />}
    </button>
  );
};

export default ArrowButton;
