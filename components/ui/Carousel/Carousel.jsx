import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowButton } from "components/ui";

const Carousel = ({ children }) => {
  const mappedItems = useMemo(
    () => children.map((child, idx) => ({ component: child, id: idx })),
    [children]
  );

  const [items, setItems] = useState(mappedItems);

  useEffect(() => {
    setItems(mappedItems);
  }, [mappedItems]);

  const onPrev = () => {
    const newItems = [...items];
    const last = newItems[newItems.length - 1];
    newItems.unshift({ ...last, id: newItems[0].id - 1 });

    setItems(newItems);

    setTimeout(() => {
      setItems(newItems.slice(0, newItems.length - 1));
    }, 10);
  };

  const onNext = () => {
    setItems((items) => {
      const newItems = [...items];
      const first = newItems.shift();
      first.id = newItems[newItems.length - 1].id + 1;
      newItems.push(first);
      return newItems;
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-6 w-full flex overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              key={`item-${item.id}`}
              transition={{ type: "tween" }}
              className={`flex-shrink-0 flex overflow-hidden relative ${item.id}`}
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
