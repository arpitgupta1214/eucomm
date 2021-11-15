import CustomIcon from "components/CustomIcon";
import SocialLinks from "components/SocialLinks/SocialLinks";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Subpage = ({ page, subpage }) => (
  <a
    href={`/${page.slug}/${subpage.slug}`}
    className="mt-5 text-sm font-medium opacity-60 text-white"
  >
    {subpage.name}
  </a>
);

const OtherPages = ({ other, page }) => {
  const [showMore, setShowMore] = useState(false);

  if (!showMore) {
    return (
      <button
        className="mt-5 text-sm font-medium opacity-60 text-skin-highlight text-left underline"
        onClick={() => setShowMore(true)}
      >
        {`+${other.length}`}
      </button>
    );
  }
  return other.map((subpage) => (
    <Subpage
      key={`footer-subpage-${subpage.slug}`}
      page={page}
      subpage={subpage}
    />
  ));
};

const Subpages = ({ page, subpages }) => {
  const showLength = 4;
  const length = subpages.length;
  return (
    <>
      {subpages
        .slice(0, showLength < length ? showLength - 1 : showLength)
        .map((subpage) => (
          <Subpage
            key={`footer-subpage-${subpage.slug}`}
            page={page}
            subpage={subpage}
          />
        ))}
      {showLength < length && (
        <OtherPages page={page} other={subpages.slice(showLength - 1)} />
      )}
    </>
  );
};

const Footer = ({ config }) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  return (
    <div className="mt-auto bg-skin-dark pt-14 flex items-center justify-center">
      <div className="flex flex-wrap text-white content-md px-4">
        <div className="w-full flex flex-col md:flex-row">
          <div className="mb-4 md:mb-0 flex-shrink-0 whitespace-nowrap text-xl font-medium pb-10 md:pb-0 border-b border-skin-base md:border-none">
            {config.companyName}
          </div>
          <div className="flex-grow flex flex-col md:flex-row md:flex-wrap">
            {config.pages.map((page) => (
              <div
                key={`footer-page-${page.slug}`}
                className="md:ml-12 mb-12 flex-shrink-0 w-full md:w-52 flex flex-col"
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-xl font-medium">{page.name}</span>
                  <CustomIcon name="BsArrowRight" />
                </div>
                {page.subpages && (
                  <Subpages page={page} subpages={page.subpages} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row-reverse md:items-center justify-between py-5 md:border-t md:border-skin-light">
          {/* social */}
          <div className="mb-6 md:mb-0 w-full md:w-auto">
            <SocialLinks
              links={config.socialLinks}
              w={isMobile && 6}
              full={isMobile}
            />
          </div>

          <span className="text-xs opacity-60">{config.copyrightText}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
