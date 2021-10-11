import Image from "next/image";

const Newsletter = () => {
  return (
    <div className="w-full bg-skin-light px-5 py-10 md:p-16 md:pb-8 md:pr-32 flex items-end">
      {/* content */}
      <div className="md:mr-20 md:mb-8 flex-shrink-0 w-full max-w-md">
        <div className="mb-2 md:mb-5 font-bold text-lg md:text-2xl">
          Sign Up to Our Newsletter
        </div>
        <div className="mb-3 md:mb-6 w-3/4 md:w-auto text-sm md:text-base text-skin-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
        </div>
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            className="mr-4 flex-grow shadow-sm bg-skin-base py-3 px-5 text-skin-light border border-skin-base text-sm md:text-base"
            placeholder="Email"
          />
          <button className="bg-skin-highlight md:font-bold py-3 px-7 text-white whitespace-nowrap text-sm md:text-base">
            Sign Up
          </button>
        </div>
      </div>
      {/* image */}
      <div className="hidden md:block flex-grow relative">
        <div className="absolute w-full bottom-0 left-0">
          <Image
            src="/images/newsletter.png"
            alt=""
            width={856}
            height={963}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
