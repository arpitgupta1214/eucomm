import Image from "next/image";
import Link from "next/link";
import s from "./header.module.scss";
import { useRouter } from "next/router";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const config = {
  companyName: "EU Comm",
  pages: [
    { name: "Conversations", slug: "conversations" },
    { name: "Agenda", slug: "agenda" },
    { name: "Members", slug: "members" },
    { name: "Documents", slug: "documents" },
    {
      name: "Resources",
      slug: "resources",
      subpages: [
        { name: "Whitepapers", slug: "whitepapers" },
        { name: "Videos", slug: "videos" },
        { name: "Webinars", slug: "webinars" },
        { name: "Publications", slug: "publications" },
        { name: "Press releases", slug: "press-releases" },
        { name: "Podcasts", slug: "podcasts" },
        { name: "Channels", slug: "channels" },
        { name: "Document library", slug: "document-library" },
      ],
    },
    { name: "Calendar", slug: "calendar" },
    { name: "Directory", slug: "directory" },
  ],
};

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
  const currentSubPage = new RegExp(`^${path[1]}$`, "i");
  const headerRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [openPageSubmenu, setOpenPageSubmenu] = useState([]);

  useEffect(() => {
    setOpenMenu(!isMobile);
  }, [isMobile]);

  const toggleMenu = () => {
    setOpenMenu((openMenu) => !openMenu);
  };

  const togglePageSubmenu = (page) => {
    setOpenPageSubmenu((openPageSubmenu) => {
      if (openPageSubmenu === page) {
        return null;
      } else {
        return page;
      }
    });
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
              const isCurrent = currentPage.test(page.name);
              const isOpen = openPageSubmenu === page.name;
              return (
                <div
                  key={`head-page-${idx}`}
                  className="md:mx-4 flex flex-col pb-8 md:pb-4"
                >
                  <div
                    className={`text-lg md:text-base flex items-center ${
                      isCurrent ? s.currentPage : ""
                    }`}
                  >
                    {page.name}
                    <button
                      className="ml-1 pb-1 cursor-pointer"
                      onClick={() => togglePageSubmenu(page.name)}
                    >
                      {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, "margin-top": 0 }}
                        animate={{ height: "auto", "margin-top": "5px" }}
                        exit={{ height: 0, "margin-top": 0 }}
                        className="md:absolute md:top-full pl-5 border-l border-skin-base flex flex-col bg-skin-base overflow-hidden"
                      >
                        {page.subpages?.map((subpage, idx) => {
                          const isCurrent = currentSubPage.test(subpage.name);
                          return (
                            <Link
                              key={`subpage-${idx}`}
                              href={`/${page.slug}/${subpage.slug}`}
                              passHref
                            >
                              <div
                                className={`text-sm font-medium my-3 md:my-2 cursor-pointer ${
                                  isCurrent
                                    ? "text-skin-highlight"
                                    : "text-skin-light"
                                }`}
                              >
                                {subpage.name}
                              </div>
                            </Link>
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
