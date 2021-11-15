const Button = ({ text, onClick, dark }) => (
  <button
    className={`pt-3 pb-2 leading-none px-6 text-sm md:text-base ${
      dark ? "text-white bg-skin-highlight" : "text-skin-highlight"
    } border border-skin-highlight`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
