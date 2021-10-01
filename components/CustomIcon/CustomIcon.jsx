import React from "react";
import {
  FaLinkedinIn,
  FaTelegramPlane,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
  FaMountain,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { AiFillPieChart } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";

const icons = {
  FaLinkedinIn,
  FaTelegramPlane,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
  FaMountain,
  FaPhoneAlt,
  MdWork,
  TiGroup,
  AiFillPieChart,
  HiDocumentText,
};

const CustomIcon = ({ name, className }) =>
  React.createElement(
    Object.keys(icons).includes(name) ? icons[name] : FaMountain,
    {
      className,
    }
  );

export default CustomIcon;
