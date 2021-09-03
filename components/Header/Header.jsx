import Image from "next/image";
import Link from "next/link";
import s from "./header.module.scss";
import { useRouter } from "next/router";
import { FaAngleDown } from "react-icons/fa";
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

const Header = () => {
  const router = useRouter();
  const path = router.asPath.split("/").filter((page) => !!page);
  const currentPage = new RegExp(`^${path[0]}$`, "i");

  return (
    <header>
      <div className="flex justify-between">
        {/* logo */}
        <div className="text-skin-highlight font-bold text-2xl uppercase mt-6">
          <Link href="/">{config.companyName}</Link>
        </div>
        {/* pages */}
        <div className="flex">
          {config.pages.map((page, idx) => {
            const isCurrent = currentPage.test(page);
            return (
              <Link
                key={`head-page-${idx}`}
                href={`/${page.toLowerCase()}`}
                passHref={true}
              >
                <div
                  className={`mx-4 mt-6 pb-4 cursor-pointer flex items-center ${
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
        <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-gray-200 mt-4">
          <Image
            src="/2.png"
            alt="profile"
            height="50px"
            width="50px"
            className="w-full h-full"
          />
        </div>
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
                {page}
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
