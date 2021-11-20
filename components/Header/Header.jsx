import s from "./header.module.scss";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import CustomIcon from "components/CustomIcon";
import SocialLinks from "components/SocialLinks";

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

const Header = ({ config }) => {
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
    <header className="w-full z-20 flex flex-col items-center">
      <div className="w-full relative flex flex-col items-center">
        <div className="hidden md:flex flex-col items-center w-full bg-skin-dark py-2">
          <div className="content-md flex items-center justify-end text-white">
            <SocialLinks links={config.socialLinks} />
            <span className="mx-5 text-xs opacity-10">|</span>
            <button
              className="text-xs font-base leading-tight"
              onClick={() => router.push("/projects/members-area")}
            >
              Members Area
            </button>
          </div>
        </div>
        <div
          ref={headerRef}
          className={`content-md flex items-center md:items-start pt-4 md:pt-6 justify-between bg-skin-base${
            isMobile && openMenu ? "fixed top-0 left-0 w-full mb-4" : ""
          }`}
        >
          {/* logo */}
          <div className="text-skin-highlight font-bold text-2xl uppercase">
            <button onClick={() => redirect("/")}>{config.companyName}</button>
          </div>
          {/* menu  */}
          <button className={s.menuBtn} onClick={toggleMenu}>
            <span className={`${s.line} ${s.top} ${openMenu ? s.open : ""}`} />
            <span
              className={`${s.line} ${s.bottom} ${openMenu ? s.open : ""}`}
            />
          </button>
          <MenuWrapper
            isMobile={isMobile}
            openMenu={openMenu}
            headerRef={headerRef}
          >
            {/* pages */}
            <div className="grid md:grid-flow-col md:gap-7">
              {config.pages.map((page, idx) => {
                const isCurrent = currentPage.test(page.slug);
                const isOpen = openPageSubmenu === page.slug;
                return (
                  <div
                    key={`head-page-${idx}`}
                    className={`flex flex-col pb-8 md:pb-4 ${
                      isCurrent
                        ? "md:border-b-2 border-skin-highlight font-medium"
                        : "text-skin-light"
                    }`}
                    onMouseEnter={() => {
                      page.subpages && setOpenPageSubmenu(page.slug);
                    }}
                    onMouseLeave={() => setOpenPageSubmenu(null)}
                  >
                    <div className="text-lg md:text-sm flex items-center">
                      <button
                        className="mr-1"
                        onClick={() => redirect(`/${page.slug}`)}
                      >
                        {page.name}
                      </button>
                      {page.subpages && (
                        <button
                          className="ml-1 pb-1 cursor-pointer"
                          onClick={() => {
                            page.subpages &&
                              setOpenPageSubmenu(
                                page.slug === openPageSubmenu ? null : page.slug
                              );
                          }}
                        >
                          <CustomIcon
                            name="BsChevronDown"
                            className={`text-xs transition-all ${
                              isOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, marginTop: 0 }}
                          animate={{
                            height: "auto",
                            marginTop: isMobile ? "5px" : "0px",
                          }}
                          className={`${s.subpages} md:w-screen md:absolute md:left-0 md:top-full md:pl-5 md:pr-2 text-skin-base border-l border-skin-base flex flex-col md:items-center bg-skin-base overflow-hidden`}
                        >
                          <div className="md:my-7 content-md md:grid grid-cols-3 gap-6">
                            {page.subpages?.map((subpage, idx) => {
                              const isCurrent = currentSubPage.test(
                                subpage.name
                              );
                              return (
                                <button
                                  key={`subpage-${idx}`}
                                  onClick={() =>
                                    redirect(`/${page.slug}/${subpage.slug}`)
                                  }
                                  className={`${s.subpage} md:p-4 flex items-center hover:bg-skin-light`}
                                >
                                  {/* image */}
                                  {!isMobile && (
                                    <div
                                      className={`${s.icon} mr-4 w-12 h-12 bg-skin-light flex items-center justify-center`}
                                    >
                                      <CustomIcon
                                        name={subpage.icon || "FaMountain"}
                                        className="text-2xl"
                                      />
                                    </div>
                                  )}
                                  <div className="flex flex-col">
                                    <div
                                      className={`text-sm md:text-lg md:font-bold text-skin-light md:text-skin-base my-3 md:mt-0 md:mb-2 cursor-pointer text-left ${
                                        isCurrent ? "text-skin-highlight" : ""
                                      }`}
                                      onClick={() => {
                                        isMobile
                                          ? toggleMenu()
                                          : () => setOpenPageSubmenu(null);
                                      }}
                                    >
                                      {subpage.name}
                                    </div>
                                    {!isMobile && (
                                      <div className="flex">
                                        <span className="text-sm text-skin-highlight mr-1">
                                          View More
                                        </span>
                                        <CustomIcon name="BsArrowRight" />
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </MenuWrapper>
        </div>
      </div>
      {/*breadcrumb*/}
      {path.length > 1 && (
        <div className="content-md flex mt-3">
          {path.map((page, idx) => {
            const last = idx === path.length - 1;
            return (
              <div
                key={`breadcrumb-page-${idx}`}
                className="text-xs whitespace-nowrap"
              >
                <span
                  className={`capitalize ${
                    last ? "text-skin-light" : "text-skin-highlight"
                  }`}
                >
                  {decodeURIComponent(page).replace(/-/g, " ")}
                </span>
                {!last && (
                  <span className="text-skin-light mx-2 md:mx-5">/</span>
                )}
              </div>
            );
          })}
        </div>
      )}
      {path.length > 1 && (
        <button
          className="content-md flex mt-4 text-xs text-skin-highlight"
          onClick={() => router.back()}
        >
          <CustomIcon name="BiArrowBack" className="mr-2" />
          <span>Back</span>
        </button>
      )}
    </header>
  );
};

export default Header;
