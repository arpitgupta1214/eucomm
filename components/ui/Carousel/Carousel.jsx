import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowButton } from "components/ui";

const Carousel = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(children.map((child, idx) => ({ component: child, id: idx })));
  }, [children]);
  const onPrev = () => {
    let last;
    setItems((items) => {
      const newItems = [...items];
      last = newItems.pop();
      return newItems;
    });
    setTimeout(
      () =>
        setItems((items) => {
          const newItems = [...items];
          newItems.unshift(last);
          return newItems;
        }),
      200
    );
  };

  const onNext = () => {
    let first;
    setItems((items) => {
      const newItems = [...items];
      first = newItems.shift();
      return newItems;
    });
    setTimeout(
      () =>
        setItems((items) => {
          const newItems = [...items];
          newItems.push(first);
          return newItems;
        }),
      200
    );
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-6 w-full flex">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              initial={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              key={`item-${item.id}`}
              className={`flex-shrink-0 flex overflow-hidden relative`}
            >
              <div className="flex-shrink-0 object-cover object-left">
                {item.component}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex">
        <div className="mx-3 w-12 h-12">
          <ArrowButton direction="backward" onClick={onPrev} />
        </div>
        <div className="mx-3 w-12 h-12">
          <ArrowButton direction="forward" onClick={onNext} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
