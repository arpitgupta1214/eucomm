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
  FaMinus,
  FaPlus,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import {
  AiFillPieChart,
  AiOutlineClockCircle,
  AiOutlinePause,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineDelete,
} from "react-icons/ai";
import {
  HiDocumentText,
  HiOutlineDesktopComputer,
  HiPlay,
} from "react-icons/hi";
import { VscLoading } from "react-icons/vsc";
import {
  BsArrowRight,
  BsArrowLeft,
  BsDot,
  BsCircleFill,
  BsThreeDotsVertical,
  BsClockFill,
  BsArrowRepeat,
} from "react-icons/bs";
import {
  BiChevronDown,
  BiChevronUp,
  BiUpload,
  BiCalendar,
  BiDownload,
} from "react-icons/bi";
import { FiCheck, FiSearch, FiPlayCircle } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import {
  RiVolumeDownFill,
  RiVolumeMuteFill,
  RiAddCircleLine,
} from "react-icons/ri";
import { GrDocumentPpt, GrDocumentPdf, GrDocumentWord } from "react-icons/gr";
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
  BsArrowLeft,
  FaMinus,
  FaPlus,
  BiChevronDown,
  BiChevronUp,
  FiCheck,
  FiSearch,
  IoIosClose,
  AiOutlinePause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
  RiVolumeDownFill,
  RiVolumeMuteFill,
  BsThreeDotsVertical,
  AiFillHeart,
  AiOutlineHeart,
  BiUpload,
  GrDocumentPpt,
  GrDocumentPdf,
  GrDocumentWord,
  BsClockFill,
  BiCalendar,
  BiDownload,
  HiPlay,
  BsArrowRepeat,
  AiOutlineDelete,
  RiAddCircleLine,
  FiPlayCircle,
};

const CustomIcon = ({ name, className }) => {
  if (!Object.keys(icons).includes(name)) {
    throw new Error("Icon not Found");
  }
  return React.createElement(icons[name], {
    className,
  });
};
export default CustomIcon;
