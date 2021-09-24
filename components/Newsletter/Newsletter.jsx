const Newsletter = () => {
  return (
    <div className="w-full bg-skin-light py-16 px-5 flex flex-col items-center">
      <div className="mb-4 text-2xl">Sign Up to Our Newsletter</div>
      <div className="mb-6 text-skin-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
      </div>
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          className="mr-4 flex-grow bg-skin-base rounded-full py-3 px-5 text-skin-light"
          placeholder="Email"
        />
        <button className="bg-skin-dark rounded-full py-3 px-8 text-white">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
