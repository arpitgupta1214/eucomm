import config from "data/config.json";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

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

const socialIcons = {
  linkedin: <FaLinkedinIn />,
  telegram: <FaTelegramPlane />,
  youtube: <FaYoutube />,
  twitter: <FaTwitter />,
  facebook: <FaFacebookF />,
};

const Footer = () => {
  return (
    <div className="mt-auto bg-skin-dark pt-14">
      <div className="flex flex-wrap text-white max-w-content mx-auto px-4">
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
          <div className="flex">
            {config.socialLinks.map((socialLink) => (
              <div key={`social-link-${socialLink.name}`} className="ml-5">
                {React.cloneElement(socialIcons[socialLink.name], {
                  className: "text-sm",
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
