import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const Carousel = ({ images }) => {
  const [imgList, setImgList] = useState(
    images.map((img, idx) => ({ src: img, id: idx }))
  );
  const onPrev = () => {
    let last;
    setImgList((imgList) => {
      const newImgList = [...imgList];
      last = newImgList.pop();
      return newImgList;
    });
    setTimeout(
      () =>
        setImgList((imgList) => {
          const newImgList = [...imgList];
          newImgList.unshift(last);
          return newImgList;
        }),
      200
    );
  };

  const onNext = () => {
    let first;
    setImgList((imgList) => {
      const newImgList = [...imgList];
      first = newImgList.shift();
      return newImgList;
    });
    setTimeout(
      () =>
        setImgList((imgList) => {
          const newImgList = [...imgList];
          newImgList.push(first);
          return newImgList;
        }),
      200
    );
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="h-80 mb-6 w-full flex overflow-hidden">
        <AnimatePresence>
          {imgList.map((img) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ width: 0, marginRight: 0 }}
              key={`carousel-img-${img.id}`}
              className={`h-full flex-shrink-0 mr-6 overflow-hidden relative`}
            >
              <img
                src={img.src}
                alt=""
                className="h-full object-cover object-left"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex mb-6">
        <button
          className="w-12 h-12 mx-3 rounded-full border border-skin-dark flex justify-center items-center"
          onClick={onPrev}
        >
          <GrLinkPrevious />
        </button>
        <button
          className="w-12 h-12 mx-3 rounded-full border border-skin-dark flex justify-center items-center"
          onClick={onNext}
        >
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
