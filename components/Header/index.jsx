import Image from "next/image";
import Link from "next/link";
import s from "./header.module.scss";
import { useRouter } from "next/router";

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
  const currentPage = new RegExp(`^${router.asPath.split("/")[1]}$`, "i");

  return (
    <header className="flex justify-between items-center">
      {/* logo */}
      <div className="text-skin-highlight font-bold text-lg uppercase">
        <Link href="/">{config.companyName}</Link>
      </div>
      {/* pages */}
      <div className="flex">
        {config.pages.map((page, idx) => {
          const isCurrent = currentPage.test(page);
          return (
            <div
              key={`page-${idx}`}
              className={`mx-4 py-4 cursor-pointer ${
                isCurrent ? s.currentPage : ""
              }`}
            >
              {page}
            </div>
          );
        })}
      </div>
      {/* profile */}
      <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-gray-200">
        <Image
          src="/2.png"
          alt="profile"
          height="50px"
          width="50px"
          className="w-full h-full"
        />
      </div>
    </header>
  );
};

export default Header;
