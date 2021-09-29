import Image from "next/image";

const Newsletter = () => {
  return (
    <div className="w-full bg-skin-light p-16 pb-8 pr-32 flex items-end">
      {/* content */}
      <div className="mr-20 mb-8 flex-shrink-0 w-full max-w-md">
        <div className="mb-5 font-bold text-2xl">Sign Up to Our Newsletter</div>
        <div className="mb-6 text-skin-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
        </div>
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            className="mr-4 flex-grow shadow-sm bg-skin-base py-3 px-5 text-skin-light border border-skin-base"
            placeholder="Email"
          />
          <button className="bg-skin-highlight font-bold py-3 px-7 text-white">
            Sign Up
          </button>
        </div>
      </div>
      {/* image */}
      <div className="flex-grow relative">
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
