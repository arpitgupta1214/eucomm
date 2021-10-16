const Newsletter = () => {
  return (
    <div className="w-full bg-skin-light px-5 py-10 md:p-16 md:pb-8 md:pr-24 flex flex-col items-center">
      {/* content */}
      <div className="mb-2 md:mb-5 font-bold text-lg md:text-2xl">
        Sign Up to Our Newsletter
      </div>
      <div className="mb-3 md:mb-6 w-3/4 md:w-auto text-sm md:text-base text-skin-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
      </div>
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          className="mr-4 flex-grow shadow-sm bg-skin-base pt-3 pb-2 px-5 text-skin-light border border-skin-base text-sm md:text-base leading-none md:leading-7"
          placeholder="Email"
        />
        <button className="bg-skin-highlight md:font-medium pt-3 pb-2 px-7 text-white whitespace-nowrap text-sm md:text-base leading-none md:leading-7">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
