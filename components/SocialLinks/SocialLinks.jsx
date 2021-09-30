import React from "react";
import loadable from "@loadable/component";
import Image from "next/image";

const socialIcons = {
  linkedin: "FaLinkedinIn",
  telegram: "FaTelegramPlane",
  youtube: "FaYoutube",
  twitter: "FaTwitter",
  facebook: "FaFacebookF",
};

const IconLoader = ({ name }) => {
  const Icon = loadable(() =>
    import("react-icons/fa").then((icons) => icons[name])
  );
  return <Icon className="text-sm" />;
};

const SocialLinks = ({ links, color }) => {
  return (
    <div className="flex">
      {links.map((socialLink, idx) => (
        <button
          key={`social-link-${socialLink.name}`}
          className={`${idx !== 0 ? "ml-5" : ""}`}
        >
          {color ? (
            <div className="w-8 h-8">
              <Image
                src={socialLink.image}
                alt=""
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
          ) : (
            <IconLoader name={socialIcons[socialLink.name]} />
          )}
        </button>
      ))}
    </div>
  );
};

export default SocialLinks;
