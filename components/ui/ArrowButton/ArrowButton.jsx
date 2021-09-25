import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const ArrowButton = ({ direction, onClick }) => {
  return (
    <button
      className="w-full h-full rounded-full border border-skin-dark flex justify-center items-center"
      onClick={onClick}
    >
      {direction === "forward" && <GrLinkNext />}
      {direction === "backward" && <GrLinkPrevious />}
    </button>
  );
};

export default ArrowButton;
