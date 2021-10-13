import { motion } from "framer-motion";

const { default: CustomIcon } = require("components/CustomIcon");

const Loader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          ease: "easeInOut",
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="w-20 h-20"
      >
        <CustomIcon
          name="VscLoading"
          className="w-full h-full text-skin-highlight"
        />
      </motion.div>
    </div>
  );
};

export default Loader;
