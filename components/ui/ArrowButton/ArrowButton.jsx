import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const ArrowButton = ({ direction, onClick }) => {
  return (
    <button
      className="w-full h-full border border-skin-highlight text-skin-highlight text-2xl flex justify-center items-center"
      onClick={onClick}
    >
      {direction === "forward" && <BsArrowRight />}
      {direction === "backward" && <BsArrowLeft />}
    </button>
  );
};

export default ArrowButton;
