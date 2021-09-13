import Image from "next/image";
import Link from "next/link";
import s from "./header.module.scss";
import { useRouter } from "next/router";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const config = {
  companyName: "EU Comm",
  pages: [
    "Conversations",
    "Agenda",
    "Members",
    "Documents",
    "Resources",
    "Calendar",
    "Directory",
  ],
};

const MenuWrapper = ({ isMobile, openMenu, headerRef, children }) => {
  const headerHeight = headerRef.current?.offsetHeight;
  if (isMobile) {
    if (openMenu) {
      return (
        <div
          className="flex flex-col bg-white absolute left-0 top-full w-full pt-6 px-4 border-t border-skin-base"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
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
  const headerRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    setOpenMenu(!isMobile);
  }, [isMobile]);

  const toggleMenu = () => {
    setOpenMenu((openMenu) => !openMenu);
  };
  return (
    <header>
      <div
        ref={headerRef}
        className={`flex items-center md:items-start pt-4 md:pt-6 justify-between z-50 bg-skin-base ${
          isMobile && openMenu ? "fixed top-0 left-0 w-full p-4" : "relative"
        }`}
      >
        {/* logo */}
        <div className="text-skin-highlight font-bold text-2xl uppercase">
          <Link href="/">{config.companyName}</Link>
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
              const isCurrent = currentPage.test(page);
              return (
                <Link
                  key={`head-page-${idx}`}
                  href={`/${page.toLowerCase()}`}
                  passHref={true}
                >
                  <div
                    className={`md:mx-4 pb-8 md:pb-4 text-lg md:text-base cursor-pointer flex items-center ${
                      isCurrent ? s.currentPage : ""
                    }`}
                  >
                    {page}
                    {isCurrent && <FaAngleDown className="ml-1" />}
                  </div>
                </Link>
              );
            })}
          </div>
          {/* profile */}
          <div className="flex items-center bg-skin-light rounded-full self-start">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-gray-200">
              <Image
                src="/2.png"
                alt="profile"
                height="50px"
                width="50px"
                className="w-full h-full"
              />
            </div>
            {isMobile && (
              <span className="ml-2 mr-4 text-sm font-medium">
                Amanda Smith
              </span>
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
