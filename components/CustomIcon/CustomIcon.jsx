import React from "react";
import {
  FaLinkedinIn,
  FaTelegramPlane,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
  FaMountain,
  FaPhoneAlt,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { AiFillPieChart, AiOutlineClockCircle } from "react-icons/ai";
import { HiDocumentText, HiOutlineDesktopComputer } from "react-icons/hi";
import { VscLoading } from "react-icons/vsc";
import { BsArrowRight, BsDot, BsCircleFill } from "react-icons/bs";

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
  VscLoading,
  BsArrowRight,
  FaAngleDown,
  FaAngleUp,
  BsDot,
  BsCircleFill,
  AiOutlineClockCircle,
  HiOutlineDesktopComputer,
};

const CustomIcon = ({ name, className }) =>
  React.createElement(
    Object.keys(icons).includes(name) ? icons[name] : FaMountain,
    {
      className,
    }
  );

export default CustomIcon;
