import SocialLinks from "components/SocialLinks/SocialLinks";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const Subpage = ({ subpage }) => (
  <div className="mt-5 text-sm font-medium opacity-60">{subpage.name}</div>
);

const Subpages = ({ subpages }) => {
  if (subpages.length <= 5) {
    return (
      <>
        {subpages.map((subpage) => (
          <Subpage key={`footer-subpage-${subpage.slug}`} subpage={subpage} />
        ))}
      </>
    );
  } else {
    return (
      <>
        {subpages.slice(0, 4).map((subpage) => (
          <Subpage key={`footer-subpage-${subpage.slug}`} subpage={subpage} />
        ))}
        <Subpage subpage={{ name: `+${subpages.length - 4}` }} />
      </>
    );
  }
};

const Footer = ({ config }) => {
  return (
    <div className="mt-auto bg-skin-dark pt-14 flex flex-col items-center">
      <div className="flex flex-wrap text-white content-md px-4">
        <div className="w-full flex">
          <div className="flex-shrink-0 whitespace-nowrap text-xl font-medium">
            {config.companyName}
          </div>
          <div className="flex-grow flex flex-wrap">
            {config.pages.map((page) => (
              <div
                key={`footer-page-${page.slug}`}
                className="ml-12 mb-12 flex-shrink-0 w-52 flex flex-col"
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-xl font-medium">{page.name}</span>
                  <BsArrowRight />
                </div>
                {page.subpages && <Subpages subpages={page.subpages} />}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex items-center justify-between py-5 border-t border-skin-light">
          <span className="text-xs opacity-60">{config.copyrightText}</span>
          {/* social */}
          <SocialLinks links={config.socialLinks} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
