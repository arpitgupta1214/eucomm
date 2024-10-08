import CustomIcon from "components/CustomIcon";
const Checkbox = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`h-5 w-5 border text-white flex justify-center items-center text-xl ${
        checked
          ? "bg-skin-highlight border-skin-highlight"
          : "bg-white border-skin-base"
      }`}
    >
      <CustomIcon name="FiCheck" />
    </button>
  );
};

export default Checkbox;
