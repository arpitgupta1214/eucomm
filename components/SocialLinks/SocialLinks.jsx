import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const socialIcons = {
  linkedin: <FaLinkedinIn />,
  telegram: <FaTelegramPlane />,
  youtube: <FaYoutube />,
  twitter: <FaTwitter />,
  facebook: <FaFacebookF />,
};

const SocialLinks = ({ links }) => {
  return (
    <div className="flex">
      {links.map((socialLink, idx) => (
        <button
          key={`social-link-${socialLink.name}`}
          className={`${idx !== 0 ? "ml-5" : ""}`}
        >
          {React.cloneElement(socialIcons[socialLink.name], {
            className: "text-sm",
          })}
        </button>
      ))}
    </div>
  );
};

export default SocialLinks;
