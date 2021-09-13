import { useSelector } from "react-redux";
import s from "./mobilePopup.module.scss";
import { motion, AnimatePresence } from "framer-motion";
const MobilePopup = ({ children, display, onClose }) => {
  const isMobile = useSelector((state) => state.ui.isMobile);

  const onDrag = (event, info) => {
    if (info.offset.y > 40) {
      onClose();
    }
  };
  if (isMobile) {
    return (
      <AnimatePresence>
        {display && (
          <motion.div
            initial={{
              transform: "translateY(100%)",
              "box-shadow": "0 0 0 5000px rgba(0,0,0,0)",
            }}
            animate={{
              transform: "translateY(0)",
              "box-shadow": "0 0 0 5000px rgba(0,0,0,0.8)",
            }}
            exit={{
              transform: "translateY(100%)",
              "box-shadow": "0 0 0 5000px rgba(0,0,0,0)",
            }}
            className={`${s.popup} w-screen fixed left-0 bottom-0 z-50 bg-skin-base rounded-t-3xl pt-8 flex flex-col items-center p-4`}
          >
            <motion.div drag="y" onDrag={onDrag}>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 rounded-full h-1 w-11 bg-gray-100" />
            </motion.div>
            <div className="w-full flex-grow overflow-y-scroll">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  } else {
    return children;
  }
};

export default MobilePopup;
