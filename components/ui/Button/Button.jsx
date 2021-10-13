const Button = ({ text, onClick, dark }) => (
  <button
    className={`py-3 px-6 text-sm md:text-base ${
      dark ? "text-white bg-skin-highlight" : "text-skin-highlight bg-skin-base"
    } border border-skin-highlight`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
