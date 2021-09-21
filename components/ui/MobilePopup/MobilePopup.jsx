import { useSelector } from "react-redux";
import s from "./mobilePopup.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
const MobilePopup = ({ children, display, onClose }) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const onDrag = (event, info) => {
    if (info.offset.y > 20) {
      clearAllBodyScrollLocks();
      onClose();
    }
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {display && (
          <motion.div
            initial={{
              height: 0,
              boxShadow: "0 0 0 5000px rgba(0,0,0,0)",
            }}
            animate={{
              height: "auto",
              boxShadow: "0 0 0 5000px rgba(0,0,0,0.8)",
            }}
            exit={{
              height: 0,
              boxShadow: "0 0 0 5000px rgba(0,0,0,0)",
            }}
            className={`${s.popup} w-screen fixed left-0 bottom-0 z-50 bg-skin-base rounded-t-3xl flex flex-col items-center p-4 pt-0`}
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={onDrag}
              className="h-8 mb-1 flex items-center justify-center"
              ref={(dragger) => dragger && disableBodyScroll(dragger)}
            >
              <div className="rounded-full h-1 w-11 bg-gray-100" />
            </motion.div>
            <div className="w-full flex-grow overflow-y-scroll">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  } else {
    if (!display) {
      return <></>;
    }
    return children;
  }
};

export default MobilePopup;
