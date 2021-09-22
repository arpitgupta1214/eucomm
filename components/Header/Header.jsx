import Image from "next/image";
import s from "./header.module.scss";
import { useRouter } from "next/router";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import config from "data/config.json";

const user = {
  name: "Amanda Smith",
  img: "/2.png",
};
const MenuWrapper = ({ isMobile, openMenu, headerRef, children }) => {
  const headerHeight = headerRef.current?.offsetHeight;
  if (isMobile) {
    if (openMenu) {
      return (
        <div
          className="flex flex-col bg-white absolute left-0 top-full w-full pt-6 pb-48 px-4 border-t border-skin-base overflow-y-scroll"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
          ref={(menu) => disableBodyScroll(menu)}
        >
          {children}
        </div>
      );
    } else {
      return "";
    }
  } else {
    return children;
  }
};

const Header = () => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const router = useRouter();
  const path = router.asPath.split("/").filter((page) => !!page);
  const currentPage = new RegExp(`^${path[0]}$`, "i");
  const currentSubPage = new RegExp(`^${path[1]}$`, "i");
  const headerRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [openPageSubmenu, setOpenPageSubmenu] = useState(null);

  useEffect(() => {
    setOpenMenu(!isMobile);
  }, [isMobile]);

  const toggleMenu = () => {
    if (openMenu) {
      setOpenMenu(false);
      clearAllBodyScrollLocks();
    } else {
      setOpenMenu(true);
    }
  };

  const redirect = (path) => {
    router.push(path);
  };
  return (
    <header>
      <div
        ref={headerRef}
        className={`flex items-center md:items-start pt-4 md:pt-6 justify-between z-10 bg-skin-base ${
          isMobile && openMenu ? "fixed top-0 left-0 w-full p-4" : "relative"
        }`}
      >
        {/* logo */}
        <div className="text-skin-highlight font-bold text-2xl uppercase">
          <button onClick={() => redirect("/")}>{config.companyName}</button>
        </div>
        {/* menu  */}
        <button className={s.menuBtn} onClick={toggleMenu}>
          <span className={`${s.line} ${s.top} ${openMenu ? s.open : ""}`} />
          <span className={`${s.line} ${s.bottom} ${openMenu ? s.open : ""}`} />
        </button>
        <MenuWrapper
          isMobile={isMobile}
          openMenu={openMenu}
          headerRef={headerRef}
        >
          {/* pages */}
          <div className="flex flex-col md:flex-row">
            {config.pages.map((page, idx) => {
              const isCurrent = currentPage.test(page.name);
              const isOpen = openPageSubmenu === page.name;
              return (
                <div
                  key={`head-page-${idx}`}
                  className="md:mx-4 flex flex-col pb-8 md:pb-4"
                  onMouseEnter={() => {
                    setOpenPageSubmenu(page.name);
                  }}
                  onMouseLeave={() => setOpenPageSubmenu(null)}
                  onClick={() => {
                    setOpenPageSubmenu(
                      page.name === openPageSubmenu ? null : page.name
                    );
                  }}
                >
                  <div
                    className={`text-lg md:text-base flex items-center ${
                      isCurrent ? s.currentPage : ""
                    }`}
                  >
                    {page.name}
                    <button className="ml-1 pb-1 cursor-pointer">
                      {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, marginTop: 0 }}
                        animate={{
                          height: "auto",
                          marginTop: isMobile ? "5px" : "0px",
                        }}
                        exit={{ height: 0, marginTop: 0 }}
                        className="md:absolute md:top-full pl-5 pr-2 border-l border-skin-base flex flex-col bg-skin-base overflow-hidden"
                      >
                        {page.subpages?.map((subpage, idx) => {
                          const isCurrent = currentSubPage.test(subpage.name);
                          return (
                            <button
                              key={`subpage-${idx}`}
                              onClick={() =>
                                redirect(`/${page.slug}/${subpage.slug}`)
                              }
                            >
                              <div
                                className={`text-sm font-medium transition-all transform md:hover:translate-x-2 my-3 md:my-2 cursor-pointer text-left ${
                                  isCurrent
                                    ? "text-skin-highlight"
                                    : "text-skin-light"
                                }`}
                                onClick={() => {
                                  isMobile
                                    ? toggleMenu()
                                    : () => setOpenPageSubmenu(null);
                                }}
                              >
                                {subpage.name}
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          {/* profile */}
          <div className="flex items-center bg-skin-light rounded-full self-start">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-gray-200">
              <Image
                src={user.img}
                alt="profile"
                height="50px"
                width="50px"
                className="w-full h-full"
              />
            </div>
            {isMobile && (
              <span className="ml-2 mr-4 text-sm font-medium">{user.name}</span>
            )}
          </div>
        </MenuWrapper>
      </div>
      {/*breadcrumb*/}
      <div className="flex mt-3">
        {["home", ...path].map((page, idx) => {
          const last = idx === path.length;
          return (
            <div key={`breadcrumb-page-${idx}`} className="text-xs">
              <span
                className={`capitalize ${
                  last ? "text-skin-light" : "text-skin-highlight"
                }`}
              >
                {page.replace(/-/g, " ")}
              </span>
              {!last && <span className="text-skin-light mx-5">/</span>}
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
