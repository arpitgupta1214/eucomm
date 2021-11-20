import React from "react";
import Image from "next/image";
import CustomIcon from "components/CustomIcon";

const socialIcons = {
  linkedin: "FaLinkedinIn",
  telegram: "FaTelegramPlane",
  youtube: "FaYoutube",
  twitter: "FaTwitter",
  facebook: "FaFacebookF",
};

const SocialLinks = ({ links, color, round, w, full }) => {
  return (
    <div className={`flex ${full ? "w-full justify-between" : ""}`}>
      {links.map((socialLink, idx) => (
        <button
          key={`social-link-${socialLink.name}`}
          className={`${idx !== 0 ? "ml-5" : ""}`}
        >
          {color ? (
            <div
              className={`w-${w || 8} h-${w || 8} ${
                round ? "rounded-full overflow-hidden" : ""
              }`}
            >
              <Image
                src={socialLink.image}
                alt=""
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
          ) : (
            <div className={`w-${w || 3} h-${w || 3}`}>
              <CustomIcon
                name={socialIcons[socialLink.name]}
                className="w-full h-full"
              />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default SocialLinks;
