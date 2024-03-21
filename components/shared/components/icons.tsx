import { IoMdCheckmark } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md";
import { GoPencil, GoSignOut } from "react-icons/go";
import { IoAnalyticsOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { MdElectricBolt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { IoMdArrowUp } from "react-icons/io";
import { FaBottleDroplet, FaBoxOpen, FaLink, FaRegUser } from "react-icons/fa6";
import { RiExternalLinkLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { FiPlusCircle, FiUser } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosRepeat } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { BsCart, BsHeart, BsSearch, BsShop } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbMapPinSearch } from "react-icons/tb";

export const ICONS = {
  right: <IoMdCheckmark />,
  homeMobile: <TiHomeOutline size={25} />,
  dashboard: <MdOutlineDashboard />,
  write: <GoPencil />,
  analytics: <IoAnalyticsOutline />,
  audience: <GoPeople />,
  electric: <MdElectricBolt />,
  settings: <IoSettingsOutline />,
  world: <BiWorld />,
  logOutMobile: <CgLogOut />,
  logOut: <CgLogOut size={22} />,
  topArrow: <IoMdArrowUp />,
  rightArrow: <FaAngleRight size={25} />,
  copy: <FaLink />,
  link: <RiExternalLinkLine />,
  backArrow: <IoIosArrowBack />,
  eye: <MdOutlineRemoveRedEye />,
  cross: <RxCross2 />,
  profile: <CgProfile />,
  plus: <FiPlusCircle />,
  delete: <MdDeleteOutline />,
  regenerate: <IoIosRepeat />,
  cart: <BsCart size={25} />,
  cartMobile: <BsCart size={20} />,
  favourite: <BsHeart size={25} />,
  favouriteMobile: <BsHeart size={20} />,
  search: <BsSearch size={25} />,
  searchMobile: <BsSearch size={20} />,
  hamburger: <GiHamburgerMenu size={25} />,
  user: <FiUser size={27} />,
  shopMobile: <BsShop size={24} />,
  oilBottleMobile: <FaBottleDroplet size={25} />,
  signOutMobile: <GoSignOut size={22} />,
  trackOrder: <TbMapPinSearch size={25} />,
  trackOrderMobile: <TbMapPinSearch size={20} />,
  order: <FaBoxOpen size={25} />,
  orderMobile: <FaBoxOpen size={20} />,
};
