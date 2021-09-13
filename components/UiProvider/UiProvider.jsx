import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "store/uiSlice";

const UiProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fullConfig = resolveConfig(tailwindConfig);
    const breakpoint = parseInt(fullConfig.theme.screens.md);
    const width = window.innerWidth;
    if (breakpoint < width) {
      dispatch(uiActions.setIsMobile({ isMobile: false }));
    }
    window.onresize = () => {
      const width = window.innerWidth;
      dispatch(uiActions.setIsMobile({ isMobile: breakpoint > width }));
    };
  }, [dispatch]);
  return children;
};

export default UiProvider;
